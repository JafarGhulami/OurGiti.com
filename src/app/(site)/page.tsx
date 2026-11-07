import ThemeToggle from "@/components/common/ThemeToggle";
import { PAGE_SEO } from "@/data/seo";
import { SERVICE_LINES } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site-config";

export const metadata = pageMetadata(PAGE_SEO.home);

/**
 * `/`: a holding page while the site is designed. It proves the stack end to end
 * (tokens in both schemes, the theme switch, content from src/data) and is replaced
 * by the real home page in the design-system step.
 */
export default function HomePage() {
  return (
    <div className="wrap flex min-h-dvh flex-col py-8">
      <header className="flex items-center justify-between gap-4">
        <span className="text-lg font-bold tracking-tight text-heading">{SITE.name}</span>
        <ThemeToggle />
      </header>

      <section className="flex flex-1 flex-col justify-center py-16">
        <p className="font-mono text-sm text-accent-text">ourgiti.com is being built</p>
        <h1 className="mt-4 max-w-[16ch]">IT and software solutions</h1>
        <p className="mt-6 max-w-[60ch] text-lg">{SITE.description}</p>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {SERVICE_LINES.map((service) => (
            <li key={service.slug} className="bg-surface p-6">
              <h2 className="text-[19px]">{service.title}</h2>
              <p className="mt-2 text-muted">{service.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
