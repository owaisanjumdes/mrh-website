import SectionBlock from "../../components/SectionBlock";

export default function SimulationPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="Air simulation"
        description="Why we simulate before we deploy. Headline render."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="SIMULATION"
        title="Methodology"
        description="CFD solver, mesh, boundary conditions, validation loop."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="SIMULATION"
        title="Demo gallery"
        description="Looping renders across canonical room types."
        surface="paper"
      />
      <SectionBlock
        number="04"
        microLabel="SIMULATION"
        title="Room-type matrix"
        description="Classroom, hall, hospital ward, transit lounge, retail."
        surface="paper"
      />
      <SectionBlock
        number="05"
        microLabel="PROOF"
        title="Field validation"
        description="Simulation outputs cross-checked with deployed sensor data."
        surface="deep"
      />
      <SectionBlock
        number="06"
        microLabel="CONVERSION"
        title="Request a simulation"
        description="Submit room dimensions and constraints for a custom CFD run."
        surface="paper"
      />
    </main>
  );
}
