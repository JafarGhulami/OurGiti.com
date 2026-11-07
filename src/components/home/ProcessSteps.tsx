"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

type Step = { readonly title: string; readonly text: string };

/** Autoplay runs only on wide screens, and never under reduced motion. */
const AUTOPLAY_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(AUTOPLAY_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * The process as a walkthrough. At lg the steps are a list on the left and the active step's
 * view fills the stage on the right; while the section is in view the steps advance on their
 * own, a progress line filling under the active one (CSS, so hovering or focusing the list
 * pauses it). Choosing a step stops autoplay. Below lg every step shows its view inline, and
 * nothing moves on its own. The views remount when shown, so their small animations start
 * from the beginning each time.
 */
export default function ProcessSteps({ steps, panels }: { steps: readonly Step[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const autoplay = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(AUTOPLAY_QUERY).matches,
    () => false,
  );
  const playing = autoplay && inView && !chosen;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function show(index: number) {
    setActive(index);
    setRound((r) => r + 1);
  }

  return (
    <div ref={rootRef} className="process-steps">
      <ol className="process-list">
        {steps.map((step, index) => {
          const isActive = index === active;
          return (
            <li
              key={step.title}
              className="process-step"
              data-active={isActive || undefined}
              style={{ "--row": index + 1 } as CSSProperties}
            >
              <button
                type="button"
                className="process-step-button"
                aria-controls={`process-view-${index}`}
                aria-expanded={isActive}
                onClick={() => {
                  setChosen(true);
                  if (!isActive) show(index);
                }}
              >
                <span className="process-step-num" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid min-w-0 gap-1.5">
                  <span className="process-step-title">{step.title}</span>
                  <span className="process-step-text">{step.text}</span>
                </span>
                {playing && isActive ? (
                  <span
                    key={round}
                    aria-hidden
                    className="process-step-progress"
                    onAnimationEnd={() => show((active + 1) % steps.length)}
                  />
                ) : null}
              </button>
              <div id={`process-view-${index}`} className="process-view">
                <div key={isActive ? `on-${round}` : "off"} className="process-stage">
                  {panels[index]}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
