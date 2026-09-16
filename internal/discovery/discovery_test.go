package discovery

import (
	"encoding/xml"
	"strings"
	"testing"
	"time"

	"github.com/mattisig/cv/internal/blog"
)

var site = Site{Name: "Test", URL: "https://example.com/"}

func TestSitemapAndFeedAreWellFormed(t *testing.T) {
	posts := []blog.Post{
		{Slug: "local", Title: "Local <post>", Date: time.Date(2026, 9, 16, 0, 0, 0, 0, time.UTC), HTML: "<p>hi</p>"},
		{Slug: "ext", Title: "External", Date: time.Date(2024, 8, 25, 0, 0, 0, 0, time.UTC), External: "https://medium.com/p/x", Source: "Medium"},
	}
	sm, err := Sitemap(site, posts)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(sm), "<loc>https://example.com/blog/local</loc>") || strings.Contains(string(sm), "medium.com") {
		t.Fatalf("sitemap:\n%s", sm)
	}
	feed, err := Feed(site, posts)
	if err != nil {
		t.Fatal(err)
	}
	var v struct{}
	if err := xml.Unmarshal(feed, &v); err != nil {
		t.Fatalf("feed not well-formed: %v\n%s", err, feed)
	}
	for _, want := range []string{"<title>Local &lt;post&gt;</title>", "<link>https://medium.com/p/x</link>", "xmlns:content=", "<![CDATA[<p>hi</p>]]>"} {
		if !strings.Contains(string(feed), want) {
			t.Errorf("feed missing %q:\n%s", want, feed)
		}
	}
}

func TestRobots(t *testing.T) {
	r := string(Robots(site))
	for _, want := range []string{"User-agent: *", "Disallow: /admin/", "User-agent: GPTBot", "User-agent: ClaudeBot", "Sitemap: https://example.com/sitemap.xml"} {
		if !strings.Contains(r, want) {
			t.Errorf("robots missing %q", want)
		}
	}
}
