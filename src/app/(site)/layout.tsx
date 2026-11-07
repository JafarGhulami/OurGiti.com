import type { ReactNode } from "react";
import JsonLd from "@/components/common/JsonLd";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { NAV_ITEMS } from "@/data/nav";
import { STRUCTURED_DATA } from "@/data/seo";

/** Chrome for every public page; every page carries the Organization + WebSite JSON-LD. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader navItems={NAV_ITEMS} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
