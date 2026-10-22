"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

// Resolves the open view transition once the next route has committed to the DOM.
let settle: (() => void) | null = null;

/**
 * A Link that morphs shared `view-transition-name` elements (the project plates)
 * between routes. Falls back to a normal navigation when unsupported, when motion
 * is reduced, or on modified clicks.
 */
export function TransitionLink({ href, onClick, ...props }: React.ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();

  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        e.preventDefault();
        document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              settle = resolve;
              // Never hold the old frame if the navigation stalls
              setTimeout(resolve, 2500);
              router.push(href);
            })
        );
      }}
    />
  );
}

export function TransitionSettler() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (!settle) return;
    // Place the new page before the browser snapshots it: top of page, or the #fragment we came back to
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    settle();
    settle = null;
  }, [pathname]);
  return null;
}
