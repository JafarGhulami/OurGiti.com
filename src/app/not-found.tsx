import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ICON } from "@/components/ui/icon-props";

/**
 * Sits outside the (site) route group, so it renders its own chrome.
 * `metadata` isn't supported here, so the title and description are inline.
 */
export default function NotFound() {
  return (
    <>
      <title>Page not found | OurGiti</title>
      <meta name="description" content="The page you opened does not exist on ourgiti.com." />
      <meta name="robots" content="noindex" />
      <main
        id="main"
        tabIndex={-1}
        className="wrap flex min-h-dvh flex-col justify-center py-16 outline-none"
      >
        <p className="font-mono text-sm text-accent-text">Error 404</p>
        <h1 className="mt-4">This page is not here.</h1>
        <p className="mt-6 max-w-[56ch] text-lg">The address may be mistyped, or the page has moved.</p>
        <Link
          href="/"
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-on-accent transition-colors hover:bg-accent-hover"
        >
          Go to the start page <ArrowRight {...ICON} size={18} />
        </Link>
      </main>
    </>
  );
}
