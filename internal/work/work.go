// Package work models the project showcase, loaded from content/projects.yaml.
package work

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

// Project is one showcased piece of work.
type Project struct {
	Slug        string   `yaml:"slug"`
	Name        string   `yaml:"name"`
	Tagline     string   `yaml:"tagline"`
	Description string   `yaml:"description"`
	URL         string   `yaml:"url,omitempty"`
	Repo        string   `yaml:"repo,omitempty"`
	Role        string   `yaml:"role,omitempty"`
	Period      string   `yaml:"period,omitempty"`
	Stack       []string `yaml:"stack,omitempty"`
	Featured    bool     `yaml:"featured,omitempty"`
}

// Load reads the project list.
func Load(path string) ([]Project, error) {
	src, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("work: %w", err)
	}
	var doc struct {
		Projects []Project `yaml:"projects"`
	}
	if err := yaml.Unmarshal(src, &doc); err != nil {
		return nil, fmt.Errorf("work: parse %s: %w", path, err)
	}
	for i, p := range doc.Projects {
		if p.Slug == "" || p.Name == "" {
			return nil, fmt.Errorf("work: %s: project %d needs slug and name", path, i)
		}
	}
	return doc.Projects, nil
}

// Featured returns only projects flagged for the landing page.
func Featured(projects []Project) []Project {
	out := projects[:0:0]
	for _, p := range projects {
		if p.Featured {
			out = append(out, p)
		}
	}
	return out
}
