import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export interface PageMetadataOptions {
  title: string;
  description: string;
  /** Route path, e.g. "/services" — canonical and OG url (resolved via `metadataBase`). */
  path: string;
  /** Use `title` verbatim instead of "<title> | OurGiti" (the home page carries its own full title). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  /** Share image path (1200×630). Omitted until the site has an OG image. */
  image?: string;
}

/**
 * Builds a page's `Metadata`: title, description, canonical, Open Graph and Twitter tags.
 * `title` is the bare page name; " | OurGiti" is appended here (the root layout has no title template).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  noIndex,
  image,
}: PageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      title: fullTitle,
      description,
      url: path,
      images,
    },
    twitter: { card: images ? "summary_large_image" : "summary", title: fullTitle, description, images },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Shortens text to at most `max` characters at a word boundary, for meta descriptions. */
export function clip(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}
