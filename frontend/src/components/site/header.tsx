"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [markHidden, setMarkHidden] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const condensed = !onHome || markHidden;
  const active = onHome ? section : null;
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // The big hero mark is the brand at the top; the header mark takes over once it scrolls away.
  useEffect(() => {
    const mark = document.getElementById("hero-mark");
    if (!mark) return;
    const io = new IntersectionObserver(([entry]) => setMarkHidden(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    io.observe(mark);
    return () => io.disconnect();
  }, [pathname]);

  // Active section: whichever section crosses the middle band of the viewport
  useEffect(() => {
    if (!onHome) return;
    const sections = nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setSection(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panel.current?.contains(target) && !menuButton.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const solid = condensed || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200",
        solid ? "border-b border-border bg-background" : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${site.brand}, home`}
          className={cn(
            "mark text-[1.375rem] transition-opacity duration-200 focus-visible:opacity-100",
            condensed ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {site.mark}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "relative py-2 text-[0.9375rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:origin-left after:bg-foreground after:transition-transform after:duration-300 after:ease-[var(--ease-out)]",
                    active === item.id
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground after:scale-x-0 hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <p
            className={cn(
              "hidden items-center gap-2 text-sm transition-opacity duration-200 lg:flex",
              // The hero states availability itself; the header repeats it only once that has scrolled away
              condensed ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={!condensed}
          >
            <span aria-hidden className="size-1.5 bg-foreground" />
            Available for roles &amp; projects
          </p>
          <a
            href="/resume"
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-1 text-[0.9375rem] font-semibold underline underline-offset-4 hover:no-underline sm:inline-flex"
          >
            Resume <ArrowUpRight size={15} aria-hidden />
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="-mr-2 inline-flex h-11 items-center gap-2 px-2 text-[0.9375rem] font-semibold md:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div ref={panel} id="site-menu" className="border-t border-border bg-background md:hidden">
          <nav aria-label="Primary" className="shell py-2">
            <ul>
              {nav.map((item) => (
                <li key={item.id} className="border-b border-border last:border-b-0">
                  <a
                    href={href(item.id)}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "location" : undefined}
                    className="flex h-14 items-center justify-between text-lg font-semibold"
                  >
                    {item.label}
                    {active === item.id && <span className="label text-muted-foreground">You are here</span>}
                  </a>
                </li>
              ))}
              <li>
                <a href="/resume" target="_blank" rel="noopener" className="flex h-14 items-center gap-1 text-lg font-semibold">
                  Resume <ArrowUpRight size={18} aria-hidden />
                </a>
              </li>
            </ul>
            <p className="flex items-center gap-2 pb-4 pt-2 text-sm text-muted-foreground">
              <span aria-hidden className="size-1.5 bg-foreground" /> Available for roles &amp; projects
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
