# cv

Personal site: landing page, work showcase, Markdown blog with an admin editor, and a print-ready CV.

One Go binary. `html/template` for views, Tailwind for styling, Markdown on disk for posts,
distroless container on Railway.

## Run

```sh
make dev          # DEV=1 template reload + Tailwind watch, admin at /admin (admin/admin)
make build        # bin/server
make docker       # container image
```

Configuration is environment-only; see `.env.example`.

## Layout

```
cmd/server        entrypoint, graceful shutdown
internal/config   env → Config
internal/server   routes, handlers, admin, middleware
internal/view     template loading (embedded in prod, disk in dev)
internal/blog     Post, Store interface, filesystem store, Markdown rendering
internal/cv       CV model ← content/cv.yaml
internal/work     Project model ← content/projects.yaml
web/templates     layouts/, partials/, pages/
web/css           Tailwind input
web/static        built CSS, JS, favicon
content/          cv.yaml, projects.yaml, posts/*.md
```

## Content

- **CV**: edit `content/cv.yaml`. `/cv` renders it; the "Download PDF" button prints the page with a print stylesheet.
- **Work**: edit `content/projects.yaml`. `featured: true` puts a project on the landing page.
- **Blog**: write in `/admin/posts` (HTTP basic auth via `ADMIN_USER` / `ADMIN_PASSWORD`) or drop a `.md` file with YAML front matter into `POSTS_DIR`. Point `POSTS_DIR` at a persistent volume in production.
