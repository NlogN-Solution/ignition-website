"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Clock3, Loader2, Phone, Send } from "lucide-react";
import { Card } from "../ui/Card";
import { readStored, storageKeys, writeStored } from "@/lib/storage";
import { useStoredValue } from "@/lib/storage/store";
import { journeyStages } from "@/data/journey/stages";
import { contact, telUrl } from "@/lib/config";

/**
 * Three fields, and no more.
 *
 * It closes the homepage, so it is laid out as a band rather than as a card in
 * a column: what happens after you press the button on the left, the fields on
 * the right. The heading belongs to the section around it — this used to carry
 * its own, which duplicated the one above it the moment the form stopped being
 * a sibling of the journey selector.
 *
 * The rest of this site is built on the principle that a student can do
 * everything anonymously — the quiz, the shortlist, the comparison and the
 * cost model all persist locally and ask for nothing. This is the one place
 * that asks, so it has to earn it: it appears after the student has told us
 * where they are in their journey, it offers a callback rather than a
 * newsletter, and every field beyond name, email and phone was cut. Anything
 * an adviser needs beyond those three they can ask on the call.
 *
 * IT CARRIES THE STAGE. Whatever the student picked in "Where are you in your
 * UK journey?" travels with the submission, so an adviser opens the record
 * already knowing whether they are talking to someone choosing a subject or
 * someone holding an offer. It is read from the shared store rather than
 * passed in, because the selector and this form no longer sit in the same
 * section of the page.
 *
 * WHERE IT GOES. `NEXT_PUBLIC_LEAD_ENDPOINT` receives the JSON. With no
 * endpoint configured — local development, and any preview build — the
 * submission is kept in this browser and the form reports success, because a
 * form that appears to fail while someone is designing the page around it is
 * a worse lie than one that succeeds locally. Nothing is transmitted in that
 * case.
 */

type Status = "idle" | "sending" | "sent" | "error";

export type LeadContact = {
  name: string;
  email: string;
  phone: string;
  newsletter: boolean;
  /** Which journey stage they had selected, when they had selected one. */
  stage?: string | null;
  submittedAt?: string;
};

const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

/** Deliberately permissive. Rejecting a valid address is worse than accepting a typo. */
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/** Digits, spaces, brackets, dashes and one optional leading plus. */
const looksLikePhone = (value: string) =>
  /^\+?[\d\s().-]{7,20}$/.test(value) && (value.match(/\d/g) ?? []).length >= 7;

export function LeadCapture() {
  const stageId = useStoredValue<string | null>(storageKeys.journeyStage, null);
  const stage =
    journeyStages.find((option) => option.id === stageId)?.label ?? null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prefilled from a previous submission rather than pre-populated on the
  // server, so the markup is identical for everyone and nothing flashes.
  useEffect(() => {
    const saved = readStored<LeadContact | null>(storageKeys.leadContact, null);
    if (!saved) return;

    setName(saved.name ?? "");
    setEmail(saved.email ?? "");
    setPhone(saved.phone ?? "");
  }, []);

  function validate() {
    const next: Record<string, string> = {};

    if (name.trim().length < 2) next.name = "Tell us what to call you.";
    if (!looksLikeEmail(email.trim())) next.email = "That doesn't look like an email address.";
    if (!looksLikePhone(phone.trim()))
      next.phone = "Include your country code, e.g. +44 20 8000 0000.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    const payload: LeadContact = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      newsletter,
      stage: stage ?? null,
      submittedAt: new Date().toISOString(),
    };

    setStatus("sending");

    // Stored first: if the network fails the student should not have to type
    // it again, and the record is the thing we most want to keep.
    writeStored(storageKeys.leadContact, payload);

    if (!endpoint) {
      setStatus("sent");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Card className="p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start gap-4"
        >
          <span
            aria-hidden
            className="mt-[2px] flex size-[38px] shrink-0 items-center justify-center rounded-[11px] bg-orange/10"
          >
            <Check size={19} strokeWidth={2.6} className="text-orange" />
          </span>
          <div className="min-w-0">
            <p className="text-[18px] font-bold leading-[1.3] tracking-[-0.012em] text-navy">
              Thanks, {name.split(" ")[0] || "we've got it"}
              <span className="text-orange">.</span>
            </p>
            <p className="mt-[8px] max-w-[52ch] text-[15px] font-medium leading-[1.6] text-muted">
              An adviser will be in touch on {phone.trim()}. If you would rather
              not wait, call us on{" "}
              <a
                href={telUrl}
                className="font-semibold text-blue-link underline-offset-2 hover:underline"
              >
                {contact.phone}
              </a>{" "}
              — {contact.hours}.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 text-[14px] font-semibold text-muted transition-colors hover:text-navy"
            >
              Send different details
            </button>
          </div>
        </motion.div>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-6">
      {/* What they get for the phone number, before they are asked for it. */}
      <Card tone="flat" className="p-6 sm:p-8">
        <span
          aria-hidden
          className="flex size-[42px] items-center justify-center rounded-[12px] bg-navy/[0.07]"
        >
          <Phone size={19} strokeWidth={2.2} className="text-navy" />
        </span>

        <p className="mt-5 max-w-[34ch] text-[17px] font-semibold leading-[1.45] tracking-[-0.01em] text-navy">
          A real adviser, on the phone, at no cost
          <span className="text-orange">.</span>
        </p>

        <ul className="mt-6 space-y-[13px]">
          {[
            "No obligation, and nothing to have decided first",
            "Whatever you picked above comes with the request",
            "One conversation covers course, cost and eligibility",
          ].map((line) => (
            <li
              key={line}
              className="flex gap-[11px] text-[14.5px] font-medium leading-[1.5] text-ink-soft"
            >
              <Check
                size={16}
                strokeWidth={2.5}
                aria-hidden
                className="mt-[3px] shrink-0 text-orange"
              />
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-hairline pt-6">
          <p className="inline-flex items-center gap-[8px] text-[12.5px] font-bold uppercase tracking-[0.1em] text-muted-light">
            <Clock3 size={13} strokeWidth={2.4} aria-hidden />
            Or call us now
          </p>
          <p className="mt-[10px] text-[17px] font-bold tracking-[-0.01em] text-navy">
            <a
              href={telUrl}
              className="transition-colors hover:text-blue-link"
            >
              {contact.phone}
            </a>
          </p>
          <p className="mt-[5px] text-[13.5px] font-medium text-muted">
            {contact.hours}
          </p>
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
      <form onSubmit={submit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="lead-name"
            label="Full name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={setName}
            error={errors.name}
          />
          <Field
            id="lead-phone"
            label="Phone number"
            type="tel"
            autoComplete="tel"
            placeholder="+44 20 8000 0000"
            value={phone}
            onChange={setPhone}
            error={errors.phone}
          />
          <div className="sm:col-span-2">
            <Field
              id="lead-email"
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              error={errors.email}
            />
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(event) => setNewsletter(event.target.checked)}
            className="mt-[3px] size-[17px] shrink-0 cursor-pointer accent-[color:var(--color-navy)]"
          />
          <span className="text-[14px] font-medium leading-[1.55] text-muted">
            Also send me deadline reminders and scholarship openings by email.
            One message a month at most, and you can stop them at any time.
          </span>
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex h-[52px] items-center justify-center gap-[14px] rounded-[10px] bg-navy px-7 text-[15.5px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-navy-ink hover:shadow-[0_10px_30px_-12px_rgba(1,22,111,0.65)] active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                Sending
                <Loader2 size={17} strokeWidth={2.4} aria-hidden className="animate-spin" />
              </>
            ) : (
              <>
                Request a callback
                <Send
                  size={16}
                  strokeWidth={2.4}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                />
              </>
            )}
          </button>

          <p className="max-w-[34ch] text-[13px] font-medium leading-[1.5] text-muted-light">
            We use your details to answer your enquiry. We never sell them on.
          </p>
        </div>

        {status === "error" ? (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-orange/25 bg-orange/[0.06] p-4 text-[14px] font-medium leading-[1.55] text-ink-soft"
          >
            That didn&rsquo;t send — your details are saved in this browser, so
            nothing is lost. Try again, or call us on{" "}
            <a
              href={telUrl}
              className="font-semibold text-blue-link underline-offset-2 hover:underline"
            >
              {contact.phone}
            </a>
            .
          </p>
        ) : null}
        </form>
      </Card>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="block text-[12.5px] font-bold uppercase tracking-[0.12em] text-muted-light"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-[9px] h-[50px] w-full rounded-[10px] border bg-white px-4 text-[15.5px] font-medium text-ink placeholder:text-muted-light ${
          error ? "border-orange" : "border-hairline focus:border-ring-idle"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-[7px] text-[13px] font-semibold text-orange">
          {error}
        </p>
      ) : null}
    </div>
  );
}
