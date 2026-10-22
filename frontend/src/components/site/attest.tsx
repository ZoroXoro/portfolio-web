import { cn } from "@/lib/utils";

export interface AttestRow {
  label: string;
  value: React.ReactNode;
}

/** A ruled attestation table: condensed field label, plain value. Empty rows are dropped. */
export default function Attest({ rows, className, dense }: { rows: AttestRow[]; className?: string; dense?: boolean }) {
  const shown = rows.filter((r) => r.value !== "" && r.value !== null && r.value !== undefined);
  return (
    <dl className={cn("border-t border-rule", className)}>
      {shown.map((row) => (
        <div
          key={row.label}
          className={cn("grid grid-cols-[6rem_1fr] gap-4 border-b border-border sm:grid-cols-[7.5rem_1fr]", dense ? "py-2.5" : "py-3.5")}
        >
          <dt className="label pt-[0.2em] text-muted-foreground">{row.label}</dt>
          <dd className="min-w-0">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
