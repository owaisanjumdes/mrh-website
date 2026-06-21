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
      <DesignSection />
      <CloserLook />
      <WorthUpgrade />
      <ComparePerformance />
      <BatteryLife />
      <PureAirInAction />
      <CenterStage />
      <KeepExploringIPhone />
      <SiteFooter />
    </main>
  );
}
