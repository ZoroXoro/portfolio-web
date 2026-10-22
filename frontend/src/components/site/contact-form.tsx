"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { AlertCircle, ArrowRight } from "lucide-react";
import Seal from "./seal";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = "Add your name so I know who’s writing.";
  if (!EMAIL.test(values.email.trim())) errors.email = "That email doesn’t look complete — I need it to reply.";
  if (values.message.trim().length < 10) errors.message = "Say a little more — at least a sentence.";
  return errors;
}

export default function ContactForm({ email }: { email: string }) {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [slow, setSlow] = useState(false);
  const [sentTo, setSentTo] = useState("");
  const reduce = useReducedMotion();
  const successRef = useRef<HTMLDivElement>(null);
  const errors = validate(values);
  const showError = (f: Field) => (touched[f] ? errors[f] : undefined);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) {
      const first = (["name", "email", "message"] as Field[]).find((f) => errors[f]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    // The API host sleeps when idle; tell people why the first send can take a while
    const slowTimer = setTimeout(() => setSlow(true), 5000);
    try {
      const res = await fetch(`${API_URL}/connections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
        signal: AbortSignal.timeout(70_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSentTo(values.email.trim());
      setValues({ name: "", email: "", message: "" });
      setTouched({});
      setStatus("sent");
      navigator.vibrate?.(12);
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(slowTimer);
      setSlow(false);
    }
  };

  if (status === "sent") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-6 outline-none">
        <motion.div
          initial={reduce ? false : { scale: 1.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          // The page's one bouncy moment: a stamp landing
          transition={{ type: "spring", bounce: 0.35, visualDuration: 0.35 }}
        >
          <Seal size={64} />
        </motion.div>
        <div>
          <p className="wide text-2xl font-bold">Delivered.</p>
          <p className="mt-2 max-w-[42ch] text-background/75">
            Your message is in my inbox. I’ll reply to <span className="text-background">{sentTo}</span>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="min-h-11 font-semibold underline underline-offset-4 hover:no-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = (f: Field, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={`contact-${f}`} className="label text-background/70">
        {label}
      </label>
      {input}
      {showError(f) && (
        <p id={`contact-${f}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-[#ffb4a8]">
          <AlertCircle size={14} aria-hidden /> {showError(f)}
        </p>
      )}
    </div>
  );

  const inputClass =
    "mt-2 block w-full border-0 border-b border-background/35 bg-transparent px-0 py-3 text-lg text-background caret-background placeholder:text-background/45 transition-colors focus:border-background focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-[#ffb4a8]";

  const common = (f: Field) => ({
    id: `contact-${f}`,
    name: f,
    value: values[f],
    disabled: status === "sending",
    "aria-invalid": !!showError(f),
    "aria-describedby": showError(f) ? `contact-${f}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [f]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [f]: true })),
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-8" aria-busy={status === "sending"}>
      <div className="grid gap-8 sm:grid-cols-2">
        {field("name", "Name", <input {...common("name")} autoComplete="name" placeholder="Your name" className={inputClass} />)}
        {field(
          "email",
          "Email",
          <input {...common("email")} type="email" autoComplete="email" placeholder="you@company.com" className={inputClass} />
        )}
      </div>
      {field(
        "message",
        "Message",
        <textarea
          {...common("message")}
          rows={5}
          placeholder="The role, or what you want built"
          className={`${inputClass} resize-y`}
        />
      )}

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 text-[#ffb4a8]">
          <AlertCircle size={18} aria-hidden className="mt-0.5 shrink-0" />
          <span>
            That didn’t go through — the server didn’t respond. Your message is still here; try again, or email{" "}
            <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4">
              {email}
            </a>
            .
          </span>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-13 items-center gap-3 bg-background px-7 text-base font-semibold text-foreground transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.98] disabled:cursor-progress disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowRight size={18} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>
        <p aria-live="polite" className="text-sm text-background/70">
          {slow ? "Still sending — the server wakes up when it’s been idle. This can take up to a minute." : ""}
        </p>
      </div>
    </form>
  );
}
