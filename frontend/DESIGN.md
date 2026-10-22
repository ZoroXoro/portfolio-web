---
name: Zoro
description: An appraisal sheet for a maker's work. Graphite ink on a cool white sheet, hairline rules, one viridian seal.
colors:
  seal-viridian: "#0f7a55"
  graphite-ink: "#16181a"
  cool-sheet: "#f7f8f6"
  card-white: "#ffffff"
  slate-secondary: "#5c6166"
  tint-band: "#eceeeb"
  hairline: "#d6d9d6"
  input-stroke: "#c4c8c4"
  sidebar-sheet: "#f0f1ee"
  destructive-red: "#b42318"
  error-on-graphite: "#ffb4a8"
typography:
  mark:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(4rem, 14vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)"
    fontWeight: 700
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'tnum'"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 72"
rounded:
  sm: "0px"
  md: "2px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 2.5rem)"
  section: "clamp(5rem, 11vw, 9rem)"
  measure: "77.5rem"
components:
  action-ruled:
    textColor: "{colors.graphite-ink}"
    padding: "0 0 4px 0"
    height: "48px"
  action-ruled-hover:
    textColor: "{colors.graphite-ink}"
  submit-inverse:
    backgroundColor: "{colors.cool-sheet}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.sm}"
    padding: "0 28px"
    height: "52px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.cool-sheet}"
    rounded: "{rounded.sm}"
    padding: "12px 0"
  plate:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.sm}"
  attest-row:
    textColor: "{colors.graphite-ink}"
    padding: "14px 0"
  seal:
    backgroundColor: "{colors.seal-viridian}"
    textColor: "{colors.cool-sheet}"
    size: "18px"
  inverted-field:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.cool-sheet}"
---

# Design System: Zoro

## Overview

**Creative North Star: "The Appraisal Sheet"**

The site reads as an appraiser's record of a maker's work. Each project is a specimen shown at full size as a framed plate, with its facts ruled underneath in a field-label table. Graphite ink sits on a cool white sheet. Structure comes from 1px hairlines and one heavier graphite rule at the head of each table, not from boxes, cards or shadows. A single viridian seal means "verified live" and nothing else.

One typeface, Archivo, carries every voice through its width axis. The expanded black cut is the maker's mark, normal width is for reading, and the condensed caps cut labels the fields. Figures are tabular everywhere, so catalogue numbers, periods and dates line up like entries in a ledger. Density is generous: wide section spacing, a 12-column grid inside a 77.5rem measure, and plates that are allowed to be large.

The system rejects the category default of a dark gradient hero over a bento grid of identical cards. Contact and footer flip to an inverted graphite field, which is the only large tonal shift apart from the pale tint band behind Capabilities.

**Key Characteristics:**
- Graphite on cool white, with one rationed viridian accent that only signals verification.
- One family (Archivo) in three widths: expanded mark, normal text, condensed caps for labels.
- Hairline rules and a graphite head rule instead of containers. Squared corners. No elevation.
- Screenshots framed as plates that morph into their detail page through view transitions.
- Tabular figures, en-dash ranges and catalogue numbers that read like a ledger.

## Colors

A near-monochrome graphite-and-sheet palette with a single reserved accent.

### Primary
- **Seal Viridian** (#0f7a55): Fills the square ZORO seal and nothing else. The seal appears on resolving live project links (the sealed outbound link, the "More live sites" index) and as the stamp when a contact message is delivered.

### Neutral
- **Graphite Ink** (#16181a): Text, the primary rule at the head of every attestation table, the focus ring, the 2px rule under primary actions, and the inverted field behind Contact and the footer.
- **Cool Sheet** (#f7f8f6): The page background, and the text color on the inverted field.
- **Card White** (#ffffff): The backing under plates, so screenshots sit on true white.
- **Slate Secondary** (#5c6166): Secondary text, field labels, catalogue-number prefixes and inactive navigation.
- **Tint Band** (#eceeeb): A full-bleed band that sets Capabilities apart. Also the muted/accent fill in admin.
- **Hairline** (#d6d9d6): 1px row dividers, section rules and the header's bottom border once it turns solid.
- **Input Stroke** (#c4c8c4): Field outlines on light surfaces (admin).
- **Sidebar Sheet** (#f0f1ee): The admin sidebar.
- **Destructive Red** (#b42318): Destructive actions and errors on light surfaces.
- **Error on Graphite** (#ffb4a8): Validation errors on the inverted contact field.

### Named Rules
**The One Seal Rule.** Viridian appears only where a live link resolves or a message has been delivered. Availability, status and emphasis never use it. Availability is marked with a small graphite square (6px).

**The Inverted Field Rule.** Contact and the footer sit on a full graphite field with sheet-colored text. Inside it, rules and secondary text are the sheet color at reduced opacity (about 25% for rules, 60 to 75% for text).

## Typography

**Display Font:** Archivo at wdth 112 and 125 (with system-ui, sans-serif)
**Body Font:** Archivo at normal width (with system-ui, sans-serif)
**Label Font:** Archivo at wdth 72, condensed caps

**Character:** One grotesque used at three widths, so the mark, the reading text and the field labels feel related without looking alike. Tabular figures are on by default for the whole body.

### Hierarchy
- **Mark** (900, wdth 125, clamp(4rem, 14vw, 6rem), line-height 0.88): The ZORO wordmark in the hero. Also used at 1.375rem in the header and 2.5rem in the footer, and as the placeholder numeral in plates that have no image.
- **Display** (700, wdth 112, clamp(2.25rem, 5vw, 4rem), line-height 1.02): Page titles on project detail and Certificates.
- **Headline** (700, wdth 112, clamp(1.75rem, 3.2vw, 2.5rem)): Section titles (Selected work, What I build, How I work). The contact headline runs larger, at clamp(2rem, 4.4vw, 3.5rem).
- **Title** (700, wdth 112, clamp(1.5rem, 2.4vw, 2rem), line-height 1.1): Specimen titles. Compact and index titles step down to about 1.375 to 1.625rem and 1.125rem.
- **Statement** (500, wdth 112, clamp(1.375rem, 2.5vw, 1.875rem), line-height 1.22, max 26ch): The hero's two-line statement.
- **Body** (400, 1.0625rem, line-height 1.6): Running text, clamped to 40 to 42ch where it sits beside a headline.
- **Label** (600, wdth 72, 0.8125rem, 0.06em tracking, uppercase): Field labels in attestation tables, form labels, figure captions and metadata lines.

### Named Rules
**The No-Kicker Rule.** Headings are never preceded by an eyebrow or kicker. A catalogue number belongs in the title line itself as a muted, tabular, medium-weight prefix (for example "01 Lolo Fruits").

**The Ledger Rule.** Ranges and periods use en dashes ("April 2025 – March 2026", "No. 05–12"). Certificate dates are written "Mon YYYY".

## Layout

Content sits in a shell: max width is the 77.5rem measure plus two gutters, with fluid gutters of clamp(1.25rem, 4vw, 2.5rem). From the lg breakpoint, sections use a 12-column grid with a 1.5rem column gap. The hero splits 7 columns for the mark and statement against 4 columns (starting at column 9) for the facts table. Featured specimens split 8 columns for the plate and 4 for title, facts and links. Specimens without a public link pair up two-up from sm. The live-sites index steps from 1 to 2 (480px) to 4 (lg) columns.

Vertical rhythm comes from one section token, clamp(5rem, 11vw, 9rem). Specimens are separated by a hairline with 3rem of padding. The header is fixed and 4rem tall. It stays transparent until the hero mark scrolls away, then turns solid with a hairline bottom border. Scroll padding is 5rem so anchored sections clear the header.

## Elevation & Depth

The public site is flat. There are no shadows, gradients, blurs or glass. Depth is shown three ways: rules (a graphite head rule over hairline rows), framing (plates carry a 1px graphite border at 85% opacity, which goes to full graphite on hover), and full-bleed tonal fields (the Capabilities tint band and the inverted graphite field).

### Named Rules
**The Ruled-Not-Raised Rule.** Separate content with a rule, never with a shadow or an enclosing card. If something needs emphasis, make its rule heavier (the graphite head rule, the 2px action rule).

## Shapes

Corners are square. Every radius token resolves to 2px or 0px, so library components inherit near-square corners. The seal is a square, rotated -3 degrees, with an inset sheet-colored keyline. The availability marker is a 6px graphite square. Borders are 1px throughout. The only 2px strokes are the rule under primary actions, the active-navigation underline and the focus outline.

## Components

### Buttons
Ruled text, not filled pills.
- **Shape:** No fill and no box. A 2px graphite bottom rule with 4px of padding beneath the text, 48px minimum hit height.
- **Primary:** Semibold, 1.125rem, followed by a 16 to 18px arrow (an inline arrow for in-page actions, an up-right arrow for anything that opens elsewhere).
- **Hover / Focus:** The rule fades to slate over 150ms and the arrow nudges 4px along its direction. Focus is a 2px graphite outline offset by 3px.
- **Submit (inverted field only):** The contact form's submit is the one filled control. It is a sheet-colored block on graphite, 52px tall, with 28px horizontal padding and square corners. On hover it drops to 90% opacity, and pressing scales it to 0.98.
- **Tertiary:** Underlined semibold text links, with a 1px underline offset by 0.22em. The underline is removed on hover.

### Cards / Containers
None. Specimens are open compositions of plate, title, paragraph and table, divided by hairlines.

### Plate (signature)
- **Frame:** A 1px graphite border at 85% opacity on a white backing, square corners, and the screenshot shown at its native aspect ratio.
- **Hover:** The border goes to full graphite. On the live-sites index the image also scales to 1.02 over 500ms on the exponential ease-out.
- **Continuity:** Each plate carries `view-transition-name: plate-<slug>` and shares it with its detail page. Navigation runs through the document view-transition API with 420ms groups on the ease-out curve, and is skipped under reduced motion.
- **Empty:** If there is no screenshot, the catalogue number is shown in the mark style, in hairline color.

### Attestation Table (signature)
- **Structure:** A description list with a graphite head rule, then hairline-divided rows. Each row is a two-column grid: a 6rem condensed-caps label column (7.5rem from sm) and the value. Row padding is 14px, or 10px when dense. Empty rows are dropped.
- **Use:** Hero facts, specimen facts, about-section credentials and contact channels. The contact version uses sheet-colored rules at 25% opacity.

### Seal (signature)
A square viridian seal, 16 to 18px inline and 64px on delivery. Inline, it leads the host name of a resolving live link. On delivery, it springs in with a 0.35 bounce over 0.35s. That is the only spring in the system.

### Inputs / Fields
- **Style:** Underline-only on the inverted field. No box and no fill: a bottom border in sheet color at 35%, 12px vertical padding, 1.125rem text and placeholders at 45%.
- **Focus:** The underline goes to full sheet color.
- **Error:** The underline and message turn #ffb4a8, with an alert icon.

### Navigation
The header has a fixed 64px bar with medium-weight 0.9375rem slate links. The active and hover state is graphite text with a 2px graphite underline that scales in from the left over 300ms on the ease-out. The header mark fades in only after the hero mark leaves view. Below md, nav collapses to a menu toggle. The footer repeats the links on the inverted field.

## Do's and Don'ts

### Do:
- **Do** reserve Seal Viridian (#0f7a55) for resolving live links and the delivery stamp.
- **Do** mark availability with a 6px graphite square and plain text.
- **Do** make primary actions ruled text: semibold, 2px graphite bottom rule, no fill.
- **Do** set catalogue numbers inside the title line as a muted tabular prefix.
- **Do** build facts as attestation tables: a graphite head rule, hairline rows and condensed-caps labels.
- **Do** keep corners at the 2px/0px radius tokens and borders at 1px.
- **Do** put Contact and the footer on the inverted graphite field.
- **Do** animate with the one exponential ease-out, cubic-bezier(0.16, 1, 0.3, 1), and keep settles short and once per section.
- **Do** give every plate a view-transition-name shared with its detail page.
- **Do** write ranges with en dashes and certificate dates as "Mon YYYY".

### Don't:
- **Don't** use viridian for status, availability, emphasis or decoration.
- **Don't** put kickers or eyebrows above headings.
- **Don't** use shadows, gradients, blur or glass on the public site.
- **Don't** wrap specimens in cards or boxes, and don't lay them out as an even bento grid.
- **Don't** fill primary actions on the sheet. The submit block on the inverted field is the only filled control.
- **Don't** introduce a second typeface. Get new voices from Archivo's width axis.
- **Don't** use springs or bounce anywhere except the seal stamp.
