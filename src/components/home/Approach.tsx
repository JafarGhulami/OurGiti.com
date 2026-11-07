import type { CSSProperties, ReactNode } from "react";
import { CircleCheck, Cloud, CodeXml, Headset, Network } from "lucide-react";
import { APPROACH } from "@/data/home";

const LAYER_ICONS: ReactNode[] = [
  <CodeXml key="software" size={18} strokeWidth={1.75} aria-hidden />,
  <Cloud key="cloud" size={18} strokeWidth={1.75} aria-hidden />,
  <Network key="network" size={18} strokeWidth={1.75} aria-hidden />,
  <Headset key="support" size={18} strokeWidth={1.75} aria-hidden />,
];

/**
 * The deep-green band: why one partner. The visual is the technology stack as four glass
 * layers, joined by one rail: one team across every layer.
 */
export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="inverse bg-hex pat-band section overflow-hidden"
    >
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="reveal">
          <h2 id="approach-title" className="max-w-[18ch]">
            {APPROACH.title}
          </h2>
          <p className="lead mt-5">{APPROACH.lead}</p>
          <ul className="m-0 mt-9 grid list-none gap-3.5 p-0">
            {APPROACH.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[16px] text-heading">
                <CircleCheck
                  size={20}
                  strokeWidth={1.75}
                  aria-hidden
                  className="mt-[2px] flex-none text-brand-text"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative pl-12 sm:pl-16"
          role="img"
          aria-label="Your technology as four layers (software and apps; cloud, email and data; network and security; devices and support), all covered by OurGiti."
        >
          <div aria-hidden className="absolute top-6 bottom-6 left-3 w-px bg-[var(--brand-line)] sm:left-5" />
          <ol className="m-0 grid list-none gap-3.5 p-0" aria-hidden>
            {APPROACH.layers.map((layer, index) => (
              <li
                key={layer.title}
                className="glass spotlight reveal relative flex items-center gap-4 p-4 sm:p-5"
                style={
                  {
                    "--i": index,
                    "--stagger": index,
                    marginLeft: `${index * 14}px`,
                  } as CSSProperties
                }
              >
                {/* Connector from the OurGiti rail to this layer */}
                <span className="absolute top-1/2 left-[calc(-36px-var(--i)*14px)] h-px w-[calc(36px+var(--i)*14px)] bg-[var(--brand-line)] sm:left-[calc(-44px-var(--i)*14px)] sm:w-[calc(44px+var(--i)*14px)]" />
                <span className="icon-tile">{LAYER_ICONS[index]}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-semibold text-heading">{layer.title}</span>
                  <span className="mt-0.5 block truncate text-[13px] text-muted">{layer.detail}</span>
                </span>
                <span className="status status-ok hidden sm:inline-flex">Covered</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
