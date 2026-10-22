// Run: npm run check
import assert from "node:assert/strict";
import { enDashRange, formatLooseDate, imageSize, slugify } from "./content-utils.ts";

const dataUrl = (type: string, bytes: number[]) => `data:${type};base64,${Buffer.from(bytes).toString("base64")}`;
const u16 = (n: number) => [n >> 8, n & 255];
const u32 = (n: number) => [n >>> 24, (n >> 16) & 255, (n >> 8) & 255, n & 255];

// PNG: signature + IHDR chunk carrying width/height
const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, ...u32(13), 0x49, 0x48, 0x44, 0x52, ...u32(1200), ...u32(749), 8, 2, 0, 0, 0];
assert.deepEqual(imageSize(dataUrl("image/png", png)), { width: 1200, height: 749 });

// JPEG: SOI, an APP0 segment to skip, a DHT (0xC4) that must not be read as a frame, then SOF0
const app0 = [0xff, 0xe0, ...u16(16), ...Array(14).fill(0)];
const dht = [0xff, 0xc4, ...u16(4), 0, 0];
const sof0 = [0xff, 0xc0, ...u16(17), 8, ...u16(538), ...u16(1200), 3, ...Array(9).fill(0)];
assert.deepEqual(imageSize(dataUrl("image/jpeg", [0xff, 0xd8, ...app0, ...dht, ...sof0])), { width: 1200, height: 538 });

assert.equal(imageSize("data:image/gif;base64,R0lGODlh"), null);
assert.equal(imageSize("https://example.com/a.png"), null);

assert.equal(slugify("Dr. Pooja's Rehab & Therapy Center"), "dr-poojas-rehab-therapy-center");
assert.equal(slugify("Lolo Fruits - Marketplace App"), "lolo-fruits-marketplace-app");
assert.equal(slugify("  ERP System  "), "erp-system");

assert.equal(formatLooseDate("April 14th 2026"), "Apr 2026");
assert.equal(formatLooseDate("24 Novemmber 2025"), "Nov 2025");
assert.equal(formatLooseDate("March 18th, 2026"), "Mar 2026");
assert.equal(formatLooseDate("13 May 2025"), "May 2025");
assert.equal(formatLooseDate("someday"), "someday");
assert.equal(enDashRange("April 2025 - March 2026"), "April 2025 – March 2026");
assert.equal(enDashRange("February 2026 - Ongoing "), "February 2026 – Ongoing");

console.log("content-utils: ok");
