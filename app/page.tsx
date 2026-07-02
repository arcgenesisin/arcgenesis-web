import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
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
        <Hero />
        <HowItWorks />
        <Pricing />
        <SignupCta />
        <Products />
      </main>
      <SiteFooter />
    </>
  );
}
