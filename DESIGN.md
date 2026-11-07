---
name: OurGiti
description: "IT and software solutions, shown as working systems: frosted glass panels over soft green light, one emerald green for every action, in both colour schemes."
colors:
  brand: "light-dark(#0b6e40, #2fc277)"
  brand-hover: "light-dark(#095a34, #4fd38f)"
  brand-text: "light-dark(#0a6a3d, #5fd99a)"
  on-brand: "light-dark(#ffffff, #032012)"
  brand-soft: "light-dark(rgb(16 163 95 / 0.1), rgb(52 199 123 / 0.13))"
  brand-line: "light-dark(rgb(16 163 95 / 0.35), rgb(52 199 123 / 0.4))"
  field-a: "light-dark(rgb(22 163 95 / 0.24), rgb(34 197 110 / 0.13))"
  field-b: "light-dark(rgb(110 224 163 / 0.34), rgb(16 185 129 / 0.09))"
  field-c: "light-dark(rgb(20 184 166 / 0.12), rgb(20 184 166 / 0.08))"
  ok: "light-dark(#0e8a4f, #3ad08a)"
  warn: "light-dark(#a15c07, #f5b544)"
  danger: "light-dark(#b42318, #ff8a80)"
  bg: "light-dark(#ffffff, #050b08)"
  bg-subtle: "light-dark(#f4f8f5, #08110c)"
  surface: "light-dark(#ffffff, #0b1611)"
  surface-raised: "light-dark(#f8fbf9, #0f1d16)"
  inverse-ground: "#04201a"
  border: "light-dark(rgb(9 38 24 / 0.1), rgb(255 255 255 / 0.08))"
  border-strong: "light-dark(rgb(9 38 24 / 0.18), rgb(255 255 255 / 0.16))"
  heading: "light-dark(#07170f, #f0f7f2)"
  text: "light-dark(#33463b, #b5c6bc)"
  muted: "light-dark(#5a6d62, #8a9f93)"
  glass: "light-dark(rgb(255 255 255 / 0.6), rgb(255 255 255 / 0.045))"
  glass-strong: "light-dark(rgb(255 255 255 / 0.78), rgb(16 31 24 / 0.82))"
  glass-solid: "light-dark(#f7faf8, #0f1b15)"
  glass-edge-hi: "light-dark(rgb(255 255 255 / 0.95), rgb(255 255 255 / 0.24))"
  glass-edge-lo: "light-dark(rgb(9 46 28 / 0.09), rgb(255 255 255 / 0.05))"
  glass-edge-end: "light-dark(rgb(9 46 28 / 0.16), rgb(255 255 255 / 0.12))"
typography:
  display:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(40px, 4.9vw, 64px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 108"
  headline:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(32px, 3.8vw, 48px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 106"
  title:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.012em"
  lead:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.45vw, 20px)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.65
  body-card:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 560
    lineHeight: 1.65
  button:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 560
    lineHeight: 1
    letterSpacing: "-0.005em"
  caption:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  ui-label:
    fontFamily: "Mona Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.65
  data:
    fontFamily: "Geist Mono, ui-monospace, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "\"tnum\""
  status:
    fontFamily: "Geist Mono, ui-monospace, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  row-inset: "6px"
  row: "8px"
  control: "10px"
  tile: "11px"
  screen: "12px"
  card: "16px"
  nav-bar: "30px"
  switch-track: "20px"
  switch-thumb: "16px"
  pill: "999px"
spacing:
  panel-pad: "16px"
  glass-pad: "20px"
  card-pad: "28px"
  control-gap: "12px"
  grid-gap: "20px"
  head-to-content: "56px"
  section: "clamp(80px, 10vw, 128px)"
  gutter: "clamp(20px, 4vw, 40px)"
  header-h: "72px"
  wrap-max: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
    textColor: "{colors.on-brand}"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.heading}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  button-secondary-hover:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.brand-text}"
  button-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "46px"
  text-link:
    textColor: "{colors.brand-text}"
    typography: "{typography.button}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  glass-panel:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "{spacing.glass-pad}"
  glass-panel-strong:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "{spacing.panel-pad}"
  well:
    backgroundColor: "{colors.bg-subtle}"
    rounded: "{rounded.screen}"
    padding: "20px"
  screen:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.screen}"
  icon-tile:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-text}"
    rounded: "{rounded.tile}"
    size: "40px"
  input:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.heading}"
    rounded: "{rounded.control}"
    padding: "11px 14px"
    height: "46px"
  chip:
    backgroundColor: "{colors.glass-strong}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0 14px 0 11px"
    height: "40px"
  chip-selected:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-text}"
  status-ok:
    backgroundColor: "light-dark(rgb(14 138 79 / 0.1), rgb(58 208 138 / 0.12))"
    textColor: "{colors.ok}"
    typography: "{typography.status}"
    rounded: "{rounded.pill}"
    padding: "3px 9px"
  status-warn:
    backgroundColor: "light-dark(rgb(161 92 7 / 0.1), rgb(245 181 68 / 0.12))"
    textColor: "{colors.warn}"
    typography: "{typography.status}"
    rounded: "{rounded.pill}"
    padding: "3px 9px"
  status-info:
    backgroundColor: "light-dark(rgb(9 38 24 / 0.06), rgb(255 255 255 / 0.07))"
    textColor: "{colors.muted}"
    typography: "{typography.status}"
    rounded: "{rounded.pill}"
    padding: "3px 9px"
  pending:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "1px 10px"
  nav-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  nav-link-hover:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.heading}"
  menu-sheet:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "8px"
  icon-button:
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    size: "40px"
  process-node:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brand-text}"
    rounded: "{rounded.pill}"
    size: "40px"
  inverse-band:
    backgroundColor: "{colors.inverse-ground}"
---

# Design System: OurGiti

## Overview

**Creative North Star: "The Calm Console"**

OurGiti presents itself the way a well-run system looks from the inside: a set of frosted glass panels, each reporting that something is in good order, resting over soft green light. The register is the category standard for premium technology companies (the user benchmarked Stripe, Vercel and Cloudflare), executed straight and at full craft: sentence-case headlines set tight and slightly wide, generous space, white and soft green-gray grounds by day, near-black green by night, and one emerald green that carries every action in both schemes.

The proof is shown, not photographed. Every visual is product-style UI built in markup (the hero's valley scene of a business and its systems, a bookings app, a network, a support queue, a cloud checklist) with illustrative values and a caption that says they are illustrative. Glass appears only where there is colour behind it to frost: the header over the page, the hero scene's labels over the landscape, the Process story, the layers of the one deep-green band, and the contact card. Depth is quiet: hairline borders, one soft offset shadow, a lit 1px edge. Motion is a single orchestrated entrance in the hero, the quiet loops that show the visuals at work, and a lift on cards.

The system replaces the rejected 2026-11 "Engineering Pad" world, which must not return (see Do's and Don'ts). Missing company facts are shown as missing, in a dashed "Coming soon" pill, never filled with stand-ins.

**Key Characteristics:**
- Light and dark are equal citizens: every colour is a `light-dark()` pair, and green is the brand in both.
- One emerald green for every action; status amber and red live only inside UI visuals and error messages.
- Frosted glass over soft green light, used only where something sits behind it.
- Product-style UI visuals built in code, captioned as illustrative; no photography, no illustration.
- Mona Sans for everything, set tight and slightly wide; Geist Mono only for data.
- Pills for actions and states, 16px rounded rectangles for containers.
- One deep-green band per page.

## Colors

A white and green-gray ground (near-black green at night) with one emerald voice, soft green light for the glass to frost, and status colours kept inside the product visuals.

### Primary
- **Emerald Signal** (`brand`, light-dark(#0b6e40, #2fc277)): the fill of every primary action (buttons, the skip link, the header's "Contact us"), the focus outline, `accent-color` and the caret. Darker by day so white text holds; brighter by night so it glows against near-black green.
- **Pressed Emerald** (`brand-hover`, light-dark(#095a34, #4fd38f)): primary button hover. It moves away from the ground in each scheme: deeper by day, lighter by night.
- **Legible Emerald** (`brand-text`, light-dark(#0a6a3d, #5fd99a)): green as text and icon colour: text links, icons in tiles and visuals, check marks, the selected chip, the process numerals, the copied confirmation.
- **On-Emerald** (`on-brand`, light-dark(#ffffff, #032012)): text and marks on an Emerald Signal fill; white by day, deep green-black by night.
- **Emerald Wash** (`brand-soft`, light-dark(rgb(16 163 95 / 0.1), rgb(52 199 123 / 0.13))): tinted grounds: icon tiles, nav link hover, the selected chip, the 4px focus halo on fields, the active item in a visual's sidebar.
- **Emerald Thread** (`brand-line`, light-dark(rgb(16 163 95 / 0.35), rgb(52 199 123 / 0.4))): connector lines and rails inside visuals (network links, ticket progress, the band's stack rail), chip and secondary-button hover borders.

### Secondary
- **Light Field Greens** (`field-a`, `field-b`, `field-c`: light-dark(rgb(22 163 95 / 0.24), rgb(34 197 110 / 0.13)), light-dark(rgb(110 224 163 / 0.34), rgb(16 185 129 / 0.09)), light-dark(rgb(20 184 166 / 0.12), rgb(20 184 166 / 0.08))): the soft emerald, mint and teal light that sits behind glass in the hero, the contact section and the 404 page. Never used as a fill on anything that carries content. Dark-scheme alphas stay low (0.13 and under) so night never becomes a neon glow.

### Tertiary
- **Running Green** (`ok`, light-dark(#0e8a4f, #3ad08a)): healthy states inside UI visuals ("All systems normal", "Completed", "Online") and their 6px dots.
- **Attention Amber** (`warn`, light-dark(#a15c07, #f5b544)): in-progress and pending states inside UI visuals only.
- **Fault Red** (`danger`, light-dark(#b42318, #ff8a80)): form error text and an invalid field's border. Nowhere else.

### Neutral
- **Daylight / Night Green** (`bg`, light-dark(#ffffff, #050b08)): the page ground. Matches the `theme-color` meta in each scheme.
- **Green-Gray Mist** (`bg-subtle`, light-dark(#f4f8f5, #08110c)): the subtle band (Process), the footer, and the wells that frame visuals inside cards.
- **Card White / Card Night** (`surface`, light-dark(#ffffff, #0b1611)): cards, app screens, nodes in visuals, the mobile menu sheet.
- **Raised Surface** (`surface-raised`, light-dark(#f8fbf9, #0f1d16)): the title bar of an app-screen frame.
- **Deep Forest** (`inverse-ground`, #04201a): the ground of the one deep-green band, lit by two radial glows (emerald at 0.2 top right, teal at 0.11 bottom left).
- **Hairline** (`border`, light-dark(rgb(9 38 24 / 0.1), rgb(255 255 255 / 0.08))) and **Firm Line** (`border-strong`, light-dark(rgb(9 38 24 / 0.18), rgb(255 255 255 / 0.16))): card and section edges; field, chip, screen and secondary-button strokes.
- **Ink Green** (`heading`, light-dark(#07170f, #f0f7f2)): headlines, field values, emphasized UI text.
- **Body Green-Gray** (`text`, light-dark(#33463b, #b5c6bc)): running text.
- **Quiet Green-Gray** (`muted`, light-dark(#5a6d62, #8a9f93)): leads, captions, UI labels, nav links at rest, placeholder text.
- **Glass Fills** (`glass`, light-dark(rgb(255 255 255 / 0.6), rgb(255 255 255 / 0.045)); `glass-strong`, light-dark(rgb(255 255 255 / 0.78), rgb(16 31 24 / 0.82)); `glass-solid`, light-dark(#f7faf8, #0f1b15)): the translucent panel fill, the denser front-panel and control fill (close to opaque at night), and the solid fallback.
- **Glass Edge** (`glass-edge-hi`, `glass-edge-lo`, `glass-edge-end`): the three stops of the lit 1px edge, bright at the top left, nearly gone through the middle, firmer at the bottom right.

### Named Rules
**The One Green Rule.** Emerald is the only accent. Every action, link, focus ring and selected state is green; amber and red appear only as status inside UI visuals and as form errors. No second brand hue, ever.

**The Paired Scheme Rule.** Every colour is written once as a `light-dark(<light>, <dark>)` pair on `:root, .inverse`; `html.light` and `html.dark` pin a scheme, otherwise the system setting applies. Never write a scheme-specific override for a single component.

**The Scheme Flip Rule.** A subtree that flips its scheme must also re-declare the tokens: `.inverse` sets `color-scheme: dark` and is listed in the `:root, .inverse` token selector, because Tailwind's Lightning CSS compiles `light-dark()` into variables that resolve where the custom property is declared. Any future flipped subtree joins that selector; setting `color-scheme` alone does nothing.

## Typography

**Display Font:** Mona Sans (variable weight and width), with Segoe UI, system-ui, sans-serif
**Body Font:** Mona Sans, same stack
**Label/Mono Font:** Geist Mono, with ui-monospace, Consolas, monospace (data only)

**Character:** One confident grotesque does all the talking: headlines run slightly wide and tightly tracked so they read as engineered rather than loud, and the body stays open at 1.65. Geist Mono is the voice of the machine, heard only as data inside the product visuals.

### Hierarchy
- **Display** (600, clamp(40px, 4.9vw, 64px), 1.02, -0.035em, width 108%): the page's one h1. Sentence case, ends with a period, kept to about 17ch so it breaks into three lines at desktop.
- **Headline** (600, clamp(32px, 3.8vw, 48px), 1.08, -0.03em, width 106%): section h2s, sentence case with a period ("Everything your business runs on.").
- **Title** (600, 19px, 1.3, -0.012em): card and step h3s.
- **Lead** (400, clamp(18px, 1.45vw, 20px), 1.6, muted, max 62ch): the paragraph under every h1 and h2.
- **Body** (400, 16.5px, 1.65): running text. **Body card** (15.5px) inside cards and process steps, kept to 34–52ch.
- **Label** (560, 14px): form labels and the chip group's legend; optional hints drop to 400 muted.
- **Button** (560, 15px, line-height 1, -0.005em): buttons and text links; 14px in the small button.
- **Caption** (400, 13px, muted): the "illustrative" captions under visuals.
- **UI label** (400, 12.5px, muted, Mona Sans): labels inside the product visuals.
- **Data** (Geist Mono 400, 12px, tabular numerals) and **Status** (Geist Mono 400, 11px, 1.4): values, times, counts, URLs and status pills inside visuals.

### Named Rules
**The Data-Only Mono Rule.** Geist Mono is for data: times, counts, statuses, values and the URL inside the UI visuals, plus the process step numerals, which are an ordered index. Labels inside visuals are Mona Sans 12.5px muted. Mono never sets a heading, a label, a button or running copy.

**The Sentence-Case Rule.** Headlines are sentence case, end with a period, and are set in weight 600 with negative tracking. No all-caps, no letterspaced labels, no condensed faces anywhere.

## Layout

A centered column of `min(1200px, 100% - 2 × gutter)` with a fluid gutter of clamp(20px, 4vw, 40px). Sections breathe at clamp(80px, 10vw, 128px) top and bottom; a section opens with a head block (max 720px: headline, then the lead 18px below) and its content follows 56px later. The header floats: a 60px glass bar 12px from the top (72px in all, `--header-h`). It takes no room in the flow, so the first section runs behind it and pads its top by `--header-h`; scroll anchors allow a further 16px.

The page alternates grounds to pace the story: white hero over a light field, white services, the deep-green band (Approach), the green-gray subtle band with hairlines above and below (Process), white contact over a light field, then the green-gray footer. Exactly one deep-green band per page.

Responsive structure, with Tailwind's breakpoints (sm 640px, md 768px, lg 1024px):
- **Hero:** stacked below lg; at lg a two-column split (1fr / 1.02fr, 64px gap) with copy left and the hero scene right, frameless and bleeding wider than its column (6% to the left, 12% to the right; the hero clips it). Below lg the scene sits under the copy at up to 620px.
- **Services:** a split head (at lg the headline left, the lead and a row of jump chips right, bottom-aligned), then the bento: one column below lg; at lg three columns in a 2 + 1 over 1 + 2 pattern (software and cloud wide), 20px gaps. Each card's visual well grows to fill the card so row-mates end level. A glass strip closes the section ("Not sure where to start?" and a primary to the contact form), then the illustrative caption.
- **Approach band:** stacked below lg; at lg two equal columns with an 80px gap.
- **Process:** a vertical timeline below md; at md four columns on one horizontal line.
- **Contact:** stacked below lg; at lg 0.85fr / 1.15fr with the glass form card on the right. Form fields pair up from sm.
- **Footer:** stacked below md; at md four columns (1.4 / 1 / 1 / 1.2).
- **Header:** section links show from md; below md they move into the menu sheet, and below sm the "Contact us" button goes too.

**Light fields** sit absolutely behind the hero, contact and 404 content: three px-sized radial ellipses positioned for mobile (420×380 at 62% 74%, 340×300 at 96% 92%, 300×260 at 8% 96%) and re-positioned from lg (580×480 at 74% 36%, 440×380 at 95% 74%, 400×340 at 54% 90%), masked by a vertical fade (solid to 55%, gone by the bottom) so the light never ends in a hard line.

## Elevation & Depth

A hybrid of hairlines and soft light. Solid surfaces (cards, app screens, nodes) sit on a hairline border with a barely-there shadow and lift on hover. Glass surfaces get their depth from translucency plus frost, a lit 1px edge, and one long soft offset shadow. Shadows are scheme-paired: green-tinted and gentle by day, deep black by night.

### Shadow Vocabulary
- **Rest** (`box-shadow: light-dark(0 1px 2px rgb(6 36 22 / 0.06), 0 1px 2px rgb(0 0 0 / 0.4))`): cards, nodes and rows inside visuals at rest.
- **Lift** (`box-shadow: light-dark(0 12px 32px -18px rgb(6 46 28 / 0.22), 0 18px 40px -22px rgb(0 0 0 / 0.75))`): a card on hover, and app-screen frames.
- **Glass** (`box-shadow: light-dark(0 28px 56px -28px rgb(6 46 28 / 0.32), 0 32px 64px -30px rgb(0 0 0 / 0.85))`): glass panels and the mobile menu sheet.
- **Primary button** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), 0 1px 2px rgb(6 36 22 / 0.2), 0 8px 20px -10px light-dark(rgb(11 110 64 / 0.55), rgb(0 0 0 / 0.6))`): a top highlight and a short green-tinted drop.
- **Focus halo** (`box-shadow: 0 0 0 4px var(--brand-soft)`): fields on focus.

### Glass recipe
Glass is translucency + frost + a lit edge + depth: the `glass` fill, `backdrop-filter: blur(18px) saturate(160%)`, a 1px ring drawn by a masked `::before` gradient (140deg: edge-hi → edge-lo at 38% → edge-lo at 68% → edge-end), and the Glass shadow. The strong variant swaps in `glass-strong` for front panels. Glass cards (service cards, process steps) use the lighter `glass-card` fill so the section's pattern and light read through. The header bar keeps its glass on a `::before` pseudo-element (the `glass-nav` fill, blur 20px saturate 180%, an inset lit top edge and hairline ring, the Nav shadow), so the selection pill and the mobile sheet inside it can frost the page themselves. Under `prefers-reduced-transparency: reduce`, and where `backdrop-filter` is unsupported, glass and the secondary button fall back to `glass-solid` with no blur.

### Named Rules
**The Light Behind Glass Rule.** Glass is used only where there is colour or pattern behind it to frost: the header over the page, the hero scene's small labels over the landscape, the Process story's frames and chips over the lit section, the service cards and process steps over a patterned, lit section, the layers inside the deep-green band, and the contact card over halftone and light. Glass on a flat white ground is just a grey box; use a card.

**The Glass-On-Pseudo Rule.** An element with `backdrop-filter` is a backdrop root for its descendants, so a container that holds other glass (the header bar) puts its own glass on `::before` instead. Then the selection pill and the mobile menu sheet inside it frost the page, not the bar.

**The Lift-On-Response Rule.** Cards rest with the Rest shadow and gain the Lift shadow, a firmer border and a 2px rise only on hover. Nothing floats at rest except glass.

## Motion & Glass Buttons

- **Glass buttons:** the primary action is emerald glass (`btn-glass` fill: deep green by day, translucent lit emerald by night), blur 12px saturate 170%, a sheen on the upper half, an inset lit rim (`btn-rim`) and a soft drop. On hover the fill deepens, the rim brightens and a band of light sweeps across (0.8s). The secondary button is clear glass with a lit top edge. Disabled buttons drop the glass and the sweep.
- **First-visit loader:** a frosted veil (`site-loader`, blur 26px) over the rendered page with the mark's satellite orbiting, the name and a filling progress line; at 1.25s it dissolves as the frost clears. CSS only; skipped after the first load of a visit (`html.intro-seen`, sessionStorage `ourgiti-intro`); instant under reduced motion.
- **Intro:** on that first load the hero waits for the veil (`--intro-delay`, 1.3s); its copy comes into focus (blur 10px to sharp, a 14px rise) staggered, then the panels assemble.
- **Blur reveals:** section heads, cards, layers, steps and the contact columns come into focus as they scroll in (`.reveal`: opacity .15, blur 12px, 32px rise, scale .98 to rest), on a scroll-driven `view()` timeline with `--stagger` offsets. They use `translate`/`scale`, never `transform`, so hover lifts still work; fully visible where unsupported or under reduced motion.
- **Spotlight:** glass cards (`.spotlight`) carry a soft 360px light that follows a mouse pointer (`Spotlight.tsx` sets `--mx`/`--my`).

## Concentric Radius

A rounded child inside a rounded parent uses the parent's radius minus the padding between them, so the curves run parallel: `inner = outer − padding`. The geometry lives in tokens: `--control-h` 40px and `--bar-pad` 10px give the header bar `--bar-h` 60px and `--bar-radius` 30px (a pill around pill controls; the 44px link track at an 8px inset is 22px, again 30 − 8). The theme switch track is 20px and its thumb 16px (20 − 4px padding); menu rows in the 16px sheet with 8px padding are 8px. Where padding is larger than the parent's radius (cards with 24–28px padding), inner radii come from the scale instead.

## Theme Switch

A 72 × 40px recessed track (`.theme-switch`: tinted fill, inset shade, hairline ring) with a 32px frosted thumb. By day the thumb is white glass carrying an amber sun on the left; by night it slides right (0.55s, slight overshoot) as emerald glass carrying a mint moon, the sun rotating out as the moon rotates in. The track shows the other mode's icon faintly. Pressing stretches the thumb 6px. `role="switch"` with `aria-checked`. Choosing a scheme sweeps it across the page as a circle growing from the switch (View Transitions API, 750ms); without it, or under reduced motion, the scheme simply changes. Position and icon follow the `<html>` class, so the first frame is right.

## Background Patterns: the Giti Landscape

Giti is a place of mountains, green valleys and rivers, and the page's textures and edges come from that landscape, never from generic tech motifs or plain grids.

**Tiles.** `scripts/make-patterns.py` writes five seamless two-tone tiles into `public/patterns/`, each as `<name>.svg` (deep green ink, emerald accents, light scheme) and `<name>-dark.svg` (pale mint ink, dark scheme and the deep-green band):
- **contour:** a topographic map of mountains (marching squares over a periodic height field: soft swells in every direction and seven summits of varied size), sixteen levels spread over the real height range, every fifth an index contour, the summit line emerald.
- **ridges:** mountain ranges seen from the valley: stacked ridgelines with sharp, rugged peaks (triangle waves), each shaded with haze that fades from its crest downward.
- **river:** rivers meandering down their valleys between two banks, a dotted emerald channel, valley-side contours following each river (wider and fainter uphill), tributaries joining.
- **terrain:** an elevation map as halftone: dots swell over the peaks, the highest in emerald.
- **stream:** calm river currents: bands of three flow lines with a few emerald current marks.

A section takes the tile class (`bg-contour`, `bg-ridges`, `bg-river`, `bg-terrain`, `bg-stream`) and a context that masks where it shows: `pat-hero` (behind the hero visual), `pat-section` (top-right, kept clear of the top edge, and bottom-left), `pat-right` (behind the form), `pat-band` (across the deep band). On the home page: services ridges, approach river, process terrain, contact stream; the hero carries no tile, because its scene is the landscape; the 404 uses contour.

**Section rhythm and transitions.** Sections stand on three grounds, declared once on `:root` (not on `.inverse`, so they resolve the same inside the deep band): `--ground-page` (white / near-black green), `--ground-band` (green-gray / a shade lighter) and `--ground-deep` (#04201a in both schemes). Down the page they keep one rhythm: hero page, services band, approach deep, process page, contact band, footer deep.

Every boundary is the same device: a `Ridge from="…" to="…"`, a mountain range in three layers that steps from the ground above to the ground below. The far layer is 30% of the next ground in the previous one, the mid layer 65%, both mixed in OKLCH with a touch of brand green (18% and 12%) so the hills stay green and visible even between close grounds; the near layer is exactly the next ground, and a thin emerald line runs along its crest. `seed` shifts each skyline so no two edges repeat. No section ends on a straight line or a hairline border.

**Edge fades.** Patterns and light never touch a section edge: every pattern's context mask is intersected with a vertical fade (in over the first 160px, out over the last 240px), every light field fades in over 200px and out over 260px, and the deep band fades its glow into `--ground-deep` at both ends, so ridges meet flat ground.

**The One Tile Rule.** Each tile appears once per page, never at full strength behind reading text.

## Shapes

Two families, never mixed. Buttons, chips, header nav links, status pills, the pending pill, the round icon buttons and the process nodes are full pills (999px); list rows in the menu sheet and the skip link take the 10px control radius. Everything that contains is a softly rounded rectangle on a stepped scale: cards and glass panels 16px, app-screen frames and visual wells 12px (the phone frame in the software visual is 18px), icon tiles 11px, fields 10px, rows and nodes inside visuals 8px, small inset items (the URL bar, sidebar items, the "New" tag) 6px. The focus outline follows the element with a 6px radius at 3px offset.

Borders are hairlines (1px) throughout. Wells inside cards have no border at all, so a card never nests a box in a box. Connector lines in visuals are 1px Emerald Thread.

## Components

### Buttons
Confident, pill-shaped, quietly tactile.
- **Shape:** full pill (999px), 46px tall, 22px side padding, 8px gap to a 17px arrow icon.
- **Primary:** Emerald Signal fill, On-Emerald text, the Primary button shadow. One per decision point ("Request a consultation", "Contact us", "Back to home").
- **Hover / Focus / Active:** the fill moves to Pressed Emerald and the arrow nudges 2px right (0.2s and 0.25s on the shared ease); pressing drops the button 1px; focus is the 2px Emerald Signal outline at 3px offset.
- **Secondary:** `glass-strong` fill with a 12px backdrop blur, Firm Line border, Ink Green text; on hover the border becomes Emerald Thread and the text Legible Emerald. Used beside a primary ("Explore services", "Copy message", "Contact us" on the 404).
- **Small:** 40px tall, 16px padding, 14px text (the header's "Contact us").
- **Disabled:** transparent, dashed Firm Line border, muted text, no shadow, no arrow, `not-allowed` cursor. Paired with a plain muted note that says why.
- **Text link:** Legible Emerald, 560 weight; underline (1.5px, 4px offset) on hover only.

### Chips
- **Style:** check boxes styled as pills: 40px tall, `glass-strong` fill, Firm Line border, body text 14px, a 14px icon at left.
- **State:** unselected shows a "+" icon; selected shows a check, an Emerald Signal border, Emerald Wash fill and Legible Emerald text. The icon slot is never empty and the text weight never changes, so selecting a chip does not reflow the row. Hover: Emerald Thread border, Ink Green text. Focus: the outline sits on the pill.

### Cards / Containers
- **Card:** glass with the `glass-card` fill (`.glass .glass-card .glass-hover`), 16px radius; padding 24px, 28px from sm. Hover lifts 3px into the deeper glass shadow. Service cards (`id="service-<slug>"`, a scroll margin clear of the header) lead with a service icon beside a 21px h3 and a 15.5px summary, then the scope as pills, then a visual well. Hover per the Lift-On-Response Rule (0.25s).
- **Glass panel:** see the Glass recipe; 20px padding for a large panel, 16px for a front panel.
- **Icon tile:** a 40px Emerald Wash square at 11px radius with an 18–20px Legible Emerald line icon (lucide, 1.75 stroke) and a faint inset ring of the same wash; 32px at 9px radius in the hero activity rows.
- **Service icon:** a 48px glass tile at 14px radius: Emerald Wash under a white-to-clear 160deg sheen, a lit inset top edge, an Emerald Thread inset ring and a soft green drop; a 22px Legible Emerald line icon.
- **Scope pill:** what a service delivers: 30px tall, 12px side padding, full radius, `glass-strong` fill, a Hairline inset ring, 13.5px heading-colour text. Not interactive.
- **Jump chip:** a link to a service card in the section head: 38px tall, full radius, `glass-strong` fill, lit top edge and Firm Line ring, 14px/500 text with a 15px Legible Emerald icon; on hover the text turns Legible Emerald, the ring Emerald Thread, and it lifts 1px.
- **Well:** a borderless translucent `well` tint at 12px radius, 16–20px padding, that frames a product visual inside a card and fills the card's remaining height.

### Inputs / Fields
- **Style:** 46px tall, 11px × 14px padding, 10px radius, Firm Line border, `glass-strong` fill, Ink Green value text, muted placeholder at full opacity. Textareas start at 128px and resize vertically. Labels sit 7px above in the Label style.
- **Focus:** the border turns Emerald Signal and a 4px Emerald Wash halo appears; no outline.
- **Error:** `aria-invalid` borders the field in Fault Red; the message appears in a polite live region below the form in Fault Red.
- **Hover:** the border firms slightly.

### Navigation
- **Header:** a floating glass bar (60px tall, a full pill: radius 30px = control radius 20px + 10px inset, `min(wrap + 24px, 100% - 24px)` wide, 12px from the top), sticky. Wordmark left; the section links sit on a pill track (a faint tint with a hairline ring, 4px padding), 36px tall, 15px side padding, 14.5px/500 muted, turning heading colour on hover. **Selection:** a glass pill (`glass-pill` fill, blur 10px saturate 170%, lit top edge, hairline ring, Pill shadow) moves under the section in view (scroll spy: the section crossing a band just above the middle of the viewport) like a liquid: its leading edge reaches the new link first (0.34s) and its trailing edge follows a beat later (0.5s, 70ms behind); it appears in place without sliding, and reflows without sliding. That link carries `aria-current="true"`. Choosing a link scrolls to its section directly (`scrollIntoView`, instant under reduced motion) and holds the scroll spy until the page has arrived (the section at the top, or the page at its end), so the pill goes straight to the chosen link instead of stepping back through every section on the way. Nothing is selected while the hero is in view. At right the theme switch and the small primary "Contact us".
- **Mobile:** below md a 40px round glass menu button opens a `glass-strong` sheet 8px under the bar, the bar's width, 16px radius, 8px padding, with 16px/500 links on 10px-radius rows that wash green on hover. It closes on a link, on Escape (focus returns to the button) and on an outside click.
- **Footer:** `bg-subtle` with a hairline top; the wordmark and site description, then Services, Company and Contact columns (14px/600 heads, 15px muted links that turn Ink Green), and a 14px muted bottom bar. Below md, Services and Company sit side by side in two columns (24px apart); the description and Contact span both.

### Product-style UI visuals (signature)
The proof. Built in markup so they follow the scheme; every one carries an "illustrative" caption nearby.
- **Status pill:** Geist Mono 11px in a pill (3px × 9px) with a 6px current-colour dot; ok, warn and info variants on tinted grounds.
- **App screen:** a 12px-radius frame with a Firm Line border and the Lift shadow, a 30px `surface-raised` title bar with three 8px dots and a mono URL pill.
- **Rows:** a 13.5px or 12.5px body label, a 15–16px line icon (muted or Legible Emerald), and a right-aligned mono value; hairline separators or 8px-radius `surface` rows with the Rest shadow.
- **Topology:** nodes joined by 1px Emerald Thread connectors (network, ticket progress, stack rail).
- **The work, happening:** each service visual shows one small piece of work on a shared 6s cycle. A booking goes Pending to Confirmed while the floating glass notice above the app goes "New booking request" to "Booking confirmed"; a packet glides down the network's connector (3s) while the uplink lights ping (2.4s); "New laptop setup" fills its progress line and resolves; the nightly backup's bar fills, its icon spins, and Running becomes Completed. `.swap` stacks two states in one grid cell and plays them out then in, never overlapping; `.fill-run` scales a bar from the left; `.packet`, `.ping` and `.spin` are the rest. Every base style is the finished state (Confirmed, Resolved, Completed, bars full, no packet), which is what reduced motion shows. The Swap duplicates are inside the visual's `aria-hidden` well, so assistive tech reads nothing twice.

### Hero scene (signature visual)
The business drawn as a place in the Giti landscape: a valley in perspective. One graph, no frame: a 5:4 scene in a 600 x 480 SVG space, so %-placed labels line up with what is drawn. The sky is the page itself, and the land is masked to fade out at every edge (13% at the sides, from 4 to 24% at the top, from 76% at the bottom), so the valley floats on the page rather than sitting in a card.
- **Land:** a sky gradient with a soft green light behind the peaks; three ridge layers (peaks shaped `t^1.35`, roughened by layered sines) that grow darker toward the viewer, with mist bands between them and at their feet so they fade into the valley (haze by day, moonlit mist by night); an emerald hairline on each crest, fainter with distance. Horizon at 210.
- **Valley floor:** starts in the horizon's own colour, with terrain contours that crowd toward the horizon and lines running to a vanishing point, masked to fade into the distance.
- **River:** emerges between the peaks and winds toward the viewer on the right, widening with nearness (`0.8 + 30 * t^1.45`), with a pale bank line and a dashed current.
- **Systems:** the Main office stands on the left bank; Booking app, Backups and Remote team stand on the land and Cloud & email floats in the sky. Each standing system is a beacon (lit footprint ellipse, pulse ring, 1.5-unit beam scaled by depth) under a frosted label (white or near-black at ~75%, 10px blur, lit top edge, Firm Line ring, 24px icon tile, 12px/600 name, 10.5px mono status; the office's tile is solid emerald). Data arcs (a 7-unit Emerald Wash glow under a 1.4-unit emerald line) lift from the office to each system; the arcs to the far bank cross the river.
- **Below 480px:** labels shrink to 18px icons and 10.5px names and drop their status.

**Entrance and life.** The land comes into focus with the hero copy (`intro`: blur 10px and a 14px rise to sharp, 1.2s). The ridges rise 22px from behind the horizon, far first (80, 180, 280ms). The office beacon lights at 300ms and its label at 360ms. The arcs draw out from the office from 520ms (stroke-dashoffset on `pathLength=1`), and each system lights and labels from 700 to 1140ms (labels blur 6px and scale 0.85 to sharp, from their foot). After 1.7s packets ride the arcs (SMIL `animateMotion`, eased, 2.8 to 3.9s, some inbound and some outbound), the river current flows, the beacons pulse and the cloud label floats 4px. All delays add `--intro-delay`, so the hero waits for the first-visit veil. Under reduced motion the scene is drawn and still, and the packets are not rendered (SMIL ignores the CSS rule).

### Deep-green band
The `.inverse` section: Deep Forest with its two glows, `color-scheme: dark` in both schemes (see the Scheme Flip Rule). Its visual (`ApproachStack`) is the client's technology as an isometric stack of four glass plates (software, cloud, network, devices): 2:1 rhombi with emerald side faces, etched lines and a line icon, stacked on one emerald core that runs through every plate's centre node, with a pulse travelling down it (3.2s loop). Each plate leads by a dashed leader to its label (title 16px/600, detail 13px). The highlight cycles every 2.6s: the active plate lifts 10px, its glass brightens, its node fills, its leader turns solid and its label inks on an Emerald Wash pill; hovering or focusing a plate or label takes over until the pointer or focus leaves. Reduced motion: no cycle, no pulse. Below md the drawing is cropped to the plates (no leaders) above a plain list of the four layers, the active row washed green.

### Process story
How an engagement runs, told as a scroll story. Numbering is allowed here because the order carries information.
- **At lg:** two columns (0.78fr / 1.22fr, 64px gap). The left column is pinned (`position: sticky`, under the header): the title, the lead, the four steps and a primary "Start the conversation" button. The right column scrolls four large panels past it, 40px apart. The section clips sideways with `overflow-x: clip`, never `hidden`, so the column can stick.
- **Steps:** links to their panels. A 36px mono numeral circle (`surface` with a Firm Line ring and a 4px ground halo; the ring turns Emerald Thread on hover) and a 19px/600 title (muted; heading colour when active or hovered). The active step's text opens beneath it (a `grid-template-rows` 0fr to 1fr reveal). The active step is the one whose panel crosses the middle of the screen (IntersectionObserver), marked `aria-current="step"`.
- **Indicator:** one 36px emerald disc carrying the active number (it pops in, 0.4s) glides over the numerals to the active one, with a 4px ground halo, an Emerald Thread outer ring and a green drop. A 2px rail runs from the first numeral's centre to the last; its fill (Emerald Thread to emerald) ends exactly at the indicator's centre. Both follow the numerals' measured positions every frame while steps open and close (`--indicator-y`, `--rail-end`), easing toward the target, because the steps change height and a CSS-only calculation drifts. Under reduced motion they jump. Choosing a step moves the indicator straight there and holds it until the page stops scrolling, so it does not step through the panels in between.
- **Panel:** a glass frame (28px radius, 10px padding) around a lit stage (18px radius = 28 - 10, at least 520px tall at lg; Emerald Wash light over the `well` tint). A centred tag names the step ("01 First conversation"). On the stage, from sm: a main product window (`surface`, 14px radius, Card shadow, up to 58% wide), a second card in the opposite lower corner (up to 36% wide, Glass shadow), and a floating glass chip; alternate panels mirror the layout. Below sm they stack.
  - 01: the inquiry (subject, message, "What you need" tags) and an intro-call card whose week strip highlights Tuesday, Proposed to Booked.
  - 02: the office move plan (scope checks, a four-week timeline whose bars fill in turn), Draft to Approved, and a floor plan with three Wi-Fi access points, their coverage and pulsing rings.
  - 03: the rollout tracker (workstations 14/20 to 20/20, the booking app Testing to Live) and a phone with the live booking app (time slots, one chosen, a Book button).
  - 04: the Today activity feed (a ticket In progress to Resolved, an app update, security updates, the nightly backup) and a Health card with 30 days of checks (one short incident in amber) rising in turn.
- **Below lg:** the head, then each panel preceded by its own step heading (numeral, phase, h3, text); nothing is pinned. The step list is shown only at lg, so the step text is never in the page twice.
- Each panel comes into focus as it scrolls in (`reveal`); the chips float 4px. Under reduced motion every panel shows its finished state. Captioned as illustrative.

### Pending facts
A fact the company has not supplied is rendered as a dashed pill (1px dashed Firm Line, muted 13px "Coming soon", 1px × 10px). An action that depends on a missing fact is disabled (the disabled button above), loses its arrow, and is explained in a plain muted note; an alternative stays available ("Copy message").

### Wordmark (provisional)
The name in Mona Sans 650 at 19px, width 108%, -0.02em, beside a 30px mark (a green tile with an orbit and node). The mark is a placeholder until a logo is supplied; it is not part of the system and must not be reused as a motif.

## Do's and Don'ts

### Do:
- **Do** write every new colour as a `light-dark()` pair on `:root, .inverse`, and add any new scheme-flipping subtree to that selector (the Scheme Flip Rule).
- **Do** keep emerald the only accent: primary fills in Emerald Signal, green text and icons in Legible Emerald, tints in Emerald Wash.
- **Do** put glass only where there is colour behind it, and give every glass surface the solid `glass-solid` fallback for reduced transparency and missing `backdrop-filter`.
- **Do** make a panel nested inside glass solid (`surface` with the Glass shadow), as the mobile menu sheet is.
- **Do** show work as product-style UI built in markup, with illustrative values and a caption that says so.
- **Do** keep Geist Mono to data inside visuals (times, counts, statuses, values, URLs) and the process numerals; set labels in Mona Sans 12.5px muted.
- **Do** use pills for actions, chips and states, and 16px rounded rectangles for containers.
- **Do** keep a chip's icon slot filled ("+" unselected, check selected) at a constant text weight.
- **Do** render a missing fact as the dashed "Coming soon" pill, and disable any action that depends on it, without its arrow and with a plain note.
- **Do** keep motion to the hero assembly (rise 14px, frost from blur(0), fill always present) and the 2px card lift, all instant under reduced motion.

### Don't:
- Don't use a plain grid, graph paper, stripes or generic tech motifs as a background; textures come from the Giti landscape (contours, ridges, rivers, terrain, currents).
- **Don't** reintroduce the rejected 2026-11 "Engineering Pad" world: graph-paper grounds, hand-drafted sketches, all-caps condensed type (Barlow Condensed), GIVEN / FIND / SOLUTION worksheet wording, pale-green paper or a lime highlighter.
- **Don't** add a second accent hue, gradient text, or neon glows on black; amber and red are status colours inside visuals only.
- **Don't** let light fields become shapes: they stay low-alpha radial light (0.13 and under at night), masked out before the section edge, behind glass, never hard-edged or animated.
- **Don't** use stock photography (handshakes, people at laptops, blue server rooms), illustrations, mascots or bouncy motion.
- **Don't** put glass on a flat ground with nothing behind it, or nest a translucent sheet inside glass.
- **Don't** put the hero scene in a card or frame, or crowd it with extra panels; it is the one graph in the hero.
- **Don't** set headings, labels or buttons in all-caps, letterspaced or condensed type, and don't set labels in mono.
- **Don't** place a label above a headline; a section opens on its sentence-case headline.
- **Don't** add a border to a well inside a card, or nest boxes in boxes.
- **Don't** number items unless their order carries information.
- **Don't** invent contact details, clients, figures, certifications or response times to fill a gap.
- **Don't** reuse the provisional wordmark mark (tile and orbit) as a motif; it will be replaced by the logo.
