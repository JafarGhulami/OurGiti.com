import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

// Required under `output: "export"`: robots.txt is generated at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", SITE.url).toString(),
    host: SITE.url,
  };
}
