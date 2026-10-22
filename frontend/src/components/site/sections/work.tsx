import { ArrowUpRight } from "lucide-react";
import type { Profile, Specimen } from "@/lib/portfolio";
import { shippedSites } from "@/data/shipped-sites";
import ShippedIndex from "../shipped-index";
import { SpecimenList } from "../specimen";

export default function Work({ specimens, profile }: { specimens: Specimen[] | null; profile: Profile }) {
  return (
    <section id="work" aria-labelledby="work-title" className="shell scroll-mt-16 pb-[var(--section)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-5">
        <h2 id="work-title" className="wide text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.02em]">
          Selected work
        </h2>
        <p className="label text-muted-foreground">
          {(specimens?.length ?? 0) + shippedSites.length} projects
          {" · "}client &amp; production work
        </p>
      </div>

      {specimens && specimens.length > 0 ? (
        <SpecimenList specimens={specimens} />
      ) : (
        <div className="max-w-[60ch] py-14">
          <p className="text-lg">
            {specimens ? "Projects are being written up." : "The project record couldn’t be loaded just now."} Meanwhile, the
            resume covers the same work.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6">
            <a href="/resume" target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4">
              Resume <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4">
              GitHub <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      )}

      <ShippedIndex startAt={(specimens?.length ?? 0) + 1} />
    </section>
  );
}
