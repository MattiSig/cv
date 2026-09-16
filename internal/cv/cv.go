// Package cv models the résumé, loaded from content/cv.yaml.
package cv

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

// CV is the whole résumé.
type CV struct {
	Name     string `yaml:"name"`
	Title    string `yaml:"title"`
	Summary  string `yaml:"summary"`
	Location string `yaml:"location"`
	Email    string `yaml:"email"`
	Website  string `yaml:"website"`
	Links    []Link `yaml:"links"`

	Experience []Experience `yaml:"experience"`
	Education  []Education  `yaml:"education"`
	Skills     []SkillGroup `yaml:"skills"`
	Awards     []Award      `yaml:"awards"`
}

// Link is an external profile (GitHub, LinkedIn, ...).
type Link struct {
	Label string `yaml:"label"`
	URL   string `yaml:"url"`
}

// Experience is one role.
type Experience struct {
	Company    string   `yaml:"company"`
	Role       string   `yaml:"role"`
	Location   string   `yaml:"location,omitempty"`
	Start      string   `yaml:"start"`
	End        string   `yaml:"end,omitempty"` // empty means present
	Summary    string   `yaml:"summary,omitempty"`
	Highlights []string `yaml:"highlights,omitempty"`
	Stack      []string `yaml:"stack,omitempty"`
}

// Education is one degree or programme.
type Education struct {
	School string `yaml:"school"`
	Degree string `yaml:"degree"`
	Start  string `yaml:"start"`
	End    string `yaml:"end,omitempty"`
	Notes  string `yaml:"notes,omitempty"`
}

// SkillGroup is a labelled cluster of skills.
type SkillGroup struct {
	Label string   `yaml:"label"`
	Items []string `yaml:"items"`
}

// Award is a prize or recognition.
type Award struct {
	Title string `yaml:"title"`
	Year  string `yaml:"year"`
	Notes string `yaml:"notes,omitempty"`
}

// Load reads and validates a CV file.
func Load(path string) (CV, error) {
	var c CV
	src, err := os.ReadFile(path)
	if err != nil {
		return c, fmt.Errorf("cv: %w", err)
	}
	if err := yaml.Unmarshal(src, &c); err != nil {
		return c, fmt.Errorf("cv: parse %s: %w", path, err)
	}
	if c.Name == "" {
		return c, fmt.Errorf("cv: %s: name is required", path)
	}
	return c, nil
}
