package blog

import "testing"

const sampleRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel><title>Stories by X on Medium</title>
<item>
  <title><![CDATA[Older post]]></title>
  <link>https://medium.com/p/older?source=rss-abc------2</link>
  <category><![CDATA[go]]></category>
  <pubDate>Sun, 11 Aug 2024 10:00:00 GMT</pubDate>
</item>
<item>
  <title><![CDATA[Newer post]]></title>
  <link>https://medium.com/p/newer?source=rss-abc------2</link>
  <category><![CDATA[nodejs]]></category><category><![CDATA[backend]]></category>
  <pubDate>Sun, 25 Aug 2024 10:00:00 GMT</pubDate>
</item>
</channel></rss>`

func TestParseRSS(t *testing.T) {
	posts, err := ParseRSS([]byte(sampleRSS), "Medium")
	if err != nil {
		t.Fatal(err)
	}
	if len(posts) != 2 {
		t.Fatalf("want 2 posts, got %d", len(posts))
	}
	if posts[0].Title != "Newer post" {
		t.Errorf("not sorted newest first: %v", posts[0].Title)
	}
	if posts[0].External != "https://medium.com/p/newer" {
		t.Errorf("tracking param not stripped: %s", posts[0].External)
	}
	if posts[0].URL() != posts[0].External || posts[0].Source != "Medium" {
		t.Errorf("external post should link out: %+v", posts[0])
	}
	if len(posts[0].Tags) != 2 {
		t.Errorf("tags: %v", posts[0].Tags)
	}
	if (Post{Slug: "local"}).URL() != "/blog/local" {
		t.Error("local post URL")
	}
}

func TestMerge(t *testing.T) {
	a, _ := ParseRSS([]byte(sampleRSS), "Medium")
	local := []Post{{Slug: "l", Title: "Local", Date: a[0].Date.AddDate(0, 0, 1)}}
	m := Merge(local, a)
	if len(m) != 3 || m[0].Slug != "l" || m[2].Title != "Older post" {
		t.Errorf("merge order: %v", m)
	}
}
