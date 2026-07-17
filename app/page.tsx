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
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <RealityHero />
        <AssistantScene />
        <MapFlightScene />
        <ReportScene />
        <ValuationScene />
        <TitleScene />
        <SignupCta />
      </main>
      <SiteFooter />
    </>
  );
}
