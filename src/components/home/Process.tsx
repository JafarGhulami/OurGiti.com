import type { CSSProperties } from "react";
import Ridge from "@/components/common/Ridge";
import { PROCESS } from "@/data/home";

/**
 * How an engagement runs, as a timeline: numbered nodes on one line (a sequence the reader
 * needs, so the numbers carry information), each with its step on a glass card below.
 */
export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="section ground-page bg-terrain pat-section overflow-hidden pb-0"
    >
      <div className="light-field light-field-wide" aria-hidden />
      <div className="wrap relative">
        <div className="section-head reveal">
          <h2 id="process-title">{PROCESS.title}</h2>
          <p className="lead">{PROCESS.lead}</p>
        </div>

        <div className="relative mt-14">
          <span
            aria-hidden
            className="absolute top-5 bottom-5 left-5 w-px bg-[var(--border-strong)] md:top-5 md:right-[calc(25%-44px)] md:bottom-auto md:left-[20px] md:h-px md:w-auto"
          />
          <ol className="relative m-0 grid list-none gap-10 p-0 md:grid-cols-4 md:gap-8">
            {PROCESS.steps.map((step, index) => (
              <li
                key={step.title}
                className="reveal relative grid grid-cols-[40px_1fr] gap-5 md:grid-cols-1 md:gap-6"
                style={{ "--stagger": index } as CSSProperties}
              >
                <span className="relative z-10 grid size-10 place-items-center rounded-full border border-[var(--brand-line)] glass-control font-mono text-[13px] font-medium text-brand-text">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="glass glass-card glass-hover spotlight p-5 sm:p-6">
                  <h3>{step.title}</h3>
                  <p className="mt-2.5 max-w-[34ch] text-[15.5px]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Ridge from="page" to="band" seed={3} className="mt-[clamp(64px,8vw,104px)]" />
    </section>
  );
}
