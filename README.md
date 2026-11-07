# OurGiti — Website

The public website at ourgiti.com for OurGiti, an IT and software solutions company: software and web/mobile development, networking and infrastructure, IT support and managed IT, and cloud, hosting and security.

Built with Next.js 16.4 (App Router, **static export**), React 19, TypeScript (strict) and Tailwind CSS 4. There is no server in production: `pnpm build` writes plain HTML into `out/`, which is uploaded to the web host.

> Status: project scaffold. The home page is a holding page; the design system (green palette in light and dark, glass surfaces, type) and the real pages come next. Product facts live in [PRODUCT.md](PRODUCT.md).

## Prerequisites

- Node.js 24 and pnpm

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:8302  (or run bat_run_app.bat)
```

## Environment variables

`NEXT_PUBLIC_*` values are compiled into the bundle (never put secrets in them). `.env.development` is used by `pnpm dev`, `.env.production` by `pnpm build`; both are committed. Put personal overrides in `.env.local`.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, used for canonicals, the sitemap and JSON-LD (`https://ourgiti.com` in production). |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `true` to load analytics (not wired yet). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement id. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console verification token, optional. |

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with hot reload on port 8302 |
| `pnpm build` | Static export into `out/` (then `postbuild` fixes the segment-prefetch file names, see below) |
| `pnpm start` | Serves a non-export production build locally |
| `pnpm lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm format <files>` / `pnpm format:check` | Prettier |

Before deploying, run `pnpm typecheck`, `pnpm lint` and `pnpm build`.

## Project structure

```
src/
  app/            routes: (site)/ holds every public page inside the shared layout;
                  layout.tsx (root: metadata, pre-paint colour-scheme script), globals.css (design tokens),
                  not-found.tsx, sitemap.ts and robots.ts sit at the root
  components/     common/ (JsonLd, ThemeToggle…), layout/ (site header and footer, next step), ui/ (icon props)
  data/           all content, as typed TypeScript: services (the four service lines), seo (per-page SEO + JSON-LD)
  lib/            site-config (name, URL, theme colours), metadata (pageMetadata), structured-data,
                  color-scheme (light/dark), env
public/           static files copied into out/ (logo, favicons and OG image once they exist)
scripts/          flatten-segment-prefetch.mjs (postbuild)
.claude/skills/   project skills: glassmorphism (frosted/liquid glass technique, see skills-lock.json)
```

### Conventions

- **Content lives in `src/data/`**, never inline in components. Don't invent claims (clients, figures, testimonials); PRODUCT.md lists what is still unknown.
- **Server Components by default.** Only interactive pieces are `"use client"` (so far the theme toggle).
- **Metadata:** every `page.tsx` exports `metadata = pageMetadata(PAGE_SEO.x)`. The root layout has no title, so the 404 page's own `<title>` wins. Add each new page to `PAGE_SEO` and the sitemap follows.
- **Styling:** `src/app/globals.css` holds the design tokens as semantic roles (`--bg`, `--surface`, `--text`, `--accent`…), each written once with `light-dark(<light>, <dark>)`. Tailwind utilities read them through `@theme inline` (`bg-surface`, `text-muted`, `text-accent-text`…). Use the roles, never raw colours.
- **Colour scheme:** follows the system setting until the visitor uses the toggle; the choice is remembered in `localStorage` (`ourgiti-color-scheme`). The pre-paint script in `layout.tsx` puts `light` or `dark` on `<html>` before first paint; `src/lib/color-scheme.ts` observes and changes it. Without JS the page still follows the system setting.
- **Images:** plain `<img>` tags (`next/image` optimisation needs a server). Icons are `lucide-react` with `{...ICON}`.
- **Links to site routes end with `/`** (`trailingSlash: true`), e.g. `/services/`.

### Next.js 16.4 notes

- **No Cache Components.** The 16.4 template turns on `cacheComponents` and `partialPrefetching`; they are off here because they target a running server, and under them `robots.ts` / `sitemap.ts` can't declare `dynamic = "force-static"`, which `output: "export"` requires.
- **`output: "export"` is set for `next build` only** (see `next.config.ts`), so `next dev` shows the 404 page for unknown addresses like the live site does.
- **Tailwind runs through `@tailwindcss/turbopack`** (the 16.4 default), not PostCSS.
- **Segment prefetch fix:** the build writes route-group prefetch payloads into nested folders (`out/__next.!KHNpdGUp/__PAGE__.txt`) but the client requests flat names (`out/__next.!KHNpdGUp.__PAGE__.txt`). `scripts/flatten-segment-prefetch.mjs` copies them after every build. Re-check on each Next upgrade and drop it once the build writes flat names.

## Deployment

1. `pnpm install`, then the checks above, then `pnpm build`.
2. Upload the contents of `out/` to the document root of ourgiti.com. The host should serve `404.html` for missing paths.
