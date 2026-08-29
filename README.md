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

No Worker or Pages Function is required. React Router pre-renders the home page and every path listed in `app/lib/blog-posts.ts`. A generated `404.html` hydrates the React Router fallback for unknown URLs without rewriting requests for existing pages or assets.

To inspect the production build locally:

```sh
pnpm preview
```
