package server

import (
	"context"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/mattisig/cv/internal/config"
)

func testServer(t *testing.T) http.Handler {
	t.Helper()
	cfg := config.Config{
		ContentDir: "../../content", PostsDir: "../../content/posts",
		SiteName: "Test Site", SiteURL: "https://example.com",
	}
	h, err := New(context.Background(), cfg, slog.New(slog.NewTextHandler(io.Discard, nil)))
	if err != nil {
		t.Fatal(err)
	}
	return h
}

func get(t *testing.T, h http.Handler, path string) (int, string, http.Header) {
	t.Helper()
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, path, nil))
	return rec.Code, rec.Body.String(), rec.Header()
}

func TestDiscoverySurfaces(t *testing.T) {
	h := testServer(t)
	cases := []struct{ path, ctype, want string }{
		{"/", "text/html", `"@type":"Person"`},
		{"/", "text/html", `<link rel="canonical" href="https://example.com/">`},
		{"/", "text/html", `property="og:image" content="https://example.com/static/og.png"`},
		{"/blog/hello-world", "text/html", `"@type":"BlogPosting"`},
		{"/blog/hello-world", "text/html", `property="og:type" content="article"`},
		{"/cv", "text/html", `"@type":"ProfilePage"`},
		{"/work", "text/html", `"@type":"ItemList"`},
		{"/sitemap.xml", "application/xml", "<loc>https://example.com/blog/hello-world</loc>"},
		{"/feed.xml", "application/rss+xml", "<title>Hello, world</title>"},
		{"/robots.txt", "text/plain", "Sitemap: https://example.com/sitemap.xml"},
		{"/llms.txt", "text/markdown", "# Matthías Sigurbjörnsson"},
		{"/nope", "text/html", `<meta name="robots" content="noindex, nofollow">`},
	}
	for _, c := range cases {
		code, body, hdr := get(t, h, c.path)
		if c.path != "/nope" && code != http.StatusOK {
			t.Errorf("%s: status %d", c.path, code)
		}
		if !strings.HasPrefix(hdr.Get("Content-Type"), c.ctype) {
			t.Errorf("%s: content-type %q", c.path, hdr.Get("Content-Type"))
		}
		if !strings.Contains(body, c.want) {
			t.Errorf("%s: missing %q", c.path, c.want)
		}
	}
}
