import type { CSSProperties, ReactNode } from "react";
import {
  CalendarCheck,
  Check,
  DatabaseBackup,
  FileText,
  Headset,
  Laptop,
  Network,
  RefreshCw,
  Smartphone,
  Wifi,
} from "lucide-react";

/*
 * What each step of the process produces, as product-style views: the first conversation,
 * the agreed plan, the rollout, and an ordinary day of support. Each view's parts arrive in
 * turn when it is shown (`.stagger-in`, keyed by `--i`), and its one change of state plays on
 * the shared swap cycle. Base styles are the finished picture, which is what reduced motion
 * shows. Everything is illustrative; the section's caption says so.
 */

const SMALL = { size: 15, strokeWidth: 1.75, "aria-hidden": true } as const;

function i(n: number): CSSProperties {
  return { "--i": n } as CSSProperties;
}

function Swap({ from, to }: { from: ReactNode; to: ReactNode }) {
  return (
    <span className="swap">
      <span className="swap-a">{from}</span>
      <span className="swap-b">{to}</span>
    </span>
  );
}

/** A product window: a surface card with a title row. */
function Window({
  title,
  icon,
  aside,
  children,
}: {
  title: string;
  icon: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="process-window">
      <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
        <span className="icon-tile size-8 rounded-[9px]">{icon}</span>
        <span className="flex-1 text-[14px] font-semibold text-heading">{title}</span>
        {aside}
      </div>
      <div className="stagger-in p-5">{children}</div>
    </div>
  );
}

/** 01: the first conversation, ending in a booked call. */
export function TalkVisual() {
  return (
    <Window
      title="New inquiry"
      icon={<FileText {...SMALL} />}
      aside={<span className="status status-info">Received</span>}
    >
      <div style={i(0)}>
        <p className="ui-label">Your team</p>
        <p className="process-bubble mt-1.5">
          We are moving offices in March and need Wi-Fi, 20 workstations and a booking app.
        </p>
      </div>
      <div className="mt-4 grid justify-items-end" style={i(1)}>
        <p className="ui-label">OurGiti</p>
        <p className="process-bubble process-bubble-out mt-1.5">
          Thanks, that is a good fit for us. Can we talk it through on a short call this week?
        </p>
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-lg bg-[var(--well)] px-3.5 py-3" style={i(2)}>
        <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-brand-text">
          <CalendarCheck {...SMALL} />
        </span>
        <span className="grid flex-1 leading-tight">
          <span className="text-[13.5px] font-medium text-heading">Intro call booked</span>
          <span className="ui-value mt-1 text-[11.5px] text-muted">Tue · 10:00 AM · 30 min</span>
        </span>
        <span className="status status-ok">Confirmed</span>
      </div>
    </Window>
  );
}

/** 02: the plan, with scope and timeline, agreed before work starts. */
export function PlanVisual() {
  const scope = [
    "Network, cabling and Wi-Fi",
    "20 workstations set up",
    "Booking app, web and mobile",
    "Monthly support and backups",
  ];
  const timeline = [
    { label: "Plan", from: 0, to: 22 },
    { label: "Build", from: 18, to: 78 },
    { label: "Launch", from: 74, to: 100 },
  ];
  return (
    <Window
      title="Office move plan"
      icon={<FileText {...SMALL} />}
      aside={
        <Swap
          from={<span className="status status-warn">Draft</span>}
          to={<span className="status status-ok">Approved</span>}
        />
      }
    >
      <p className="ui-label" style={i(0)}>
        Scope
      </p>
      <ul className="m-0 mt-2.5 grid list-none gap-2 p-0">
        {scope.map((item, n) => (
          <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-heading" style={i(n + 1)}>
            <span className="grid size-[18px] place-items-center rounded-full bg-brand-soft text-brand-text">
              <Check size={11} strokeWidth={3} aria-hidden />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p className="ui-label mt-5" style={i(5)}>
        Timeline
      </p>
      <div className="mt-2.5 grid gap-2" style={i(6)}>
        {timeline.map((bar, n) => (
          <div key={bar.label} className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3">
            <span className="text-[12px] text-muted">{bar.label}</span>
            <span className="relative h-2 rounded-full bg-[var(--well)]">
              <span
                className="plan-bar absolute inset-y-0 rounded-full bg-brand"
                style={{ left: `${bar.from}%`, right: `${100 - bar.to}%`, "--i": n } as CSSProperties}
              />
            </span>
          </div>
        ))}
        <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-3">
          <span />
          <span className="ui-value flex justify-between text-[11px] text-muted">
            <span>Wk 1</span>
            <span>Wk 2</span>
            <span>Wk 3</span>
            <span>Wk 4</span>
          </span>
        </div>
      </div>
    </Window>
  );
}

/** 03: the rollout, tracked to done. */
export function BuildVisual() {
  return (
    <Window
      title="Rollout"
      icon={<Network {...SMALL} />}
      aside={<span className="ui-value text-[12px] text-muted">Week 3</span>}
    >
      <ul className="m-0 grid list-none gap-4 p-0">
        <Row
          n={0}
          icon={<Network {...SMALL} />}
          label="Cabling and network"
          value={<span className="ui-value text-ok">Done</span>}
        />
        <Row
          n={1}
          icon={<Wifi {...SMALL} />}
          label="Wi-Fi access points"
          value={<span className="ui-value text-ok">3 / 3</span>}
        />
        <Row
          n={2}
          icon={<Laptop {...SMALL} />}
          label="Workstations"
          value={
            <Swap
              from={<span className="ui-value">14 / 20</span>}
              to={<span className="ui-value text-ok">20 / 20</span>}
            />
          }
          bar
        />
        <Row
          n={3}
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
  );
}

function Row({
  n,
  icon,
  label,
  value,
  bar = false,
}: {
  n: number;
  icon: ReactNode;
  label: string;
  value: ReactNode;
  bar?: boolean;
}) {
  return (
    <li style={i(n)}>
      <div className="flex items-center gap-3 text-[13.5px]">
        <span className="text-brand-text">{icon}</span>
        <span className="flex-1 text-heading">{label}</span>
        {value}
      </div>
      <span className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-[var(--well)]">
        <span className={`block h-full rounded-full bg-brand ${bar ? "fill-run origin-left" : ""}`} />
      </span>
    </li>
  );
}

/** 04: an ordinary day of support. */
export function CareVisual() {
  const rows = [
    { icon: <Headset {...SMALL} />, title: "Ticket #1042", sub: "Front desk printer", live: true },
    {
      icon: <RefreshCw {...SMALL} />,
      title: "Booking app update",
      sub: "Released to staff",
      time: "8:15 AM",
    },
    {
      icon: <DatabaseBackup {...SMALL} />,
      title: "Nightly backup",
      sub: "All files, 3 copies",
      time: "2:00 AM",
    },
  ];
  return (
    <Window
      title="Today"
      icon={<Headset {...SMALL} />}
      aside={
        <span className="flex items-center gap-2 text-[12.5px] text-muted">
          <span className="ping relative size-1.5 rounded-full bg-ok" aria-hidden />
          Activity
        </span>
      }
    >
      <ul className="m-0 -my-1 grid list-none p-0">
        {rows.map((row, n) => (
          <li
            key={row.title}
            className="flex items-center gap-3.5 border-t border-border py-3.5 first:border-t-0"
            style={i(n)}
          >
            <span className="icon-tile size-9 rounded-[10px]">{row.icon}</span>
            <span className="grid min-w-0 flex-1 leading-tight">
              <span className="truncate text-[14px] font-medium text-heading">{row.title}</span>
              <span className="mt-1 truncate text-[12.5px] text-muted">{row.sub}</span>
            </span>
            {row.live ? (
              <Swap
                from={<span className="status status-warn">In progress</span>}
                to={<span className="status status-ok">Resolved</span>}
              />
            ) : (
              <span className="ui-value text-[12px] text-muted">{row.time}</span>
            )}
          </li>
        ))}
      </ul>
    </Window>
  );
}
