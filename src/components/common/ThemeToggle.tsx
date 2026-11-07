"use client";

import { Moon, Sun } from "lucide-react";
import { ICON } from "@/components/ui/icon-props";
import { useColorScheme } from "@/lib/color-scheme";

/**
 * Light/dark switch. Which icon shows is decided by the <html> class in CSS
 * (`.theme-icon-*` in globals.css), so the server-rendered button is right in the first frame.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <button
      type="button"
      onClick={toggleColorScheme}
      aria-label="Dark mode"
      aria-pressed={colorScheme === "dark"}
      title="Light / dark"
      className={`theme-toggle inline-flex size-11 items-center justify-center rounded-full border border-line text-accent-text transition-colors hover:border-accent ${className}`}
    >
      <Moon {...ICON} className="theme-icon-moon" />
      <Sun {...ICON} className="theme-icon-sun" />
    </button>
  );
}
