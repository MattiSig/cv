---
version: 1
slug: "web-templates-pages-home-html"
primary_target: "web/templates/pages/home.html"
related_targets: ["web/templates/layouts/base.html","web/templates/pages/work.html","web/templates/pages/blog/index.html","web/templates/pages/blog/post.html","web/templates/pages/cv.html"]
---

## Scope

Whole site: landing (`/`), work (`/work`), blog index and post, CV (`/cv`), admin. Visitor mode: Read on blog and CV, Experience-lite on the landing page (the writing and the work lead; the interface recedes). Audience: peers and the dev community arriving from a shared link, often on a phone. Job: read the post, glance at what he builds, maybe open the CV. Constraints: owner-pinned "boring, monospace, dark, content and structure". Canon taken deliberately; the bar is The Monospace Web.

## Direction contract

THESIS: One character grid carries the whole site. Text is the interface; the only ornament is the rule. It refuses the portfolio arrangement of hero, three cards, and a metrics strip.

OWN-WORLD: JetBrains Mono for every glyph. Near-black ground (#121316) with warm off-white text (#e7e5df), muted grey for secondary (#8e9199), 1px rules (#2b2e34), and a single thread-gold accent (#d8a955) for links and focus, inherited quietly from Snælda. Light theme inverts to #fafaf7 / #1b1b1a with a darkened gold (#8a5f0f). Every vertical measure is a multiple of the 24px line; every horizontal measure is in `ch`. Content column 80ch. Images sit inside 1px rules, never rounded beyond 2px. No shadows, no gradients, no icons: controls are words.

STORY: The visitor sees a name, one line of what he is, three lines of what he does, then the writing and the work as dated lists. They understand this person builds plainly and well, believe it because the page is the evidence, and click a post.

FIRST VIEWPORT (desktop 1280 / mobile 390): top rule; nav line: name left, `work  blog  cv  theme` right. Below: name at 2x grid height (48px line), one-line role in muted, a 3-line intro at body size, with the founder photo (12ch square, ruled) to the right on desktop and above on mobile. Then a ruled section "writing": rows of `date  title` with Medium rows suffixed `(medium)`. Then "work": Snælda row with a ruled specimen screenshot. Primary action: the first post title.

FORM: The canon: The Monospace Web played straight, at full fidelity. Position: the standing exit, chosen by the owner in words ("keep it boring"). Seed key: none; brief-pinned direction, no roll.

SIGNATURE INTERACTION: list rows are the one motion moment. On hover or focus the row's date column turns gold and the title gains an underline, 120ms exponential ease-out; nothing else on the site animates except the theme flip, which is instant.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

CV body content is placeholder until the owner supplies the LinkedIn export. Server-side PDF is deferred; print stylesheet is the PDF path.
