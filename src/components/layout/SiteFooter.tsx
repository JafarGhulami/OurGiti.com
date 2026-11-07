import Link from "next/link";
import Wordmark from "@/components/common/Wordmark";
import { NAV_ITEMS } from "@/data/nav";
import { SERVICE_LINES } from "@/data/services";
import { CONTACT_INFO, currentYear } from "@/data/site";
import { SITE } from "@/lib/site-config";

function Pending() {
  return <span className="pending">Coming soon</span>;
}

/** Site footer: the company, its services, the page sections and how to reach it. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-[36ch] text-[15px] text-muted">{SITE.description}</p>
        </div>

        <nav aria-label="Services">
          <p className="text-[14px] font-semibold text-heading">Services</p>
          <ul className="m-0 mt-4 grid list-none gap-2.5 p-0 text-[15px]">
            {SERVICE_LINES.map((service) => (
              <li key={service.slug}>
                <Link href="/#services" className="text-muted transition-colors hover:text-heading">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-[14px] font-semibold text-heading">Company</p>
          <ul className="m-0 mt-4 grid list-none gap-2.5 p-0 text-[15px]">
            {NAV_ITEMS.filter((item) => item.label !== "Services").map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-heading">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[14px] font-semibold text-heading">Contact</p>
          <dl className="m-0 mt-4 grid gap-3 text-[15px]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <dt className="text-muted">Email</dt>
              <dd className="m-0 text-heading">{CONTACT_INFO.email ?? <Pending />}</dd>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <dt className="text-muted">Phone</dt>
              <dd className="m-0 text-heading">{CONTACT_INFO.phone ?? <Pending />}</dd>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <dt className="text-muted">Serving</dt>
              <dd className="m-0 text-heading">{CONTACT_INFO.serviceArea}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-6 text-[14px] text-muted">
          <p>
            © {currentYear()} {SITE.name}. All rights reserved.
          </p>
          <p>IT and software solutions · ourgiti.com</p>
        </div>
      </div>
    </footer>
  );
}
