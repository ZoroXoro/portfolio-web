import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Attest from "@/components/site/attest";
import Outbound from "@/components/site/outbound";
import Plate from "@/components/site/plate";
import { Num } from "@/components/site/specimen";
import { TransitionLink } from "@/components/site/transition-link";
import { getSpecimen, getSpecimens } from "@/lib/portfolio";

export const revalidate = 300;

export async function generateStaticParams() {
  return ((await getSpecimens()) ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { specimen } = await getSpecimen(slug);
  if (!specimen) return { title: "Project not found" };
  return { title: specimen.title, description: specimen.paragraphs[0] };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const { specimen: s, all } = await getSpecimen(slug);
  if (!s) notFound();

  const index = all.findIndex((x) => x.slug === s.slug);
  const prev = all[index - 1];
  const next = all[index + 1];

  return (
    <article className="shell pb-[var(--section)] pt-24 sm:pt-28">
      <TransitionLink href={`/#${s.slug}`} className="group inline-flex min-h-11 items-center gap-2 font-semibold">
        <ArrowLeft size={16} aria-hidden className="transition-transform duration-200 group-hover:-translate-x-1" />
        All work
      </TransitionLink>

      <header className="mt-8 grid gap-x-6 gap-y-3 border-t border-rule pt-5 lg:grid-cols-12">
        <h1 className="wide text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.025em] lg:col-span-9">
          <Num n={s.number} />
          {s.title}
        </h1>
        {(s.role || s.company) && (
          <p className="text-lg text-muted-foreground lg:col-span-9">
            {[s.role, s.company].filter(Boolean).join(" · ")}
          </p>
        )}
      </header>

      <Plate specimen={s} priority sizes="(min-width: 1280px) 1240px, 100vw" className="mt-10" />

      <div className="mt-12 grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="max-w-[62ch] space-y-5 text-[1.1875rem] leading-[1.6] lg:col-span-7">
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <aside aria-label="Project record" className="lg:col-span-4 lg:col-start-9">
          <Attest
            rows={[
              { label: "Role", value: s.role },
              { label: "For", value: s.company },
              { label: "Where", value: s.location },
              { label: "Period", value: s.period },
              { label: "Stack", value: s.tech.join(", ") },
              { label: "Status", value: s.live || s.secondary ? "" : "No public link" },
            ]}
          />
          <div className="mt-5 flex flex-col items-start">
            {s.live && <Outbound link={s.live} sealed />}
            {s.secondary && <Outbound link={s.secondary} />}
          </div>
        </aside>
      </div>

      {(prev || next) && (
        <nav aria-label="More projects" className="mt-[var(--section)] grid gap-6 border-t border-rule pt-5 sm:grid-cols-2">
          {prev ? (
            <TransitionLink href={`/work/${prev.slug}`} className="group flex flex-col gap-1">
              <span className="label inline-flex items-center gap-2 text-muted-foreground">
                <ArrowLeft size={14} aria-hidden /> No. {prev.number}
              </span>
              <span className="wide text-xl font-bold group-hover:underline">{prev.title}</span>
            </TransitionLink>
          ) : (
            <span />
          )}
          {next && (
            <TransitionLink href={`/work/${next.slug}`} className="group flex flex-col gap-1 sm:items-end sm:text-right">
              <span className="label inline-flex items-center gap-2 text-muted-foreground">
                No. {next.number} <ArrowRight size={14} aria-hidden />
              </span>
              <span className="wide text-xl font-bold group-hover:underline">{next.title}</span>
            </TransitionLink>
          )}
        </nav>
      )}
    </article>
  );
}
