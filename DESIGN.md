---
name: mattisig
description: One character grid, one gold thread. The Monospace Web played straight.
colors:
  ground: "#121316"
  ink: "#e7e5df"
  muted: "#8e9199"
  rule: "#2b2e34"
  gold: "#d8a955"
  ground-light: "#fafaf7"
  ink-light: "#1b1b1a"
  muted-light: "#5f6167"
  rule-light: "#d9d7d0"
  gold-light: "#8a5f0f"
typography:
  display:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: "48px"
    letterSpacing: "-0.01em"
  title:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "48px"
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: "24px"
  body:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "24px"
    fontFeature: "tabular-nums"
rounded:
  none: "0"
  code: "2px"
spacing:
  half: "12px"
  line: "24px"
  ch: "1ch"
components:
  link:
    textColor: "{colors.gold}"
  nav-link:
    textColor: "{colors.ink}"
  row-date:
    textColor: "{colors.muted}"
    width: "12ch"
  row-date-hover:
    textColor: "{colors.gold}"
  button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 2ch"
    height: "36px"
  button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "0 2ch"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ground}"
  field:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1ch"
    height: "36px"
  frame:
    rounded: "{rounded.none}"
---

# Design System: mattisig

## Overview

**Creative North Star: "Keep It Boring"**

The site is a single character grid. Text is the interface; the only ornament is the 1px rule. JetBrains Mono sets every glyph, at one body size, on a 24px line that every vertical measure is a multiple of. Horizontal measures are counted in characters. The page reads like a well-kept plain-text file that happens to be served over HTTP, and that plainness is the argument: the build is the portfolio.

The canon is The Monospace Web, taken deliberately and at full fidelity. There is no hero, no card trio, no metrics strip. Content is arranged as dated rows (`date  title`), separated by rules, with a single thread-gold accent reserved for content links, focus, and the row hover. Dark is the default; light is an explicit choice that flips the token set and nothing else.

**Key Characteristics:**
- One typeface (JetBrains Mono), one body size (15px), one line height (24px)
- Vertical rhythm in 24px lines; horizontal rhythm in `ch`
- Near-black ground, warm off-white ink, muted grey, 1px rules, one gold
- Rules instead of ornament: no shadows, no gradients, no icons, no radius (except 2px on inline code)
- One motion moment (dated rows); the theme flip is instant
- Controls are words, in lowercase

## Colors

Two token sets, six roles each; the dark set is the default and the light set overrides it under `.light`.

### Primary
- **Thread Gold** (`gold`): the only accent. Content links, focus outlines (1px, offset 2px), text selection background, input caret, the row-date on hover, and the primary button's hover fill. In the light set it darkens to a burnt gold (`gold-light`) so it still passes on paper-white.

### Neutral
- **Ground** (`ground` / `ground-light`): page and field background. Nothing else sits on it; there are no elevated surfaces.
- **Ink** (`ink` / `ink-light`): body text, headings, nav links, button borders. Also the fill of the primary button and of any button on hover (text inverts to Ground).
- **Muted** (`muted` / `muted-light`): secondary text. Row dates, roles after a `·`, taglines, summaries, timestamps, tags, form labels, the footer, list markers, and the theme toggle at rest.
- **Rule** (`rule` / `rule-light`): every border. Section dividers, header and footer rules, image frames, field borders, code-block and blockquote rules, table borders, and the scrollbar thumb.

### Named Rules
**The One Gold Rule.** Gold means "you can follow this". It appears on content links, focus, and the hovered row, and nowhere else. Nav links are Ink, not Gold; their current page is marked by an underline whose colour is Gold, not by gold text.

**The Six Tokens Rule.** Every colour on the site is one of the six roles. Tints are made by mixing a token with transparent (`color-mix`), never by introducing a new hex: the link underline at rest is Gold at 45%, inline code background is Ink at 8%.

## Typography

**Display Font:** JetBrains Mono (self-hosted woff2; fallback ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)
**Body Font:** JetBrains Mono
**Label/Mono Font:** same; `--font-sans` aliases `--font-mono` so no utility can reach a proportional face

**Character:** One monospace face at four weights (400, 400 italic, 500, 700, 700 italic). Tabular numerals are on globally so dates and years align in their column. Antialiased. The scale is deliberately shallow: two large sizes for page names, and everything else at body size with weight doing the work.

### Hierarchy
- **Display** (700, 32px, 48px line, -0.01em): the person's name on the home page and CV header. Occupies exactly two grid lines. Drops to 24px on the same 48px line under 40rem.
- **Title** (700, 24px, 48px line, -0.01em): page and post titles (Work, Writing, post h1, error message, admin). Two grid lines. Drops to 20px under 40rem.
- **Heading** (700, 15px, 24px line): every h1–h3 outside the two roles above, section headings ("Writing", "Work", "Profile", "Experience"), and row headings. Same size as body; bold is the whole hierarchy. Article `h1` inside prose is the one exception at 1.3rem.
- **Body** (400, 15px, 24px line): everything else. Measure is capped at 64ch for paragraphs; the column is 80ch.
- **Secondary** (400, 15px, Muted colour): not a size, a colour. Dates, roles, taglines, tags, labels.

### Named Rules
**The One Size Rule.** Below Display and Title there is one size. Emphasis is weight (700) or colour (Muted), never a smaller or larger font. No uppercase, no letter-spaced labels, no kickers.

**The Two-Line Rule.** Large type sits on a 48px line, exactly two grid lines, so a Display or Title never breaks the rhythm of what follows.

## Layout

The grid is the whole layout system. Vertical: `--line` is 24px and every margin, padding, and fixed height is `var(--line)` times an integer (or `--half`, 12px, for the nav's inner padding only). Horizontal: widths, gaps, and paddings are in `ch`, so they track the character cell.

- **Container:** `max-w-[84ch]`, centred, `px-[2ch]`, giving an 80ch content column. Header, main, and footer share the same container so the rules and text align edge to edge.
- **Page top:** content begins one line below the header rule (`pt-line`), two lines on the home page.
- **Section rhythm:** sections are separated by two lines of space, a 1px top rule, then one line (`mt-[calc(var(--line)*2)] border-t pt-line`). Rows inside a section are one line apart.
- **The Row:** a two-column grid, `12ch` date column, `2ch` gap, `1fr` content. Used for posts, projects, experience, education, skills, and awards. Under 40rem it collapses to one column with the date above the title.
- **Home split:** intro text `1fr`, portrait `16ch` at `≥40rem` with `4ch` between; portrait stacks above on mobile.
- **Paragraph measure:** `max-w-[64ch]` on summaries and descriptions.
- **Breakpoint:** one, at 40rem (Tailwind `sm`; the same value in the component media queries). Nothing changes above it.
- **Footer:** one line of padding, muted, split left/right, wrapping without vertical gap on narrow screens.

**The Literal Grid Rule.** Vertical values are written as `var(--line)` multiples in the source (`mt-line`, `calc(var(--line)*2)`, `h-[calc(var(--line)*19)]`), never as ad-hoc pixel or rem values. If a measurement is not a whole number of lines, it is off-grid and wrong.

## Elevation & Depth

Flat. There are no shadows, no tonal layering, and no elevated surfaces; every element sits on the same Ground. Depth is conveyed only by the 1px Rule: a rule above a section, a rule around an image, a rule around a field or code block. Hover on a button inverts fill and text rather than lifting anything.

**The Rule-Only Rule.** If something needs to read as separate from its surroundings, it gets a 1px border in the Rule colour. It does not get a shadow, a background tint, or a blur.

## Shapes

Square. `border-radius` is 0 everywhere, including buttons, fields, images, and code blocks (the prose code block explicitly resets the typography plugin's radius to 0). The single exception is inline code in article bodies, which carries a 2px radius on its 8% Ink tint. Borders are always 1px. Images are `display: block`, cropped with `object-cover` to heights that are line multiples, and sit inside a 1px Rule frame.

## Components

Everything is built from a small set of classes in `web/css/app.css`; page templates compose them with grid utilities and never introduce new visual treatments.

### Links
- **Content link** (`.link`): Gold text, 1px underline offset 3px, underline colour Gold at 45%. Hover: underline goes to full Gold. No transition. Used for every in-content link, "All writing", "source", email, the print button's textual siblings.
- **Nav link** (`.nav-link`): Ink text, no underline. Hover and current page: 1px underline offset 3px; the current page's underline is Gold. The theme toggle is a `.nav-link` button in Muted that returns to Ink on hover.
- **Prose links**: inherit the Gold role via the typography plugin's link token with the same 1px / 3px underline geometry.

### Dated Row (signature component)
- **Structure:** `a.row` (or `div.row` / `li.row` where not a link) with `.row-date` and `.row-title`. `12ch` date column in Muted, `2ch` gap, content column in Ink.
- **Hover / Focus (anchor rows only):** the date turns Gold and the title's transparent underline turns Gold, both over 120ms with `cubic-bezier(0.16, 1, 0.3, 1)`. This is the only animated element on the site.
- **Suffixes:** external source in Muted parentheses after the title, e.g. `(medium)`; roles after a Muted `·`.
- **Mobile:** single column, date above title, one line of space between rows.

### Buttons
- **Shape:** square, 1px border, `36px` tall (1.5 lines), `2ch` horizontal padding, inline-flex, no underline.
- **Default** (`.btn`): transparent fill, Ink border and text. Hover: Ink fill, Ground text. Used for "print" on the CV.
- **Primary** (`.btn-primary`): Ink fill, Ground text. Hover: Gold fill and border, Ground text. Used for "save" in the admin.
- **Labels:** lowercase words. No icons.
- **Text-only actions** (delete, "all posts") are `.link`, not buttons.

### Inputs / Fields
- **Style** (`.field`): full width, `36px` tall, `1ch` horizontal padding, 1px Rule border, Ground background, Ink text, 24px line. Labels are Muted text on the line above.
- **Focus:** border turns Gold; outline removed (the border is the ring).
- **Textarea:** auto height, vertical resize only.
- **Checkbox:** native, `accent-color` Gold, `1.2ch` square.

### Frame (images)
- **Style** (`.frame`): 1px Rule border, no radius, block display, `object-cover`.
- **Portrait:** 6 lines tall (144px); 6 lines square on mobile, `16ch` wide on desktop, cropped top.
- **Specimen:** full column width, 19 lines tall (456px) on desktop, 8:5 aspect on mobile, cropped from the top. Wrapped in a link on the home page.
- **Prose images:** same 1px frame, one line of margin above.

### Navigation
- Header is a full-width 1px bottom Rule; inside it, the container holds the wordmark (`mattisig`, bold, Ink) left and the nav list right with `2ch` gaps (`3ch` at `≥40rem`), padded `12px` vertically so the bar is exactly two lines tall. Items: Work, Blog, CV, then the theme toggle in Muted. Current page is underlined in Gold via `aria-current="page"`. No mobile menu; the four words fit at 390px.

### Prose (article body)
- Typography plugin retinted to the six tokens, `max-width: none` so the column rule applies. Block elements get one line above and none below; headings get two lines above and stay at body size and bold. Code blocks: 1px Rule border, no radius, `2ch` horizontal padding, vertical padding trimmed by 1px so the border stays on-grid. Blockquotes: 1px left Rule, `2ch` padding, upright text, no quotation marks. Lists indent `4ch` with Muted markers.

### Theme and print mechanics
- Dark is `:root`. `html.light` overrides the six tokens and `color-scheme`. A blocking inline script adds `.light` before first paint if `localStorage.theme === "light"`; `app.js` toggles the class, writes the choice, and relabels the button ("light mode" / "dark mode"). The flip has no transition.
- `@media print` sets its own paper palette (white ground, `#111` ink, `#555` muted, `#bbb` rule, black accent), 10.5pt body, 16mm page margins, hides `.print-hidden` (header, footer, print bar), strips link colour and underline, and prints each external CV link's `href` after it in Muted.

## Do's and Don'ts

### Do:
- **Do** write every vertical measure as a multiple of `var(--line)` and every horizontal measure in `ch`.
- **Do** reserve Gold for links, focus, and the row hover. Use Ink and Muted for everything else.
- **Do** add new list-like content as a `.row` with a `12ch` date column, so it inherits the one hover.
- **Do** frame every raster in a 1px Rule and give it a height that is a whole number of lines.
- **Do** keep controls as lowercase words (`print`, `save`, `light mode`).
- **Do** keep headings at body size and bold; use Display or Title only for the page's own name.

### Don't:
- **Don't** add shadows, gradients, background tints, or blur; the Rule is the only separator.
- **Don't** round corners. The 2px on inline code is the one exception and stays there.
- **Don't** introduce icons, glyphs, or an icon font; nav, buttons, and links are text.
- **Don't** add a second font size below Title, a second typeface, uppercase labels, or letter-spaced kickers.
- **Don't** animate anything other than `.row-date` colour and `.row-title` underline; the theme flip stays instant.
- **Don't** use raw pixel or rem spacing utilities (`mt-4`, `p-6`); use `mt-line`, `pt-line`, `py-half`, and `calc(var(--line)*n)`.
