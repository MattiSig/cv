package blog

import (
	"context"
	"encoding/xml"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"sort"
	"strings"
	"sync"
	"time"
)

// Feed mirrors an external RSS feed (Medium) as read-only posts that link out.
// Items are cached in memory and refreshed in the background; a failed refresh keeps the last good set.
type Feed struct {
	url    string
	source string
	client *http.Client
	log    *slog.Logger

	mu    sync.RWMutex
	posts []Post
}

// NewFeed creates a feed reader. source labels the posts (e.g. "Medium").
func NewFeed(url, source string, log *slog.Logger) *Feed {
	return &Feed{
		url:    url,
		source: source,
		client: &http.Client{Timeout: 15 * time.Second},
		log:    log,
	}
}

// Posts returns the cached items, newest first.
func (f *Feed) Posts() []Post {
	f.mu.RLock()
	defer f.mu.RUnlock()
	return append([]Post(nil), f.posts...)
}

// Refresh fetches the feed once.
func (f *Feed) Refresh(ctx context.Context) error {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, f.url, nil)
	if err != nil {
		return err
	}
	req.Header.Set("User-Agent", "mattisig.dev feed reader")
	resp, err := f.client.Do(req)
	if err != nil {
		return fmt.Errorf("feed %s: %w", f.url, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("feed %s: status %d", f.url, resp.StatusCode)
	}
	body, err := io.ReadAll(io.LimitReader(resp.Body, 4<<20))
	if err != nil {
		return err
	}
	posts, err := ParseRSS(body, f.source)
	if err != nil {
		return fmt.Errorf("feed %s: %w", f.url, err)
	}
	f.mu.Lock()
	f.posts = posts
	f.mu.Unlock()
	return nil
}

// Run refreshes immediately and then every interval until ctx is cancelled.
// Errors are logged, never fatal: the site must come up even if Medium is down.
func (f *Feed) Run(ctx context.Context, interval time.Duration) {
	refresh := func() {
		rctx, cancel := context.WithTimeout(ctx, 20*time.Second)
		defer cancel()
		if err := f.Refresh(rctx); err != nil {
			f.log.Warn("feed refresh failed", "err", err)
			return
		}
		f.log.Info("feed refreshed", "source", f.source, "items", len(f.Posts()))
	}
	refresh()
	t := time.NewTicker(interval)
	defer t.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			refresh()
		}
	}
}

type rss struct {
	Channel struct {
		Items []struct {
			Title       string   `xml:"title"`
			Link        string   `xml:"link"`
			PubDate     string   `xml:"pubDate"`
			Categories  []string `xml:"category"`
			Description string   `xml:"description"`
		} `xml:"item"`
	} `xml:"channel"`
}

// ParseRSS turns an RSS 2.0 document into external posts.
func ParseRSS(data []byte, source string) ([]Post, error) {
	var doc rss
	if err := xml.Unmarshal(data, &doc); err != nil {
		return nil, err
	}
	posts := make([]Post, 0, len(doc.Channel.Items))
	for _, it := range doc.Channel.Items {
		date, err := parsePubDate(it.PubDate)
		if err != nil {
			return nil, err
		}
		link := it.Link
		if i := strings.Index(link, "?source="); i >= 0 {
			link = link[:i] // drop Medium's tracking parameter
		}
		posts = append(posts, Post{
			Slug:     Slugify(it.Title),
			Title:    strings.TrimSpace(it.Title),
			Date:     date,
			Tags:     it.Categories,
			External: link,
			Source:   source,
		})
	}
	sort.SliceStable(posts, func(i, j int) bool { return posts[i].Date.After(posts[j].Date) })
	return posts, nil
}

func parsePubDate(s string) (time.Time, error) {
	for _, l := range []string{time.RFC1123Z, time.RFC1123, time.RFC822Z, time.RFC822, time.RFC3339} {
		if t, err := time.Parse(l, strings.TrimSpace(s)); err != nil {
			continue
		} else {
			return t, nil
		}
	}
	return time.Time{}, fmt.Errorf("pubDate %q: unrecognised format", s)
}

// Merge combines post lists newest first.
func Merge(lists ...[]Post) []Post {
	var out []Post
	for _, l := range lists {
		out = append(out, l...)
	}
	sort.SliceStable(out, func(i, j int) bool { return out[i].Date.After(out[j].Date) })
	return out
}
