# Anuj Chhikara's Portfolio

A React Router 7 portfolio built as a statically pre-rendered single-page application. Known routes ship complete HTML for search engines and social previews, then hydrate for client-side navigation.

## Development

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

The app is available at `http://localhost:5173`.

## Verification

```sh
pnpm typecheck
pnpm test:static
pnpm format:check
```

`pnpm test:static` creates the production build and verifies the generated route HTML, SEO metadata, and SPA fallback.

## Cloudflare Pages

Connect the repository to Cloudflare Pages with these settings:

- Build command: `pnpm build`
- Build output directory: `build/client`
- Root directory: `/`

Pages serves the pre-rendered routes as static assets; a generated Worker handles only `/api/pageview`. React Router pre-renders the home page and every path listed in `app/lib/blog-posts.ts`. A generated `404.html` hydrates the React Router fallback for unknown URLs without rewriting requests for existing pages or assets.

Anonymous pageviews use a same-origin `/api/pageview` request handled by the generated `_worker.js`. No browser analytics SDK, cookies, localStorage, sessionStorage, fingerprinting, or visitor identifiers are used; tracking respects Do Not Track and Global Privacy Control. Cloudflare Pages runtime environment variables `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` configure the server-side PostHog request. If they are missing, pageviews are disabled. Each event gets a new random ID; visitor counts, sessions, and retention are not measured. Only allowlisted public paths are sent, without query strings, referrers, visitor IPs, or user agents.

To inspect the production build locally:

```sh
pnpm preview
```
