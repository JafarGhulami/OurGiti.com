import type { CSSProperties, ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/data/home";
import { CONTACT_INFO } from "@/data/site";
import ContactForm from "./ContactForm";

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="icon-tile">{icon}</span>
      <div>
        <dt className="text-[14px] text-muted">{label}</dt>
        <dd className="m-0 mt-0.5 text-[16px] font-medium text-heading">{children}</dd>
      </div>
    </div>
  );
}

function Pending() {
  return <span className="pending font-normal">Coming soon</span>;
}

/** Contact: the offer restated, OurGiti's details, and the form on a glass card over green light. */
export default function ContactSection() {
  const icon = { size: 19, strokeWidth: 1.75, "aria-hidden": true } as const;
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section band-subtle bg-dots pat-right overflow-hidden"
    >
      <div className="light-field" aria-hidden />
      <div className="wrap relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="reveal">
          <h2 id="contact-title">{CONTACT.title}</h2>
          <p className="lead mt-5">{CONTACT.lead}</p>
          <dl className="m-0 mt-10 grid gap-6">
            <Detail icon={<Mail {...icon} />} label="Email">
              {CONTACT_INFO.email ?? <Pending />}
            </Detail>
            <Detail icon={<Phone {...icon} />} label="Phone">
              {CONTACT_INFO.phone ?? <Pending />}
            </Detail>
            <Detail icon={<MapPin {...icon} />} label="Serving">
              {CONTACT_INFO.serviceArea}
            </Detail>
          </dl>
        </div>
        <div className="glass reveal p-6 sm:p-8" style={{ "--stagger": 1 } as CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
