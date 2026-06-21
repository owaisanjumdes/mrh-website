import HomeHero from "@/components/HomeHero";
import { Logos3 } from "@/components/ui/logos3";
import HomeGlobe from "@/components/HomeGlobe";
import MacTahoe from "@/components/MacTahoe";
import DesignSection from "@/components/DesignSection";
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
      {/* Higher layer that scrolls UP over the pinned hero (parallax reveal).
          z-index above the sticky hero; solid section backgrounds cover it. */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Logos3 heading="Filtration engineered in Germany. Proven in India." />
        <HomeGlobe />
        <MacTahoe />
        <DesignSection
          eyebrow="See it work"
          title={
            <>
              Clean air you can
              <br />
              actually watch happen
            </>
          }
          copy="Before we install a single unit, our simulation engine maps your space → air volume, layout, pollution load and shows exactly where clean air will land. After we install, a live AQI readout shows the drop in real time. No claims. Just the number, falling."
          cols={[
            {
              title: "Air Simulation",
              desc: "Map any space. See coverage, placement, and the AQI you'll reach before you buy.",
              cta: { label: "Simulate your space", href: "/technology/simulation" },
            },
            {
              title: "Live AQI",
              desc: "Every unit reads the air it's cleaning, continuously, in plain numbers you can trust.",
            },
          ]}
        />
        <ProfoundSound
          sub={
            <>
              Whisper-quiet purification for the rooms
              <br />
              you live and work in.
              <br />
              Clears 2,000 sq ft in <b>10</b> minutes.
            </>
          }
        />
        <M5Family />
        <ProfoundSound
          title="AirFINEry"
          sub={
            <>
              Industrial-grade, weatherproof purification
              <br />
              for open and semi-open spaces.
              <br />
              Clears 3,500 sq ft in <b>10</b> minutes.
            </>
          }
        />
        <M5Family ctaLabel="Explore AirFINEry" ctaHref="/products/airfinery" />
        <Performance />
        <SiriIntercom />
        <BatteryLife />
        <PureAirInAction heading="Deployment" />
        <PureAirInAction heading="Press Coverage" />
        <SiteFooter />
      </div>
    </main>
  );
}
