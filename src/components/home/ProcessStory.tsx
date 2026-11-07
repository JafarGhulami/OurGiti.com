"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ICON } from "@/components/ui/icon-props";

type Step = { readonly phase: string; readonly title: string; readonly text: string };

/**
 * The process as a scroll story. At lg the left column (title, the four steps, the call to
 * action) stays pinned while four large panels scroll past on the right; the step whose panel
 * crosses the middle of the screen is active: its numeral fills, its text opens, and the rail
 * beside the list fills to it. The steps are links to their panels. Below lg the column is a
 * plain head and each panel carries its own step heading; nothing is pinned.
 */
export default function ProcessStory({
  title,
  lead,
  cta,
  steps,
  panels,
}: {
  title: string;
  lead: string;
  cta: string;
  steps: readonly Step[];
  panels: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="story" style={{ "--active": active, "--count": steps.length } as CSSProperties}>
      <div className="story-aside">
        <h2 id="process-title">{title}</h2>
        <p className="lead mt-5">{lead}</p>

        <ol className="story-list" aria-label="Steps">
          {steps.map((step, index) => (
            <li key={step.title} data-active={index === active || undefined}>
              <a
                href={`#process-step-${index + 1}`}
                className="story-step"
                aria-current={index === active ? "step" : undefined}
              >
                <span className="story-step-num" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="story-step-title">{step.title}</span>
                  <span className="story-step-more">
                    <span className="story-step-text">{step.text}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>

        <Link href="#contact" className="btn btn-primary mt-9">
          {cta} <ArrowRight {...ICON} size={17} />
        </Link>
      </div>

      <div className="story-panels">
        {panels.map((panel, index) => {
          const step = steps[index];
          return (
            <div
              key={step.title}
              id={`process-step-${index + 1}`}
              data-index={index}
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              className="story-panel"
            >
              <div className="story-panel-head">
                <span className="story-step-num" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="story-phase">{step.phase}</p>
                  <h3 className="mt-1 text-[20px] leading-tight">{step.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed">{step.text}</p>
                </div>
              </div>
              <div className="story-frame reveal">
                <span className="story-tag" aria-hidden>
                  <span className="ui-value text-brand-text">{String(index + 1).padStart(2, "0")}</span>
                  {step.phase}
                </span>
                {panel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
