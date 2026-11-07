"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { Check, Cloud, CodeXml, Headset, Network, type LucideProps } from "lucide-react";
import { APPROACH } from "@/data/home";

const ICONS: ComponentType<LucideProps>[] = [CodeXml, Cloud, Network, Headset];

/* Isometric geometry (SVG user units). Plates are 2:1 rhombi stacked down one axis. */
const VB_W = 640;
const VB_H = 440;
const CX = 196; // the stack's axis
const HW = 150; // half width of a plate
const HH = 72; // half height of a plate
const DEPTH = 12; // plate thickness
const TOPS = [92, 176, 260, 344]; // plate centres, top to bottom
const LABEL_X = 410; // where the labels begin

function rhombus(cy: number): string {
  return `M${CX} ${cy - HH}L${CX + HW} ${cy}L${CX} ${cy + HH}L${CX - HW} ${cy}Z`;
}

function leftFace(cy: number): string {
  return `M${CX - HW} ${cy}L${CX} ${cy + HH}L${CX} ${cy + HH + DEPTH}L${CX - HW} ${cy + DEPTH}Z`;
}

function rightFace(cy: number): string {
  return `M${CX} ${cy + HH}L${CX + HW} ${cy}L${CX + HW} ${cy + DEPTH}L${CX} ${cy + HH + DEPTH}Z`;
}

/** Etched lines across a plate, parallel to its edges, so it reads as a sheet of glass */
function etch(cy: number): string {
  const lines: string[] = [];
  for (const t of [0.33, 0.66]) {
    lines.push(
      `M${CX - HW + HW * t} ${cy - HH * t}L${CX + HW * t} ${cy + HH - HH * t}`,
      `M${CX - HW + HW * t} ${cy + HH * t}L${CX + HW * t} ${cy - HH + HH * t}`,
    );
  }
  return lines.join("");
}

/**
 * Your technology as an isometric stack of four glass plates (software, cloud, network,
 * devices), with one emerald core running through every plate: one team across every layer.
 * Each plate leads to its label. The highlight cycles through the layers; hovering or
 * focusing a plate or a label takes over, and the cycle stops under reduced motion. On
 * phones the drawing is cropped to the plates (no leaders) above a plain list. The list is the accessible content; the drawing
 * is decorative.
 */
export default function ApproachStack() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % TOPS.length), 2600);
    return () => window.clearInterval(timer);
  }, [held]);

  const take = (index: number) => {
    setHeld(true);
    setActive(index);
  };

  return (
    <div
      ref={rootRef}
      className="stack relative"
      onPointerLeave={() => setHeld(false)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <div className="relative mx-auto aspect-[320/440] w-full max-w-[300px] overflow-hidden md:aspect-[640/440] md:max-w-[600px] md:overflow-visible">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-y-0 -left-[11.25%] h-full w-[200%] max-w-none overflow-visible md:inset-0 md:w-full"
          aria-hidden
          focusable="false"
        >
          {/* the core, drawn first so plates sit over it; its pulse runs top to bottom */}
          <path d={`M${CX} ${TOPS[0] - 70}V${TOPS[3] + HH + DEPTH + 20}`} className="stack-core" />
          <path d={`M${CX} ${TOPS[0] - 70}V${TOPS[3] + HH + DEPTH + 20}`} className="stack-core-pulse" />

          {[...TOPS.keys()].reverse().map((index) => {
            const cy = TOPS[index];
            const Icon = ICONS[index];
            const on = index === active;
            return (
              <g
                key={index}
                className="stack-plate"
                data-active={on ? "" : undefined}
                onPointerEnter={() => take(index)}
              >
                <path d={leftFace(cy)} className="plate-left" />
                <path d={rightFace(cy)} className="plate-right" />
                <path d={rhombus(cy)} className="plate-top" />
                <path d={etch(cy)} className="plate-etch" />
                <Icon
                  x={CX - 92}
                  y={cy - 11}
                  width={22}
                  height={22}
                  strokeWidth={1.6}
                  className="plate-icon"
                />
                {/* where the core passes through */}
                <circle cx={CX} cy={cy} r={on ? 6 : 4.5} className="plate-node" />
                {/* leader to the label */}
                <path d={`M${CX + HW} ${cy}H${LABEL_X - 14}`} className="plate-leader" />
                <circle cx={LABEL_X - 14} cy={cy} r={2.5} className="plate-leader-dot" />
              </g>
            );
          })}
        </svg>

        {/* labels beside their plates (from md); a plain list below md */}
        <ol className="stack-labels m-0 hidden list-none p-0 md:block">
          {APPROACH.layers.map((layer, index) => (
            <li
              key={layer.title}
              className="stack-label absolute"
              style={{ top: `${(TOPS[index] / VB_H) * 100}%`, left: `${(LABEL_X / VB_W) * 100}%` }}
              data-active={index === active ? "" : undefined}
            >
              <button
                type="button"
                onPointerEnter={() => take(index)}
                onFocus={() => take(index)}
                className="stack-label-button"
              >
                <span className="stack-label-title">{layer.title}</span>
                <span className="stack-label-detail">{layer.detail}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ol className="m-0 mt-6 grid list-none gap-2 p-0 md:hidden">
        {APPROACH.layers.map((layer, index) => (
          <li key={layer.title}>
            <button
              type="button"
              onClick={() => take(index)}
              data-active={index === active ? "" : undefined}
              className="stack-row"
            >
              <Check size={16} strokeWidth={2.25} aria-hidden className="flex-none text-brand-text" />
              <span className="flex-1 text-left">
                <span className="block text-[15px] font-semibold text-heading">{layer.title}</span>
                <span className="block text-[13px] text-muted">{layer.detail}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
