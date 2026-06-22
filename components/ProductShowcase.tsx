import ProductsHero from "@/components/ProductsHero";
import Highlights from "@/components/Highlights";
import DesignSection from "@/components/DesignSection";
import CloserLook from "@/components/CloserLook";
import WorthUpgrade from "@/components/WorthUpgrade";
import ComparePerformance from "@/components/ComparePerformance";
import BatteryLife from "@/components/BatteryLife";
import PureAirInAction from "@/components/PureAirInAction";
import CenterStage from "@/components/CenterStage";
import KeepExploringIPhone from "@/components/KeepExploringIPhone";
import SiteFooter from "@/components/SiteFooter";

// Shared product page body — rendered identically by /products, /products/pureair,
// and /products/airfinery so all three have the same content and animations.
export default function ProductShowcase({ heroVideo }: { heroVideo?: string } = {}) {
  return (
    <main style={{ background: "#000000", minHeight: "100vh" }}>
      <ProductsHero videoSrc={heroVideo} />
      <Highlights />
      <DesignSection
        copy={
          <>
            Built tough in a powder-coated unibody, PureAir does more than clean.
            It reads the whole room. A full sensor array tracks particulate matter,
            VOCs, CO2, humidity, temperature, and ambient sound, then covers up to
            2,000 sq ft from a single unit. No plastic creak, no blind spots, no
            guesswork.
          </>
        }
      />
      <CloserLook />
      <WorthUpgrade />
      <ComparePerformance />
      <BatteryLife
        title={
          <>
            We didn&rsquo;t test it ourselves.
            <br />
            IIT Delhi did.
          </>
        }
        text={
          <>
            Over 60 days, through Delhi&rsquo;s worst air of the year, an
            independent IIT Delhi study measured exactly what MRH does to the air
            in a real school, indoors and out. The verdict:{" "}
            <b>
              hazardous air turned healthy, with up to 90% of pollutants gone.
            </b>
          </>
        }
        stats={[
          {
            up: "Up to",
            big: "90%",
            desc: "pollutant reduction, independently measured",
          },
          {
            up: "more than",
            big: "60 days",
            desc: "of 24/7 monitoring, Sep to Nov 2024",
          },
          {
            up: "from",
            big: "Severe → Good",
            desc: "AQI, on the worst-air days",
          },
        ]}
        centerStats
        link={{ label: "See the full study", href: "/proof" }}
      />
      <CenterStage
        eyebrow="Connected Intelligence"
        heading="The smartest thing in the room."
        body={
          <>
            Every MRH unit is online. Open the app and the air becomes a number
            you can watch, a system you can control, and a service that takes
            care of itself.{" "}
            <b>
              Live AQI, filter health, and performance, in real time, from
              anywhere.
            </b>
          </>
        }
        showBlocks
      />
      <PureAirInAction />
      <KeepExploringIPhone />
      <SiteFooter />
    </main>
  );
}
