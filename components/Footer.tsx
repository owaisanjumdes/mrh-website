import Link from "next/link";

const sitemap = [
  { href: "/products", label: "Products" },
  { href: "/technology", label: "Technology" },
  { href: "/proof", label: "Proof" },
  { href: "/deployments", label: "Deployments" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/trust", label: "Trust" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund policy" },
];

export default function Footer() {
  return (
    <footer
      className="surface-deep"
      style={{
        padding: "var(--sp-8) var(--page-gutter)",
        borderTop: "0.5px solid var(--border-deep)",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-sp-7"
        style={{ maxWidth: "var(--max-content)" }}
      >
        <div className="flex flex-col gap-sp-3">
          <p className="micro-label text-paper-2">Sitemap</p>
          <ul className="flex flex-col gap-sp-2">
            {sitemap.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="text-paper hover:text-paper-2">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-sp-3">
          <p className="micro-label text-paper-2">Legal</p>
          <ul className="flex flex-col gap-sp-2">
            {legal.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="text-paper hover:text-paper-2">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-sp-3">
          <p className="micro-label text-paper-2">Parent brand</p>
          <p
            className="text-paper"
            style={{
              fontSize: "20px",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
            }}
          >
            MRH by OK Play
          </p>
          <p className="text-paper-3 micro-label">&copy; 2026 OK Play India Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
