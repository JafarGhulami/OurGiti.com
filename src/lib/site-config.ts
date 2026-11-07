/**
 * Site-wide identity used in metadata and structured data.
 * `NEXT_PUBLIC_SITE_URL` is set per environment (.env.development / .env.production).
 */
export const SITE = {
  name: "OurGiti",
  tagline: "IT and software solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8302",
  description:
    "OurGiti builds software, web and mobile apps, sets up networks and IT infrastructure, supports and manages IT, and runs hosting, cloud and security for its clients.",
  locale: "en_US",
} as const;

/**
 * Mobile browser bar colour (`<meta name="theme-color">`), kept in sync with the colour scheme.
 * Must match `--bg` in globals.css for each scheme.
 */
export const THEME_COLOR = {
  light: "#ffffff",
  dark: "#050b08",
} as const;

/** localStorage key for the visitor's explicit light/dark choice (absent = follow the system). */
export const COLOR_SCHEME_STORAGE_KEY = "ourgiti-color-scheme";
