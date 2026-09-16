// Package work models the project showcase, loaded from content/projects.yaml.
package work

import (
	"fmt"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"

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
	// Image is a static path to a screenshot; ImageAlt describes it. Width and Height are the
	// raster's pixel size (default 1200x750) so the template can keep its aspect on narrow screens.
	Image       string `yaml:"image,omitempty"`
	ImageAlt    string `yaml:"image_alt,omitempty"`
	ImageWidth  int    `yaml:"image_width,omitempty"`
	ImageHeight int    `yaml:"image_height,omitempty"`
}

// Width of the row's content column in px (80ch minus the 12ch date column and 2ch gap, at 9px
// per cell) and the line unit; must match web/css/app.css.
const (
	columnPx = 594
	linePx   = 24
)

// ImageLines is the image height in grid lines when shown at the row's content width,
// so rasters end on the line grid.
func (p Project) ImageLines() int {
	w, h := p.ImageWidth, p.ImageHeight
	if w <= 0 || h <= 0 {
		w, h = 1200, 750
	}
	return int(float64(columnPx)*float64(h)/float64(w)/linePx + 0.5)
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
	for i := range doc.Projects {
		p := &doc.Projects[i]
		if p.Slug == "" || p.Name == "" {
			return nil, fmt.Errorf("work: %s: project %d needs slug and name", path, i)
		}
		if p.ImageWidth == 0 {
			p.ImageWidth = 1200
		}
		if p.ImageHeight == 0 {
			p.ImageHeight = 750
		}
	}
	Sort(doc.Projects)
	return doc.Projects, nil
}

var yearRe = regexp.MustCompile(`\d{4}`)

// StartYear parses the first four-digit year in Period; zero when absent.
func (p Project) StartYear() int {
	y, _ := strconv.Atoi(yearRe.FindString(p.Period))
	return y
}

// Ongoing reports whether Period ends in "now" or "present".
func (p Project) Ongoing() bool {
	s := strings.ToLower(p.Period)
	return strings.HasSuffix(s, "now") || strings.HasSuffix(s, "present")
}

// Sort orders projects newest first: ongoing before finished within a year,
// undated last, file order otherwise.
func Sort(projects []Project) {
	sort.SliceStable(projects, func(i, j int) bool {
		a, b := projects[i], projects[j]
		if a.StartYear() != b.StartYear() {
			return a.StartYear() > b.StartYear()
		}
		return a.Ongoing() && !b.Ongoing()
	})
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
