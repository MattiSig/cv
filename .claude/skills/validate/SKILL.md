---
name: validate
description: Lightweight pre-push check for this repo: gofmt, go vet, go test, Tailwind build, and a Go build. Run it before every git push; do not push if it fails.
user-invocable: true
---

Run the repo's validation target from the project root and report the result:

```sh
make validate
```

It runs, in order: `gofmt -l` (fails if any file needs formatting), `go vet ./...`, `go test ./...`, the Tailwind build (`web/css/app.css` → `web/static/css/app.css`), and `go build ./cmd/server`. It downloads the Tailwind standalone CLI into `bin/` on first run.

Rules:
- Run this before every `git push`. If it fails, fix the cause and rerun; never push on a red result.
- If only `gofmt` fails, run `make fmt` and rerun.
- Report the failing step and its output verbatim; do not summarise errors away.
