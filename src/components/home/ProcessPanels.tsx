import type { CSSProperties, ReactNode } from "react";
import {
  CalendarDays,
  Check,
  CircleCheck,
  DatabaseBackup,
  FileText,
  Headset,
  Inbox,
  Laptop,
  Network,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react";

/*
 * The four panels of the process story: what each step produces, composed as layered product
 * views on a lit stage (a main window, an overlapping card, a floating chip). Built in markup
 * so they follow the scheme; one change of state per panel plays on the shared swap cycle.
 * Base styles are the finished picture, which is what reduced motion shows. Everything is
 * illustrative; the section caption says so.
 */

const SMALL = { size: 15, strokeWidth: 1.75, "aria-hidden": true } as const;

function Swap({ from, to }: { from: ReactNode; to: ReactNode }) {
  return (
    <span className="swap">
      <span className="swap-a">{from}</span>
      <span className="swap-b">{to}</span>
    </span>
  );
}

function Window({
  title,
  icon,
  aside,
  children,
  className = "",
}: {
  title: string;
  icon: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`story-window ${className}`}>
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="icon-tile size-8 rounded-[9px]">{icon}</span>
        <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-heading">{title}</span>
        {aside}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`story-chip glass glass-strong ${className}`}>{children}</div>;
}

function Stage({ children, flip = false }: { children: ReactNode; flip?: boolean }) {
  return (
    <div className="story-stage" data-flip={flip || undefined} aria-hidden>
      {children}
    </div>
  );
}

/* ---------- 01 Talk to us ---------- */

export function TalkPanel() {
  const days = [
    { d: "Mon", n: 9 },
    { d: "Tue", n: 10, on: true },
    { d: "Wed", n: 11 },
    { d: "Thu", n: 12 },
    { d: "Fri", n: 13 },
  ];
  return (
    <Stage>
      <Window
        title="New inquiry"
        icon={<Inbox {...SMALL} />}
        aside={<span className="status status-info">New</span>}
        className="story-main"
      >
        <p className="ui-label">Subject</p>
        <p className="mt-1 text-[14px] font-medium text-heading">Office move in March</p>
        <p className="story-bubble mt-3">
          We are moving offices in March and need Wi-Fi, 20 workstations and a booking app for our clients.
        </p>
        <p className="ui-label mt-4">What you need</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Wi-Fi", "20 workstations", "Booking app", "Support"].map((tag) => (
            <span key={tag} className="story-tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </Window>

      <Window
        title="Intro call"
        icon={<CalendarDays {...SMALL} />}
        aside={
          <Swap
            from={<span className="status status-warn">Proposed</span>}
            to={<span className="status status-ok">Booked</span>}
          />
        }
        className="story-side"
      >
        <div className="grid grid-cols-5 gap-1.5 text-center">
          {days.map((day) => (
            <span key={day.d} className={`story-day ${day.on ? "story-day-on" : ""}`}>
              <span className="text-[10.5px]">{day.d}</span>
              <span className="text-[15px] font-semibold">{day.n}</span>
            </span>
          ))}
        </div>
        <p className="ui-value mt-3 text-[12px] text-muted">Tue · 10:00 AM · 30 min</p>
      </Window>

      <Chip className="story-chip-top">
        <span className="ping relative size-1.5 rounded-full bg-ok" />
        Inquiry received
      </Chip>
    </Stage>
  );
}

/* ---------- 02 Get a clear plan ---------- */

export function PlanPanel() {
  const scope = [
    "Network, cabling and Wi-Fi",
    "20 workstations set up",
    "Booking app, web and mobile",
    "Monthly support and backups",
  ];
  const bars = [
    { label: "Plan", from: 0, to: 24 },
    { label: "Build", from: 20, to: 78 },
    { label: "Launch", from: 74, to: 100 },
  ];
  return (
    <Stage flip>
      <Window
        title="Office move plan"
        icon={<FileText {...SMALL} />}
        aside={
          <Swap
            from={<span className="status status-warn">Draft</span>}
            to={<span className="status status-ok">Approved</span>}
          />
        }
        className="story-main"
      >
        <p className="ui-label">Scope</p>
        <ul className="m-0 mt-2.5 grid list-none gap-2 p-0">
          {scope.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-heading">
              <span className="grid size-[18px] flex-none place-items-center rounded-full bg-brand-soft text-brand-text">
                <Check size={11} strokeWidth={3} aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="ui-label mt-5">Timeline</p>
        <div className="mt-2.5 grid gap-2">
          {bars.map((bar, n) => (
            <div key={bar.label} className="grid grid-cols-[50px_minmax(0,1fr)] items-center gap-3">
              <span className="text-[12px] text-muted">{bar.label}</span>
              <span className="relative h-2 rounded-full bg-[var(--well)]">
                <span
                  className="story-bar absolute inset-y-0 rounded-full bg-brand"
                  style={{ left: `${bar.from}%`, right: `${100 - bar.to}%`, "--n": n } as CSSProperties}
                />
              </span>
            </div>
          ))}
          <div className="grid grid-cols-[50px_minmax(0,1fr)] gap-3">
            <span />
            <span className="ui-value flex justify-between text-[10.5px] text-muted">
              <span>Wk 1</span>
              <span>Wk 2</span>
              <span>Wk 3</span>
              <span>Wk 4</span>
            </span>
          </div>
        </div>
      </Window>

      <Window title="Floor plan · Wi-Fi" icon={<Wifi {...SMALL} />} className="story-side">
        <FloorPlan />
        <p className="mt-2.5 flex items-center justify-between text-[12px] text-muted">
          <span>3 access points</span>
          <span className="ui-value text-ok">Full coverage</span>
        </p>
      </Window>

      <Chip className="story-chip-top">
        <CircleCheck size={14} strokeWidth={2} className="text-brand-text" aria-hidden />
        Scope agreed before work starts
      </Chip>
    </Stage>
  );
}

/** An office floor plan with three access points and their coverage. */
function FloorPlan() {
  const aps: [number, number][] = [
    [52, 46],
    [148, 40],
    [112, 104],
  ];
  return (
    <svg viewBox="0 0 200 140" className="story-floor block w-full" aria-hidden>
      <g className="story-floor-cover">
        {aps.map(([x, y]) => (
          <circle key={`c${x}`} cx={x} cy={y} r="46" />
        ))}
      </g>
      <g className="story-floor-walls">
        <rect x="6" y="6" width="188" height="128" rx="4" />
        <path d="M6 76H82V134M82 76V6M126 6V60H194M126 60V76H150V134" />
      </g>
      <g className="story-floor-labels">
        <text x="16" y="22">
          Open office
        </text>
        <text x="136" y="22">
          Meeting
        </text>
        <text x="16" y="92">
          Reception
        </text>
        <text x="160" y="92">
          Server
        </text>
      </g>
      {aps.map(([x, y]) => (
        <g key={`a${x}`}>
          <circle cx={x} cy={y} r="9" className="story-floor-ring" />
          <circle cx={x} cy={y} r="4" className="story-floor-ap" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- 03 We build and install ---------- */

export function BuildPanel() {
  return (
    <Stage>
      <Window
        title="Rollout"
        icon={<Network {...SMALL} />}
        aside={<span className="ui-value text-[12px] text-muted">Week 3</span>}
        className="story-main"
      >
        <ul className="m-0 grid list-none gap-4 p-0">
          <Progress
            icon={<Network {...SMALL} />}
            label="Cabling and network"
            value={<span className="ui-value text-ok">Done</span>}
          />
          <Progress
            icon={<Wifi {...SMALL} />}
            label="Wi-Fi access points"
            value={<span className="ui-value text-ok">3 / 3</span>}
          />
          <Progress
            icon={<Laptop {...SMALL} />}
            label="Workstations"
            value={
              <Swap
                from={<span className="ui-value">14 / 20</span>}
                to={<span className="ui-value text-ok">20 / 20</span>}
              />
            }
            run
          />
          <Progress
            icon={<Smartphone {...SMALL} />}
            label="Booking app"
            value={
              <Swap
                from={<span className="status status-info">Testing</span>}
                to={<span className="status status-ok">Live</span>}
              />
            }
          />
        </ul>
      </Window>

      <div className="story-side story-phone">
        <div className="mx-auto mb-2.5 h-1 w-9 rounded-full bg-[var(--border-strong)]" />
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-heading">Book a visit</span>
          <span className="status status-ok">Live</span>
        </div>
        <p className="ui-label mt-2.5">Tuesday</p>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {["9:00", "10:30", "13:00", "14:30", "15:15", "16:00"].map((t, n) => (
            <span key={t} className={`story-slot ${n === 3 ? "story-slot-on" : ""}`}>
              {t}
            </span>
          ))}
        </div>
        <span className="story-book mt-3">Book 14:30</span>
      </div>

      <Chip className="story-chip-top">
        <ShieldCheck size={14} strokeWidth={2} className="text-brand-text" aria-hidden />
        Tested with your team
      </Chip>
    </Stage>
  );
}

function Progress({
  icon,
  label,
  value,
  run = false,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  run?: boolean;
}) {
  return (
    <li>
      <div className="flex items-center gap-3 text-[13.5px]">
        <span className="text-brand-text">{icon}</span>
        <span className="flex-1 text-heading">{label}</span>
        {value}
      </div>
      <span className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-[var(--well)]">
        <span className={`block h-full rounded-full bg-brand ${run ? "fill-run" : ""}`} />
      </span>
    </li>
  );
}

/* ---------- 04 We keep it running ---------- */

export function CarePanel() {
  const rows = [
    { icon: <Headset {...SMALL} />, title: "Ticket #1042", sub: "Front desk printer", live: true },
    {
      icon: <RefreshCw {...SMALL} />,
      title: "Booking app update",
      sub: "Released to staff",
      time: "8:15 AM",
    },
    { icon: <ShieldCheck {...SMALL} />, title: "Security updates", sub: "18 devices", time: "3:00 AM" },
    {
      icon: <DatabaseBackup {...SMALL} />,
      title: "Nightly backup",
      sub: "All files, 3 copies",
      time: "2:00 AM",
    },
  ];
  // 30 days of checks; one day had a short incident, resolved
  const days = Array.from({ length: 30 }, (_, n) => (n === 19 ? "warn" : "ok"));
  return (
    <Stage flip>
      <Window
        title="Today"
        icon={<Headset {...SMALL} />}
        aside={
          <span className="flex items-center gap-2 text-[12.5px] text-muted">
            <span className="ping relative size-1.5 rounded-full bg-ok" />
            Activity
          </span>
        }
        className="story-main"
      >
        <ul className="m-0 -my-1 grid list-none p-0">
          {rows.map((row) => (
            <li
              key={row.title}
              className="flex items-center gap-3 border-t border-border py-3 first:border-t-0"
            >
              <span className="icon-tile size-8 rounded-[9px]">{row.icon}</span>
              <span className="grid min-w-0 flex-1 leading-tight">
                <span className="truncate text-[13.5px] font-medium text-heading">{row.title}</span>
                <span className="mt-1 truncate text-[12px] text-muted">{row.sub}</span>
              </span>
              {row.live ? (
                <Swap
                  from={<span className="status status-warn">In progress</span>}
                  to={<span className="status status-ok">Resolved</span>}
                />
              ) : (
                <span className="ui-value text-[11.5px] text-muted">{row.time}</span>
              )}
            </li>
          ))}
        </ul>
      </Window>

      <Window title="Health" icon={<ShieldCheck {...SMALL} />} className="story-side">
        <p className="flex items-center gap-2 text-[13.5px] font-medium text-heading">
          <span className="size-2 rounded-full bg-ok" />
          All systems normal
        </p>
        <div className="mt-3 flex h-9 items-end gap-[3px]">
          {days.map((state, n) => (
            <span
              key={n}
              className={`story-day-bar ${state === "warn" ? "story-day-bar-warn" : ""}`}
              style={{ "--n": n } as CSSProperties}
            />
          ))}
        </div>
        <p className="ui-value mt-2 flex justify-between text-[10.5px] text-muted">
          <span>30 days ago</span>
          <span>Today</span>
        </p>
      </Window>

      <Chip className="story-chip-top">
        <span className="ping relative size-1.5 rounded-full bg-ok" />
        Support plan · ongoing
      </Chip>
    </Stage>
  );
}
