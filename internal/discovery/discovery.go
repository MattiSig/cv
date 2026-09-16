// Package discovery renders the machine-readable surfaces: sitemap, RSS feed, robots.txt, llms.txt.
package discovery

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"strings"
	"time"

	"github.com/mattisig/cv/internal/blog"
	"github.com/mattisig/cv/internal/cv"
	"github.com/mattisig/cv/internal/work"
)

// Site is what every surface needs to know.
type Site struct {
	Name string
	URL  string // absolute, no trailing slash
}

func (s Site) abs(path string) string { return strings.TrimSuffix(s.URL, "/") + path }

type urlset struct {
	XMLName xml.Name `xml:"urlset"`
	XMLNS   string   `xml:"xmlns,attr"`
	URLs    []sitemapURL
}

type sitemapURL struct {
	XMLName xml.Name `xml:"url"`
	Loc     string   `xml:"loc"`
	LastMod string   `xml:"lastmod,omitempty"`
}

// Sitemap lists the public pages and every published local post.
func Sitemap(s Site, posts []blog.Post) ([]byte, error) {
	set := urlset{XMLNS: "http://www.sitemaps.org/schemas/sitemap/0.9"}
	var latest time.Time
	for _, p := range posts {
		if p.External == "" && p.Date.After(latest) {
			latest = p.Date
		}
	}
	lastmod := ""
	if !latest.IsZero() {
		lastmod = latest.Format("2006-01-02")
	}
	for _, path := range []string{"/", "/blog"} {
		set.URLs = append(set.URLs, sitemapURL{Loc: s.abs(path), LastMod: lastmod})
	}
	for _, path := range []string{"/work", "/cv"} {
		set.URLs = append(set.URLs, sitemapURL{Loc: s.abs(path)})
	}
	for _, p := range posts {
		if p.External != "" {
			continue
		}
		set.URLs = append(set.URLs, sitemapURL{Loc: s.abs("/blog/" + p.Slug), LastMod: p.Date.Format("2006-01-02")})
	}
	return marshalXML(set)
}

type rss struct {
	XMLName xml.Name `xml:"rss"`
	Version string   `xml:"version,attr"`
	Atom    string   `xml:"xmlns:atom,attr"`
	Channel channel  `xml:"channel"`
}

type channel struct {
	Title         string    `xml:"title"`
	Link          string    `xml:"link"`
	Description   string    `xml:"description"`
	Language      string    `xml:"language"`
	LastBuildDate string    `xml:"lastBuildDate,omitempty"`
	AtomLink      atomLink  `xml:"atom:link"`
	Items         []rssItem `xml:"item"`
}

type atomLink struct {
	Href string `xml:"href,attr"`
	Rel  string `xml:"rel,attr"`
	Type string `xml:"type,attr"`
}

type rssItem struct {
	Title       string   `xml:"title"`
	Link        string   `xml:"link"`
	GUID        rssGUID  `xml:"guid"`
	PubDate     string   `xml:"pubDate"`
	Description string   `xml:"description,omitempty"`
	Categories  []string `xml:"category,omitempty"`
	Content     *cdata   `xml:"content:encoded,omitempty"`
}

type rssGUID struct {
	IsPermaLink bool   `xml:"isPermaLink,attr"`
	Value       string `xml:",chardata"`
}

type cdata struct {
	Value string `xml:",cdata"`
}

// Feed renders an RSS 2.0 feed of all listed posts, newest first. External posts link out.
func Feed(s Site, posts []blog.Post) ([]byte, error) {
	f := rss{
		Version: "2.0",
		Atom:    "http://www.w3.org/2005/Atom",
		Channel: channel{
			Title:       s.Name + " · Writing",
			Link:        s.abs("/blog"),
			Description: "Notes on building software, teams, and products.",
			Language:    "en",
			AtomLink:    atomLink{Href: s.abs("/feed.xml"), Rel: "self", Type: "application/rss+xml"},
		},
	}
	if len(posts) > 0 {
		f.Channel.LastBuildDate = posts[0].Date.Format(time.RFC1123Z)
	}
	for _, p := range posts {
		item := rssItem{
			Title:       p.Title,
			Link:        p.URL(),
			GUID:        rssGUID{IsPermaLink: true, Value: p.URL()},
			PubDate:     p.Date.Format(time.RFC1123Z),
			Description: p.Summary,
			Categories:  p.Tags,
		}
		if p.External == "" {
			item.Link = s.abs(p.URL())
			item.GUID.Value = item.Link
			if p.HTML != "" {
				item.Content = &cdata{Value: string(p.HTML)}
			}
		}
		f.Channel.Items = append(f.Channel.Items, item)
	}
	out, err := marshalXML(f)
	if err != nil {
		return nil, err
	}
	// encoding/xml cannot declare the content namespace on a prefixed element; add it to <rss>.
	return bytes.Replace(out, []byte(`<rss version="2.0"`), []byte(`<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/"`), 1), nil
}

// Robots allows everyone, including answer-engine crawlers, except the admin area.
func Robots(s Site) []byte {
	var b strings.Builder
	b.WriteString("User-agent: *\nDisallow: /admin/\n\n")
	for _, bot := range []string{"GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-User", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot", "Bytespider"} {
		fmt.Fprintf(&b, "User-agent: %s\nAllow: /\nDisallow: /admin/\n\n", bot)
	}
	fmt.Fprintf(&b, "Sitemap: %s\n", s.abs("/sitemap.xml"))
	return []byte(b.String())
}

// LLMs renders llms.txt: a plain Markdown summary for answer engines and agents.
func LLMs(s Site, c cv.CV, projects []work.Project, posts []blog.Post) []byte {
	var b strings.Builder
	fmt.Fprintf(&b, "# %s\n\n", c.Name)
	fmt.Fprintf(&b, "> %s. %s\n\n", c.Title, c.Summary)
	fmt.Fprintf(&b, "Personal site of %s: writing, work, and CV. Location: %s. Email: %s.\n\n", c.Name, c.Location, c.Email)
	b.WriteString("## Pages\n\n")
	fmt.Fprintf(&b, "- [Home](%s): who I am and the latest writing and work\n", s.abs("/"))
	fmt.Fprintf(&b, "- [Writing](%s): blog posts; RSS at %s\n", s.abs("/blog"), s.abs("/feed.xml"))
	fmt.Fprintf(&b, "- [Work](%s): projects I built or lead\n", s.abs("/work"))
	fmt.Fprintf(&b, "- [CV](%s): experience, education, skills; PDF at %s\n\n", s.abs("/cv"), s.abs("/cv.pdf"))
	if len(c.Experience) > 0 {
		b.WriteString("## Experience\n\n")
		for _, e := range c.Experience {
			end := e.End
			if end == "" {
				end = "now"
			}
			fmt.Fprintf(&b, "- %s – %s: %s, %s. %s\n", e.Start, end, e.Role, e.Company, e.Summary)
		}
		b.WriteString("\n")
	}
	if len(projects) > 0 {
		b.WriteString("## Work\n\n")
		for _, p := range projects {
			link := p.URL
			if link == "" {
				link = s.abs("/work#" + p.Slug)
			}
			fmt.Fprintf(&b, "- [%s](%s): %s", p.Name, link, p.Tagline)
			if p.Period != "" {
				fmt.Fprintf(&b, " (%s)", p.Period)
			}
			b.WriteString("\n")
		}
		b.WriteString("\n")
	}
	if len(posts) > 0 {
		b.WriteString("## Writing\n\n")
		for _, p := range posts {
			link := p.URL()
			if p.External == "" {
				link = s.abs(link)
			}
			fmt.Fprintf(&b, "- [%s](%s), %s", p.Title, link, p.Date.Format("2006-01-02"))
			if p.Source != "" {
				fmt.Fprintf(&b, ", on %s", p.Source)
			}
			b.WriteString("\n")
		}
		b.WriteString("\n")
	}
	if len(c.Links) > 0 {
		b.WriteString("## Elsewhere\n\n")
		for _, l := range c.Links {
			fmt.Fprintf(&b, "- [%s](%s)\n", l.Label, l.URL)
		}
	}
	return []byte(b.String())
}

func marshalXML(v any) ([]byte, error) {
	out, err := xml.MarshalIndent(v, "", "  ")
	if err != nil {
		return nil, err
	}
	return append([]byte(xml.Header), out...), nil
}
