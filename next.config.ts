import { PHASE_PRODUCTION_BUILD } from "next/constants";
import type { NextConfig } from "next";

/**
 * Static export: `next build` writes plain HTML into `out/`, one folder per
 * route (`out/services/index.html`), which any static host serves without
 * rewrite rules. There is no Node server in production.
 *
 * `output: "export"` is set for the build only: with it, `next dev` answers an
 * unknown dynamic-route address with a 500 error ("missing param in
 * generateStaticParams") instead of the 404 page. Without it, dev behaves like
 * the live site, where the host serves 404.html for anything that isn't a file.
 *
 * `cacheComponents` / `partialPrefetching` (on in the 16.4 template) stay off: they
 * serve a running server (static shell + streamed dynamic parts), and under them
 * robots.ts / sitemap.ts can't declare `dynamic = "force-static"`, which
 * `output: "export"` requires.
 *
 * Tailwind CSS 4 runs through its Turbopack loader (the Next 16.4 default)
 * rather than PostCSS.
 */
export default function config(phase: string): NextConfig {
  return {
    ...(phase === PHASE_PRODUCTION_BUILD && { output: "export" }),
    trailingSlash: true,
    turbopack: {
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
  };
}
