import Approach from "@/components/home/Approach";
import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import ServicesBento from "@/components/home/ServicesBento";
import { PAGE_SEO } from "@/data/seo";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(PAGE_SEO.home);

/** `/`: the offer, the four services, why one partner, how we work, and contact. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <Approach />
      <Process />
      <ContactSection />
    </>
  );
}
