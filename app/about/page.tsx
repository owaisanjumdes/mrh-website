import HomeHero from "@/components/HomeHero";
import HomeGlobe from "@/components/HomeGlobe";
import IoTMonitoring from "@/components/IoTMonitoring";
import ScrollConverge from "@/components/ScrollConverge";
import UnfairAdvantage from "@/components/UnfairAdvantage";
import CompareLineup from "@/components/CompareLineup";
import MacTahoe from "@/components/MacTahoe";
import ChooserLine from "@/components/ChooserLine";
import PureAirInAction from "@/components/PureAirInAction";
import SiteFooter from "@/components/SiteFooter";

// About — dark canvas. Nav comes from the layout. (Moved here from the home page.)
export default function AboutPage() {
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
        <ChooserLine />
        <PureAirInAction heading="Deployment" />
        <PureAirInAction heading="Press Coverage" />
        <SiteFooter />
      </div>
    </main>
  );
}
