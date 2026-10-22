// Pure helpers (no aliases, no I/O) so they can be checked in isolation.

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Read width/height from a PNG or JPEG data URL header. */
export function imageSize(dataUrl: string): { width: number; height: number } | null {
  const comma = dataUrl.indexOf(",");
  if (comma < 0 || !dataUrl.slice(0, comma).includes(";base64")) return null;
  const buf = Buffer.from(dataUrl.slice(comma + 1, comma + 1 + 200_000), "base64");
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    // SOF0–SOF15 carry the frame size, except DHT (C4), JPG (C8) and DAC (CC)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Normalise free-form admin dates ("April 14th 2026", "24 Novemmber 2025") to "Apr 2026"; unparseable input is returned trimmed. */
export function formatLooseDate(raw: string): string {
  const text = raw.trim();
  const year = /\b(19|20)\d{2}\b/.exec(text)?.[0];
  const month = text
    .toLowerCase()
    .split(/[^a-z]+/)
    .map((w) => MONTHS.indexOf(w.slice(0, 3)))
    .find((i) => i >= 0);
  if (!year || month === undefined) return text;
  return `${MONTHS[month][0].toUpperCase()}${MONTHS[month].slice(1)} ${year}`;
}

/** Ranges read with an en dash: "April 2025 - March 2026" becomes "April 2025 – March 2026". */
export function enDashRange(raw: string): string {
  return raw.trim().replace(/\s+[-–—]\s+/g, " – ");
}
