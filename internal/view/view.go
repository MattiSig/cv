// Package view renders html/template pages on top of a shared base layout.
package view

import (
	"bytes"
	"fmt"
	"html/template"
	"io/fs"
	"net/http"
	"strings"
	"sync"
	"time"
)

// Site is data every page can reach.
type Site struct {
	Name string
	URL  string
	Year int
}

// Page is the envelope handed to every template.
type Page struct {
	Site        Site
	Title       string
	Description string
	// Path is the request path, used for nav highlighting.
	Path string
	// Data is page-specific.
	Data any
}

// Renderer parses each page under pages/ together with the base layout and partials.
type Renderer struct {
	fsys  fs.FS
	site  Site
	dev   bool
	funcs template.FuncMap

	mu    sync.RWMutex
	pages map[string]*template.Template
}

// New parses all templates from fsys. When dev is true, templates are re-parsed on every render.
func New(fsys fs.FS, site Site, dev bool) (*Renderer, error) {
	r := &Renderer{fsys: fsys, site: site, dev: dev, funcs: funcs()}
	if err := r.load(); err != nil {
		return nil, err
	}
	return r, nil
}

func (r *Renderer) load() error {
	pages := make(map[string]*template.Template)
	err := fs.WalkDir(r.fsys, "pages", func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || !strings.HasSuffix(p, ".html") {
			return nil
		}
		name := strings.TrimSuffix(strings.TrimPrefix(p, "pages/"), ".html")
		t, err := template.New("base.html").Funcs(r.funcs).ParseFS(r.fsys, "layouts/base.html", "partials/*.html", p)
		if err != nil {
			return fmt.Errorf("view: parse %s: %w", p, err)
		}
		pages[name] = t
		return nil
	})
	if err != nil {
		return err
	}
	r.mu.Lock()
	r.pages = pages
	r.mu.Unlock()
	return nil
}

// Render writes the named page (e.g. "home", "blog/post") with the given status.
// The page is rendered to a buffer first so a template error never produces a half-written response.
func (r *Renderer) Render(w http.ResponseWriter, status int, name string, p Page) error {
	if r.dev {
		if err := r.load(); err != nil {
			return err
		}
	}
	r.mu.RLock()
	t := r.pages[name]
	r.mu.RUnlock()
	if t == nil {
		return fmt.Errorf("view: unknown page %q", name)
	}

	p.Site = r.site
	p.Site.Year = time.Now().Year()

	var buf bytes.Buffer
	if err := t.ExecuteTemplate(&buf, "base.html", p); err != nil {
		return fmt.Errorf("view: render %s: %w", name, err)
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(status)
	_, err := buf.WriteTo(w)
	return err
}

// NavItem is one entry in the site navigation.
type NavItem struct {
	Href  string
	Label string
}

var nav = []NavItem{
	{Href: "/work", Label: "Work"},
	{Href: "/blog", Label: "Blog"},
	{Href: "/cv", Label: "CV"},
}

func funcs() template.FuncMap {
	return template.FuncMap{
		"navItems":  func() []NavItem { return nav },
		"date":      func(t time.Time) string { return t.Format("2 January 2006") },
		"isoDate":   func(t time.Time) string { return t.Format("2006-01-02") },
		"join":      strings.Join,
		"hasPrefix": strings.HasPrefix,
		"lower":     strings.ToLower,
		"trimScheme": func(u string) string {
			u = strings.TrimPrefix(strings.TrimPrefix(u, "https://"), "http://")
			return strings.TrimSuffix(u, "/")
		},
	}
}
