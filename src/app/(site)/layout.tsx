import type { ReactNode } from "react";
import JsonLd from "@/components/common/JsonLd";
import { STRUCTURED_DATA } from "@/data/seo";

/**
 * Chrome for every public page; every page carries the Organization + WebSite JSON-LD.
 * The site header and footer (src/components/layout/) join here in the design-system step.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={STRUCTURED_DATA} />
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </>
  );
}
