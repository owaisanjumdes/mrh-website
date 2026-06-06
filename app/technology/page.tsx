import SectionBlock from "../components/SectionBlock";

export default function TechnologyLandingPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="Technology"
        description="Engineering pillars overview. Simulation plus filtration."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="SIMULATION"
        title="Air simulation"
        description="CFD-driven design and validation. Link to simulation detail."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="PROOF"
        title="Filtration technology"
        description="Multi-stage filter stack lineage from MANN+HUMMEL. Link to filtration detail."
        surface="deep"
      />
    </main>
  );
}
