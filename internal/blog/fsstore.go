package blog

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// FSStore keeps one Markdown file per post in a directory.
type FSStore struct {
	dir string
}

// NewFSStore creates the directory if needed.
func NewFSStore(dir string) (*FSStore, error) {
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return nil, fmt.Errorf("blog: posts dir: %w", err)
	}
	return &FSStore{dir: dir}, nil
}

func (s *FSStore) path(slug string) string {
	return filepath.Join(s.dir, slug+".md")
}

// List implements Store.
func (s *FSStore) List(_ context.Context) ([]Post, error) {
	entries, err := os.ReadDir(s.dir)
	if err != nil {
		return nil, err
	}
	var posts []Post
	for _, e := range entries {
		if e.IsDir() || !strings.HasSuffix(e.Name(), ".md") {
			continue
		}
		slug := strings.TrimSuffix(e.Name(), ".md")
		if !ValidSlug(slug) {
			continue
		}
		p, err := s.read(slug)
		if err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}
	sort.Slice(posts, func(i, j int) bool { return posts[i].Date.After(posts[j].Date) })
	return posts, nil
}

// Get implements Store.
func (s *FSStore) Get(_ context.Context, slug string) (Post, error) {
	if !ValidSlug(slug) {
		return Post{}, ErrNotFound
	}
	return s.read(slug)
}

func (s *FSStore) read(slug string) (Post, error) {
	src, err := os.ReadFile(s.path(slug))
	if errors.Is(err, fs.ErrNotExist) {
		return Post{}, ErrNotFound
	}
	if err != nil {
		return Post{}, err
	}
	return Parse(slug, src)
}

// Save implements Store. The file is written atomically via rename.
func (s *FSStore) Save(_ context.Context, p Post) error {
	if !ValidSlug(p.Slug) {
		return fmt.Errorf("blog: invalid slug %q", p.Slug)
	}
	data, err := Encode(p)
	if err != nil {
		return err
	}
	tmp, err := os.CreateTemp(s.dir, "."+p.Slug+".*.tmp")
	if err != nil {
		return err
	}
	defer os.Remove(tmp.Name())
	if _, err := tmp.Write(data); err != nil {
		tmp.Close()
		return err
	}
	if err := tmp.Close(); err != nil {
		return err
	}
	return os.Rename(tmp.Name(), s.path(p.Slug))
}

// Delete implements Store.
func (s *FSStore) Delete(_ context.Context, slug string) error {
	if !ValidSlug(slug) {
		return ErrNotFound
	}
	err := os.Remove(s.path(slug))
	if errors.Is(err, fs.ErrNotExist) {
		return ErrNotFound
	}
	return err
}
