import type { PageMetadataOptions } from "@/lib/metadata";
import { SITE } from "@/lib/site-config";
import { ORG_ID } from "@/lib/structured-data";

/** Per-route SEO copy, used by each page's `metadata` and by the sitemap. */
export const PAGE_SEO = {
  home: {
    title: "OurGiti | IT and Software Solutions",
    description: SITE.description,
    path: "/",
    absoluteTitle: true,
  },
} satisfies Record<string, PageMetadataOptions>;

/**
 * Organization + WebSite graph, rendered on every page.
 * Add `logo`, `email`, `address` and `sameAs` once the company confirms them (see PRODUCT.md).
 */
export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
  ],
};
