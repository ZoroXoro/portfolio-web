# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** people hiring for full-stack or AI engineering roles (recruiters, hiring managers, technical leads) who arrive from a resume, LinkedIn or GitHub and decide in under a minute whether to read further or reach out.
- **Secondary:** businesses wanting a web app, mobile app or automation built, who may become clients through Fusionexlabs.
- **Owner/editor:** Zoro, who maintains projects, certificates, profile, resume and contact messages through `/admin`.

## Product Purpose

The personal portfolio of Zoro, a Mumbai-based full-stack web and app developer moving into AI engineering. It exists to make real shipped work and the ability to build across web, mobile, backend and LLM systems legible fast, then turn interest into a conversation or a resume download. Success: a visitor can say what Zoro builds and has shipped after one screen, and can contact him or get the resume in one action.

## Positioning

Builds and ships whole products for real clients end to end — marketplace app, clinic site with an LLM booking assistant, factory ERP and inventory systems — rather than tutorial projects, and is extending that full-stack base into RAG pipelines and agents.

## Operating Context

- Visitors usually come from a resume, LinkedIn (linkedin.com/in/harsh-kamble-xzro) or GitHub (github.com/ZoroXoro), on desktop at work or on a phone.
- Content is managed in the admin panel and served by the Express + Firestore backend (`/api/projects`, `/api/certificates`, `/api/profile`, `/api/connections`, `/api/resume`). The admin panel is the source of truth for projects (confirmed); the site must render whatever the admin publishes, including projects without links or images.
- The contact form posts to `/api/connections`; messages are read in the admin Inbox.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind CSS 4, motion; frontend in `frontend/`, backend in `backend/`.
- Project records: title, description, tech[], link, github, imageUrl (often a base64 data URL), role, company, location, period, order. There are no structured case-study fields (problem, outcome); detail pages may only present what these fields hold.
- Resume: the admin-uploaded resume (profile.resumeUrl) wins; `public/resume.pdf` is the fallback.
- Undecided: whether the resume-only AI projects (PDF Knowledge Assistant, CityBot) get admin entries with links/screenshots.

## Brand Commitments

- Public brand name is **ZORO** (wordmark `ZORO`). The legal name "Harsh Kamble" appears once on the site (About and page metadata) for searchability; the resume PDF keeps its original contents. (Confirmed.)
- Browser title pattern: `Zoro — Developer & Creative Technologist`.
- Voice: concise, specific, human; no marketing jargon or inflated claims.

## Evidence on Hand

- Live projects (from the production API): Lolo Fruits marketplace (Flutter, Firebase, Next.js; lolofruits.com; Play Store link; Fusionexlabs, Apr 2025–Mar 2026), Dr. Pooja's Rehab & Therapy Center (Next.js, Firebase, FastAPI, Python, RAG, LLM; drpoojasclinic.com; Oct–Dec 2025), Store Management desktop app (Python, Firebase; Himalaya Composites), ERP System (Next.js, Supabase; Himalaya Composites). Each has a real screenshot.
- Live sites added by the owner (2026-10-22), kept in `src/data/shipped-sites.ts` rather than the admin because they were added outside it: Sunil Cricket Academy, FireOxine, DigitioHub Realty, Study and Work Abroad, The CLTV Guy · Retention Max, Svaryaa, Articuno R, HS AI Solutions. All verified live and built on Next.js; screenshots in `public/work/sites/`. The owner's role on each is not recorded and must not be invented.
- Resume (admin-uploaded): Generative AI Engineer profile; PDF Knowledge Assistant (LangChain, Mistral AI, ChromaDB, Streamlit) and CityBot (LangChain, OpenWeather, NewsAPI); Co-Founder & Full-Stack Developer, Fusionexlabs (2024–present); Data Analyst & Software Developer, Himalaya Composites (Feb–May 2026); BSc Computer Science, Patkar Varde College (2022–2025); DIPAM Intercollegiate Project Competition, 2nd prize (Dec 2024).
- Certificates: AWS Introduction to ML, Deloitte Data Analytics job simulation, Microsoft Power BI, SkillUP R programming, SkillUP vibe coding.
- Profile photo: `frontend/public/profile.jpeg`.
- Absent, must not be fabricated: testimonials, client logos, metrics beyond those in the resume, years-of-experience counts, the For-Her and All About Hue projects (not found in repo or data).

## Product Principles

1. Shipped work is the proof; lead with it, not with adjectives.
2. Every claim traces to the admin data or the resume.
3. One action away from contact or resume, from anywhere.
4. The admin stays the single place content changes; the site never needs a code edit to add a project.
5. Craft is shown through restraint and precision, not effects.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard operable, visible focus, 4.5:1 text contrast, reduced-motion respected, touch targets ≥ 44px.
