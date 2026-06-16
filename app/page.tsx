import HomeHero from "@/components/HomeHero";
import MacTahoe from "@/components/MacTahoe";
import ProfoundSound from "@/components/ProfoundSound";
import M5Family from "@/components/M5Family";

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
      <MacTahoe />
      <ProfoundSound />
      <M5Family />
      <ProfoundSound title="AirFINEry" />
      <M5Family ctaLabel="Explore AirFINEry" ctaHref="/products/airfinery" />
    </main>
  );
}
