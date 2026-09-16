// Package cvpdf renders the CV as a compact A4 PDF, laid out directly rather than printed from HTML.
package cvpdf

import (
	"bytes"
	"embed"
	"fmt"
	"strings"

	"github.com/go-pdf/fpdf"

	"github.com/mattisig/cv/internal/cv"
)

//go:embed fonts/*.ttf
var fonts embed.FS

// Page geometry in millimetres; type sizes in points.
const (
	pageW, pageH = 210.0, 297.0
	marginX      = 18.0
	marginTop    = 16.0
	marginBottom = 16.0
	contentW     = pageW - 2*marginX
	dateColW     = 28.0
	colGap       = 4.0
	bodyPt       = 9.0
	smallPt      = 8.0
	namePt       = 15.0
	lead         = 4.6 // line height for body text
	sectionGap   = lead * 1.5
	entryGap     = lead * 0.6
	bulletIndent = 3.5
	fontFamily   = "JetBrainsMono"
)

var (
	ink   = rgb{0x11, 0x11, 0x11}
	muted = rgb{0x5a, 0x5a, 0x5a}
	rule  = rgb{0xb8, 0xb8, 0xb8}
)

type rgb struct{ r, g, b int }

type doc struct {
	pdf *fpdf.Fpdf
}

// Render lays out the CV and returns the PDF bytes.
func Render(c cv.CV) ([]byte, error) {
	pdf := fpdf.New("P", "mm", "A4", "")
	pdf.SetMargins(marginX, marginTop, marginX)
	pdf.SetAutoPageBreak(true, marginBottom)
	pdf.SetTitle("CV · "+c.Name, true)
	pdf.SetAuthor(c.Name, true)
	pdf.SetCreator("mattisig.dev", true)

	for _, f := range []struct{ style, file string }{{"", "Regular"}, {"B", "Bold"}, {"I", "Italic"}} {
		b, err := fonts.ReadFile("fonts/JetBrainsMono-" + f.file + ".ttf")
		if err != nil {
			return nil, fmt.Errorf("cvpdf: font: %w", err)
		}
		pdf.AddUTF8FontFromBytes(fontFamily, f.style, b)
	}

	d := &doc{pdf: pdf}
	pdf.SetFooterFunc(func() {
		pdf.SetY(-marginBottom + 4)
		d.font("", smallPt, muted)
		pdf.CellFormat(contentW, lead, fmt.Sprintf("%s · %d", c.Name, pdf.PageNo()), "", 0, "R", false, 0, "")
	})
	pdf.AddPage()

	d.header(c)
	if c.Summary != "" {
		d.section("Profile")
		d.font("", bodyPt, ink)
		pdf.MultiCell(contentW, lead, c.Summary, "", "L", false)
	}
	if len(c.Experience) > 0 {
		d.section("Experience")
		for i, e := range c.Experience {
			if i > 0 {
				pdf.Ln(entryGap)
			}
			d.experience(e)
		}
	}
	if len(c.Education) > 0 {
		d.section("Education")
		for i, e := range c.Education {
			if i > 0 {
				pdf.Ln(entryGap)
			}
			d.education(e)
		}
	}
	if len(c.Skills) > 0 {
		d.section("Skills")
		for _, s := range c.Skills {
			d.row(s.Label, func(x, w float64) {
				d.font("", bodyPt, ink)
				pdf.SetX(x)
				pdf.MultiCell(w, lead, strings.Join(s.Items, ", "), "", "L", false)
			})
		}
	}
	if len(c.Awards) > 0 {
		d.section("Awards")
		for i, a := range c.Awards {
			if i > 0 {
				pdf.Ln(entryGap)
			}
			d.row(a.Year, func(x, w float64) {
				d.font("B", bodyPt, ink)
				pdf.SetX(x)
				pdf.MultiCell(w, lead, a.Title, "", "L", false)
				if a.Notes != "" {
					d.font("", bodyPt, muted)
					pdf.SetX(x)
					pdf.MultiCell(w, lead, a.Notes, "", "L", false)
				}
			})
		}
	}

	var buf bytes.Buffer
	if err := pdf.Output(&buf); err != nil {
		return nil, fmt.Errorf("cvpdf: %w", err)
	}
	return buf.Bytes(), nil
}

func (d *doc) font(style string, size float64, c rgb) {
	d.pdf.SetFont(fontFamily, style, size)
	d.pdf.SetTextColor(c.r, c.g, c.b)
}

func (d *doc) header(c cv.CV) {
	pdf := d.pdf
	d.font("B", namePt, ink)
	pdf.CellFormat(contentW, lead*1.8, c.Name, "", 1, "L", false, 0, "")
	d.font("", bodyPt, muted)
	pdf.CellFormat(contentW, lead, c.Title, "", 1, "L", false, 0, "")
	pdf.Ln(lead * 0.5)

	// Contact line: plain text with clickable links, wrapping by piece.
	d.font("", bodyPt, ink)
	type piece struct{ text, link string }
	var pieces []piece
	if c.Location != "" {
		pieces = append(pieces, piece{c.Location, ""})
	}
	if c.Email != "" {
		pieces = append(pieces, piece{c.Email, "mailto:" + c.Email})
	}
	if c.Website != "" {
		pieces = append(pieces, piece{trimScheme(c.Website), c.Website})
	}
	for _, l := range c.Links {
		pieces = append(pieces, piece{trimScheme(l.URL), l.URL})
	}
	x := marginX
	sep := " · "
	sepW := pdf.GetStringWidth(sep)
	for i, p := range pieces {
		w := pdf.GetStringWidth(p.text)
		if i > 0 {
			if x+sepW+w > marginX+contentW {
				pdf.Ln(lead)
				x = marginX
			} else {
				pdf.SetTextColor(muted.r, muted.g, muted.b)
				pdf.CellFormat(sepW, lead, sep, "", 0, "L", false, 0, "")
				x += sepW
			}
		}
		pdf.SetTextColor(ink.r, ink.g, ink.b)
		pdf.CellFormat(w, lead, p.text, "", 0, "L", false, 0, p.link)
		x += w
	}
	pdf.Ln(lead)
	pdf.Ln(lead * 0.6)
	d.rule()
}

func (d *doc) rule() {
	pdf := d.pdf
	pdf.SetDrawColor(rule.r, rule.g, rule.b)
	pdf.SetLineWidth(0.2)
	y := pdf.GetY()
	pdf.Line(marginX, y, marginX+contentW, y)
}

// section prints a heading and keeps it with at least three lines of what follows.
func (d *doc) section(title string) {
	pdf := d.pdf
	pdf.Ln(sectionGap)
	d.ensure(lead * 4)
	d.font("B", bodyPt, ink)
	pdf.CellFormat(contentW, lead, strings.ToUpper(title), "", 1, "L", false, 0, "")
	pdf.Ln(lead * 0.4)
}

// ensure starts a new page when fewer than h millimetres remain.
func (d *doc) ensure(h float64) {
	if d.pdf.GetY()+h > pageH-marginBottom {
		d.pdf.AddPage()
	}
}

// row prints a muted label in the date column and calls body for the content column.
func (d *doc) row(label string, body func(x, w float64)) {
	pdf := d.pdf
	y := pdf.GetY()
	d.font("", bodyPt, muted)
	pdf.SetXY(marginX, y)
	pdf.CellFormat(dateColW, lead, label, "", 0, "L", false, 0, "")
	pdf.SetXY(marginX+dateColW+colGap, y)
	body(marginX+dateColW+colGap, contentW-dateColW-colGap)
}

func (d *doc) experience(e cv.Experience) {
	pdf := d.pdf
	x, w := marginX+dateColW+colGap, contentW-dateColW-colGap
	d.ensure(d.experienceHeight(e, w))
	d.row(dateRange(e.Start, e.End), func(x, w float64) {
		d.font("B", bodyPt, ink)
		pdf.SetX(x)
		pdf.MultiCell(w, lead, e.Role, "", "L", false)
		d.font("", bodyPt, muted)
		pdf.SetX(x)
		where := e.Company
		if e.Location != "" {
			where += ", " + e.Location
		}
		pdf.MultiCell(w, lead, where, "", "L", false)
		if e.Summary != "" {
			d.font("", bodyPt, ink)
			pdf.SetX(x)
			pdf.MultiCell(w, lead, e.Summary, "", "L", false)
		}
		for _, h := range e.Highlights {
			d.bullet(x, w, h)
		}
		if len(e.Stack) > 0 {
			d.font("", smallPt, muted)
			pdf.SetX(x)
			pdf.MultiCell(w, lead, strings.Join(e.Stack, " · "), "", "L", false)
		}
	})
	_ = x
}

func (d *doc) education(e cv.Education) {
	pdf := d.pdf
	d.ensure(lead * 3)
	d.row(dateRange(e.Start, e.End), func(x, w float64) {
		d.font("B", bodyPt, ink)
		pdf.SetX(x)
		pdf.MultiCell(w, lead, e.Degree, "", "L", false)
		d.font("", bodyPt, muted)
		pdf.SetX(x)
		pdf.MultiCell(w, lead, e.School, "", "L", false)
		if e.Notes != "" {
			d.font("", bodyPt, ink)
			pdf.SetX(x)
			pdf.MultiCell(w, lead, e.Notes, "", "L", false)
		}
	})
}

func (d *doc) bullet(x, w float64, text string) {
	pdf := d.pdf
	d.font("", bodyPt, muted)
	pdf.SetX(x)
	pdf.CellFormat(bulletIndent, lead, "–", "", 0, "L", false, 0, "")
	d.font("", bodyPt, ink)
	pdf.SetX(x + bulletIndent)
	pdf.MultiCell(w-bulletIndent, lead, text, "", "L", false)
}

// experienceHeight estimates an entry's height so it can be kept on one page.
func (d *doc) experienceHeight(e cv.Experience, w float64) float64 {
	pdf := d.pdf
	lines := 0
	d.font("B", bodyPt, ink)
	lines += len(pdf.SplitText(e.Role, w))
	d.font("", bodyPt, ink)
	lines += len(pdf.SplitText(e.Company+", "+e.Location, w))
	if e.Summary != "" {
		lines += len(pdf.SplitText(e.Summary, w))
	}
	for _, h := range e.Highlights {
		lines += len(pdf.SplitText(h, w-bulletIndent))
	}
	if len(e.Stack) > 0 {
		lines++
	}
	return float64(lines) * lead
}

func dateRange(start, end string) string {
	if end == "" {
		end = "now"
	}
	return start + " – " + end
}

func trimScheme(u string) string {
	u = strings.TrimPrefix(strings.TrimPrefix(u, "https://"), "http://")
	return strings.TrimSuffix(u, "/")
}
