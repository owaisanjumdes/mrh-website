import SectionBlock from "../../components/SectionBlock";

export default function PureAirPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="PureAir"
        description="Product hero. Scroll-explode 3D placeholder. Key numeral and trust strip."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="PROBLEM"
        title="The room-level problem"
        description="Indoor AQI distribution for homes and small offices."
        surface="deep"
      />
      <SectionBlock
        number="03"
        microLabel="PRODUCT"
        title="Engineering exploded"
        description="Filter stack exploded view with stage callouts."
        surface="paper"
      />
      <SectionBlock
        number="04"
        microLabel="SPECS"
        title="Technical specifications"
        description="Coverage, CADR, noise, filter life, power, dimensions."
        surface="deep"
      />
      <SectionBlock
        number="05"
        microLabel="SIMULATION"
        title="Room simulation"
        description="CFD demo across room types and placements."
        surface="paper"
      />
      <SectionBlock
        number="06"
        microLabel="PRODUCT"
        title="Install and placement"
        description="Setup steps, placement guidance, replacement schedule."
        surface="paper"
      />
      <SectionBlock
        number="07"
        microLabel="PROOF"
        title="Field deployments"
        description="Verified before and after AQI deltas from real units."
        surface="deep"
      />
      <SectionBlock
        number="08"
        microLabel="PRODUCT"
        title="Pricing and SKUs"
        description="Variants, what is included, accessories, filter packs."
        surface="paper"
      />
      <SectionBlock
        number="09"
        microLabel="CONVERSION"
        title="Buy or locate a dealer"
        description="Single unit purchase path and dealer locator link."
        surface="deep"
      />
    </main>
  );
}
