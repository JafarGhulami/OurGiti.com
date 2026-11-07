import type { CSSProperties } from "react";

/**
 * A mountain range in three layers (far, mid, near), drawn as geometry: the Giti landscape
 * at every edge where one section meets the next, so all section transitions work the same
 * way. The layers step from the section above (`from`) to the section below (`to`): far is
 * mostly `from`, mid is mostly `to`, and the near layer is exactly `to`, so the mountains
 * become the next section. A thin emerald line runs along the near crest.
 *
 * Grounds (globals.css, declared on :root only so they resolve the same inside .inverse):
 *   page  --ground-page   white by day, near-black green by night
 *   band  --ground-band   green-gray by day, a shade lighter by night
 *   deep  --ground-deep   the deep-green band and footer, both schemes
 *
 * Peaks are sums of triangle waves (sharp summits, rugged crests). `seed` shifts the
 * skyline so no two edges on a page are the same range.
 */

export type Ground = "page" | "band" | "deep";

const W = 1440;
const H = 200;

function tri(t: number): number {
  const f = t - Math.floor(t);
  return 1 - Math.abs(2 * f - 1);
}

function range(base: number, amp: number, terms: [number, number, number][], seed: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 8) {
    let h = 0;
    for (const [k, ph, a] of terms) h += a * tri((k * x) / W + ph + seed * 0.37) ** 1.6;
    h += 0.1 * tri((17 * x) / W + seed) + 0.05 * tri((41 * x) / W + seed * 0.5);
    pts.push(`${x} ${(base - amp * h).toFixed(1)}`);
  }
  return `M0 ${H}L${pts.join("L")}L${W} ${H}Z`;
}

function layers(seed: number) {
  const far = range(
    118,
    70,
    [
      [2, 0.15, 0.7],
      [3, 0.6, 0.5],
      [5, 0.3, 0.3],
    ],
    seed + 0.2,
  );
  const mid = range(
    150,
    58,
    [
      [3, 0.45, 0.6],
      [4, 0.1, 0.45],
      [7, 0.7, 0.25],
    ],
    seed + 0.6,
  );
  const near = range(
    184,
    44,
    [
      [2, 0.8, 0.5],
      [5, 0.35, 0.35],
      [9, 0.1, 0.2],
    ],
    seed + 0.9,
  );
  const crest = near.replace(/^M0 \d+L/, "M").replace(/L1440 \d+Z$/, "");
  return { far, mid, near, crest };
}

const cache = new Map<number, ReturnType<typeof layers>>();

export default function Ridge({
  from,
  to,
  seed = 0,
  className = "",
}: {
  from: Ground;
  to: Ground;
  seed?: number;
  className?: string;
}) {
  if (!cache.has(seed)) cache.set(seed, layers(seed));
  const { far, mid, near, crest } = cache.get(seed)!;
  const style = {
    "--ridge-from": `var(--ground-${from})`,
    "--ridge-to": `var(--ground-${to})`,
  } as CSSProperties;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      style={style}
      className={`ridge relative -mb-px block h-[clamp(72px,10vw,150px)] w-full ${className}`}
    >
      <path d={far} className="ridge-far" />
      <path d={mid} className="ridge-mid" />
      <path d={near} className="ridge-near" />
      <path d={crest} className="ridge-crest" />
    </svg>
  );
}
