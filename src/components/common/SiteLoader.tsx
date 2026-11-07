import { SITE } from "@/lib/site-config";

/**
 * The opening screen on a visit's first full page load: a frosted veil over the page with
 * the mark (its satellite orbiting), the name and a progress line; then the veil dissolves
 * and the page comes into focus. It runs on CSS alone from first paint (see `.site-loader`
 * in globals.css), so it clears even if JavaScript fails, and it is an overlay, so nothing
 * is hidden from crawlers. The pre-paint script in app/layout.tsx skips it after the first
 * load of a visit; client-side navigation never re-mounts it.
 */
export default function SiteLoader() {
  return (
    <div className="site-loader" role="status" aria-label="Loading">
      <div className="site-loader-inner">
        <svg
          className="site-loader-mark"
          width="64"
          height="64"
          viewBox="0 0 30 30"
          aria-hidden
          focusable="false"
        >
          <rect width="30" height="30" rx="8" fill="var(--brand)" />
          <circle
            cx="15"
            cy="15"
            r="7.5"
            fill="none"
            stroke="var(--on-brand)"
            strokeWidth="1.6"
            opacity="0.5"
          />
          <circle cx="15" cy="15" r="3" fill="var(--on-brand)" />
          <g className="site-loader-orbit">
            <circle cx="21.2" cy="10.6" r="2.2" fill="var(--on-brand)" />
          </g>
        </svg>
        <span className="text-[22px] leading-none font-[650] tracking-[-0.02em] text-heading [font-stretch:108%]">
          {SITE.name}
        </span>
        <span className="site-loader-bar" aria-hidden>
          <span />
        </span>
      </div>
    </div>
  );
}
