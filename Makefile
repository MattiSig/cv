.RECIPEPREFIX := >
SHELL := /bin/bash

TAILWIND_VERSION ?= v4.3.3
TAILWIND := bin/tailwindcss
CSS_IN   := web/css/app.css
CSS_OUT  := web/static/css/app.css

.PHONY: help dev run build css css-watch test vet fmt tidy docker clean validate

help: ## Show targets
> @grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "  %-12s %s\n", $$1, $$2}'

dev: $(TAILWIND) ## Run server with template reload and Tailwind watch
> @trap 'kill 0' EXIT; \
>   $(TAILWIND) -i $(CSS_IN) -o $(CSS_OUT) --watch & \
>   DEV=1 ADMIN_USER=$${ADMIN_USER:-admin} ADMIN_PASSWORD=$${ADMIN_PASSWORD:-admin} go run ./cmd/server

run: css ## Run the production build locally
> go run ./cmd/server

build: css ## Build the binary into bin/
> CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o bin/server ./cmd/server

css: $(TAILWIND) ## Build minified CSS
> $(TAILWIND) -i $(CSS_IN) -o $(CSS_OUT) --minify

css-watch: $(TAILWIND) ## Rebuild CSS on change
> $(TAILWIND) -i $(CSS_IN) -o $(CSS_OUT) --watch

$(TAILWIND):
> mkdir -p bin
> curl -fsSL -o $@ "https://github.com/tailwindlabs/tailwindcss/releases/download/$(TAILWIND_VERSION)/tailwindcss-linux-x64"
> chmod +x $@

test: ## Run tests
> go test ./...

validate: $(TAILWIND) ## Lint (gofmt, vet), test, and build; run before pushing
> @unformatted=$$(gofmt -l .); if [ -n "$$unformatted" ]; then echo "gofmt: needs formatting:"; echo "$$unformatted"; exit 1; fi
> go vet ./...
> go test ./...
> $(TAILWIND) -i $(CSS_IN) -o $(CSS_OUT) --minify
> CGO_ENABLED=0 go build -o /dev/null ./cmd/server
> @echo "validate: ok"

vet: ## Vet
> go vet ./...

fmt: ## Format
> gofmt -l -w .

tidy: ## Tidy modules
> go mod tidy

docker: ## Build the container image
> docker build -t cv:local .

clean:
> rm -rf bin $(CSS_OUT)
