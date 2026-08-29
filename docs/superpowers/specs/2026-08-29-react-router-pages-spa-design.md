# React Router Pages SPA Design

## Goal

Convert the portfolio from runtime server rendering on a Cloudflare Worker to a React Router 7 single-page application deployed as static assets on Cloudflare Pages. Preserve route-level SEO by pre-rendering every known public route at build time, while retaining client-side navigation after hydration.

## Architecture

React Router remains in Framework Mode. Runtime SSR is disabled with `ssr: false`. The build configuration pre-renders the home page and every known blog URL, generating route-specific HTML and navigation data under `build/client`.

The generated site is deployed directly to Cloudflare Pages. There is no Worker, Pages Function, server bundle, runtime loader, or other server-side code. React Router's generated SPA fallback is copied to `404.html`, allowing unknown URLs to hydrate the client router without rewriting requests for existing static assets.

The blog catalog becomes the single source of truth for known post slugs and post metadata. Both the route module and the prerender configuration consume that catalog, preventing the deployed route list from drifting away from the rendered posts.

## SEO

The home page and each known blog post are emitted as complete HTML during the production build. Each route defines its own:

- Document title and description
- Canonical URL
- Open Graph URL, title, description, and image
- Twitter card metadata

The initial response therefore contains route-specific content and metadata without requiring JavaScript. After hydration, navigation remains client-side. A newly added dynamic blog slug becomes SEO-ready once it is added to the blog catalog and the site is rebuilt.

Unknown blog slugs render a not-found experience in the SPA fallback. They are not treated as indexable content.

## Cloudflare Pages Deployment

Cloudflare Pages uses:

- Build command: `pnpm build`
- Output directory: `build/client`
- No Worker or Pages Function

The build copies React Router's SPA fallback to the custom Pages `404.html`. The README documents the Pages settings and local build/preview commands.

## Cleanup

Remove infrastructure and code that exist only for Worker SSR:

- Worker request handler and Wrangler configuration
- Cloudflare Vite plugin configuration
- Worker type generation scripts and TypeScript references
- Custom server entry; React Router's build-time rendering dependencies remain
- Worker/Cloudflare development dependencies that no longer serve the static build

Remove components that have no imports anywhere in the application, then remove dependencies that become unreferenced as a direct result. Preserve live portfolio content, styling, analytics, and components reachable from the route tree. The cleanup does not include speculative refactors or content redesign.

## Error Handling

React Router's root error boundary continues to handle route errors during client navigation. The SPA fallback enables direct navigation to client-known URLs that do not have a static file. Known public routes use their generated HTML. Unknown URLs show the application's not-found experience and are marked non-indexable where the route metadata permits.

## Verification

The migration is complete when all of the following pass:

1. Type generation and TypeScript checks succeed without Worker types.
2. A production React Router build succeeds with no server bundle required for deployment.
3. `build/client` contains generated HTML for `/`, every known blog post, and the SPA fallback.
4. Generated route HTML contains the expected route-specific title, description, canonical URL, social metadata, and visible content.
5. Client-side route navigation and direct-route loading work in a local static preview.
6. The source tree contains no Worker deployment path or imports of deleted components.
7. Declared packages are referenced by the remaining application or build configuration.

## Non-Goals

- Runtime SSR
- Cloudflare Workers or Pages Functions
- A CMS or runtime blog API
- Dynamic server loaders or actions
- Visual redesign of the portfolio
- Changes to PostHog behavior beyond updating obsolete SSR-specific comments if necessary
