// Package config reads runtime configuration from the environment.
package config

import (
	"os"
	"path/filepath"
	"strconv"
)

// Config is everything the server needs to start.
type Config struct {
	// Addr is the listen address, derived from PORT (Railway sets PORT).
	Addr string
	// Dev enables template reloading from disk and human-readable logs.
	Dev bool
	// ContentDir holds cv.yaml and projects.yaml; shipped inside the image.
	ContentDir string
	// PostsDir holds blog posts as Markdown. Point it at a persistent volume in production.
	PostsDir string
	// AdminUser and AdminPassword protect /admin. Admin is disabled when either is empty.
	AdminUser     string
	AdminPassword string
	// SiteName and SiteURL feed page metadata.
	SiteName string
	SiteURL  string
}

// FromEnv builds a Config from environment variables with local-dev defaults.
func FromEnv() Config {
	c := Config{
		Addr:          ":" + env("PORT", "8080"),
		Dev:           boolEnv("DEV"),
		ContentDir:    env("CONTENT_DIR", "content"),
		AdminUser:     os.Getenv("ADMIN_USER"),
		AdminPassword: os.Getenv("ADMIN_PASSWORD"),
		SiteName:      env("SITE_NAME", "Matthías Sigurbjörnsson"),
		SiteURL:       env("SITE_URL", "http://localhost:8080"),
	}
	c.PostsDir = env("POSTS_DIR", filepath.Join(c.ContentDir, "posts"))
	return c
}

// AdminEnabled reports whether the admin area has credentials configured.
func (c Config) AdminEnabled() bool {
	return c.AdminUser != "" && c.AdminPassword != ""
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func boolEnv(key string) bool {
	v, _ := strconv.ParseBool(os.Getenv(key))
	return v
}
