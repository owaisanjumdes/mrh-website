import HomeHero from "@/components/HomeHero";
import HomeGlobe from "@/components/HomeGlobe";
import IoTMonitoring from "@/components/IoTMonitoring";
import ScrollConverge from "@/components/ScrollConverge";
import UnfairAdvantage from "@/components/UnfairAdvantage";
import CompareLineup from "@/components/CompareLineup";
import MacTahoe from "@/components/MacTahoe";
import TwoProducts from "@/components/TwoProducts";
import ImpactMaterials from "@/components/ImpactMaterials";
import ChooserLine from "@/components/ChooserLine";
import Performance from "@/components/Performance";
import CenterStage from "@/components/CenterStage";
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
        <HomeGlobe />
        <IoTMonitoring />
        <ScrollConverge />
        <UnfairAdvantage />
        <CompareLineup />
        <MacTahoe
          bannerLabel={null}
          bannerHeading="MRH solves what the industry couldn’t"
          bannerHeadingSentence
          showBanner={false}
          showCards={false}
          trio={[
            {
              img: "/mrh-environment-01.png",
              title: "Indoor.",
              desc: "Offices, classrooms, clinics, and homes.",
            },
            {
              img: "/mrh-basketball-court.png",
              title: "Semi-outdoor.",
              desc: "Lobbies, corridors, courts, and balconies.",
            },
            {
              img: "/mrh-environment-02.png",
              title: "Outdoor.",
              desc: "Markets, playgrounds, and open public spaces.",
            },
          ]}
          bodyCopy={
            <>
              In exclusive partnership with MANN+HUMMEL, MRH purifies indoor,
              semi-outdoor, and outdoor spaces,{" "}
              <b>
                using fewer units, with superior coverage and faster cleaning.
              </b>
            </>
          }
        />
        <MacTahoe
          eyebrow="Powered by MANN+HUMMEL"
          bannerLabel={null}
          bannerHeading="80 years of German filtration science, now built for India."
          bannerHeadingSentence
          headingJustify
          showBanner={false}
          bannerImage="/mh-ppt-headerimage.jpeg"
          showCards={false}
          showIntro={false}
          headingSub={
            <>
              An exclusive manufacturing and distribution license gives MRH what
              no competitor in India has: MANN+HUMMEL’s filtration technology,{" "}
              <b>made here, for here.</b>
            </>
          }
        />
        <TwoProducts />
        <ImpactMaterials
          dark
          showHeader={false}
          statsHeader="PureAir"
          image="/006.png"
          cta={{ label: "Explore PureAir", href: "/products/pureair" }}
        />
        <ImpactMaterials
          dark
          showHeader={false}
          reverse
          statsHeader="AirFINEry"
          image="/006.png"
          cta={{ label: "Explore AirFINEry", href: "/products/airfinery" }}
          stats={[
            {
              num: "4,000",
              unit: "sq ft.",
              desc: "of area coverage from a single unit — built for the largest open indoor spaces.",
            },
            {
              num: "99.9%",
              unit: "",
              desc: "filter efficiency, capturing fine particles down to 0.3 microns.",
            },
            {
              num: "3,500",
              unit: "m³/h",
              desc: "Clean Air Delivery Rate (CADR) for rapid, whole-room purification.",
            },
          ]}
        />
        <ChooserLine />
        <Performance />
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
        <PureAirInAction heading="Deployment" />
        <PureAirInAction heading="Press Coverage" />
        <SiteFooter />
      </div>
    </main>
  );
}
