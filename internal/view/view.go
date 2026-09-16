// Package view renders html/template pages on top of a shared base layout.
package view

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
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

// Meta carries what search engines, social cards, and answer engines read.
type Meta struct {
	// Type is the Open Graph type: "website" (default), "article", or "profile".
	Type string
	// Image is an absolute URL for the share card; empty falls back to the site default.
	Image string
	// Published and Tags apply to articles.
	Published time.Time
	Tags      []string
	// JSONLD is marshalled into a script tag when non-nil.
	JSONLD any
	// NoIndex keeps a page out of search results (admin, errors).
	NoIndex bool
}

// Page is the envelope handed to every template.
type Page struct {
	Site        Site
	Title       string
	Description string
	// Path is the request path, used for nav highlighting and the canonical URL.
	Path string
	Meta Meta
	// Data is page-specific.
	Data any
}

// Canonical is the absolute URL of the page.
func (p Page) Canonical() string {
	return strings.TrimSuffix(p.Site.URL, "/") + p.Path
}

// ShareImage is the absolute URL of the Open Graph image.
func (p Page) ShareImage() string {
	if p.Meta.Image != "" {
		return p.Meta.Image
	}
	return strings.TrimSuffix(p.Site.URL, "/") + "/static/og.png"
}

// OGType is the Open Graph type with its default applied.
func (p Page) OGType() string {
	if p.Meta.Type == "" {
		return "website"
	}
	return p.Meta.Type
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
// static is the served asset tree; its file contents version the URLs the templates emit.
func New(fsys, static fs.FS, site Site, dev bool) (*Renderer, error) {
	r := &Renderer{fsys: fsys, site: site, dev: dev, funcs: funcs()}
	r.funcs["asset"] = assetFunc(static, dev)
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

// assetFunc returns a template helper that appends a short content hash to a static path,
// e.g. asset "css/app.css" → "/static/css/app.css?v=1a2b3c4d". Cached forever means
// cached until the file changes. In dev the hash is recomputed on every call.
func assetFunc(static fs.FS, dev bool) func(string) string {
	var mu sync.Mutex
	cache := map[string]string{}
	hash := func(p string) string {
		b, err := fs.ReadFile(static, p)
		if err != nil {
			return "/static/" + p
		}
		sum := sha256.Sum256(b)
		return "/static/" + p + "?v=" + hex.EncodeToString(sum[:4])
	}
	return func(p string) string {
		if dev {
			return hash(p)
		}
		mu.Lock()
		defer mu.Unlock()
		if v, ok := cache[p]; ok {
			return v
		}
		cache[p] = hash(p)
		return cache[p]
	}
}

func funcs() template.FuncMap {
	return template.FuncMap{
		// jsonld marshals structured data for a <script type="application/ld+json"> block.
		// encoding/json escapes <, >, and & so the output cannot break out of the script.
		"jsonld": func(v any) (template.JS, error) {
			b, err := json.Marshal(v)
			if err != nil {
				return "", err
			}
			return template.JS(b), nil //nolint:gosec // json.Marshal output is script-safe
		},
		"rfc3339":   func(t time.Time) string { return t.Format(time.RFC3339) },
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
