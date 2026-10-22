// Editorial content for the public site. Projects and certificates are NOT here:
// they are managed in /admin and served by the API (see lib/portfolio.ts).

export const site = {
  brand: "Zoro",
  mark: "ZORO",
  legalName: "Harsh Kamble",
  url: "https://portfolio-web-fawn-nine.vercel.app",
  description:
    "Zoro is a Mumbai-based developer who builds complete web apps, Flutter apps and the systems behind them, and is now building LLM features into real products.",
  statement: "I build complete products — web, mobile and the systems behind them — and I’m putting LLMs to work inside them.",
  // Fallbacks when the profile API is unreachable; the admin profile wins when present.
  contact: {
    email: "harshworks20@gmail.com",
    github: "https://github.com/ZoroXoro",
    linkedin: "https://www.linkedin.com/in/harsh-kamble-xzro/",
    location: "Mumbai, India",
  },
} as const;

export const facts = [
  { label: "Based", value: "Mumbai, India" },
  { label: "Practice", value: "Co-founder, Fusionexlabs" },
  { label: "Builds", value: "Web, mobile and back end" },
  { label: "Now", value: "RAG pipelines and LLM agents" },
] as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

// `evidence` lists lowercase keywords matched against a project's stack and company; a match proves the capability.
export const capabilities = [
  {
    name: "Web applications",
    enables:
      "Server-rendered Next.js front ends, the APIs behind them, and admin panels that non-technical staff can run without a developer.",
    evidence: ["next", "react"],
    // Also points at the "More live sites" index (data/shipped-sites.ts)
    liveSites: true,
  },
  {
    name: "Mobile apps",
    enables:
      "Cross-platform Flutter apps on Firebase, shipped to the Play Store with accounts and subscription access.",
    evidence: ["flutter"],
  },
  {
    name: "Systems & data",
    enables:
      "Inventory, production and dispatch software that replaces spreadsheets, with stock history you can audit.",
    evidence: ["himalaya"],
  },
  {
    name: "AI integration",
    enables:
      "LLM features inside real products: retrieval over a client’s own content and assistants that answer questions and route bookings.",
    evidence: ["rag", "llm", "langchain"],
  },
] as const;

export const stack = [
  { group: "Languages", items: ["Python", "JavaScript", "SQL", "R"] },
  { group: "Interfaces", items: ["React", "Next.js", "Tailwind CSS", "Flutter", "Streamlit"] },
  { group: "Services & data", items: ["Node.js", "Express", "FastAPI", "Firebase", "Supabase", "MongoDB", "PostgreSQL"] },
  { group: "AI", items: ["LangChain", "Mistral AI", "OpenAI API", "Anthropic API", "Gemini API", "Ollama", "ChromaDB", "Pinecone"] },
  { group: "Tools", items: ["Git & GitHub", "Power BI", "Linux"] },
] as const;

export const about = {
  approach: [
    "I like owning a product from the first conversation to the release: the data model, the API, the interface, the store listing. Most of what I’ve shipped was built for businesses that needed it running — a fruit importer, a therapy clinic, a composites factory.",
    "That keeps me honest about the unglamorous parts: admin panels people can actually use, stock numbers that reconcile, pages that load on a phone. I’m now bringing the same standard to LLM work — retrieval pipelines and tool-using assistants that hold up with real users.",
  ],
  record: [
    { label: "Practice", value: "Co-founder & full-stack developer, Fusionexlabs", meta: "2024 – present" },
    { label: "Recently", value: "Data analyst & software developer, Himalaya Composites", meta: "2026" },
    { label: "Education", value: "BSc Computer Science, Patkar Varde College", meta: "2022 – 2025" },
    { label: "Recognition", value: "DIPAM Intercollegiate Project Competition, 2nd prize", meta: "Dec 2024" },
    { label: "Languages", value: "English, Hindi, Marathi, German (A2)", meta: "" },
  ],
} as const;
