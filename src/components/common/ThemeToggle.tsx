"use client";

import { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useColorScheme } from "@/lib/color-scheme";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

const ICON = { size: 16, strokeWidth: 2, "aria-hidden": true, focusable: "false" } as const;

/**
 * Light/dark switch: a recessed glass track with a frosted thumb that slides from day to
 * night while its sun turns into a moon (`.theme-switch` in globals.css). The new scheme
 * sweeps across the page as a circle growing from the switch (View Transitions API);
 * browsers without it, and reduced-motion users, get a plain switch. Thumb position and
 * icon follow the <html> class in CSS, so the server-rendered switch is right in the
 * first frame.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const ref = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    const doc = document as ViewTransitionDocument;
    const button = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!button || !doc.startViewTransition || reduced) {
      toggleColorScheme();
      return;
    }
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = doc.startViewTransition(() => toggleColorScheme());
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 750,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={colorScheme === "dark"}
      aria-label="Dark mode"
      title="Light / dark"
      onClick={onClick}
      className={`theme-switch ${className}`}
    >
      <Sun {...ICON} className="theme-switch-track-icon is-sun" />
      <Moon {...ICON} className="theme-switch-track-icon is-moon" />
      <span className="theme-switch-thumb" aria-hidden>
        <Sun {...ICON} className="is-sun" />
        <Moon {...ICON} className="is-moon" />
      </span>
    </button>
  );
}
