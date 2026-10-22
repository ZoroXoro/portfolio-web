import Hero from "@/components/site/sections/hero";
import Work from "@/components/site/sections/work";
import Capabilities from "@/components/site/sections/capabilities";
import About from "@/components/site/sections/about";
import Contact from "@/components/site/sections/contact";
import { getCertificates, getProfile, getSpecimens } from "@/lib/portfolio";

export const revalidate = 300;

export default async function HomePage() {
  const [specimens, profile, certificates] = await Promise.all([getSpecimens(), getProfile(), getCertificates()]);
  return (
    <>
      <Hero />
      <Work specimens={specimens} profile={profile} />
      <Capabilities specimens={specimens ?? []} />
      <About certificateCount={certificates?.length ?? null} />
      <Contact profile={profile} />
    </>
  );
}
