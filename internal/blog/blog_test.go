package blog

import (
	"strings"
	"testing"
	"time"
)

func TestParseEncodeRoundTrip(t *testing.T) {
	in := Post{
		Slug:    "round-trip",
		Title:   "Round: trip",
		Summary: "A summary",
		Date:    time.Date(2026, 9, 16, 0, 0, 0, 0, time.UTC),
		Tags:    []string{"go", "meta"},
		Draft:   true,
		Body:    "# Hi\n\nSome **bold**.",
	}
	src, err := Encode(in)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(src), "date: \"2026-09-16\"") && !strings.Contains(string(src), "date: 2026-09-16") {
		t.Fatalf("date not written as YYYY-MM-DD:\n%s", src)
	}
	out, err := Parse("round-trip", src)
	if err != nil {
		t.Fatal(err)
	}
	if out.Title != in.Title || out.Summary != in.Summary || !out.Date.Equal(in.Date) || out.Draft != in.Draft || out.Body != in.Body {
		t.Fatalf("mismatch:\n in=%+v\nout=%+v", in, out)
	}
	if len(out.Tags) != 2 || out.Tags[0] != "go" {
		t.Fatalf("tags: %v", out.Tags)
	}
	if !strings.Contains(string(out.HTML), "<strong>bold</strong>") {
		t.Fatalf("html: %s", out.HTML)
	}
}

func TestParseWithoutFrontMatter(t *testing.T) {
	p, err := Parse("plain", []byte("Just text."))
	if err != nil {
		t.Fatal(err)
	}
	if p.Body != "Just text." || p.Title != "" {
		t.Fatalf("got %+v", p)
	}
}

func TestSlug(t *testing.T) {
	cases := map[string]string{
		"Hello, World!":     "hello-world",
		"  Go & templates ": "go-templates",
		"already-a-slug":    "already-a-slug",
	}
	for in, want := range cases {
		if got := Slugify(in); got != want {
			t.Errorf("Slugify(%q) = %q, want %q", in, got, want)
		}
	}
	for _, bad := range []string{"", "Upper", "a--b", "-lead", "trail-", "a/b", "../x"} {
		if ValidSlug(bad) {
			t.Errorf("ValidSlug(%q) should be false", bad)
		}
	}
}
