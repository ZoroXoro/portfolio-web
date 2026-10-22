import { ArrowUpRight } from "lucide-react";
import type { OutboundLink } from "@/lib/portfolio";
import Seal from "./seal";

/** An external project link. The primary live link carries the seal. */
export default function Outbound({ link, sealed }: { link: OutboundLink; sealed?: boolean }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 items-center gap-2 font-semibold"
    >
      {sealed && <Seal size={18} />}
      <span className="min-w-0 underline underline-offset-4 [overflow-wrap:break-word] group-hover:no-underline">{sealed ? link.host : link.label}</span>
      <ArrowUpRight size={16} aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
