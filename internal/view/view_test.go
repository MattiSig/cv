package view

import (
	"strings"
	"testing"
	"testing/fstest"
)

func TestAssetVersioning(t *testing.T) {
	static := fstest.MapFS{"css/app.css": {Data: []byte("a{}")}}
	asset := assetFunc(static, false)
	got := asset("css/app.css")
	if !strings.HasPrefix(got, "/static/css/app.css?v=") || len(got) != len("/static/css/app.css?v=")+8 {
		t.Fatalf("got %q", got)
	}
	if asset("missing.js") != "/static/missing.js" {
		t.Fatal("missing files should fall back to the plain path")
	}
	changed := assetFunc(fstest.MapFS{"css/app.css": {Data: []byte("b{}")}}, false)("css/app.css")
	if changed == got {
		t.Fatal("hash should change with content")
	}
}
