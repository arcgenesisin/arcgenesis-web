import SiteNav from "@/components/SiteNav";
import RealityHero from "@/components/RealityHero";
import Chapters from "@/components/Chapters";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import SignupCta from "@/components/SignupCta";
import Products from "@/components/Products";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <RealityHero />
        <Chapters />
        <HowItWorks />
        <Pricing />
        <SignupCta />
        <Products />
      </main>
      <SiteFooter />
    </>
  );
}
