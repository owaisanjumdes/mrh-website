import SectionBlock from "../components/SectionBlock";

export default function DeploymentsIndexPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="Deployments"
        description="Verified deployments across sectors and regions."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="SECTORS"
        title="Filters"
        description="Filter bar by sector, region, year, and product."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="PROOF"
        title="Studies grid"
        description="Card grid of every published case study."
        surface="paper"
      />
      <SectionBlock
        number="04"
        microLabel="CONVERSION"
        title="Request a study"
        description="Path for prospective clients to commission a custom study."
        surface="paper"
      />
    </main>
  );
}
