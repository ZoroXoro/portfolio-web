import { ArrowUpRight } from "lucide-react";
import type { Profile } from "@/lib/portfolio";
import ContactForm from "../contact-form";
import CopyEmail from "../copy-email";

export default function Contact({ profile }: { profile: Profile }) {
  const channels = [
    { label: "LinkedIn", value: "Message on LinkedIn", href: profile.linkedin },
    { label: "GitHub", value: profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, "@"), href: profile.github },
    ...(profile.whatsapp
      ? [{ label: "WhatsApp", value: profile.phone || "Chat on WhatsApp", href: `https://wa.me/${profile.whatsapp}` }]
      : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 bg-foreground text-background selection:bg-background selection:text-foreground">
      <div className="shell grid gap-x-6 gap-y-14 py-[var(--section)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="wide max-w-[14ch] text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.025em]">
            Hiring, or have something to build?
          </h2>
          <p className="mt-6 max-w-[40ch] text-background/75">
            Email is quickest. The form reaches the same inbox.
          </p>

          <div className="mt-10 border-t border-background/25 pt-5">
            <p className="label text-background/60">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="wide mt-1 block break-all text-[clamp(1.25rem,2.2vw,1.625rem)] font-bold underline underline-offset-[0.2em] hover:no-underline"
            >
              {profile.email}
            </a>
            <CopyEmail email={profile.email} />
          </div>

          <dl className="mt-6">
            {channels.map((c) => (
              <div key={c.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-background/25 py-3">
                <dt className="label pt-[0.35em] text-background/60">{c.label}</dt>
                <dd>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-8 items-center gap-1.5 font-medium hover:underline">
                    {c.value}
                    <ArrowUpRight size={15} aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-y border-background/25 py-3">
              <dt className="label pt-[0.35em] text-background/60">Based</dt>
              <dd className="font-medium">{profile.location}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
          <ContactForm email={profile.email} />
        </div>
      </div>
    </section>
  );
}
