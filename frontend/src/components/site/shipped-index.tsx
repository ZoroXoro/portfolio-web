import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { shippedSites } from "@/data/shipped-sites";
import Seal from "./seal";
import { Num } from "./specimen";

function breakAtDots(host: string) {
  return host.split(".").map((part, i) => (
    <span key={i}>
      {i > 0 && <wbr />}
      {i > 0 ? "." : ""}
      {part}
    </span>
  ));
}

/** Live client sites as a contact sheet of sealed plates, numbered on from the admin projects. */
export default function ShippedIndex({ startAt }: { startAt: number }) {
  const first = String(startAt).padStart(2, "0");
  const last = String(startAt + shippedSites.length - 1).padStart(2, "0");

  return (
    <div id="live-sites" className="scroll-mt-24 pt-[clamp(4rem,8vw,6rem)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-rule pt-4">
        <h3 className="wide text-[clamp(1.375rem,2.2vw,1.75rem)] font-bold tracking-[-0.015em]">More live sites</h3>
        <p className="label text-muted-foreground">
          No. {first}–{last} · Next.js
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {shippedSites.map((site, i) => {
          const host = new URL(site.url).hostname.replace(/^www\./, "");
          return (
            <li key={site.slug}>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="block overflow-hidden border border-foreground/85 bg-card transition-[border-color] duration-200 group-hover:border-foreground">
                  <Image
                    src={`/work/sites/${site.slug}.jpg`}
                    alt={`Screenshot of the ${site.name} website`}
                    width={1200}
                    height={750}
                    sizes="(min-width: 1024px) 300px, (min-width: 480px) 45vw, 92vw"
                    className="block h-auto w-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.02]"
                  />
                </span>
                <span className="wide mt-4 block text-lg font-bold leading-tight group-hover:underline">
                  <Num n={String(startAt + i).padStart(2, "0")} />
                  {site.name}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] leading-snug text-muted-foreground">{site.summary}</span>
                <span className="mt-3 flex min-h-8 max-w-full items-center gap-2 text-[0.9375rem] font-semibold">
                  <Seal size={16} />
                  <span className="min-w-0 underline underline-offset-4 group-hover:no-underline">{breakAtDots(host)}</span>
                  <ArrowUpRight size={15} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
