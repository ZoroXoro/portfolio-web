import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getCertificates } from "@/lib/portfolio";

export const revalidate = 300;
export const metadata: Metadata = { title: "Certificates" };

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <section className="shell pb-[var(--section)] pt-24 sm:pt-28">
      <Link href="/#about" className="group inline-flex min-h-11 items-center gap-2 font-semibold">
        <ArrowLeft size={16} aria-hidden className="transition-transform duration-200 group-hover:-translate-x-1" />
        Back to About
      </Link>
      <div className="mt-8 grid gap-x-6 gap-y-4 border-t border-rule pt-5 lg:grid-cols-12">
        <h1 className="wide text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.025em] lg:col-span-6">
          Certificates
        </h1>
        <p className="max-w-[48ch] text-muted-foreground lg:col-span-5 lg:col-start-8 lg:pt-3">
          Courses and job simulations completed alongside client work. Each opens the original certificate.
        </p>
      </div>

      {certificates && certificates.length > 0 ? (
        <ul className="mt-12">
          {certificates.map((c) => (
            <li key={c.id} className="border-t border-border last:border-b">
              <a
                href={c.src ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!c.src}
                className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-x-5 gap-y-1 py-5 sm:grid-cols-[8rem_1fr_12rem_auto]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden border border-foreground/85 bg-card">
                  {c.src && !c.isPdf && (
                    // eslint-disable-next-line @next/next/no-img-element -- served by our own cached route; size is tiny
                    <img src={c.src} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
                  )}
                  {c.isPdf && <span className="label absolute inset-0 grid place-items-center text-muted-foreground">PDF</span>}
                </span>
                <span>
                  <span className="wide block text-lg font-bold leading-tight group-hover:underline">{c.title}</span>
                  {c.issuer && <span className="text-muted-foreground">{c.issuer}</span>}
                  {c.date && <span className="block text-sm text-muted-foreground sm:hidden">{c.date}</span>}
                </span>
                <span className="hidden text-muted-foreground sm:block">{c.date}</span>
                <ArrowUpRight size={18} aria-hidden className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-lg">
          {certificates ? "No certificates published yet." : "The certificate record couldn’t be loaded just now. Please try again shortly."}
        </p>
      )}
    </section>
  );
}
