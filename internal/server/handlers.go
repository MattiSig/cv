package server

import (
	"errors"
	"net/http"

	"github.com/mattisig/cv/internal/blog"
	"github.com/mattisig/cv/internal/view"
	"github.com/mattisig/cv/internal/work"
)

// handlerFunc lets handlers return errors; handle turns them into responses.
type handlerFunc func(w http.ResponseWriter, r *http.Request) error

// httpError carries a status code up to handle.
type httpError struct {
	status int
	msg    string
}

func (e *httpError) Error() string { return e.msg }

var errNotFound = &httpError{status: http.StatusNotFound, msg: "Page not found"}

func badRequest(msg string) error { return &httpError{status: http.StatusBadRequest, msg: msg} }

func (s *Server) handle(h handlerFunc) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := h(w, r)
		if err == nil {
			return
		}
		status := http.StatusInternalServerError
		msg := "Something went wrong"
		var he *httpError
		switch {
		case errors.As(err, &he):
			status, msg = he.status, he.msg
		case errors.Is(err, blog.ErrNotFound):
			status, msg = http.StatusNotFound, errNotFound.msg
		default:
			s.log.Error("handler error", "path", r.URL.Path, "err", err)
		}
		if rerr := s.render(w, r, status, "error", msg, "", map[string]any{"Status": status, "Message": msg}); rerr != nil {
			s.log.Error("render error page", "err", rerr)
			http.Error(w, msg, status)
		}
	})
}

func (s *Server) render(w http.ResponseWriter, r *http.Request, status int, page, title, description string, data any) error {
	return s.view.Render(w, status, page, view.Page{
		Title:       title,
		Description: description,
		Path:        r.URL.Path,
		Data:        data,
	})
}

func (s *Server) home(w http.ResponseWriter, r *http.Request) error {
	posts, err := s.posts.List(r.Context())
	if err != nil {
		return err
	}
	published := blog.Published(posts)
	if len(published) > 3 {
		published = published[:3]
	}
	return s.render(w, r, http.StatusOK, "home", "", s.cv.Title, map[string]any{
		"CV":       s.cv,
		"Featured": work.Featured(s.projects),
		"Posts":    published,
	})
}

func (s *Server) work(w http.ResponseWriter, r *http.Request) error {
	return s.render(w, r, http.StatusOK, "work", "Work", "Selected projects", map[string]any{
		"Projects": s.projects,
	})
}

func (s *Server) blogIndex(w http.ResponseWriter, r *http.Request) error {
	posts, err := s.posts.List(r.Context())
	if err != nil {
		return err
	}
	return s.render(w, r, http.StatusOK, "blog/index", "Blog", "Notes on building software", map[string]any{
		"Posts": blog.Published(posts),
	})
}

func (s *Server) blogPost(w http.ResponseWriter, r *http.Request) error {
	post, err := s.posts.Get(r.Context(), r.PathValue("slug"))
	if err != nil {
		return err
	}
	if post.Draft {
		return errNotFound
	}
	return s.render(w, r, http.StatusOK, "blog/post", post.Title, post.Summary, post)
}

func (s *Server) resume(w http.ResponseWriter, r *http.Request) error {
	return s.render(w, r, http.StatusOK, "cv", "CV", s.cv.Summary, s.cv)
}
