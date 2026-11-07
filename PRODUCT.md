# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16.4 (App Router) with React 19, TypeScript (strict), Tailwind CSS 4 and lucide icons, built as a **static export** (`output: "export"`): `pnpm build` writes plain HTML into `out/` for any static host. Project structure and conventions follow the user's Golbarg website (`golbargWebsiteFrontend`). Confirmed by the user, 2026-11-07.

## Users

- **Organisations that need IT and software work done** (confirmed in outline): they come to judge whether OurGiti can design, build, install or run what they need, then get in touch.
- **Undecided:** who the main customers are (local businesses, NGOs, government offices, international clients) and where they are. Ask before writing audience-specific copy.

## Product Purpose

The public website of OurGiti (ourgiti.com), an IT and software solutions company. It presents what OurGiti does across four service lines and how to reach the company. Success: a visitor understands within seconds that OurGiti covers both software and IT infrastructure, trusts it is a real operating company, and sends an enquiry.

## Positioning

One company for both sides of a client's technology: the software they use and the network, systems and support it runs on. Sharper positioning (what OurGiti does that a neighbouring IT firm could not truthfully claim) is **undecided**.

## Operating Context

- Static site on ourgiti.com; no server in production. Any form posts from the browser to a separate backend (none exists yet).
- Content will live in typed TypeScript under `src/data/`, never inline in components.

## Capabilities and Constraints

- Confirmed service lines:
  1. Software development: custom software, web applications, mobile apps.
  2. Networking and infrastructure: network design and installation, servers, cabling, hardware supply and setup.
  3. IT support and managed IT: support contracts, helpdesk, maintenance of clients' IT.
  4. Cloud, hosting and security: hosting, email and domains, cloud migration, backups, cybersecurity.
- Static export: no server rendering, no `next/image` optimisation (plain `<img>`), no server actions or API routes.
- Must support both light and dark colour schemes.
- **Undecided:** location and service area, contact details (email, phone, address), working hours, social links, founding year, team, languages, logo.

## Brand Commitments

- Name **OurGiti**; domain **ourgiti.com**.
- **Green** is the brand colour family, in both light and dark mode (user-pinned, 2026-11-07).
- **Glass effect** (frosted, translucent surfaces) is part of the look (user-pinned, 2026-11-07). The project skill `.claude/skills/glassmorphism` holds the technique, performance limits and reduced-transparency fallbacks.

## Evidence on Hand

- None yet: no logo, photos, client names, testimonials, case studies, certifications or figures are in the repo. Do not invent any of them; show a missing fact as missing and hand the user a list of what to supply.

## Product Principles

1. Cover both halves honestly: software and infrastructure get equal weight, each shown with concrete deliverables.
2. Every name, number and claim on the site is true; nothing is filled in to look established.
3. Fast and light on any connection: static pages, no heavy media or animation libraries.
4. The enquiry is always one step away.
