import SiteNav from "@/components/SiteNav";
import RealityHero from "@/components/RealityHero";
import {
  AssistantScene,
  MapFlightScene,
  ReportScene,
  ValuationScene,
  TitleScene,
} from "@/components/scenes";
import SignupCta from "@/components/SignupCta";
import ProofBand from "@/components/ProofBand";
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
        <AssistantScene />
        <ProofBand />
        <SignupCta />
      </main>
      <SiteFooter />
    </>
  );
}
