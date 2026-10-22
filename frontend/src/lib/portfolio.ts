import { site } from "@/data/site";
import { enDashRange, formatLooseDate, imageSize, slugify } from "./content-utils";

// Server-side reads of the admin-managed content. Pages are ISR-cached, so a cold
// Render backend never blocks a visitor; it only delays the next regeneration.
const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:5000/api";
export const REVALIDATE_SECONDS = 300;

interface ApiProject {
  id: string;
  title: string;
  description: string;
  tech?: string[];
  link?: string;
  github?: string;
  imageUrl?: string;
  role?: string;
  company?: string;
  location?: string;
  period?: string;
  order?: number;
}

interface ApiCertificate {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  imageUrl?: string;
  fileType?: string;
  order?: number;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  resumeUrl: string;
}

export interface OutboundLink {
  href: string;
  label: string;
  host: string;
}

export interface Specimen {
  id: string;
  slug: string;
  number: string;
  title: string;
  paragraphs: string[];
  tech: string[];
  role: string;
  company: string;
  location: string;
  period: string;
  plate: string | null;
  live: OutboundLink | null;
  secondary: OutboundLink | null;
  /** Intrinsic size when known, so plates render uncropped with no layout shift. */
  size: { width: number; height: number } | null;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  isPdf: boolean;
  src: string | null;
}

async function getJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      // Render's free tier can take ~50s to wake; don't hang a build longer than this
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const TECH_NAMES: Record<string, string> = {
  nextjs: "Next.js",
  "next.js": "Next.js",
  fastapi: "FastAPI",
  python: "Python",
  firebase: "Firebase",
  flutter: "Flutter",
  supabase: "Supabase",
  rag: "RAG",
  llm: "LLM",
  react: "React",
  nodejs: "Node.js",
  mongodb: "MongoDB",
  langchain: "LangChain",
};

export function techName(raw: string) {
  const key = raw.trim().toLowerCase();
  return TECH_NAMES[key] ?? raw.trim();
}


function toOutbound(raw: string | undefined, fallbackLabel: string): OutboundLink | null {
  const value = raw?.trim();
  if (!value) return null;
  const href = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  let host: string;
  try {
    host = new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  const label = host.endsWith("github.com")
    ? "Source"
    : host === "play.google.com"
      ? "Google Play"
      : host === "apps.apple.com"
        ? "App Store"
        : fallbackLabel;
  return { href, label, host };
}

// Raw image data stays server-side; public types never carry it into page payloads.
async function loadSpecimens(): Promise<(Specimen & { imageData: string | null })[] | null> {
  const data = await getJSON<ApiProject[]>("/projects");
  if (!Array.isArray(data)) return null;

  const seen = new Map<string, number>();
  return [...data]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((p, i) => {
      const base = slugify(p.title) || p.id.toLowerCase();
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const slug = count ? `${base}-${count + 1}` : base;
      const image = p.imageUrl?.trim() || "";
      return {
        id: p.id,
        slug,
        number: String(i + 1).padStart(2, "0"),
        title: p.title.trim(),
        paragraphs: p.description.split(/\n+/).map((s) => s.trim()).filter(Boolean),
        tech: (p.tech ?? []).filter(Boolean).map(techName),
        role: p.role?.trim() ?? "",
        company: p.company?.trim() ?? "",
        location: p.location?.trim() ?? "",
        period: enDashRange(p.period ?? ""),
        // data: URLs are served through /work/[slug]/plate so they can be cached and optimised
        plate: image.startsWith("data:") ? `/work/${slug}/plate` : image || null,
        live: toOutbound(p.link, "Live site"),
        secondary: toOutbound(p.github, "Link"),
        imageData: image.startsWith("data:") ? image : null,
        size: image.startsWith("data:") ? imageSize(image) : null,
      };
    });
}

export async function getSpecimens(): Promise<Specimen[] | null> {
  const all = await loadSpecimens();
  return all && all.map(({ imageData, ...specimen }) => specimen);
}

export async function getSpecimenImage(slug: string) {
  return (await loadSpecimens())?.find((s) => s.slug === slug)?.imageData ?? null;
}

export async function getSpecimen(slug: string) {
  const all = await getSpecimens();
  if (!all) return { specimen: null, all: [] as Specimen[] };
  return { specimen: all.find((s) => s.slug === slug) ?? null, all };
}

async function loadCertificates(): Promise<(Certificate & { imageData: string | null })[] | null> {
  const data = await getJSON<ApiCertificate[]>("/certificates");
  if (!Array.isArray(data)) return null;
  return [...data]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((c) => {
      const image = c.imageUrl?.trim() || "";
      return {
        id: c.id,
        title: c.title.trim(),
        issuer: c.issuer?.trim() ?? "",
        date: formatLooseDate(c.date ?? ""),
        isPdf: c.fileType === "pdf",
        src: image.startsWith("data:") ? `/certificates/${c.id}/image` : image || null,
        imageData: image.startsWith("data:") ? image : null,
      };
    });
}

export async function getCertificates(): Promise<Certificate[] | null> {
  const all = await loadCertificates();
  return all && all.map(({ imageData, ...cert }) => cert);
}

export async function getCertificateImage(id: string) {
  return (await loadCertificates())?.find((c) => c.id === id)?.imageData ?? null;
}

export async function getProfile(): Promise<Profile> {
  const data = await getJSON<Partial<Profile>>("/profile");
  return {
    name: data?.name || site.legalName,
    email: data?.email || site.contact.email,
    phone: data?.phone || "",
    location: data?.location || site.contact.location,
    github: data?.github || site.contact.github,
    linkedin: data?.linkedin || site.contact.linkedin,
    whatsapp: data?.whatsapp || "",
    resumeUrl: data?.resumeUrl || "",
  };
}

/** Decode a `data:` URL into a cacheable binary response. */
export function dataUrlResponse(dataUrl: string, extraHeaders: Record<string, string> = {}) {
  const match = /^data:([^;,]+)?(;base64)?,([\s\S]*)$/.exec(dataUrl);
  if (!match) return new Response("Not found", { status: 404 });
  const [, type = "application/octet-stream", isBase64, payload] = match;
  const body = isBase64 ? Buffer.from(payload, "base64") : Buffer.from(decodeURIComponent(payload));
  return new Response(body, {
    headers: {
      "Content-Type": type,
      "Cache-Control": `public, max-age=${REVALIDATE_SECONDS}, s-maxage=86400, stale-while-revalidate=604800`,
      ...extraHeaders,
    },
  });
}
