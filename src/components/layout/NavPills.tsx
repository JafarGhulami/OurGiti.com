"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
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
 *
 * Choosing a link moves the pill straight there and holds the scroll spy until the smooth
 * scroll stops, so the pill does not step back through every section on the way (the page is
 * long, and Process alone is several screens). The pill moves like a liquid: its leading edge
 * reaches the new link first and its trailing edge follows.
 */
export default function NavPills({ navItems }: { navItems: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const inBandRef = useRef(new Map<string, boolean>());
  const heldRef = useRef(false);
  const ids = navItems.map((item) => sectionId(item.href));
  const idsKey = ids.join(",");

  const current = () => idsKey.split(",").find((id) => inBandRef.current.get(id)) ?? null;

  // Scroll spy: a section is current while it crosses a thin band just above the middle.
  useEffect(() => {
    const list = idsKey.split(",");
    const sections = list.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const inBand = inBandRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inBand.set(entry.target.id, entry.isIntersecting);
        if (!heldRef.current) setActive(list.find((id) => inBand.get(id)) ?? null);
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
    const place = (animate: boolean) => {
      const link = active ? track.querySelector<HTMLElement>(`[data-section="${active}"]`) : null;
      if (!link) {
        pill.removeAttribute("data-on");
        return;
      }
      const left = link.offsetLeft;
      const right = track.clientWidth - (link.offsetLeft + link.offsetWidth);
      const was = pill.hasAttribute("data-on");
      const previous = parseFloat(pill.style.getPropertyValue("--l"));
      if (!animate || !was || Number.isNaN(previous)) {
        // Appearing or reflowing: place it without sliding, then let it fade in.
        pill.setAttribute("data-instant", "");
      } else {
        pill.removeAttribute("data-instant");
        pill.dataset.dir = left > previous ? "right" : "left";
      }
      pill.style.setProperty("--l", `${left}px`);
      pill.style.setProperty("--r", `${right}px`);
      pill.setAttribute("data-on", "");
    };
    place(true);
    // A ResizeObserver reports once on observe; only later reports are real reflows.
    let initial = true;
    const resize = new ResizeObserver(() => {
      if (initial) {
        initial = false;
        return;
      }
      place(false);
    });
    resize.observe(track);
    return () => resize.disconnect();
  }, [active]);

  function choose(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    // On another page the router takes the link home; here we scroll ourselves, because the
    // router's hash navigation jumps first, which would end the hold before the scroll does.
    if (!target || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", `#${id}`);
    setActive(id);
    heldRef.current = true;

    // Hold until the page has arrived (the section at the top, or the page at its end); a
    // scrollend from some other scroll, such as a trackpad still settling, does not count.
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const arrived = () =>
      Math.abs(target.getBoundingClientRect().top - padding) < 6 ||
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (arrived()) {
      heldRef.current = false;
      return;
    }
    let timer = 0;
    const finish = () => {
      window.removeEventListener("scrollend", onScrollEnd);
      window.clearTimeout(timer);
      heldRef.current = false;
      setActive(current());
    };
    const onScrollEnd = () => {
      if (arrived()) finish();
    };
    window.addEventListener("scrollend", onScrollEnd);
    // Fallback where scrollend is missing, or when the page does not need to scroll.
    timer = window.setTimeout(finish, 3000);
  }

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
                onClick={(event) => choose(event, id)}
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
