# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16.4 (App Router) with React 19, TypeScript (strict), Tailwind CSS 4 and lucide icons, built as a **static export** (`output: "export"`): `pnpm build` writes plain HTML into `out/` for any static host. Project structure and conventions follow the user's Golbarg website (`golbargWebsiteFrontend`). Confirmed by the user, 2026-11-07.

## Users

- **Organizations in the United States, mostly Texas, that need IT and software work done** (confirmed 2026-11-07): the site is for Texas and mostly US clients. They come to judge whether OurGiti can design, build, install or run what they need, then get in touch.
- **Undecided:** which kinds of organizations lead (small businesses, clinics, offices, larger companies). Ask before writing sector-specific copy.

## Product Purpose

The public website of OurGiti (ourgiti.com), an IT and software solutions company. It presents what OurGiti does across four service lines and how to reach the company. Success: a visitor understands within seconds that OurGiti covers both software and IT infrastructure, trusts it is a real operating company, and sends an enquiry.

## Positioning

One company for both sides of a client's technology: the software they use and the network, systems and support it runs on. Sharper positioning (what OurGiti does that a neighbouring IT firm could not truthfully claim) is **undecided**.

## Operating Context

- Static site on ourgiti.com; no server in production. Any form posts from the browser to a separate backend (none exists yet).
- Audience is in the US (mostly Texas): copy is US English (organization, color), US phone and address formats, Central Time.
- Content will live in typed TypeScript under `src/data/`, never inline in components.

## Capabilities and Constraints

- Confirmed service lines:
  1. Software development: custom software, web applications, mobile apps.
  2. Networking and infrastructure: network design and installation, servers, cabling, hardware supply and setup.
  3. IT support and managed IT: support contracts, helpdesk, maintenance of clients' IT.
  4. Cloud, hosting and security: hosting, email and domains, cloud migration, backups, cybersecurity.
- Static export: no server rendering, no `next/image` optimisation (plain `<img>`), no server actions or API routes.
- Must support both light and dark colour schemes.
- Contact details are **placeholders until the company provides them** (confirmed 2026-11-07): render them visibly marked as placeholders, never as invented real-looking values.
- **Undecided:** exact city and service area within Texas/the US, contact details (email, phone, address), working hours, social links, founding year, team, logo.

## Brand Commitments

- Name **OurGiti**; domain **ourgiti.com**.
- **Green** is the brand colour family, in both light and dark mode (user-pinned, 2026-11-07).
- **Glass effect** (frosted, translucent surfaces) is part of the look (user-pinned, 2026-11-07). The project skill `.claude/skills/glassmorphism` holds the technique, performance limits and reduced-transparency fallbacks.
- **Professional premium-tech look (standing preference, user 2026-11-07):** the site should sit alongside premium tech companies such as Stripe, Vercel and Cloudflare: clean, confident, polished, refined type, lots of space, product-style UI visuals built in code (no stock photos). Convention executed at full craft is the commitment, not a novel concept.
- Rejected (user, 2026-11-07): the "Engineering Pad" redesign: graph-paper background and hand-drafted sketches, all-caps condensed type, the GIVEN / FIND / SOLUTION and worksheet concept and wording, pale-green paper with a lime highlighter. None of it may return.
- Must not feel like (user, 2026-11-07): a generic "AI startup" template (neon glows on black, gradient text, floating blobs); corporate stock imagery (handshakes, people at laptops, blue server rooms); playful or cartoony (mascots, illustrations, bouncy motion); plain or template-like (safe, forgettable, like every other IT company site).

## Evidence on Hand

- None yet: no logo, photos, client names, testimonials, case studies, certifications or figures are in the repo. Do not invent any of them; show a missing fact as missing and hand the user a list of what to supply.

## Product Principles

1. Cover both halves honestly: software and infrastructure get equal weight, each shown with concrete deliverables.
2. Every name, number and claim on the site is true; nothing is filled in to look established.
3. Fast and light on any connection: static pages, no heavy media or animation libraries.
4. The enquiry is always one step away.
