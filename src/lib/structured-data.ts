import { SITE } from "@/lib/site-config";

/** Stable `@id` of the Organization node, so other JSON-LD nodes can point at it. */
export const ORG_ID = `${SITE.url}/#organization`;

/** Absolute URL of a site route; routes end with `/` (`trailingSlash: true`). */
export function absoluteUrl(path: string): string {
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return new URL(withSlash, SITE.url).toString();
}
