package server

import (
	"crypto/subtle"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/mattisig/cv/internal/blog"
)

// adminRoutes mounts the post editor behind HTTP basic auth and a same-origin check.
// Basic auth is the deliberate skeleton choice: one user, no sessions, no password reset.
func (s *Server) adminRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.Handle("GET /admin/{$}", http.RedirectHandler("/admin/posts", http.StatusFound))
	mux.Handle("GET /admin/posts", s.handle(s.adminPosts))
	mux.Handle("GET /admin/posts/new", s.handle(s.adminNew))
	mux.Handle("POST /admin/posts", s.handle(s.adminCreate))
	mux.Handle("GET /admin/posts/{slug}/edit", s.handle(s.adminEdit))
	mux.Handle("POST /admin/posts/{slug}", s.handle(s.adminUpdate))
	mux.Handle("POST /admin/posts/{slug}/delete", s.handle(s.adminDelete))

	return chain(mux, s.basicAuth, sameOrigin)
}

func (s *Server) basicAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, pass, ok := r.BasicAuth()
		userOK := subtle.ConstantTimeCompare([]byte(user), []byte(s.cfg.AdminUser)) == 1
		passOK := subtle.ConstantTimeCompare([]byte(pass), []byte(s.cfg.AdminPassword)) == 1
		if !ok || !userOK || !passOK {
			w.Header().Set("WWW-Authenticate", `Basic realm="admin", charset="UTF-8"`)
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

// sameOrigin rejects cross-site state changes. Browsers attach basic-auth credentials
// automatically, so without this a hostile page could submit the post form on the owner's behalf.
func sameOrigin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			switch r.Header.Get("Sec-Fetch-Site") {
			case "same-origin", "none", "":
				// "" covers non-browser clients (curl); they don't carry ambient credentials.
			default:
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}

func (s *Server) adminPosts(w http.ResponseWriter, r *http.Request) error {
	posts, err := s.posts.List(r.Context())
	if err != nil {
		return err
	}
	return s.render(w, r, http.StatusOK, "admin/posts", "Posts · Admin", "", map[string]any{"Posts": posts})
}

func (s *Server) adminNew(w http.ResponseWriter, r *http.Request) error {
	return s.render(w, r, http.StatusOK, "admin/edit", "New post · Admin", "", map[string]any{
		"Post":  blog.Post{Date: time.Now(), Draft: true},
		"IsNew": true,
	})
}

func (s *Server) adminEdit(w http.ResponseWriter, r *http.Request) error {
	post, err := s.posts.Get(r.Context(), r.PathValue("slug"))
	if err != nil {
		return err
	}
	return s.render(w, r, http.StatusOK, "admin/edit", "Edit post · Admin", "", map[string]any{
		"Post":  post,
		"IsNew": false,
	})
}

func (s *Server) adminCreate(w http.ResponseWriter, r *http.Request) error {
	post, err := postFromForm(r)
	if err != nil {
		return err
	}
	if _, err := s.posts.Get(r.Context(), post.Slug); err == nil {
		return badRequest("A post with that slug already exists")
	} else if !errors.Is(err, blog.ErrNotFound) {
		return err
	}
	if err := s.posts.Save(r.Context(), post); err != nil {
		return err
	}
	http.Redirect(w, r, "/admin/posts/"+post.Slug+"/edit", http.StatusSeeOther)
	return nil
}

func (s *Server) adminUpdate(w http.ResponseWriter, r *http.Request) error {
	slug := r.PathValue("slug")
	if _, err := s.posts.Get(r.Context(), slug); err != nil {
		return err
	}
	post, err := postFromForm(r)
	if err != nil {
		return err
	}
	if err := s.posts.Save(r.Context(), post); err != nil {
		return err
	}
	if post.Slug != slug {
		if err := s.posts.Delete(r.Context(), slug); err != nil {
			return err
		}
	}
	http.Redirect(w, r, "/admin/posts/"+post.Slug+"/edit", http.StatusSeeOther)
	return nil
}

func (s *Server) adminDelete(w http.ResponseWriter, r *http.Request) error {
	if err := s.posts.Delete(r.Context(), r.PathValue("slug")); err != nil {
		return err
	}
	http.Redirect(w, r, "/admin/posts", http.StatusSeeOther)
	return nil
}

func postFromForm(r *http.Request) (blog.Post, error) {
	if err := r.ParseForm(); err != nil {
		return blog.Post{}, badRequest("Malformed form")
	}
	title := strings.TrimSpace(r.FormValue("title"))
	if title == "" {
		return blog.Post{}, badRequest("Title is required")
	}
	slug := strings.TrimSpace(r.FormValue("slug"))
	if slug == "" {
		slug = blog.Slugify(title)
	}
	if !blog.ValidSlug(slug) {
		return blog.Post{}, badRequest("Slug may only contain lowercase letters, digits, and hyphens")
	}
	date, err := time.Parse("2006-01-02", r.FormValue("date"))
	if err != nil {
		return blog.Post{}, badRequest("Date must be YYYY-MM-DD")
	}
	var tags []string
	for _, t := range strings.Split(r.FormValue("tags"), ",") {
		if t = strings.TrimSpace(t); t != "" {
			tags = append(tags, t)
		}
	}
	body := strings.ReplaceAll(r.FormValue("body"), "\r\n", "\n")
	post := blog.Post{
		Slug:    slug,
		Title:   title,
		Summary: strings.TrimSpace(r.FormValue("summary")),
		Date:    date,
		Tags:    tags,
		Draft:   r.FormValue("draft") == "on",
		Body:    body,
	}
	return post, nil
}
