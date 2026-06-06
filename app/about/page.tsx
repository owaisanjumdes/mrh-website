import SectionBlock from "../components/SectionBlock";

export default function AboutPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="About MRH"
        description="A clean-air systems company, backed by OK Play and MANN+HUMMEL."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="BRAND"
        title="OK Play legacy"
        description="Timeline of the parent manufacturer and its industrial footprint."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="BRAND"
        title="MANN+HUMMEL partnership"
        description="Filtration technology lineage and supplier relationship."
        surface="paper"
      />
      <SectionBlock
        number="04"
        microLabel="BRAND"
        title="Founding story"
        description="Why MRH exists and what we are building toward."
        surface="paper"
      />
      <SectionBlock
        number="05"
        microLabel="BRAND"
        title="Team"
        description="Leadership and engineering team grid."
        surface="paper"
      />
      <SectionBlock
        number="06"
        microLabel="PROOF"
        title="Manufacturing facility"
        description="Plant overview, capacity, quality systems."
        surface="deep"
      />
      <SectionBlock
        number="07"
        microLabel="BRAND"
        title="Make in India"
        description="Domestic manufacturing commitment and sourcing."
        surface="paper"
      />
      <SectionBlock
        number="08"
        microLabel="PROOF"
        title="Traction"
        description="Deployments, partners, growth metrics."
        surface="deep"
      />
      <SectionBlock
        number="09"
        microLabel="CONVERSION"
        title="Partner with us"
        description="Routes for investors, distributors, and institutional buyers."
        surface="paper"
      />
    </main>
  );
}
