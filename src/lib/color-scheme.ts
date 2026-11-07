"use client";

import { useSyncExternalStore } from "react";
import { COLOR_SCHEME_STORAGE_KEY, THEME_COLOR } from "@/lib/site-config";

export type ColorScheme = "dark" | "light";

/**
 * The colour scheme lives on <html> as a `light` or `dark` class. The pre-paint script in
 * app/layout.tsx sets it before first paint (the stored choice, else the system setting),
 * so the class is the single source of truth and React only observes it.
 */
function readScheme(): ColorScheme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  // Until the visitor picks a scheme, follow the system setting live.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = (event: MediaQueryListEvent) => {
    if (readStoredScheme() === null) applyScheme(event.matches ? "dark" : "light");
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
  };
}

function readStoredScheme(): ColorScheme | null {
  try {
    const stored = window.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null; // storage blocked
  }
}

/** Puts a scheme on <html> and keeps the browser-bar colour in step. */
function applyScheme(scheme: ColorScheme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", scheme === "dark");
  root.classList.toggle("light", scheme === "light");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[scheme]);
}

/** Applies and remembers an explicit choice. */
export function setColorScheme(scheme: ColorScheme): void {
  applyScheme(scheme);
  try {
    window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, scheme);
  } catch {
    // storage blocked: the choice lasts for this page view
  }
}

/**
 * The current scheme. The server render (and hydration) reports "light"; the real value
 * arrives right after hydration. UI that must be right in the first frame (which icon a
 * toggle shows) should key off the <html> class in CSS instead.
 */
export function useColorScheme(): { colorScheme: ColorScheme; toggleColorScheme: () => void } {
  const colorScheme = useSyncExternalStore(subscribe, readScheme, () => "light" as const);
  return {
    colorScheme,
    toggleColorScheme: () => setColorScheme(readScheme() === "dark" ? "light" : "dark"),
  };
}
