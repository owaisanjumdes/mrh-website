import ImpactHero from "@/components/ImpactHero";
import ImpactDevices from "@/components/ImpactDevices";
import ImpactMaterials from "@/components/ImpactMaterials";
import ImpactGallery from "@/components/ImpactGallery";
import ImpactValues from "@/components/ImpactValues";
import ImpactNews from "@/components/ImpactNews";
import SiteFooter from "@/components/SiteFooter";

// Impact — light-mode canvas. Nav comes from the layout (white bar via
// LIGHT_PAGE_ROUTES). Redesign in progress; sections added below.
export default function ImpactPage() {
  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <ImpactHero />
      <ImpactDevices />
      <ImpactMaterials statsHeader="PureAir" image="/rgp.png" />
      <ImpactMaterials
        showHeader={false}
        reverse
        statsHeader="AirFINEry"
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
      <ImpactGallery />
      <ImpactGallery
        showHeader={false}
        captions={[
          {
            lead: "AQI dropped from Very Poor to Good",
            desc: " — the environment started at a Very Poor AQI (301–400) and improved to Good (0–50) after the purifier ran, with a substantial decrease in both particulate matter and particle number concentrations.",
          },
          {
            lead: "Strong removal efficiency vs. no purifier",
            desc: " — with the purifier: 66 ± 13% for ultrafine particles (PM0.1) and 83 ± 1% for fine particles (PM2.5). Without it, efficiency was much lower (22 ± 8% ultrafine, 51 ± 5% fine).",
          },
          {
            lead: "High particle reduction rates",
            desc: " — reduction rate of 853 ± 636 particles/cm³/hr for ultrafine and 3,031 ± 918 particles/cm³/hr for fine particles, both significantly higher with the purifier running.",
          },
          {
            lead: "Strong PM mass reduction",
            desc: " — 61 ± 4% removal efficiency for PM mass with the purifier vs. only 15 ± 7% without, with removal rates up to 68 µg/m³ per hour.",
          },
        ]}
      />
      <ImpactValues />
      <ImpactNews />
      <SiteFooter light />
    </main>
  );
}
