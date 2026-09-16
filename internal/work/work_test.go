package work

import "testing"

func TestImageLines(t *testing.T) {
	cases := []struct{ w, h, want int }{{1200, 750, 15}, {1200, 630, 13}, {0, 0, 15}}
	for _, c := range cases {
		if got := (Project{ImageWidth: c.w, ImageHeight: c.h}).ImageLines(); got != c.want {
			t.Errorf("%dx%d: got %d lines, want %d", c.w, c.h, got, c.want)
		}
	}
}

func TestSort(t *testing.T) {
	ps := []Project{
		{Slug: "b", Period: "2024"},
		{Slug: "e"},
		{Slug: "c", Period: "2023"},
		{Slug: "d", Period: "2026"},
		{Slug: "a", Period: "2026 – now"},
		{Slug: "f", Period: "2019"},
	}
	Sort(ps)
	got := ""
	for _, p := range ps {
		got += p.Slug
	}
	if got != "adbcfe" {
		t.Fatalf("order %q, want %q", got, "adbcfe")
	}
}
