import SectionBlock from "../../components/SectionBlock";

export default function SimulationPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="Hero"
        title="Air Simulation"
        description="Why we simulate before we deploy. Headline render."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="Simulation"
        title="Methodology"
        description="CFD solver, mesh, boundary conditions, validation loop."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="Simulation"
        title="Demo Gallery"
        description="Looping renders across canonical room types."
        surface="paper"
      />
      <SectionBlock
        number="04"
        microLabel="Simulation"
        title="Room-Type Matrix"
        description="Classroom, hall, hospital ward, transit lounge, retail."
        surface="paper"
      />
      <SectionBlock
        number="05"
        microLabel="Proof"
        title="Field Validation"
        description="Simulation outputs cross-checked with deployed sensor data."
        surface="deep"
      />
      <SectionBlock
        number="06"
        microLabel="Conversion"
        title="Request a Simulation"
        description="Submit room dimensions and constraints for a custom CFD run."
        surface="paper"
      />
    </main>
  );
}
