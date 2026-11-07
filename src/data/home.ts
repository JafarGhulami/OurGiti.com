/**
 * Home page copy. Drafted from the confirmed service lines; the approach and process copy
 * describes how an engagement runs in general terms and should be reviewed by the company.
 * No client names, figures, certifications or response times until they are supplied.
 */
export const HERO = {
  title: "One partner for your software and the IT it runs on.",
  lead: "OurGiti builds custom software and apps, designs and installs networks, supports your team day to day, and keeps your cloud, email and data secure, for organizations in Texas and across the US.",
  primary: "Request a consultation",
  secondary: "Explore services",
  visualCaption: "Illustrative view of the kind of systems we build and look after.",
} as const;

export const SERVICES_INTRO = {
  title: "Everything your business runs on.",
  lead: "Four services, one accountable team. Start with what you need today and bring us the rest as you grow.",
  visualCaption: "Product visuals are illustrative examples of the work, not client systems.",
  jumpLabel: "Jump to a service",
  ctaTitle: "Not sure where to start?",
  ctaText: "Tell us what is going on and we will help you pick the right first step.",
  cta: "Request a consultation",
} as const;

export const APPROACH = {
  title: "One team for every layer of your technology.",
  lead: "When your software comes from one vendor and your IT from another, problems fall into the gap between them. OurGiti builds the software and looks after the network, devices and cloud it depends on, so one team answers for the whole stack.",
  points: [
    "One point of contact for software and IT",
    "Systems planned to work together from day one",
    "Security considered at every layer",
    "Support from a team that knows your setup",
  ],
  layers: [
    { title: "Software & apps", detail: "Custom software · Web · Mobile" },
    { title: "Cloud, email & data", detail: "Hosting · Domains · Backups" },
    { title: "Network & security", detail: "Firewalls · Wi-Fi · Cabling" },
    { title: "Devices & support", detail: "Helpdesk · Maintenance" },
  ],
} as const;

export const PROCESS = {
  title: "How we work with you.",
  lead: "A straightforward path from first conversation to systems that keep running.",
  cta: "Start the conversation",
  steps: [
    {
      phase: "First conversation",
      title: "Talk to us",
      text: "Tell us what is working, what is not, and what you want to build, fix or improve.",
    },
    {
      phase: "Before work starts",
      title: "Get a clear plan",
      text: "We recommend an approach and agree the scope with you before any work starts.",
    },
    {
      phase: "Delivery",
      title: "We build and install",
      text: "Software, networks and systems are delivered, set up and tested with your team.",
    },
    {
      phase: "After launch",
      title: "We keep it running",
      text: "Support, maintenance and security continue after launch, for as long as you need them.",
    },
  ],
  visualCaption: "Illustrative examples of what each step produces.",
} as const;

export const CONTACT = {
  title: "Tell us what you need.",
  lead: "Share a few details about your organization and what you would like to build, fix or improve. We will get back to you to talk it through.",
  servicesLegend: "What can we help with?",
  messagePlaceholder:
    "For example: we are moving offices in March and need Wi-Fi, 20 workstations and a booking app.",
  send: "Send message",
  copy: "Copy message",
  copied: "Copied",
  sendPending:
    "Online sending opens once OurGiti's email address is connected. You can copy your message in the meantime.",
} as const;
