"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check, Copy, Plus } from "lucide-react";
import { ICON } from "@/components/ui/icon-props";
import { CONTACT } from "@/data/home";
import { SERVICE_LINES } from "@/data/services";
import { CONTACT_INFO } from "@/data/site";

type Status = { kind: "idle" } | { kind: "copied" } | { kind: "error"; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The contact form: the page's action in working form. Sending composes an email to OurGiti
 * (the site has no server); until the company's address is supplied, the send button is
 * disabled with a plain note and the message can be copied instead.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [invalid, setInvalid] = useState<{ name?: boolean; email?: boolean }>({});
  const uid = useId();
  const canSend = CONTACT_INFO.email !== null;

  function summary(form: HTMLFormElement): string {
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const services = data
      .getAll("services")
      .map((slug) => SERVICE_LINES.find((service) => service.slug === slug)?.title)
      .filter(Boolean)
      .join(", ");
    const lines = [
      ["Name", value("name")],
      ["Email", value("email")],
      ["Company", value("company")],
      ["Phone", value("phone")],
      ["Interested in", services],
      ["Message", value("message")],
    ].filter(([, text]) => text !== "");
    return lines.map(([label, text]) => `${label}: ${text}`).join("\n");
  }

  async function onCopy(form: HTMLFormElement | null) {
    if (!form) return;
    try {
      await navigator.clipboard.writeText(summary(form));
      setStatus({ kind: "copied" });
    } catch {
      setStatus({
        kind: "error",
        message: "Your browser blocked copying. Select your message and copy it by hand.",
      });
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!CONTACT_INFO.email) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const nextInvalid = { name: name === "", email: !EMAIL_PATTERN.test(email) };
    setInvalid(nextInvalid);
    if (nextInvalid.name || nextInvalid.email) {
      setStatus({
        kind: "error",
        message: "Please add your name and a valid email address so we can reply.",
      });
      return;
    }
    const subject = encodeURIComponent(`Enquiry from ${name}`);
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${encodeURIComponent(summary(form))}`;
  }

  const statusId = `${uid}-status`;
  const pendingId = `${uid}-pending`;

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={statusId} className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="field-label">
            Full name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            className="field"
            aria-invalid={invalid.name || undefined}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="field-label">
            Work email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            aria-invalid={invalid.email || undefined}
          />
        </div>
        <div>
          <label htmlFor={`${uid}-company`} className="field-label">
            Company
          </label>
          <input id={`${uid}-company`} name="company" autoComplete="organization" className="field" />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="field-label">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className="field-label p-0">{CONTACT.servicesLegend}</legend>
        <div className="flex flex-wrap gap-2.5">
          {SERVICE_LINES.map((service) => (
            <label key={service.slug} className="chip">
              <input type="checkbox" name="services" value={service.slug} />
              <span>
                <Plus size={14} strokeWidth={2.25} aria-hidden className="chip-plus" />
                <Check size={14} strokeWidth={2.5} aria-hidden className="chip-check" />
                {service.need}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${uid}-message`} className="field-label">
          How can we help?
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          className="field"
          placeholder={CONTACT.messagePlaceholder}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!canSend}
          aria-describedby={canSend ? undefined : pendingId}
        >
          {CONTACT.send}
          {canSend ? <ArrowRight {...ICON} size={17} /> : null}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={(event) => onCopy(event.currentTarget.form)}
        >
          {status.kind === "copied" ? <Check {...ICON} size={17} /> : <Copy {...ICON} size={17} />}
          {status.kind === "copied" ? CONTACT.copied : CONTACT.copy}
        </button>
      </div>

      {!canSend ? (
        <p id={pendingId} className="-mt-2 max-w-[60ch] text-[14px] text-muted">
          {CONTACT.sendPending}
        </p>
      ) : null}
      <p id={statusId} role="status" aria-live="polite" className="-mt-3 min-h-[1.4em] text-[14px]">
        {status.kind === "error" ? <span className="text-danger">{status.message}</span> : null}
        {status.kind === "copied" ? (
          <span className="text-brand-text">Message copied to your clipboard.</span>
        ) : null}
      </p>
    </form>
  );
}
