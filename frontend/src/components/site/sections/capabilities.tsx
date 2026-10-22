import { capabilities, stack } from "@/data/site";
import { shippedSites } from "@/data/shipped-sites";
import type { Specimen } from "@/lib/portfolio";
import { TransitionLink } from "../transition-link";

function proofs(keywords: readonly string[], specimens: Specimen[]) {
  return specimens.filter((s) => {
    const haystack = [...s.tech, s.company].join(" ").toLowerCase();
    return keywords.some((k) => haystack.includes(k));
  });
}

export default function Capabilities({ specimens }: { specimens: Specimen[] }) {
  return (
    <section id="capabilities" aria-labelledby="cap-title" className="scroll-mt-16 bg-secondary py-[var(--section)]">
      <div className="shell">
        <div className="grid gap-x-6 gap-y-4 border-t border-rule pt-5 lg:grid-cols-12">
          <h2 id="cap-title" className="wide text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.02em] lg:col-span-5">
            What I build
          </h2>
          <p className="max-w-[52ch] text-muted-foreground lg:col-span-6 lg:col-start-7 lg:pt-2">
            Four kinds of work, each linked to the client projects that show it.
          </p>
        </div>

        <ol className="mt-12">
          {capabilities.map((cap) => {
            const shown = proofs(cap.evidence, specimens);
            const liveSites = "liveSites" in cap && cap.liveSites;
            return (
              <li key={cap.name} className="grid gap-x-6 gap-y-3 border-t border-border py-8 lg:grid-cols-12">
                <h3 className="wide text-[1.375rem] font-bold leading-tight lg:col-span-3">{cap.name}</h3>
                <p className="max-w-[56ch] lg:col-span-5">{cap.enables}</p>
                <div className="lg:col-span-3 lg:col-start-10">
                  {shown.length || liveSites ? (
                    <ul>
                      {shown.map((s) => (
                        <li key={s.id}>
                          <TransitionLink
                            href={`/work/${s.slug}`}
                            className="inline-flex min-h-9 items-baseline gap-2 underline-offset-4 hover:underline"
                          >
                            <span className="shrink-0 whitespace-nowrap tabular-nums text-muted-foreground">{s.number}</span>
                            <span className="font-medium">{s.title}</span>
                          </TransitionLink>
                        </li>
                      ))}
                      {liveSites && (
                        <li>
                          <a href="#live-sites" className="inline-flex min-h-9 items-baseline gap-2 font-medium underline-offset-4 hover:underline">
                            <span className="shrink-0 whitespace-nowrap tabular-nums text-muted-foreground">+{shippedSites.length}</span>
                            live sites
                          </a>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Write-up coming</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div id="stack" className="mt-[var(--section)] grid gap-x-6 gap-y-4 border-t border-rule pt-5 lg:grid-cols-12">
          <h2 className="wide text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.02em] lg:col-span-5">Tools I use</h2>
          <p className="max-w-[52ch] text-muted-foreground lg:col-span-6 lg:col-start-7 lg:pt-2">
            What I reach for in client work and my own builds, grouped by the layer it lives in.
          </p>
        </div>
        <dl className="mt-10">
          {stack.map((g) => (
            <div key={g.group} className="grid gap-x-6 gap-y-2 border-t border-border py-5 lg:grid-cols-12">
              <dt className="label pt-1 text-muted-foreground lg:col-span-3">{g.group}</dt>
              <dd className="lg:col-span-9">
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-lg">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
