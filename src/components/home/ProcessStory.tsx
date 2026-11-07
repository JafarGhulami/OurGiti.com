"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ICON } from "@/components/ui/icon-props";

type Step = { readonly phase: string; readonly title: string; readonly text: string };

/**
 * The process as a scroll story. At lg the left column (title, the four steps, the call to
 * action) stays pinned while four large panels scroll past on the right; the step whose panel
 * crosses the middle of the screen is active and its text opens.
 *
 * One emerald indicator glides between the step numerals and the rail fills exactly to its
 * centre. Both follow the numerals' measured positions every frame while the steps open and
 * close (their heights change, so a CSS-only calculation would drift), easing toward the
 * target; under reduced motion they jump. Choosing a step moves the indicator straight there
 * and holds it while the page scrolls past the panels in between.
 *
 * Below lg the column is a plain head and each panel carries its own step heading.
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
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<number | null>(null);
  const heldRef = useRef(false);

  // The active step follows the panel crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (heldRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Glide the indicator and rail fill to the active numeral, measuring as the layout settles.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offset = (el: HTMLElement | null | undefined) =>
      el ? el.getBoundingClientRect().top - nav.getBoundingClientRect().top : 0;
    const first = () => offset(numRefs.current[0]);
    const measure = () => ({
      target: offset(numRefs.current[active]) - first(),
      end: offset(numRefs.current[steps.length - 1]) - first(),
    });

    let frame = 0;
    const started = performance.now();
    let current = posRef.current ?? measure().target;

    const tick = (now: number) => {
      const { target, end } = measure();
      current = reduce ? target : current + (target - current) * 0.14;
      const settled = Math.abs(target - current) < 0.4 && now - started > 600;
      if (settled) current = target;
      posRef.current = current;
      nav.style.setProperty("--indicator-y", `${current.toFixed(2)}px`);
      nav.style.setProperty("--rail-end", `${end.toFixed(2)}px`);
      if (!settled) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Keep it aligned when the column reflows (fonts, resizing).
    const resize = new ResizeObserver(() => {
      if (frame) return;
      const { target, end } = measure();
      posRef.current = target;
      nav.style.setProperty("--indicator-y", `${target}px`);
      nav.style.setProperty("--rail-end", `${end}px`);
    });
    resize.observe(nav);

    return () => {
      cancelAnimationFrame(frame);
      frame = 0;
      resize.disconnect();
    };
  }, [active, steps.length]);

  // A chosen step holds until the page stops scrolling.
  function choose(index: number) {
    setActive(index);
    heldRef.current = true;
    const release = () => {
      heldRef.current = false;
      window.removeEventListener("scrollend", release);
    };
    window.addEventListener("scrollend", release);
    window.setTimeout(release, 1500);
  }

  return (
    <div className="story">
      <div className="story-aside">
        <h2 id="process-title">{title}</h2>
        <p className="lead mt-5">{lead}</p>

        <div ref={navRef} className="story-nav">
          <span className="story-rail" aria-hidden />
          <span className="story-rail-fill" aria-hidden />
          <span className="story-indicator" aria-hidden>
            <span key={active} className="story-indicator-num">
              {String(active + 1).padStart(2, "0")}
            </span>
          </span>
          <ol className="story-list" aria-label="Steps">
            {steps.map((step, index) => (
              <li key={step.title} data-active={index === active || undefined}>
                <a
                  href={`#process-step-${index + 1}`}
                  className="story-step"
                  aria-current={index === active ? "step" : undefined}
                  onClick={() => choose(index)}
                >
                  <span
                    ref={(el) => {
                      numRefs.current[index] = el;
                    }}
                    className="story-step-num"
                    aria-hidden
                  >
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
        </div>

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
