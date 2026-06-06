import SectionBlock from "../components/SectionBlock";

export default function ContactPage() {
  return (
    <main>
      <SectionBlock
        number="01"
        microLabel="HERO"
        title="Contact"
        description="Two paths: buy a single unit, or request a bulk quote."
        surface="paper"
      />
      <SectionBlock
        number="02"
        microLabel="CONVERSION"
        title="Single unit"
        description="Shopify purchase path for individual buyers."
        surface="paper"
      />
      <SectionBlock
        number="03"
        microLabel="CONVERSION"
        title="Bulk quote"
        description="Institutional quote form for schools, offices, and operators."
        surface="paper"
      />
      <SectionBlock
        number="04"
        microLabel="BRAND"
        title="Office"
        description="Address, hours, support email and phone."
        surface="deep"
      />
    </main>
  );
}
