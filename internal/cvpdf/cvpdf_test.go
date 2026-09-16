package cvpdf

import (
	"bytes"
	"regexp"
	"testing"

	"github.com/mattisig/cv/internal/cv"
)

func TestRenderFitsTwoPages(t *testing.T) {
	c, err := cv.Load("../../content/cv.yaml")
	if err != nil {
		t.Fatal(err)
	}
	out, err := Render(c)
	if err != nil {
		t.Fatal(err)
	}
	if !bytes.HasPrefix(out, []byte("%PDF-")) {
		t.Fatal("not a PDF")
	}
	pages := regexp.MustCompile(`/Type /Page[^s]`).FindAll(out, -1)
	if n := len(pages); n < 1 || n > 2 {
		t.Fatalf("want 1–2 pages, got %d", n)
	}
}
