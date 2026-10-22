import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import { TransitionSettler } from "@/components/site/transition-link";
import { getProfile } from "@/lib/portfolio";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer profile={profile} />
      <TransitionSettler />
    </>
  );
}
