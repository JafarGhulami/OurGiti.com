import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ICON } from "@/components/ui/icon-props";
import { HERO } from "@/data/home";
import { CONTACT_INFO } from "@/data/site";
import HeroVisual from "./HeroVisual";

/** The first viewport: the offer, the two actions, and the product-style visual over green light. */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-mesh pat-hero relative overflow-hidden">
      <div className="light-field" aria-hidden />
      <div className="wrap relative grid items-center gap-14 pt-[calc(var(--header-h)+clamp(40px,6vw,88px))] pb-[clamp(56px,6vw,80px)] lg:grid-cols-[1fr_1.02fr] lg:gap-16">
        <div>
          <h1 id="hero-title" className="intro max-w-[17ch]">
            {HERO.title}
          </h1>
          <p className="lead intro mt-6" style={{ "--d": "120ms" } as CSSProperties}>
            {HERO.lead}
          </p>
          <div
            className="intro mt-9 flex flex-wrap items-center gap-3"
            style={{ "--d": "220ms" } as CSSProperties}
          >
            <Link href="#contact" className="btn btn-primary">
              {HERO.primary} <ArrowRight {...ICON} size={17} />
            </Link>
            <Link href="#services" className="btn btn-secondary">
              {HERO.secondary}
            </Link>
          </div>
          <p
            className="intro mt-8 flex items-center gap-2 text-[14.5px] text-muted"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            <MapPin {...ICON} size={16} className="text-brand-text" />
            Serving {CONTACT_INFO.serviceArea}
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
