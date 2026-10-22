import { cn } from "@/lib/utils";

/** The ZORO seal. Its colour appears nowhere else: it marks verified-live work only. */
export default function Seal({ size = 20, className, title }: { size?: number; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("shrink-0 -rotate-3", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="32" height="32" fill="var(--seal)" />
      <rect x="2.5" y="2.5" width="27" height="27" fill="none" stroke="var(--background)" strokeWidth="1.5" />
      <path d="M9 9.5h14v3.2L13.6 19.3H23v3.2H9v-3.2l9.4-6.6H9z" fill="var(--background)" />
    </svg>
  );
}
