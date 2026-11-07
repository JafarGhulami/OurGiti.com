import type { ReactNode } from "react";
import {
  Cloud,
  DatabaseBackup,
  Globe,
  KeyRound,
  Lock,
  Mail,
  Monitor,
  RefreshCw,
  Router,
  Server,
  ShieldCheck,
  Wifi,
} from "lucide-react";

/**
 * Product-style visuals for the service cards, built in markup so they follow the colour
 * scheme. Each depicts the kind of work in a service; names and values are illustrative
 * (the bento's caption says so). Mono type is kept to data: times, counts and states.
 */

const SMALL = { size: 15, strokeWidth: 1.75, "aria-hidden": true } as const;

/**
 * A tinted well that frames a visual; no border, so cards never nest boxes in boxes. It fills
 * the rest of its card, so cards sharing a bento row end level.
 */
function Well({ children, className = "justify-center" }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative flex flex-1 flex-col overflow-hidden rounded-xl bg-[var(--well)] p-4 sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

/** A custom web app (bookings) in a browser frame, with the matching mobile app beside it. */
export function SoftwareVisual() {
  const rows = [
    { name: "Team review", time: "09:30", status: "Confirmed", ok: true },
    { name: "Vendor call", time: "11:00", status: "Confirmed", ok: true },
    { name: "Onboarding", time: "14:15", status: "Pending", ok: false },
    { name: "Client call", time: "15:30", status: "Confirmed", ok: true },
    { name: "Board prep", time: "16:45", status: "Confirmed", ok: true },
  ];
  return (
    <Well className="justify-end pb-0 sm:pb-0">
      <div className="screen relative rounded-b-none border-b-0 sm:mr-[104px]">
        <div className="screen-bar">
          <i />
          <i />
          <i />
          <span className="ml-3 truncate rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted">
            app.yourcompany.com
          </span>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)]">
          <div className="hidden content-start gap-1 border-r border-border p-3 sm:grid">
            {["Bookings", "Calendar", "Clients", "Reports"].map((item, index) => (
              <span
                key={item}
                className={`rounded-md px-2 py-1 text-[12px] ${index === 0 ? "bg-brand-soft font-medium text-brand-text" : "text-muted"}`}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-semibold text-heading">Today&rsquo;s bookings</span>
              <span className="rounded-md bg-brand px-2 py-1 text-[11px] font-medium text-on-brand">New</span>
            </div>
            <ul className="m-0 mt-3 grid list-none grid-cols-[minmax(0,1fr)] gap-0 p-0">
              {rows.map((row) => (
                <li
                  key={row.name}
                  className="flex items-center gap-3 border-t border-border py-2 text-[12.5px] first:border-t-0"
                >
                  <span className="ui-value w-10 flex-none text-muted">{row.time}</span>
                  <span className="min-w-0 flex-1 truncate text-text">{row.name}</span>
                  <span className={`status ${row.ok ? "status-ok" : "status-warn"}`}>{row.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="screen absolute right-4 bottom-[-24px] hidden w-[124px] rounded-[18px] p-2.5 sm:block">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-[var(--border-strong)]" />
        <p className="text-[11px] font-semibold text-heading">Bookings</p>
        {rows.slice(0, 4).map((row) => (
          <div key={row.name} className="mt-1.5 rounded-md bg-bg-subtle px-2 py-1.5">
            <span className="ui-value block text-[11px] text-muted">{row.time}</span>
            <span className="mt-0.5 block truncate text-[11px] text-heading">{row.name}</span>
          </div>
        ))}
      </div>
    </Well>
  );
}

function TopoNode({ icon, label, status }: { icon: ReactNode; label: string; status?: string }) {
  return (
    <div className="relative z-10 flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 shadow-[var(--shadow-sm)]">
      <span className="text-brand-text">{icon}</span>
      <span className="flex-1 text-[12.5px] font-medium text-heading">{label}</span>
      {status ? (
        <span className="ui-value flex items-center gap-1.5 text-[11.5px] text-muted">
          <span className="size-1.5 rounded-full bg-ok" />
          {status}
        </span>
      ) : null}
    </div>
  );
}

/** A small office network, top to bottom: internet, firewall, switch, then what hangs off it. */
export function NetworkVisual() {
  return (
    <Well>
      <div className="relative grid gap-3">
        <span aria-hidden className="absolute top-4 bottom-12 left-[21px] w-px bg-[var(--brand-line)]" />
        <TopoNode icon={<Globe {...SMALL} />} label="Internet" status="Up" />
        <TopoNode icon={<ShieldCheck {...SMALL} />} label="Firewall" status="Active" />
        <TopoNode icon={<Router {...SMALL} />} label="Core switch" status="Up" />
        <div className="relative z-10 grid grid-cols-3 gap-2">
          {[
            { icon: <Wifi {...SMALL} />, label: "Wi-Fi", status: "3 APs" },
            { icon: <Monitor {...SMALL} />, label: "PCs", status: "18" },
            { icon: <Server {...SMALL} />, label: "Server", status: "OK" },
          ].map((device) => (
            <div
              key={device.label}
              className="grid justify-items-center gap-1 rounded-lg border border-border bg-surface px-2 py-2.5 text-center shadow-[var(--shadow-sm)]"
            >
              <span className="text-brand-text">{device.icon}</span>
              <span className="text-[12px] font-medium text-heading">{device.label}</span>
              <span className="ui-value flex items-center gap-1 text-[11px] text-muted">
                <span className="size-1.5 rounded-full bg-ok" />
                {device.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Well>
  );
}

/** A support queue: requests and scheduled maintenance with their state. */
export function SupportVisual() {
  const tickets = [
    { title: "Email on phone", status: "Resolved", kind: "status-ok" },
    { title: "New laptop setup", status: "In progress", kind: "status-warn" },
    { title: "Monthly updates", status: "Scheduled", kind: "status-info" },
  ];
  return (
    <Well>
      <ul className="m-0 grid list-none grid-cols-[minmax(0,1fr)] gap-2 p-0">
        {tickets.map((ticket) => (
          <li
            key={ticket.title}
            className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5 text-[12.5px] shadow-[var(--shadow-sm)]"
          >
            <span className="min-w-0 flex-1 truncate text-heading">{ticket.title}</span>
            <span className={`status ${ticket.kind}`}>{ticket.status}</span>
          </li>
        ))}
      </ul>
    </Well>
  );
}

/** Cloud services and protection, each with its state, in two columns on the wide card. */
export function CloudVisual() {
  const rows = [
    { icon: <Mail {...SMALL} />, label: "Email & domains", value: "Active" },
    { icon: <Globe {...SMALL} />, label: "Website hosting", value: "Online" },
    { icon: <Cloud {...SMALL} />, label: "Cloud files", value: "Synced" },
    { icon: <DatabaseBackup {...SMALL} />, label: "Backups", value: "Nightly" },
    { icon: <KeyRound {...SMALL} />, label: "Multi-factor sign-in", value: "On" },
    { icon: <RefreshCw {...SMALL} />, label: "Security updates", value: "Current" },
    { icon: <ShieldCheck {...SMALL} />, label: "Firewall", value: "Active" },
    { icon: <Lock {...SMALL} />, label: "Device encryption", value: "On" },
  ];
  return (
    <Well>
      <ul className="m-0 grid list-none grid-cols-[minmax(0,1fr)] gap-x-8 p-0 sm:grid-cols-2 [&>li:first-child]:border-t-0 sm:[&>li:nth-child(2)]:border-t-0">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-3 border-t border-border py-2.5 text-[12.5px]">
            <span className="text-brand-text">{row.icon}</span>
            <span className="min-w-0 flex-1 truncate text-heading">{row.label}</span>
            <span className="ui-value text-ok">{row.value}</span>
          </li>
        ))}
      </ul>
    </Well>
  );
}
