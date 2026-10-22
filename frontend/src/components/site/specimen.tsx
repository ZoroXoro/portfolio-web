import { ArrowRight } from "lucide-react";
import type { Specimen as SpecimenData } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import Attest from "./attest";
import Outbound from "./outbound";
import Plate from "./plate";
import { TransitionLink } from "./transition-link";

/** Catalogue number set in the title line itself, muted and tabular. */
export function Num({ n }: { n: string }) {
  return (
    <span className="mr-[0.45em] font-medium tabular-nums text-muted-foreground">
      <span className="sr-only">Number </span>
      {n}
    </span>
  );
}

function rows(s: SpecimenData) {
  return [
    { label: "Role", value: s.role },
    { label: "For", value: s.company },
    { label: "Period", value: s.period },
    { label: "Stack", value: s.tech.join(", ") },
  ];
}

/** Live work gets the full plate and seal; work without a public link sits in the compact pair. */
export function FeatureSpecimen({ s, first }: { s: SpecimenData; first?: boolean }) {
  const detail = `/work/${s.slug}`;
  return (
    <article id={s.slug} className="grid scroll-mt-24 gap-x-6 gap-y-7 border-b border-border py-12 first:pt-4 lg:grid-cols-12">
      <TransitionLink href={detail} className="group block lg:col-span-8" aria-label={`${s.title}: read the project`}>
        <Plate
          specimen={s}
          priority={first}
          sizes="(min-width: 1280px) 820px, (min-width: 1024px) 66vw, 100vw"
          className="transition-[border-color] duration-200 group-hover:border-foreground"
        />
      </TransitionLink>

      <div className="flex flex-col lg:col-span-4">
        <h3 className="wide text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.1] tracking-[-0.015em]">
          <TransitionLink href={detail} className="hover:underline">
            <Num n={s.number} />
            {s.title}
          </TransitionLink>
        </h3>
        {s.paragraphs[0] && <p className="mt-4 line-clamp-4 text-muted-foreground">{s.paragraphs[0]}</p>}
        <Attest rows={rows(s)} dense className="mt-6" />
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1">
          {s.live && <Outbound link={s.live} sealed />}
          {s.secondary && <Outbound link={s.secondary} />}
        </div>
        <TransitionLink
          href={detail}
          className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-6 font-semibold"
        >
          Read the project
          <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
        </TransitionLink>
      </div>
    </article>
  );
}

export function CompactSpecimen({ s }: { s: SpecimenData }) {
  const detail = `/work/${s.slug}`;
  return (
    <article id={s.slug} className="flex scroll-mt-24 flex-col">
      <TransitionLink href={detail} className="group block" aria-label={`${s.title}: read the project`}>
        <Plate
          specimen={s}
          sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
          className="transition-[border-color] duration-200 group-hover:border-foreground"
        />
      </TransitionLink>
      <h3 className="wide mt-6 text-[clamp(1.375rem,2vw,1.625rem)] font-bold leading-[1.15] tracking-[-0.01em]">
        <TransitionLink href={detail} className="hover:underline">
          <Num n={s.number} />
          {s.title}
        </TransitionLink>
      </h3>
      {s.paragraphs[0] && <p className="mt-3 line-clamp-3 text-muted-foreground">{s.paragraphs[0]}</p>}
      <Attest
        rows={[...rows(s), { label: "Status", value: s.secondary ? "" : "No public link" }]}
        dense
        className="mt-5"
      />
      {s.secondary && (
        <div className="mt-3">
          <Outbound link={s.secondary} />
        </div>
      )}
    </article>
  );
}

export function SpecimenList({ specimens }: { specimens: SpecimenData[] }) {
  const featured = specimens.filter((s) => s.live);
  const compact = specimens.filter((s) => !s.live);
  return (
    <>
      {featured.map((s, i) => (
        <FeatureSpecimen key={s.id} s={s} first={i === 0} />
      ))}
      {compact.length > 0 && (
        <div className={cn("grid gap-x-6 gap-y-16 pt-12 sm:grid-cols-2")}>
          {compact.map((s) => (
            <CompactSpecimen key={s.id} s={s} />
          ))}
        </div>
      )}
    </>
  );
}
