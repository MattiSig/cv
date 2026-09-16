# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: peers and the wider developer community. Engineers, engineering leaders, and founders, largely in the Nordic and Go ecosystems, who arrive from a shared post link, GitHub, or LinkedIn to read Matthías's writing and follow what he builds.

Secondary, confirmed as not the main audience: hiring managers, recruiters, and potential collaborators who land on the CV or work page. They must still find a credible, current CV and a clear picture of the work.

## Product Purpose

The personal site of Matthías Sigurbjörnsson: landing page, work showcase, blog, and CV.

Success means a visitor reads a post through, looks at Snælda or another project, and leaves with a clear picture of a hands-on engineering leader who ships. The CV must read well on screen and print cleanly to PDF.

## Positioning

Hands-on engineering leader: a CTO / head-of-engineering who still writes production code. The site itself is the proof. It is one Go binary serving `html/template` pages, with no JavaScript framework, built with the same taste applied to the products he leads. Go advocacy is a stated conviction, not a slogan.

## Operating Context

- Visitors mostly arrive from a shared link, often on mobile.
- The owner writes posts in Markdown through the admin editor at `/admin` (HTTP basic auth) or by dropping `.md` files into the posts directory.
- The CV is consumed two ways: on screen, and printed or saved to PDF through the browser print dialog.
- Hosted on Railway (Moss workspace) as a distroless container. Local development is `make dev` at http://localhost:8080.

## Capabilities and Constraints

- Stack, decided by the owner: Go server with `html/template`, Tailwind CSS v4 via the standalone CLI, Markdown rendered by goldmark, YAML content files. No JS framework; the only client script handles the theme toggle and the print button.
- Dark mode is required. It is a class toggle seeded from the system preference.
- Content sources: `content/cv.yaml`, `content/projects.yaml`, `content/posts/*.md`. Templates live in `web/templates`.
- Routes: `/`, `/work`, `/blog`, `/blog/{slug}`, `/cv`, `/admin/*`.
- Terminology: "Work" for the showcase, "Blog" for posts, "CV" rather than "Résumé".
- Undecided as of 2026-09-16: the production domain (mattisig.dev, linked from LinkedIn, currently resolves to nothing and appears unregistered); server-side PDF generation versus the current browser-print approach; a persistent volume for posts on Railway; whether any content is published in Icelandic or Swedish.

## Brand Commitments

- Name: Matthías Sigurbjörnsson. Based in Göteborg, Sweden.
- Go advocacy is a durable identity fact and may be stated on the site.
- Visual direction, pinned by the owner on 2026-09-16: "keep it boring". Monospace for all text (JetBrains Mono, self-hosted, OFL), dark by default with a light option, focus on content and structure. The craft bar is The Monospace Web (owickstrom.github.io/the-monospace-web): everything on a character grid, rules instead of ornament. This is the category standard taken deliberately; do not re-open it or smuggle in expressive typography.
- Founder photo and Snælda specimens are reused from snaelda.io with the owner's consent (`web/static/img/`).
- Voice is not yet confirmed beyond the founder copy on snaelda.io, which is plain, first-person, and unhurried.

## Evidence on Hand

- Snælda (https://snaelda.io): the owner's product. Screenshots and a logo exist (owner-confirmed; not yet in this repo, logo at `~/personal/snaelda/logo.png`). The description in `content/projects.yaml` is derived from Snælda's own PRODUCT.md.
- A headshot exists (owner-confirmed, not yet in this repo).
- Existing writing exists to seed the blog (owner-confirmed, not yet in this repo). `content/posts/hello-world.md` is a placeholder. The owner also writes on Medium as @mattisigur under the "Mossy Code" publication. Two public posts as of 2026-09-16, both Node.js tutorials from August 2024: "What is a server? Let's make a tiny server from scratch!" and "Yet another — getting started with nodejs, Part 1". Whether to import them, link out, or set canonical URLs is undecided.
- Known career facts: Tech Lead at Ventla International AB, Göteborg, since April 2026 (owner-stated: platform revision, hosting cost halved, microservices to a lean monolith with outposts, product strategy with the CEO and CFO); Precisely, Göteborg, frontend then full stack, ending 2026 (owner-stated: JS to TS migration, led AI chat and AI reference discovery, HttpOnly token auth; start year 2021 and "CLM platform" are inferences to confirm); Advania 2018–2021, junior full-stack with a frontend focus then tech lead of Bakvörður, an HR-tech time reporting and compliance B2B SaaS (owner-stated); Háskóli Íslands 2013–2017, Computer Science (degree level assumed BSc); winner of the Code for Course challenge at the Digi.me DataHack, 2017, with the iOS app VaxAbroad. The full role history is not on hand. `content/cv.yaml` carries visible TODO placeholders; do not invent employers, dates, titles, or metrics.
- No testimonials, press, customer names, or metrics are on hand. Do not fabricate any.

## Product Principles

1. Writing first. The blog is the front door for the primary audience; every surface should make the next post one tap away.
2. The build is the portfolio. Implementation quality, performance, and restraint are part of the message.
3. Truth over polish. Gaps in the CV or showcase stay visibly placeholders until the owner fills them.
4. Print is a first-class output. The CV must survive the print dialog without a separate template.
5. Owner-operable. Publishing a post or updating the CV needs no build step beyond editing content.

## Accessibility & Inclusion

No product-specific standard has been established. Baseline expectation: keyboard-operable navigation and admin forms, semantic headings, and sufficient contrast in both light and dark themes.
