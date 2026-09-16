// Package server wires configuration, content, and views into an http.Handler.
package server

import (
	"context"
	"fmt"
	"io/fs"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/mattisig/cv/internal/blog"
	"github.com/mattisig/cv/internal/config"
	"github.com/mattisig/cv/internal/cv"
	"github.com/mattisig/cv/internal/cvpdf"
	"github.com/mattisig/cv/internal/view"
	"github.com/mattisig/cv/internal/work"
	"github.com/mattisig/cv/web"
)

// Server holds the dependencies shared by all handlers.
type Server struct {
	cfg      config.Config
	log      *slog.Logger
	view     *view.Renderer
	posts    blog.Store
	feed     *blog.Feed // nil when no external feed is configured
	cv       cv.CV
	cvPDF    []byte // rendered once at startup; the CV is static content
	projects []work.Project
}

// New loads content and templates and returns the routed, middleware-wrapped handler.
// Background work (feed refresh) runs until ctx is cancelled.
func New(ctx context.Context, cfg config.Config, log *slog.Logger) (http.Handler, error) {
	templates, static := assets(cfg.Dev)

	renderer, err := view.New(templates, static, view.Site{Name: cfg.SiteName, URL: cfg.SiteURL}, cfg.Dev)
	if err != nil {
		return nil, err
	}
	posts, err := blog.NewFSStore(cfg.PostsDir)
	if err != nil {
		return nil, err
	}
	resume, err := cv.Load(filepath.Join(cfg.ContentDir, "cv.yaml"))
	if err != nil {
		return nil, err
	}
	projects, err := work.Load(filepath.Join(cfg.ContentDir, "projects.yaml"))
	if err != nil {
		return nil, err
	}

	pdfBytes, err := cvpdf.Render(resume)
	if err != nil {
		return nil, err
	}

	s := &Server{cfg: cfg, log: log, view: renderer, posts: posts, cv: resume, cvPDF: pdfBytes, projects: projects}
	if cfg.MediumFeedURL != "" {
		s.feed = blog.NewFeed(cfg.MediumFeedURL, "Medium", log)
		go s.feed.Run(ctx, time.Hour)
	}
	return s.routes(static), nil
}

// assets returns the template and static filesystems. In dev they are read from disk so
// edits show up without a rebuild; otherwise the embedded copies are used.
func assets(dev bool) (templates, static fs.FS) {
	if dev {
		return os.DirFS("web/templates"), os.DirFS("web/static")
	}
	return web.Templates(), web.Static()
}

func (s *Server) routes(static fs.FS) http.Handler {
	mux := http.NewServeMux()

	mux.Handle("GET /static/", http.StripPrefix("/static/", cacheControl(http.FileServerFS(static))))
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) {
		fmt.Fprintln(w, "ok")
	})

	mux.Handle("GET /{$}", s.handle(s.home))
	mux.Handle("GET /work", s.handle(s.work))
	mux.Handle("GET /blog", s.handle(s.blogIndex))
	mux.Handle("GET /blog/{slug}", s.handle(s.blogPost))
	mux.Handle("GET /cv", s.handle(s.resume))
	mux.Handle("GET /cv.pdf", s.handle(s.resumePDF))
	mux.Handle("GET /sitemap.xml", s.handle(s.sitemap))
	mux.Handle("GET /feed.xml", s.handle(s.rssFeed))
	mux.Handle("GET /robots.txt", s.handle(s.robots))
	mux.Handle("GET /llms.txt", s.handle(s.llms))

	if s.cfg.AdminEnabled() {
		mux.Handle("/admin/", s.adminRoutes())
	} else {
		s.log.Warn("admin disabled: set ADMIN_USER and ADMIN_PASSWORD to enable")
	}

	// Everything else is a 404 rendered through the layout.
	mux.Handle("/", s.handle(func(_ http.ResponseWriter, _ *http.Request) error { return errNotFound }))

	return chain(mux, s.recoverer, s.requestLogger, securityHeaders)
}

func cacheControl(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "public, max-age=3600")
		next.ServeHTTP(w, r)
	})
}
