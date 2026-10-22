// Live sites shown under "More live sites" in Work. Unlike the admin-managed projects,
// these live in the repo: edit this list to add or remove one.
// Descriptions paraphrase each site's own homepage; screenshots in public/work/sites/
// are first-viewport captures of the live sites (1440px wide, October 2026).

export interface ShippedSite {
  slug: string;
  name: string;
  summary: string;
  url: string;
}

export const shippedSites: ShippedSite[] = [
  {
    slug: "sunil-cricket-academy",
    name: "Sunil Cricket Academy",
    summary: "A Mumbai cricket academy coaching at Cross Maidan since 2016: programmes, gallery and enquiries.",
    url: "https://sunilcricketacademy.digitiohub.cloud/",
  },
  {
    slug: "fireoxine",
    name: "FireOxine",
    summary: "A fire-safety manufacturer’s catalogue, browsable by product family or by the fire class you need to cover.",
    url: "https://fireoxine.digitiohub.cloud/",
  },
  {
    slug: "digitiohub-realty",
    name: "DigitioHub Realty",
    summary: "Residential projects across Mumbai and MMR to search, compare and book site visits for.",
    url: "https://realty.digitiohub.cloud/",
  },
  {
    slug: "study-and-work-abroad",
    name: "Study and Work Abroad",
    summary: "A Mumbai study-abroad consultancy: destinations, admissions and visa services, and counselling enquiries.",
    url: "https://studyandworkabroad.in/",
  },
  {
    slug: "retention-max",
    name: "The CLTV Guy · Retention Max",
    summary: "The personal site of a retention-marketing consultant who works with D2C brands.",
    url: "https://thecltvguy.retentionmax.in/",
  },
  {
    slug: "svaryaa",
    name: "Svaryaa",
    summary: "A voice agent that answers business calls, takes orders and books tables in English, Hindi and Marathi.",
    url: "https://www.svaryaa.com/",
  },
  {
    slug: "articuno-r",
    name: "Articuno R",
    summary: "An autonomous surface robot being developed for flood and disaster rescue.",
    url: "https://articunor.com/",
  },
  {
    slug: "hs-ai-solutions",
    name: "HS AI Solutions",
    summary: "An AI engineering and digital product studio, from strategy through production.",
    url: "https://hsaisolution.in/",
  },
];
