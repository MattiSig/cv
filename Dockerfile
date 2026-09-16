FROM golang:1.26 AS build
ARG TAILWIND_VERSION=v4.3.3
WORKDIR /src

RUN curl -fsSL -o /usr/local/bin/tailwindcss \
      "https://github.com/tailwindlabs/tailwindcss/releases/download/${TAILWIND_VERSION}/tailwindcss-linux-x64" \
    && chmod +x /usr/local/bin/tailwindcss

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN tailwindcss -i web/css/app.css -o web/static/css/app.css --minify
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/server ./cmd/server

FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /app
COPY --from=build /out/server /app/server
COPY --from=build /src/content /app/content
ENV PORT=8080 CONTENT_DIR=/app/content
EXPOSE 8080
ENTRYPOINT ["/app/server"]
