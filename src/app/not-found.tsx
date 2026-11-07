import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { ICON } from "@/components/ui/icon-props";
import { NAV_ITEMS } from "@/data/nav";

/**
 * Sits outside the (site) route group, so it renders the header and footer itself.
 * `metadata` isn't supported here, so the title and description are inline.
 */
export default function NotFound() {
  return (
    <>
      <title>Page not found | OurGiti</title>
      <meta name="description" content="The page you opened does not exist on ourgiti.com." />
      <meta name="robots" content="noindex" />
      <SiteHeader navItems={NAV_ITEMS} />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="bg-contour pat-hero relative overflow-hidden">
          <div className="light-field" aria-hidden />
          <div className="wrap relative flex min-h-[calc(100dvh-var(--header-h)-260px)] flex-col justify-center pt-[calc(var(--header-h)+96px)] pb-24">
            <h1 className="max-w-[16ch]">We can&rsquo;t find that page.</h1>
            <p className="lead mt-6">Error 404. The address may be mistyped, or the page may have moved.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                Back to home <ArrowRight {...ICON} size={17} />
              </Link>
              <Link href="/#contact" className="btn btn-secondary">
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
