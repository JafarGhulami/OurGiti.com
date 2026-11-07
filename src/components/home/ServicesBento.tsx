import type { ComponentType, CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CodeXml, Headset, Network, ShieldCheck } from "lucide-react";
import Ridge from "@/components/common/Ridge";
import { ICON } from "@/components/ui/icon-props";
import { SERVICES_INTRO } from "@/data/home";
import { SERVICE_LINES, type ServiceLine, type ServiceSlug } from "@/data/services";
import { CloudVisual, NetworkVisual, SoftwareVisual, SupportVisual } from "./ServiceVisuals";

const ICONS: Record<ServiceSlug, (size: number) => ReactNode> = {
  software: (size) => <CodeXml size={size} strokeWidth={1.75} aria-hidden />,
  network: (size) => <Network size={size} strokeWidth={1.75} aria-hidden />,
  support: (size) => <Headset size={size} strokeWidth={1.75} aria-hidden />,
  cloud: (size) => <ShieldCheck size={size} strokeWidth={1.75} aria-hidden />,
};

const VISUALS: Record<ServiceSlug, ComponentType> = {
  software: SoftwareVisual,
  network: NetworkVisual,
  support: SupportVisual,
  cloud: CloudVisual,
};

/** Grid placement, 2 + 1 over 1 + 2: software and cloud wide, network and support narrow. */
const PLACEMENT: Record<ServiceSlug, string> = {
  software: "lg:col-span-2",
  network: "",
  support: "",
  cloud: "lg:col-span-2",
};

function ServiceCard({ service, index }: { service: ServiceLine; index: number }) {
  const Visual = VISUALS[service.slug];
  return (
    <article
      id={`service-${service.slug}`}
      aria-labelledby={`service-${service.slug}-title`}
      className={`glass glass-card glass-hover spotlight reveal flex flex-col p-6 sm:p-7 ${PLACEMENT[service.slug]}`}
      style={{ "--stagger": index % 2 } as CSSProperties}
    >
      <div className="flex items-start gap-4">
        <span className="service-icon">{ICONS[service.slug](22)}</span>
        <div className="min-w-0">
          <h3 id={`service-${service.slug}-title`} className="text-[21px] leading-tight">
            {service.title}
          </h3>
          <p className="mt-2 max-w-[52ch] text-[15.5px] leading-relaxed">{service.summary}</p>
        </div>
      </div>
      <ul
        className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0"
        aria-label={`${service.title}: what we deliver`}
      >
        {service.scope.map((item) => (
          <li key={item} className="scope-pill">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-1 flex-col">
        <Visual />
      </div>
    </article>
  );
}

/**
 * The four service lines: a split head (headline; lead and quick links to each service), a
 * bento of glass cards whose product visuals quietly show the work happening, and a closing
 * strip that hands the undecided visitor to the contact form.
 */
export default function ServicesBento() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section band-subtle bg-ridges pat-section overflow-hidden border-y-0 pb-0"
    >
      <div className="light-field light-field-wide" aria-hidden />
      <div className="wrap relative">
        <div className="reveal grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <h2 id="services-title" className="max-w-[14ch]">
            {SERVICES_INTRO.title}
          </h2>
          <div>
            <p className="lead">{SERVICES_INTRO.lead}</p>
            <nav aria-label={SERVICES_INTRO.jumpLabel} className="mt-6">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {SERVICE_LINES.map((service) => (
                  <li key={service.slug}>
                    <a href={`#service-${service.slug}`} className="jump-chip">
                      {ICONS[service.slug](15)}
                      {service.need}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-3">
          {SERVICE_LINES.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        <div className="glass glass-card reveal mt-5 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="text-[19px] font-semibold tracking-[-0.01em] text-heading">
              {SERVICES_INTRO.ctaTitle}
            </p>
            <p className="mt-1.5 max-w-[56ch] text-[15.5px] text-muted">{SERVICES_INTRO.ctaText}</p>
          </div>
          <Link href="#contact" className="btn btn-primary flex-none">
            {SERVICES_INTRO.cta} <ArrowRight {...ICON} size={17} />
          </Link>
        </div>

        <p className="mt-5 text-[13px] text-muted">{SERVICES_INTRO.visualCaption}</p>
      </div>
      <Ridge from="band" to="deep" seed={1} className="mt-[clamp(64px,8vw,104px)]" />
    </section>
  );
}
