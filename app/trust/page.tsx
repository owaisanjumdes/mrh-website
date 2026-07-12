import SectionBlock from "../components/SectionBlock";

export default function TrustPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="Hero"
        title="Trust and Certifications"
        description="Every claim we make, with the document that backs it."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="Press"
        title="Certifications"
        description="BIS, ISO, NABL, IIT Delhi validation marks."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="Brand"
        title="Partners"
        description="MANN+HUMMEL and OK Play partnership credentials."
        surface="paper"
      />
      <SectionBlock
        number="04"
        microLabel="Proof"
        title="Downloads"
        description="Datasheets, test reports, certificate downloads."
        surface="deep"
      />
    </main>
  );
}
