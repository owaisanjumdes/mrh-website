import SiriIntercom from "@/components/SiriIntercom";
import CameraShowTell from "@/components/CameraShowTell";
import MultiStageFiltration from "@/components/MultiStageFiltration";
import ConnectedIntelligence from "@/components/ConnectedIntelligence";
import PoweredByMannHummel from "@/components/PoweredByMannHummel";
import SiteFooter from "@/components/SiteFooter";

// Technology — dark canvas. Nav comes from the layout.
export default function TechnologyLandingPage() {
  return (
    <main
      style={{
        background: "#000000",
        minHeight: "100vh",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <SiriIntercom />
      <CameraShowTell />
      <MultiStageFiltration />
      <ConnectedIntelligence />
      <PoweredByMannHummel />
      <SiteFooter />
    </main>
  );
}
