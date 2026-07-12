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
        microLabel="Header"
        title={slug}
        description="Deployment name, sector, location, year. Hero numeral for AQI delta."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="Brand"
        title="Context"
        description="Site profile, occupants, why this deployment mattered."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="Problem"
        title="Challenge"
        description="Pre-deployment AQI data, source profile, constraints."
        surface="deep"
      />
      <SectionBlock
        number="04"
        microLabel="Simulation"
        title="Simulation"
        description="CFD output for this site, placements considered."
        surface="paper"
      />
      <SectionBlock
        number="05"
        microLabel="Proof"
        title="Deployment"
        description="Units installed, placement diagram, commissioning steps."
        surface="deep"
      />
      <SectionBlock
        number="06"
        microLabel="Proof"
        title="Results"
        description="Before and after AQI, with measurement methodology."
        surface="deep"
      />
      <SectionBlock
        number="07"
        microLabel="Conversion"
        title="Next Study"
        description="Related deployments and link to the index."
        surface="paper"
      />
    </main>
  );
}
