import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Firestore Timestamps arrive over JSON as { _seconds } (or { seconds } depending on SDK)
export function timestampToDate(ts: unknown): Date | null {
  if (!ts || typeof ts !== "object") return null
  const t = ts as { _seconds?: number; seconds?: number }
  const s = t._seconds ?? t.seconds
  return typeof s === "number" ? new Date(s * 1000) : null
}
