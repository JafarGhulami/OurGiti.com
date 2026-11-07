import { SITE } from "@/lib/site-config";

/**
 * The OurGiti wordmark: a provisional mark (a green tile with a node on an orbit) beside the
 * name. Replace the mark with the company's logo when it is supplied.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[10px] ${className}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden focusable="false">
        <rect width="30" height="30" rx="8" fill="var(--brand)" />
        <circle cx="15" cy="15" r="7.5" fill="none" stroke="var(--on-brand)" strokeWidth="2" opacity="0.55" />
        <circle cx="15" cy="15" r="3" fill="var(--on-brand)" />
        <circle cx="21.2" cy="10.6" r="2.2" fill="var(--on-brand)" />
      </svg>
      <span className="text-[19px] leading-none font-[650] tracking-[-0.02em] text-heading [font-stretch:108%]">
        {SITE.name}
      </span>
    </span>
  );
}
