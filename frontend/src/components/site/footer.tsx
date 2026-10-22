import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/data/site";
import type { Profile } from "@/lib/portfolio";

export default function Footer({ profile }: { profile: Profile }) {
  const socials = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ];
  return (
    <footer className="bg-foreground text-background">
      <div className="shell grid gap-10 border-t border-background/20 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mark text-[2.5rem]">{site.mark}</p>
          <p className="mt-3 text-background/70">Designed and built by {site.brand}.</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`/#${n.id}`} className="inline-flex min-h-10 items-center hover:underline">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/certificates" className="inline-flex min-h-10 items-center hover:underline">
                Certificates
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col justify-between gap-6 md:col-span-4">
          <ul className="space-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 hover:underline">
                  {s.label} <ArrowUpRight size={15} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="label text-background/60">© {new Date().getFullYear()} {site.brand} · {site.contact.location}</p>
        </div>
      </div>
    </footer>
  );
}
