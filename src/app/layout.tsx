import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { env } from "@/lib/env";
import { COLOR_SCHEME_STORAGE_KEY, SITE, THEME_COLOR } from "@/lib/site-config";
import "./globals.css";

const socialTitle = `${SITE.name} — ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // No root title/description: every page sets its own through pageMetadata(), and
  // the 404 page (which can't export metadata) sets its own tags inline.
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: socialTitle,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary",
    title: socialTitle,
    description: SITE.description,
  },
  verification: { google: env.GOOGLE_SITE_VERIFICATION || undefined },
};

// Declares both schemes, so the browser chrome and form controls follow the page.
export const viewport: Viewport = {
  colorScheme: "light dark",
};

// Runs before first paint: marks JS as available, pins the scheme on <html> (the stored
// choice, else the system setting) and creates the matching `theme-color` tag. The script
// creates the tag itself: had React rendered it, changing it here would make hydration add
// a second one. See src/lib/color-scheme.ts for the runtime side.
const noFlashScript = `
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var scheme = null;
  try {
    scheme = localStorage.getItem("${COLOR_SCHEME_STORAGE_KEY}");
  } catch (e) {}
  if (scheme !== "light" && scheme !== "dark") {
    scheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.classList.add(scheme);
  var bar = document.createElement("meta");
  bar.name = "theme-color";
  bar.content = scheme === "dark" ? "${THEME_COLOR.dark}" : "${THEME_COLOR.light}";
  document.head.appendChild(bar);
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      // The CSS sets `scroll-behavior: smooth`; Next only switches it off during
      // route changes when this attribute is present.
      data-scroll-behavior="smooth"
      // The pre-paint script adds classes React didn't render.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
