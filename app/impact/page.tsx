import SectionBlock from "../components/SectionBlock";

export default function ImpactPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="Impact"
        description="Headline aggregate stat. Lives, classrooms, hours of clean air."
        surface="deep"
      />
      <SectionBlock
        number="02"
        microLabel="PROOF"
        title="Aggregate metrics"
        description="Deployments, units shipped, average AQI delta, children covered."
        surface="deep"
      />
      <SectionBlock
        number="03"
        microLabel="PROOF"
        title="India deployment map"
        description="Full-bleed map of all verified deployment sites."
        surface="deep"
      />
      <SectionBlock
        number="04"
        microLabel="BRAND"
        title="Featured stories"
        description="Curated case study highlights with human-first framing."
        surface="paper"
      />
    </main>
  );
}
