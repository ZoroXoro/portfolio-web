import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { about, site } from "@/data/site";
import Attest from "../attest";

export default function About({ certificateCount }: { certificateCount: number | null }) {
  return (
    <section id="about" aria-labelledby="about-title" className="shell scroll-mt-16 py-[var(--section)]">
      <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <figure className="max-w-sm lg:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden border border-foreground/85">
            <Image
              src="/profile.jpeg"
              alt={`Portrait of ${site.legalName}`}
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover grayscale contrast-[1.05]"
            />
          </div>
          <figcaption className="label mt-3 text-muted-foreground">
            {site.legalName}, who builds as {site.brand}
          </figcaption>
        </figure>

        <div className="lg:col-span-7 lg:col-start-6">
          <h2 id="about-title" className="wide border-t border-rule pt-5 text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.02em]">
            How I work
          </h2>
          <div className="mt-6 max-w-[62ch] space-y-5 text-[1.1875rem] leading-[1.6]">
            {about.approach.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <Attest
            className="mt-10"
            rows={about.record.map((r) => ({
              label: r.label,
              value: (
                <span className="flex flex-wrap justify-between gap-x-4">
                  <span>{r.value}</span>
                  {r.meta && <span className="text-muted-foreground">{r.meta}</span>}
                </span>
              ),
            }))}
          />
          <Link href="/certificates" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold">
            {certificateCount ? `${certificateCount} certificates` : "Certificates"}
            <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
