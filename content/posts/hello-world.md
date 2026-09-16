---
title: Hello, world
summary: Why this site is a Go binary serving templates, and what that buys me.
date: 2026-09-16
tags: [go, meta]
---

This site is a single Go binary. It serves `html/template` pages, reads blog posts
as Markdown from disk, and ships as a distroless container to Railway.

No framework, no build pipeline beyond Tailwind, no JavaScript beyond a theme toggle.

```go
mux.Handle("GET /blog/{slug}", s.handle(s.blogPost))
```

More soon.
