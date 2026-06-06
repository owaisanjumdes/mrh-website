import SectionBlock from "../components/SectionBlock";

export default function TrustPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="Trust and certifications"
        description="Every claim we make, with the document that backs it."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="PRESS"
        title="Certifications"
        description="BIS, ISO, NABL, IIT Delhi validation marks."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="BRAND"
        title="Partners"
        description="MANN+HUMMEL and OK Play partnership credentials."
        surface="paper"
      />
      <SectionBlock
        number="04"
        microLabel="PROOF"
        title="Downloads"
        description="Datasheets, test reports, certificate downloads."
        surface="deep"
      />
    </main>
  );
}
