"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NavItem } from "@/data/nav";

/** "/#services" → "services" */
function sectionId(href: string): string {
  return href.split("#")[1] ?? "";
}

/**
 * The header's section links on a glass track, with a glass pill that slides to the
 * section in view. The active link carries aria-current. Nothing is selected while the hero
 * is in view, or on pages without these sections.
 */
export default function NavPills({ navItems }: { navItems: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const ids = navItems.map((item) => sectionId(item.href));
  const idsKey = ids.join(",");

  // Scroll spy: a section is current while it crosses a thin band just above the middle.
  useEffect(() => {
    const list = idsKey.split(",");
    const sections = list.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const inBand = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inBand.set(entry.target.id, entry.isIntersecting);
        setActive(list.find((id) => inBand.get(id)) ?? null);
      },
      { rootMargin: "-42% 0px -52% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [idsKey]);

  // Move the pill under the active link (and keep it there when the layout changes).
  useEffect(() => {
    const track = trackRef.current;
    const pill = pillRef.current;
    if (!track || !pill) return;
    const place = () => {
      const link = active ? track.querySelector<HTMLElement>(`[data-section="${active}"]`) : null;
      if (!link) {
        pill.removeAttribute("data-on");
        return;
      }
      pill.style.setProperty("--x", `${link.offsetLeft}px`);
      pill.style.setProperty("--w", `${link.offsetWidth}px`);
      pill.setAttribute("data-on", "");
    };
    place();
    const resize = new ResizeObserver(place);
    resize.observe(track);
    return () => resize.disconnect();
  }, [active]);

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul ref={trackRef} className="nav-track">
        <span ref={pillRef} className="nav-indicator" aria-hidden />
        {navItems.map((item) => {
          const id = sectionId(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                data-section={id}
                aria-current={active === id ? "true" : undefined}
                onClick={() => setActive(id)}
                className="nav-link"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
