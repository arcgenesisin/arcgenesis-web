import SiteNav from "@/components/SiteNav";
import RealityHero from "@/components/RealityHero";
import {
  MapFlightScene,
  ReportScene,
  ValuationScene,
  TitleScene,
} from "@/components/scenes";
import Pricing from "@/components/Pricing";
import SignupCta from "@/components/SignupCta";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <RealityHero />
        <MapFlightScene />
        <ReportScene />
        <ValuationScene />
        <TitleScene />
        <Pricing />
        <SignupCta />
      </main>
      <SiteFooter />
    </>
  );
}
