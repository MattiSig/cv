package server

import (
	"bytes"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/mattisig/cv/internal/blog"
	"github.com/mattisig/cv/internal/cvpdf"
	"github.com/mattisig/cv/internal/discovery"
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
		if rerr := s.renderMeta(w, r, status, "error", msg, "", view.Meta{NoIndex: true}, map[string]any{"Status": status, "Message": msg}); rerr != nil {
			s.log.Error("render error page", "err", rerr)
			http.Error(w, msg, status)
		}
	})
}

func (s *Server) render(w http.ResponseWriter, r *http.Request, status int, page, title, description string, data any) error {
	return s.renderMeta(w, r, status, page, title, description, view.Meta{}, data)
}

func (s *Server) renderMeta(w http.ResponseWriter, r *http.Request, status int, page, title, description string, meta view.Meta, data any) error {
	return s.view.Render(w, status, page, view.Page{
		Title:       title,
		Description: description,
		Path:        r.URL.Path,
		Meta:        meta,
		Data:        data,
	})
}

func (s *Server) site() discovery.Site {
	return discovery.Site{Name: s.cfg.SiteName, URL: s.cfg.SiteURL}
}

func (s *Server) abs(path string) string {
	return strings.TrimSuffix(s.cfg.SiteURL, "/") + path
}

// person is the schema.org description of the owner, reused across pages.
func (s *Server) person() map[string]any {
	c := s.cv
	var sameAs []string
	for _, l := range c.Links {
		sameAs = append(sameAs, l.URL)
	}
	var knows []string
	for _, g := range c.Skills {
		knows = append(knows, g.Items...)
	}
	p := map[string]any{
		"@type":       "Person",
		"@id":         s.abs("/#person"),
		"name":        c.Name,
		"url":         s.abs("/"),
		"image":       s.abs("/static/img/founder-400.jpg"),
		"email":       "mailto:" + c.Email,
		"jobTitle":    c.Title,
		"description": c.Summary,
		"sameAs":      sameAs,
		"knowsAbout":  knows,
		"address":     map[string]any{"@type": "PostalAddress", "addressLocality": "Göteborg", "addressCountry": "SE"},
	}
	if len(c.Experience) > 0 && c.Experience[0].End == "" {
		p["worksFor"] = map[string]any{"@type": "Organization", "name": c.Experience[0].Company}
	}
	if len(c.Education) > 0 {
		p["alumniOf"] = map[string]any{"@type": "CollegeOrUniversity", "name": c.Education[0].School}
	}
	return p
}

func (s *Server) website() map[string]any {
	return map[string]any{
		"@type":  "WebSite",
		"@id":    s.abs("/#website"),
		"url":    s.abs("/"),
		"name":   s.cfg.SiteName,
		"author": map[string]any{"@id": s.abs("/#person")},
	}
}

func graph(items ...any) map[string]any {
	return map[string]any{"@context": "https://schema.org", "@graph": items}
}

// allPosts merges published local posts with external feed items, newest first.
func (s *Server) allPosts(r *http.Request) ([]blog.Post, error) {
	local, err := s.posts.List(r.Context())
	if err != nil {
		return nil, err
	}
	var external []blog.Post
	if s.feed != nil {
		external = s.feed.Posts()
	}
	return blog.Merge(blog.Published(local), external), nil
}

func (s *Server) home(w http.ResponseWriter, r *http.Request) error {
	published, err := s.allPosts(r)
	if err != nil {
		return err
	}
	if len(published) > 3 {
		published = published[:3]
	}
	meta := view.Meta{Type: "profile", JSONLD: graph(s.website(), s.person())}
	return s.renderMeta(w, r, http.StatusOK, "home", "", s.cv.Summary, meta, map[string]any{
		"CV":       s.cv,
		"Featured": work.Featured(s.projects),
		"Posts":    published,
	})
}

func (s *Server) work(w http.ResponseWriter, r *http.Request) error {
	var items []any
	for i, p := range s.projects {
		u := p.URL
		if u == "" {
			u = s.abs("/work#" + p.Slug)
		}
		items = append(items, map[string]any{"@type": "ListItem", "position": i + 1, "url": u, "name": p.Name})
	}
	meta := view.Meta{JSONLD: graph(map[string]any{"@type": "ItemList", "name": "Work", "itemListElement": items})}
	return s.renderMeta(w, r, http.StatusOK, "work", "Work", "Projects I built or lead: "+projectNames(s.projects), meta, map[string]any{
		"Projects": s.projects,
	})
}

func (s *Server) blogIndex(w http.ResponseWriter, r *http.Request) error {
	posts, err := s.allPosts(r)
	if err != nil {
		return err
	}
	meta := view.Meta{JSONLD: graph(map[string]any{
		"@type": "Blog", "@id": s.abs("/blog#blog"), "url": s.abs("/blog"),
		"name": s.cfg.SiteName + " · Writing", "author": map[string]any{"@id": s.abs("/#person")},
	})}
	return s.renderMeta(w, r, http.StatusOK, "blog/index", "Blog", "Notes on building software, teams, and products by "+s.cv.Name+".", meta, map[string]any{
		"Posts": posts,
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
	meta := view.Meta{
		Type:      "article",
		Published: post.Date,
		Tags:      post.Tags,
		JSONLD: graph(map[string]any{
			"@type":            "BlogPosting",
			"headline":         post.Title,
			"description":      post.Summary,
			"url":              s.abs(post.URL()),
			"mainEntityOfPage": s.abs(post.URL()),
			"datePublished":    post.Date.Format("2006-01-02"),
			"keywords":         strings.Join(post.Tags, ", "),
			"inLanguage":       "en",
			"author":           map[string]any{"@id": s.abs("/#person")},
			"publisher":        map[string]any{"@id": s.abs("/#person")},
			"isPartOf":         map[string]any{"@id": s.abs("/blog#blog")},
		}),
	}
	return s.renderMeta(w, r, http.StatusOK, "blog/post", post.Title, post.Summary, meta, post)
}

func (s *Server) resume(w http.ResponseWriter, r *http.Request) error {
	meta := view.Meta{Type: "profile", JSONLD: graph(map[string]any{
		"@type": "ProfilePage", "url": s.abs("/cv"), "name": "CV · " + s.cv.Name,
		"mainEntity": s.person(),
	})}
	return s.renderMeta(w, r, http.StatusOK, "cv", "CV", "CV of "+s.cv.Name+", "+s.cv.Title+". "+s.cv.Summary, meta, s.cv)
}

func projectNames(ps []work.Project) string {
	names := make([]string, 0, len(ps))
	for _, p := range ps {
		names = append(names, p.Name)
	}
	return strings.Join(names, ", ") + "."
}

func (s *Server) sitemap(w http.ResponseWriter, r *http.Request) error {
	posts, err := s.allPosts(r)
	if err != nil {
		return err
	}
	out, err := discovery.Sitemap(s.site(), posts)
	if err != nil {
		return err
	}
	return writeBytes(w, "application/xml; charset=utf-8", out)
}

func (s *Server) rssFeed(w http.ResponseWriter, r *http.Request) error {
	posts, err := s.allPosts(r)
	if err != nil {
		return err
	}
	out, err := discovery.Feed(s.site(), posts)
	if err != nil {
		return err
	}
	return writeBytes(w, "application/rss+xml; charset=utf-8", out)
}

func (s *Server) robots(w http.ResponseWriter, _ *http.Request) error {
	return writeBytes(w, "text/plain; charset=utf-8", discovery.Robots(s.site()))
}

func (s *Server) llms(w http.ResponseWriter, r *http.Request) error {
	posts, err := s.allPosts(r)
	if err != nil {
		return err
	}
	return writeBytes(w, "text/markdown; charset=utf-8", discovery.LLMs(s.site(), s.cv, s.projects, posts))
}

func writeBytes(w http.ResponseWriter, contentType string, b []byte) error {
	w.Header().Set("Content-Type", contentType)
	w.Header().Set("Cache-Control", "public, max-age=600")
	_, err := w.Write(b)
	return err
}

func (s *Server) resumePDF(w http.ResponseWriter, r *http.Request) error {
	pdf := s.cvPDF
	if s.cfg.Dev { // re-render so content edits show without a restart
		var err error
		if pdf, err = cvpdf.Render(s.cv); err != nil {
			return err
		}
	}
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", `inline; filename="`+pdfFilename(s.cv.Name)+`"`)
	w.Header().Set("Cache-Control", "public, max-age=3600")
	http.ServeContent(w, r, "", time.Time{}, bytes.NewReader(pdf))
	return nil
}

// pdfFilename builds an ASCII-safe download name, e.g. "Matthias-Sigurbjornsson-CV.pdf".
func pdfFilename(name string) string {
	repl := strings.NewReplacer("í", "i", "ó", "o", "ö", "o", "á", "a", "é", "e", "ú", "u", "ý", "y", "þ", "th", "ð", "d", "æ", "ae", "Þ", "Th", "Ð", "D", "Æ", "Ae", "Í", "I", "Ó", "O", "Ö", "O", "Á", "A", "É", "E", "Ú", "U", "Ý", "Y")
	ascii := repl.Replace(name)
	return strings.ReplaceAll(ascii, " ", "-") + "-CV.pdf"
}
