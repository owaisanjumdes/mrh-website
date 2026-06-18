import HomeHero from "@/components/HomeHero";
import HomeGlobe from "@/components/HomeGlobe";
import MacTahoe from "@/components/MacTahoe";
import ProfoundSound from "@/components/ProfoundSound";
import M5Family from "@/components/M5Family";
import Performance from "@/components/Performance";
import SiriIntercom from "@/components/SiriIntercom";
import BatteryLife from "@/components/BatteryLife";
import PureAirInAction from "@/components/PureAirInAction";
import SiteFooter from "@/components/SiteFooter";

// Home — dark canvas. Nav comes from the layout.
export default function HomePage() {
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
      <HomeHero />
      <HomeGlobe />
      <MacTahoe />
      <ProfoundSound />
      <M5Family />
      <ProfoundSound title="AirFINEry" />
      <M5Family ctaLabel="Explore AirFINEry" ctaHref="/products/airfinery" />
      <Performance />
      <SiriIntercom />
      <BatteryLife />
      <PureAirInAction heading="Deployment" />
      <PureAirInAction heading="Press Coverage" />
      <SiteFooter />
    </main>
  );
}
