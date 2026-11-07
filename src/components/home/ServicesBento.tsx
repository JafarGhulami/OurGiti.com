import type { ComponentType, CSSProperties, ReactNode } from "react";
import { Check, CodeXml, Headset, Network, ShieldCheck } from "lucide-react";
import Ridge from "@/components/common/Ridge";
import { SERVICES_INTRO } from "@/data/home";
import { SERVICE_LINES, type ServiceLine, type ServiceSlug } from "@/data/services";
import { CloudVisual, NetworkVisual, SoftwareVisual, SupportVisual } from "./ServiceVisuals";

const ICONS: Record<ServiceSlug, ReactNode> = {
  software: <CodeXml size={20} strokeWidth={1.75} aria-hidden />,
  network: <Network size={20} strokeWidth={1.75} aria-hidden />,
  support: <Headset size={20} strokeWidth={1.75} aria-hidden />,
  cloud: <ShieldCheck size={20} strokeWidth={1.75} aria-hidden />,
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
      className={`glass glass-card glass-hover spotlight reveal flex flex-col p-6 sm:p-7 ${PLACEMENT[service.slug]}`}
      style={{ "--stagger": index % 2 } as CSSProperties}
    >
      <div className="flex items-center gap-3.5">
        <span className="icon-tile">{ICONS[service.slug]}</span>
        <h3>{service.title}</h3>
      </div>
      <p className="mt-4 max-w-[52ch] text-[15.5px]">{service.summary}</p>
      <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[14.5px] text-heading">
        {service.scope.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Check size={15} strokeWidth={2.25} aria-hidden className="text-brand-text" />
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

/** The four service lines as a bento: different sizes, each with its own product-style visual. */
export default function ServicesBento() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section band-subtle bg-ridges pat-section overflow-hidden border-y-0 pb-0"
    >
      <div className="light-field light-field-wide" aria-hidden />
      <div className="wrap relative">
        <div className="section-head reveal">
          <h2 id="services-title">{SERVICES_INTRO.title}</h2>
          <p className="lead">{SERVICES_INTRO.lead}</p>
        </div>
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-3">
          {SERVICE_LINES.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
        <p className="mt-5 text-[13px] text-muted">{SERVICES_INTRO.visualCaption}</p>
      </div>
      <Ridge from="band" to="deep" seed={1} className="mt-[clamp(64px,8vw,104px)]" />
    </section>
  );
}
