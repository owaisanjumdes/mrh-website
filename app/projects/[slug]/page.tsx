import SectionBlock from "../../components/SectionBlock";

export default async function DeploymentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HEADER"
        title={slug}
        description="Deployment name, sector, location, year. Hero numeral for AQI delta."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="BRAND"
        title="Context"
        description="Site profile, occupants, why this deployment mattered."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="PROBLEM"
        title="Challenge"
        description="Pre-deployment AQI data, source profile, constraints."
        surface="deep"
      />
      <SectionBlock
        number="04"
        microLabel="SIMULATION"
        title="Simulation"
        description="CFD output for this site, placements considered."
        surface="paper"
      />
      <SectionBlock
        number="05"
        microLabel="PROOF"
        title="Deployment"
        description="Units installed, placement diagram, commissioning steps."
        surface="deep"
      />
      <SectionBlock
        number="06"
        microLabel="PROOF"
        title="Results"
        description="Before and after AQI, with measurement methodology."
        surface="deep"
      />
      <SectionBlock
        number="07"
        microLabel="CONVERSION"
        title="Next study"
        description="Related deployments and link to the index."
        surface="paper"
      />
    </main>
  );
}
