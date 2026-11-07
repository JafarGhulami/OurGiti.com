/**
 * OurGiti's four service lines (confirmed by the company, 2026-11-07).
 * Each `scope` item is a deliverable a client can ask for; add detail here, never in components.
 */
export type ServiceSlug = "software" | "network" | "support" | "cloud";

export interface ServiceLine {
  slug: ServiceSlug;
  title: string;
  /** Short label for the contact form's "What can we help with?" chips */
  need: string;
  summary: string;
  scope: string[];
}

export const SERVICE_LINES: ServiceLine[] = [
  {
    slug: "software",
    title: "Software development",
    need: "Software",
    summary:
      "Custom software, web applications and mobile apps, designed around how your organization actually works.",
    scope: ["Custom software", "Web applications", "Mobile apps"],
  },
  {
    slug: "network",
    title: "Networking & infrastructure",
    need: "Networking",
    summary:
      "Networks designed and installed, servers set up, cabling run and hardware supplied for your office.",
    scope: ["Network design and installation", "Servers", "Structured cabling", "Hardware supply and setup"],
  },
  {
    slug: "support",
    title: "IT support & managed IT",
    need: "IT support",
    summary: "Day-to-day support for your team, plus the ongoing maintenance that keeps systems healthy.",
    scope: ["Support contracts", "Helpdesk", "Maintenance of your IT"],
  },
  {
    slug: "cloud",
    title: "Cloud, hosting & security",
    need: "Cloud & security",
    summary:
      "Hosting, email and domains, cloud migrations, reliable backups and the security around all of it.",
    scope: ["Hosting", "Email and domains", "Cloud migration", "Backups", "Cybersecurity"],
  },
];
