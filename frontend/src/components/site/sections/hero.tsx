import { ArrowRight, ArrowUpRight } from "lucide-react";
import { facts, site } from "@/data/site";
import Attest from "../attest";

// The two primary actions: ruled text, identical treatment, no fill
const action =
  "group inline-flex min-h-12 items-center gap-2 border-b-2 border-foreground pb-1 text-lg font-semibold transition-[border-color,color] duration-150 hover:border-muted-foreground";

export default function Hero() {
  return (
    <section aria-labelledby="hero-mark" className="shell pb-14 pt-28 sm:pb-20 sm:pt-36">
      <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 id="hero-mark">
            <span className="mark block text-[clamp(4rem,14vw,6rem)]">{site.mark}</span>
            <span className="sr-only">, full-stack web and app developer</span>
          </h1>
          <p className="wide mt-8 max-w-[26ch] text-[clamp(1.375rem,2.5vw,1.875rem)] font-medium leading-[1.22] tracking-[-0.01em]">
            {site.statement}
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <a href="#contact" className={action}>
              Get in touch
              <ArrowRight size={18} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href="/resume" target="_blank" rel="noopener" className={action}>
              Resume
              <ArrowUpRight size={18} aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
          <Attest
            rows={[
              ...facts,
              {
                label: "Status",
                value: "Available for roles & projects",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
