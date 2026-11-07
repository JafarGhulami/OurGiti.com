"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to `.spotlight` cards (as --mx / --my), so a soft light follows
 * the pointer across the glass. One delegated listener for the whole page; touch and
 * reduced-motion users simply never see it move.
 */
export default function Spotlight() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
