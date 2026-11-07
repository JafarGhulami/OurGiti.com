"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ICON } from "@/components/ui/icon-props";
import type { NavItem } from "@/data/nav";

/**
 * The section links below the md breakpoint: a menu button that opens a glass sheet under
 * the bar. The bar keeps its glass on a pseudo-element, so this sheet frosts the page itself.
 * Closes on a link, on Escape (focus returns to the button) and on outside click.
 */
export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="glass-control inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-heading transition-colors hover:text-brand-text"
      >
        {open ? <X {...ICON} size={18} /> : <Menu {...ICON} size={18} />}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="glass glass-strong absolute top-[calc(100%+8px)] right-0 left-0 p-2"
      >
        <nav aria-label="Main">
          <ul className="m-0 grid list-none p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-[calc(var(--radius-card)-8px)] px-4 py-3 text-[16px] font-medium text-heading transition-colors hover:bg-brand-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
