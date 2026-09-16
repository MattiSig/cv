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
