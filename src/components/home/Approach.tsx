import type { CSSProperties } from "react";
import { CircleCheck } from "lucide-react";
import Ridge from "@/components/common/Ridge";
import { APPROACH } from "@/data/home";
import ApproachStack from "./ApproachStack";

/**
 * The deep-green band: why one partner. The visual (ApproachStack) is the client's
 * technology as an isometric stack of glass plates on one emerald core: one team across
 * every layer.
 */
export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="inverse bg-river pat-band section overflow-hidden pb-0"
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

        <div className="reveal" style={{ "--stagger": 1 } as CSSProperties}>
          <ApproachStack />
        </div>
      </div>
      <Ridge from="deep" to="page" seed={2} className="mt-[clamp(64px,8vw,104px)]" />
    </section>
  );
}
