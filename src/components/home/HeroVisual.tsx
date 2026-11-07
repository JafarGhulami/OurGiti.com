import type { CSSProperties, ReactNode } from "react";
import { AppWindow, Building2, Cloud, DatabaseBackup, Laptop } from "lucide-react";
import { HERO } from "@/data/home";

/*
 * The hero's visual: a business drawn as a place in the Giti landscape. A valley seen in
 * perspective, with layered ridges fading into haze, a river winding out from between them
 * toward the viewer, and a topographic valley floor. The business's systems stand on the land
 * as beacons of light with frosted labels, linked by data arcs; its cloud floats in the sky.
 * There is no frame: the land fades into the page at every edge. Everything is illustrative
 * and the caption says so. Under reduced motion it is a still, finished scene.
 */

type Point = readonly [number, number];

/** The scene's coordinate space (5:4). The scene keeps this ratio so %-placed labels line up. */
const W = 600;
const H = 480;
const HORIZON = 210;
const VANISH: Point = [302, HORIZON];

const r = (v: number) => Math.round(v * 10) / 10;

/* ---------- Terrain ---------- */

type Peak = readonly [x: number, height: number, halfWidth: number];

/** A ridge silhouette: sharp-ish peaks (t^1.35) roughened by layered sines. */
function ridgeLine(base: number, peaks: Peak[], rough: number, seed: number) {
  const pts: Point[] = [];
  for (let x = -12; x <= W + 12; x += 6) {
    let h = 0;
    for (const [px, ph, pw] of peaks) {
      const t = Math.max(0, 1 - Math.abs(x - px) / pw);
      h = Math.max(h, ph * t ** 1.35);
    }
    const n =
      Math.sin(x * 0.083 + seed) * 0.6 +
      Math.sin(x * 0.21 + seed * 2.3) * 0.28 +
      Math.sin(x * 0.47 + seed * 3.7) * 0.12;
    h = Math.max(0, h + rough * n * Math.min(1, 0.25 + h / 40));
    pts.push([x, r(base - h)]);
  }
  const crest = `M${pts.map((p) => `${p[0]} ${p[1]}`).join("L")}`;
  return { crest, fill: `${crest}L${W + 12} ${H}L-12 ${H}Z` };
}

const RIDGES = [
  ridgeLine(
    HORIZON + 2,
    [
      [30, 96, 150],
      [212, 122, 160],
      [424, 146, 180],
      [612, 104, 140],
    ],
    5,
    0.6,
  ),
  ridgeLine(
    HORIZON + 4,
    [
      [-20, 108, 180],
      [128, 70, 120],
      [528, 110, 170],
    ],
    6,
    2.2,
  ),
  ridgeLine(
    HORIZON + 6,
    [
      [-40, 78, 160],
      [650, 84, 180],
    ],
    6,
    4.1,
  ),
];

/** Valley floor contours: wavy lines that crowd toward the horizon, as on a terrain map. */
const FLOOR_LINES = Array.from({ length: 11 }, (_, i) => {
  const y0 = HORIZON + 5 + (H - HORIZON) * ((i + 1) / 11) ** 1.85;
  const amp = 1 + i * 0.55;
  const pts: string[] = [];
  for (let x = -10; x <= W + 10; x += 20) {
    pts.push(`${x} ${r(y0 + Math.sin(x * 0.018 + i * 1.3) * amp + Math.sin(x * 0.041 + i) * amp * 0.5)}`);
  }
  return `M${pts.join("L")}`;
});

/** Lines running to the vanishing point give the floor its perspective. */
const FLOOR_RAYS = Array.from({ length: 13 }, (_, i) => {
  const bx = VANISH[0] + (i - 6) * 120;
  const t = 8 / (H - HORIZON);
  return `M${r(VANISH[0] + (bx - VANISH[0]) * t)} ${HORIZON + 8}L${bx} ${H}`;
});

/* ---------- River ---------- */

/** Catmull-Rom samples through points. */
function sample(points: Point[], per = 10) {
  const out: Point[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const [p1, p2] = [points[i], points[i + 1]];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    for (let s = 0; s < per; s++) {
      const t = s / per;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

const RIVER_LINE = sample([
  [302, HORIZON + 1],
  [296, 226],
  [322, 248],
  [298, 276],
  [334, 318],
  [404, 370],
  [450, 428],
  [474, 490],
]);

/** The river widens as it nears the viewer. */
const RIVER = (() => {
  const left: string[] = [];
  const right: string[] = [];
  RIVER_LINE.forEach((p, i) => {
    const a = RIVER_LINE[Math.max(0, i - 1)];
    const b = RIVER_LINE[Math.min(RIVER_LINE.length - 1, i + 1)];
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
    const len = Math.hypot(dx, dy) || 1;
    const w = 0.8 + 30 * Math.max(0, (p[1] - HORIZON) / (H - HORIZON)) ** 1.45;
    const [nx, ny] = [-dy / len, dx / len];
    left.push(`${r(p[0] + nx * w)} ${r(p[1] + ny * w)}`);
    right.push(`${r(p[0] - nx * w)} ${r(p[1] - ny * w)}`);
  });
  return {
    body: `M${left.join("L")}L${right.reverse().join("L")}Z`,
    current: `M${RIVER_LINE.map((p) => `${r(p[0])} ${r(p[1])}`).join("L")}`,
  };
})();

/* ---------- Systems ---------- */

type System = {
  key: string;
  label: string;
  status: string;
  icon: ReactNode;
  /** where it stands on the land (or floats, for the cloud) */
  at: Point;
  /** perspective scale: nearer is larger */
  depth: number;
  /** how high the arc from the office lifts, as a share of its length */
  lift: number;
  packet: { dur: number; reverse?: boolean };
  sky?: boolean;
};

const ICON = { size: 14, strokeWidth: 2, "aria-hidden": true } as const;

const OFFICE: Point = [236, 326];

const SYSTEMS: System[] = [
  {
    key: "app",
    label: "Booking app",
    status: "Live",
    icon: <AppWindow {...ICON} />,
    at: [104, 262],
    depth: 0.78,
    lift: 0.34,
    packet: { dur: 3.2 },
  },
  {
    key: "backups",
    label: "Backups",
    status: "Nightly",
    icon: <DatabaseBackup {...ICON} />,
    at: [476, 276],
    depth: 0.8,
    lift: 0.4,
    packet: { dur: 2.8, reverse: true },
  },
  {
    key: "remote",
    label: "Remote team",
    status: "6 online",
    icon: <Laptop {...ICON} />,
    at: [506, 384],
    depth: 1.12,
    lift: 0.3,
    packet: { dur: 3.6 },
  },
  {
    key: "cloud",
    label: "Cloud & email",
    status: "Synced",
    icon: <Cloud {...ICON} />,
    at: [420, 92],
    depth: 0.9,
    lift: 0.22,
    packet: { dur: 3.9, reverse: true },
    sky: true,
  },
];

/** Beam height, in scene units, for a beacon at this depth. */
const beam = (depth: number) => 44 * depth;

/** A data arc from the office to a system, lifted by `lift` of its length. */
function arc(to: System) {
  const [a, b] = [OFFICE, to.at];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const c: Point = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - len * to.lift];
  return `M${a[0]} ${a[1]}Q${r(c[0])} ${r(c[1])} ${b[0]} ${b[1]}`;
}

function pct(p: Point): CSSProperties {
  return { left: `${(p[0] / W) * 100}%`, top: `${(p[1] / H) * 100}%` };
}

function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

function Beacon({ at, depth, d }: { at: Point; depth: number; d: number }) {
  const [x, y] = at;
  const h = beam(depth);
  return (
    <g className="beacon" style={delay(d)}>
      <ellipse cx={x} cy={y} rx={20 * depth} ry={5.5 * depth} className="beacon-pulse" />
      <ellipse cx={x} cy={y} rx={11 * depth} ry={3 * depth} className="beacon-base" />
      <rect x={x - 0.75} y={y - h} width={1.5} height={h} fill="url(#hs-beam)" />
      <circle cx={x} cy={y} r={2.6 * depth} className="beacon-dot" />
    </g>
  );
}

function Label({
  system,
  d,
  hub = false,
}: {
  system: Pick<System, "label" | "status" | "icon" | "at" | "depth" | "sky">;
  d: number;
  hub?: boolean;
}) {
  const anchor: Point = system.sky ? system.at : [system.at[0], system.at[1] - beam(system.depth)];
  return (
    <div
      className={`scene-label ${hub ? "scene-label-hub" : ""} ${system.sky ? "scene-label-sky" : ""}`}
      style={{ ...pct(anchor), ...delay(d) }}
    >
      <span className="scene-label-icon">{system.icon}</span>
      <span className="grid leading-none">
        <span className="scene-label-name">{system.label}</span>
        <span className="scene-label-status">{system.status}</span>
      </span>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <figure className="relative m-0">
      <div
        role="img"
        aria-label="Illustration: a green valley with a river, where a business's main office is linked by data arcs to its booking app, backups, remote team and, in the sky, its cloud and email, all running normally."
        className="relative mx-auto max-w-[620px] lg:-mr-[12%] lg:-ml-[6%] lg:max-w-none"
      >
        <div className="hero-scene">
          <svg viewBox={`0 0 ${W} ${H}`} className="hero-scene-land absolute inset-0 size-full" aria-hidden>
            <defs>
              <radialGradient id="hs-sun" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" className="stop-sun" />
                <stop offset="1" className="stop-sun" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="hs-mist" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" className="stop-sky-horizon" stopOpacity="0" />
                <stop offset="1" className="stop-sky-horizon" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="hs-floor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" className="stop-sky-horizon" />
                <stop offset="0.35" className="stop-floor-far" />
                <stop offset="1" className="stop-floor-near" />
              </linearGradient>
              <linearGradient id="hs-river" gradientUnits="userSpaceOnUse" x1="0" y1={HORIZON} x2="0" y2={H}>
                <stop offset="0" className="stop-river-far" />
                <stop offset="1" className="stop-river-near" />
              </linearGradient>
              <linearGradient id="hs-beam" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" className="stop-beam" />
                <stop offset="1" className="stop-beam" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hs-fade-g" gradientUnits="userSpaceOnUse" x1="0" y1={HORIZON} x2="0" y2={H}>
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
                <stop offset="1" stopColor="#fff" stopOpacity="1" />
              </linearGradient>
              <mask id="hs-fade">
                <rect x="0" y={HORIZON} width={W} height={H - HORIZON} fill="url(#hs-fade-g)" />
              </mask>
            </defs>

            {/* Sky, its light, and the ridges receding into haze */}
            <circle cx="410" cy="196" r="230" fill="url(#hs-sun)" />
            <g className="scene-ridges">
              <path d={RIDGES[0].fill} className="ridge-far" />
              <path d={RIDGES[0].crest} className="ridge-crest ridge-crest-far" />
              <rect y="110" width={W} height={HORIZON - 110} fill="url(#hs-mist)" />
              <path d={RIDGES[1].fill} className="ridge-mid" />
              <path d={RIDGES[1].crest} className="ridge-crest ridge-crest-mid" />
              <rect y="164" width={W} height={HORIZON - 164} fill="url(#hs-mist)" opacity="0.6" />
              <path d={RIDGES[2].fill} className="ridge-near" />
              <path d={RIDGES[2].crest} className="ridge-crest" />
              <rect y={HORIZON - 30} width={W} height={30} fill="url(#hs-mist)" opacity="0.9" />
            </g>

            {/* The valley floor, mapped */}
            <rect y={HORIZON} width={W} height={H - HORIZON} fill="url(#hs-floor)" />
            <g mask="url(#hs-fade)" className="floor-lines">
              {FLOOR_RAYS.map((d) => (
                <path key={d} d={d} className="floor-ray" />
              ))}
              {FLOOR_LINES.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <line x1="0" y1={HORIZON} x2={W} y2={HORIZON} className="horizon-line" />

            {/* The river */}
            <path d={RIVER.body} fill="url(#hs-river)" />
            <path d={RIVER.body} className="river-bank" />
            <path d={RIVER.current} className="river-current" />

            {/* Data arcs from the office */}
            {SYSTEMS.map((system, i) => (
              <g key={system.key} style={delay(520 + i * 120)}>
                <path d={arc(system)} pathLength={1} className="scene-arc-glow" />
                <path d={arc(system)} pathLength={1} className="scene-arc" />
              </g>
            ))}

            <Beacon at={OFFICE} depth={1.15} d={300} />
            {SYSTEMS.filter((s) => !s.sky).map((system, i) => (
              <Beacon key={system.key} at={system.at} depth={system.depth} d={700 + i * 120} />
            ))}
            <circle cx={SYSTEMS[3].at[0]} cy={SYSTEMS[3].at[1]} r="3" className="beacon-dot" />

            <g className="scene-packets">
              {SYSTEMS.map((system, i) =>
                ["scene-packet-halo", "scene-packet"].map((cls) => (
                  <circle key={`${system.key}-${cls}`} r={cls === "scene-packet" ? 2.6 : 6.5} className={cls}>
                    <animateMotion
                      dur={`${system.packet.dur}s`}
                      begin={`${i * 0.5}s`}
                      repeatCount="indefinite"
                      path={arc(system)}
                      keyPoints={system.packet.reverse ? "1;0" : "0;1"}
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.45 0 0.55 1"
                    />
                  </circle>
                )),
              )}
            </g>
          </svg>

          <Label
            hub
            d={360}
            system={{
              label: "Main office",
              status: "18 devices",
              icon: <Building2 {...ICON} />,
              at: OFFICE,
              depth: 1.15,
            }}
          />
          {SYSTEMS.map((system, i) => (
            <Label key={system.key} system={system} d={780 + i * 120} />
          ))}
        </div>
      </div>
      <figcaption className="mt-5 text-[13px] text-muted lg:text-right">{HERO.visualCaption}</figcaption>
    </figure>
  );
}
