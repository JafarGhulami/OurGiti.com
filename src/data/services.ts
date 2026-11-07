/**
 * OurGiti's four service lines (confirmed by the company, 2026-11-07).
 * Each `scope` item is a deliverable a client can ask for; add detail here, never in components.
 */
export interface ServiceLine {
  slug: string;
  title: string;
  summary: string;
  scope: string[];
}

export const SERVICE_LINES: ServiceLine[] = [
  {
    slug: "software-development",
    title: "Software development",
    summary: "Custom software, web applications and mobile apps, built for how your organisation works.",
    scope: ["Custom software", "Web applications", "Mobile apps"],
  },
  {
    slug: "networking-infrastructure",
    title: "Networking & infrastructure",
    summary: "Networks, servers and hardware, designed, supplied and installed.",
    scope: ["Network design and installation", "Servers", "Structured cabling", "Hardware supply and setup"],
  },
  {
    slug: "it-support",
    title: "IT support & managed IT",
    summary: "Ongoing support that keeps your people and systems working.",
    scope: ["Support contracts", "Helpdesk", "Maintenance of your IT"],
  },
  {
    slug: "cloud-hosting-security",
    title: "Cloud, hosting & security",
    summary: "Hosting, email and the cloud, with backups and security built in.",
    scope: ["Hosting", "Email and domains", "Cloud migration", "Backups", "Cybersecurity"],
  },
];
