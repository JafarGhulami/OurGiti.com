import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/common/ThemeToggle";
import Wordmark from "@/components/common/Wordmark";
import { ICON } from "@/components/ui/icon-props";
import type { NavItem } from "@/data/nav";
import MobileNav from "./MobileNav";
import NavPills from "./NavPills";

/**
 * A floating glass bar that stays at the top while the page scrolls under it: wordmark,
 * section links with a sliding glass selection, colour scheme and the contact action. Below
 * md the links move into the MobileNav sheet; below sm the contact button does too.
 *
 * The header takes no room in the flow (negative bottom margin), so the first section's
 * pattern and light run behind it; that section pads its top by --header-h.
 */
export default function SiteHeader({ navItems }: { navItems: NavItem[] }) {
  return (
    <header className="sticky top-0 z-40 -mb-[var(--header-h)] h-[var(--header-h)] pt-3">
      <div className="nav-shell mx-auto flex w-[min(var(--wrap-max)+24px,100%-24px)] items-center gap-4">
        <Link href="/" aria-label="OurGiti home" className="flex items-center">
          <Wordmark />
        </Link>

        <div className="ml-4">
          <NavPills navItems={navItems} />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Link href="/#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Contact us <ArrowRight {...ICON} size={16} />
          </Link>
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
