import type { CSSProperties, ReactNode } from "react";
import {
  DatabaseBackup,
  Globe,
  Headset,
  KeyRound,
  Lock,
  Monitor,
  Network,
  Router,
  Server,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { HERO } from "@/data/home";

const SMALL = { size: 16, strokeWidth: 1.75, "aria-hidden": true } as const;

function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}

function PanelHead({
  icon,
  title,
  sub,
  status,
}: {
  icon: ReactNode;
  title: string;
  sub?: string;
  status: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="icon-tile size-9 rounded-[10px]">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] leading-tight font-semibold text-heading">{title}</p>
        {sub ? <p className="ui-label mt-0.5 truncate">{sub}</p> : null}
      </div>
      {status}
    </div>
  );
}

function Node({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-1.5">
      <span className="grid size-10 place-items-center rounded-[11px] border border-border-strong bg-surface text-brand-text shadow-[var(--shadow-sm)]">
        {icon}
      </span>
      <span className="ui-label">{label}</span>
    </div>
  );
}

/**
 * The hero's product-style visual: three glass panels showing the kind of systems OurGiti
 * builds and looks after. Values are illustrative and the caption says so. The two front
 * panels overlap the network panel on purpose, so their frost blurs real content behind
 * them. On load each panel's frost resolves from clear (`.assemble`), then rests.
 */
export default function HeroVisual() {
  const devices = [
    { icon: <Monitor {...SMALL} />, label: "Workstations", value: "18 online" },
    { icon: <Wifi {...SMALL} />, label: "Wi-Fi access points", value: "3 online" },
    { icon: <Server {...SMALL} />, label: "File server", value: "Healthy" },
  ];
  const protection = [
    { icon: <DatabaseBackup {...SMALL} />, label: "Nightly backup", value: "Completed" },
    { icon: <KeyRound {...SMALL} />, label: "Multi-factor sign-in", value: "On" },
    { icon: <Lock {...SMALL} />, label: "Firewall rules", value: "Up to date" },
  ];

  return (
    <figure className="relative m-0">
      <div
        className="relative mx-auto flex max-w-[560px] flex-col lg:block lg:h-[460px] lg:max-w-none"
        aria-label="Illustration: an office network with all devices online, a resolved support request, and backup and security checks completed."
        role="img"
      >
        {/* Office network */}
        <div className="glass assemble p-5 lg:absolute lg:top-0 lg:right-0 lg:w-[88%]" style={delay(60)}>
          <PanelHead
            icon={<Network {...SMALL} />}
            title="Office network"
            sub="Main office"
            status={<span className="status status-ok">All systems normal</span>}
          />
          <div className="relative mt-5 grid grid-cols-3 rounded-xl border border-border bg-glass-strong px-3 py-4">
            <span
              aria-hidden
              className="absolute top-[36px] right-[16.6%] left-[16.6%] h-px bg-[var(--brand-line)]"
            />
            <Node icon={<Globe {...SMALL} />} label="Internet" />
            <Node icon={<ShieldCheck {...SMALL} />} label="Firewall" />
            <Node icon={<Router {...SMALL} />} label="Switch" />
          </div>
          <ul className="m-0 mt-4 grid list-none gap-0.5 p-0">
            {devices.map((device) => (
              <li
                key={device.label}
                className="flex items-center gap-3 rounded-lg px-2 py-[7px] text-[13.5px] text-text"
              >
                <span className="text-muted">{device.icon}</span>
                <span className="flex-1">{device.label}</span>
                <span className="ui-value flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-ok" aria-hidden />
                  {device.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Support request */}
        <div
          className="glass glass-strong assemble -mt-[58px] p-4 lg:absolute lg:top-[236px] lg:left-0 lg:mt-0 lg:mr-0 lg:w-[50%]"
          style={delay(260)}
        >
          <PanelHead
            icon={<Headset {...SMALL} />}
            title="Helpdesk"
            sub="Ticket #1042"
            status={<span className="status status-ok">Resolved</span>}
          />
          <p className="mt-3 text-[14px] leading-snug text-heading">Front desk printer is not printing</p>
          <div className="relative mt-4" aria-hidden>
            <span className="absolute top-[4px] right-[5px] left-[5px] h-px bg-[var(--brand-line)]" />
            <ol className="relative m-0 flex list-none justify-between p-0">
              {["Opened", "In progress", "Resolved"].map((step, index) => (
                <li
                  key={step}
                  className={`flex flex-col gap-1.5 ${index === 0 ? "items-start" : index === 1 ? "items-center" : "items-end"}`}
                >
                  <span className="size-2.5 rounded-full bg-brand ring-4 ring-[var(--glass-solid)]" />
                  <span className="ui-label whitespace-nowrap">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Backup and security */}
        <div
          className="glass glass-strong assemble mt-3 ml-10 p-4 sm:ml-28 lg:absolute lg:top-[262px] lg:right-0 lg:mt-0 lg:ml-0 lg:w-[46%]"
          style={delay(420)}
        >
          <PanelHead icon={<ShieldCheck {...SMALL} />} title="Backup & security" status={null} />
          <ul className="m-0 mt-3 grid list-none gap-0.5 p-0">
            {protection.map((item) => (
              <li key={item.label} className="flex items-center gap-3 py-[6px] text-[13.5px] text-text">
                <span className="text-muted">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                <span className="ui-value text-ok">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-5 text-[13px] text-muted lg:text-right">{HERO.visualCaption}</figcaption>
    </figure>
  );
}
