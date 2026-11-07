import type { MetadataRoute } from "next";
import { PAGE_SEO } from "@/data/seo";
import { absoluteUrl } from "@/lib/structured-data";

// Required under `output: "export"`: the sitemap is generated at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.values(PAGE_SEO).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.8,
  }));
}
