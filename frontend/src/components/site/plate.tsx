import Image from "next/image";
import type { Specimen } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

// shortcut: the uploaded Lolo Fruits screenshot ends in a 16px white strip; crop it here until a trimmed
// image is re-uploaded through /admin, then delete this entry. Values are fractions of image height.
const BOTTOM_TRIM: Record<string, number> = { "lolo-fruits-marketplace-app": 16 / 749 };

/** The project screenshot, framed like a rubbing on the sheet. Shares a view-transition name with its detail page. */
export default function Plate({
  specimen,
  sizes,
  priority,
  className,
}: {
  specimen: Specimen;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const style = { viewTransitionName: `plate-${specimen.slug}` } as React.CSSProperties;
  const frame = "border border-foreground/85 bg-card";

  if (!specimen.plate) {
    return (
      <div style={style} className={cn(frame, "grid aspect-[16/10] place-items-center", className)}>
        <span className="mark text-[clamp(2.5rem,8vw,5rem)] text-border" aria-hidden>
          {specimen.number}
        </span>
      </div>
    );
  }

  const trim = BOTTOM_TRIM[specimen.slug];
  if (specimen.size && trim) {
    const { width, height } = specimen.size;
    return (
      <div
        style={{ ...style, aspectRatio: `${width} / ${Math.round(height * (1 - trim))}` }}
        className={cn(frame, "relative overflow-hidden", className)}
      >
        <Image src={specimen.plate} alt={`Screenshot of ${specimen.title}`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  }

  return (
    <div style={style} className={cn(frame, "overflow-hidden", !specimen.size && "relative aspect-[16/10]", className)}>
      {specimen.size ? (
        <Image
          src={specimen.plate}
          alt={`Screenshot of ${specimen.title}`}
          width={specimen.size.width}
          height={specimen.size.height}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
        />
      ) : (
        <Image src={specimen.plate} alt={`Screenshot of ${specimen.title}`} fill sizes={sizes} priority={priority} className="object-contain" />
      )}
    </div>
  );
}
