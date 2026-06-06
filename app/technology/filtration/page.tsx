import SectionBlock from "../../components/SectionBlock";

export default function FiltrationPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="Filtration technology"
        description="Multi-stage filtration headline and lineage."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="PRODUCT"
        title="The stack"
        description="Pre-filter, activated carbon, HEPA H13, antimicrobial."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="PROOF"
        title="Filter media"
        description="MANN+HUMMEL media partnership and sourcing."
        surface="deep"
      />
      <SectionBlock
        number="04"
        microLabel="SPECS"
        title="Performance"
        description="Capture efficiency curves, pressure drop, service life."
        surface="deep"
      />
      <SectionBlock
        number="05"
        microLabel="PRESS"
        title="Certifications"
        description="BIS, ISO, NABL, IIT Delhi validation marks."
        surface="paper"
      />
    </main>
  );
}
