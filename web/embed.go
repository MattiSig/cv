// Package web holds the HTML templates and static assets, embedded into the binary.
package web

import (
	"embed"
	"io/fs"
)

//go:embed templates static
var files embed.FS

// Templates returns the embedded template tree rooted at web/templates.
func Templates() fs.FS {
	return mustSub("templates")
}

// Static returns the embedded static asset tree rooted at web/static.
func Static() fs.FS {
	return mustSub("static")
}

func mustSub(dir string) fs.FS {
	sub, err := fs.Sub(files, dir)
	if err != nil {
		panic(err)
	}
	return sub
}
