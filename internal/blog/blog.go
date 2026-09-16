// Package blog stores and renders Markdown posts with YAML front matter.
package blog

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"html/template"
	"regexp"
	"strings"
	"time"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
	"gopkg.in/yaml.v3"
)

// ErrNotFound is returned when a slug does not exist.
var ErrNotFound = errors.New("blog: post not found")

// Post is a single article, either local (Body/HTML set) or external (External set).
type Post struct {
	Slug    string
	Title   string
	Summary string
	Date    time.Time
	Tags    []string
	Draft   bool
	Body    string
	HTML    template.HTML
	// External is the canonical URL of a post hosted elsewhere (e.g. Medium); such posts link out.
	External string
	// Source labels where an external post lives, e.g. "Medium". Empty for local posts.
	Source string
}

// URL is the path or link a post should be reached at.
func (p Post) URL() string {
	if p.External != "" {
		return p.External
	}
	return "/blog/" + p.Slug
}

// Store is the persistence boundary. The filesystem implementation is the default;
// swap it for a database-backed one without touching handlers.
type Store interface {
	// List returns all posts, newest first, including drafts.
	List(ctx context.Context) ([]Post, error)
	Get(ctx context.Context, slug string) (Post, error)
	Save(ctx context.Context, p Post) error
	Delete(ctx context.Context, slug string) error
}

// Published filters drafts out of a list.
func Published(posts []Post) []Post {
	out := posts[:0:0]
	for _, p := range posts {
		if !p.Draft {
			out = append(out, p)
		}
	}
	return out
}

var slugRe = regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)

// ValidSlug reports whether s is safe to use as a URL segment and file name.
func ValidSlug(s string) bool {
	return len(s) <= 120 && slugRe.MatchString(s)
}

var nonSlug = regexp.MustCompile(`[^a-z0-9]+`)

// Slugify derives a slug from a title. Non-ASCII letters are dropped, so Icelandic
// titles may want a hand-written slug.
func Slugify(title string) string {
	s := strings.ToLower(title)
	s = nonSlug.ReplaceAllString(s, "-")
	return strings.Trim(s, "-")
}

var md = goldmark.New(
	goldmark.WithExtensions(extension.GFM, extension.Typographer, extension.Footnote),
	goldmark.WithParserOptions(parser.WithAutoHeadingID()),
	// Raw HTML is allowed because posts are written only by the authenticated owner.
	goldmark.WithRendererOptions(html.WithUnsafe()),
)

// Render converts Markdown to HTML.
func Render(markdown string) (template.HTML, error) {
	var buf bytes.Buffer
	if err := md.Convert([]byte(markdown), &buf); err != nil {
		return "", err
	}
	return template.HTML(buf.String()), nil //nolint:gosec // owner-authored content
}

const delimiter = "---"

// Parse splits a document into front matter and body and renders the body.
func Parse(slug string, src []byte) (Post, error) {
	p := Post{Slug: slug}
	text := strings.ReplaceAll(string(src), "\r\n", "\n")

	body := text
	if strings.HasPrefix(text, delimiter+"\n") {
		rest := text[len(delimiter)+1:]
		end := strings.Index(rest, "\n"+delimiter)
		if end < 0 {
			return p, fmt.Errorf("blog: %s: unterminated front matter", slug)
		}
		var fm frontMatter
		if err := yaml.Unmarshal([]byte(rest[:end]), &fm); err != nil {
			return p, fmt.Errorf("blog: %s: front matter: %w", slug, err)
		}
		date, err := parseDate(fm.Date)
		if err != nil {
			return p, fmt.Errorf("blog: %s: front matter: %w", slug, err)
		}
		p.Title, p.Summary, p.Date, p.Tags, p.Draft = fm.Title, fm.Summary, date, fm.Tags, fm.Draft
		body = rest[end+len(delimiter)+1:]
	}
	// Canonical body: no leading blank lines, no trailing newline. Encode adds them back.
	p.Body = strings.TrimRight(strings.TrimLeft(body, "\n"), "\n")

	h, err := Render(body)
	if err != nil {
		return p, fmt.Errorf("blog: %s: render: %w", slug, err)
	}
	p.HTML = h
	return p, nil
}

// frontMatter is the on-disk shape. Date is a string so hand-written `2026-09-16`
// and machine-written `"2026-09-16"` both decode; dateLayouts lists what we accept.
type frontMatter struct {
	Title   string   `yaml:"title"`
	Summary string   `yaml:"summary,omitempty"`
	Date    string   `yaml:"date"`
	Tags    []string `yaml:"tags,flow,omitempty"`
	Draft   bool     `yaml:"draft,omitempty"`
}

const dateLayout = "2006-01-02"

var dateLayouts = []string{dateLayout, time.RFC3339, "2006-01-02 15:04"}

func parseDate(s string) (time.Time, error) {
	for _, l := range dateLayouts {
		if t, err := time.Parse(l, s); err == nil {
			return t, nil
		}
	}
	return time.Time{}, fmt.Errorf("date %q: want YYYY-MM-DD", s)
}

// Encode serialises a post back to front matter + Markdown.
func Encode(p Post) ([]byte, error) {
	fm, err := yaml.Marshal(frontMatter{
		Title:   p.Title,
		Summary: p.Summary,
		Date:    p.Date.Format(dateLayout),
		Tags:    p.Tags,
		Draft:   p.Draft,
	})
	if err != nil {
		return nil, err
	}
	var buf bytes.Buffer
	buf.WriteString(delimiter + "\n")
	buf.Write(fm)
	buf.WriteString(delimiter + "\n\n")
	buf.WriteString(strings.TrimRight(p.Body, "\n"))
	buf.WriteString("\n")
	return buf.Bytes(), nil
}
