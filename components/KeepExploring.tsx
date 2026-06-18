import Link from "next/link";
import type { ReactNode } from "react";

type Spec = {
  icon: ReactNode;
  label: ReactNode;
};

type Product = {
  tag?: string;
  name: string;
  image: string;
  imageAlt: string;
  swatches: { color: string; border?: string }[];
  price: string;
  cta:
    | { kind: "current"; label: string }
    | { kind: "primary"; label: string; href: string };
  pricingHref: string;
  specs: Spec[];
};

const ink = "#1d1d1f";
const blue = "#0066cc";
const fire = "#b64400";
const divider = "#d2d2d7";
const sectionBg = "#f5f5f7";

function IconFilter() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="5" y="4" width="18" height="20" rx="2" stroke={ink} strokeWidth="1.6" />
      <path d="M9 9h10M9 13h10M9 17h10M9 21h6" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconSensor() {
  return (
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" aria-hidden>
      <path d="M4 18a11 11 0 0 1 22 0" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 18l6-7" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="15" cy="18" r="2" fill={ink} />
    </svg>
  );
}

function IconApp() {
  return (
    <svg width="22" height="30" viewBox="0 0 22 30" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="17" height="25" rx="3" stroke={ink} strokeWidth="1.6" />
      <circle cx="11" cy="23.5" r="1.2" fill={ink} />
      <path d="M6 7h10" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconSound() {
  return (
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" aria-hidden>
      <path d="M4 11v6h4l6 5V6L8 11H4z" stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19 10.5a5 5 0 0 1 0 7M22.5 7.5a9 9 0 0 1 0 13" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCoverage() {
  return (
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" aria-hidden>
      <path d="M5 22V8l10-4 10 4v14" stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5 22h20" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 22v-7h6v7" stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconChip() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="7" y="7" width="14" height="14" rx="2" stroke={ink} strokeWidth="1.6" />
      <rect x="11" y="11" width="6" height="6" rx="1" stroke={ink} strokeWidth="1.4" />
      <path d="M11 4v3M17 4v3M11 21v3M17 21v3M4 11h3M4 17h3M21 11h3M21 17h3" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const products: [Product, Product] = [
  {
    tag: "Now shipping",
    name: "PureAir",
    image: "/hero-pureair.png",
    imageAlt: "MRH PureAir wall-mounted purifier",
    swatches: [
      { color: "#b8b3af" },
      { color: "#2a2a2c" },
      { color: "#d4b896" },
      { color: "#f5f5f5", border: "#d0d0d0" },
    ],
    price: "From ₹39,999 or ₹1,666/mo. for 24 mo.",
    cta: { kind: "current", label: "Currently viewing" },
    pricingHref: "/products/pureair#pricing",
    specs: [
      { icon: <IconFilter />, label: "Multi-stage HEPA H13 filtration" },
      { icon: <IconChip />, label: <>Live AQI sensor<br />with PM 2.5 + VOC read-outs</> },
      { icon: <IconApp />, label: "Smart MRH app control" },
      { icon: <IconSound />, label: "Whisper motor — under 28 dB" },
      { icon: <IconCoverage />, label: "Coverage — up to 450 sq ft" },
    ],
  },
  {
    tag: "New",
    name: "AirFINEry",
    image: "/airfinery.png",
    imageAlt: "MRH AirFINEry institutional purifier",
    swatches: [
      { color: "#b8b3af" },
      { color: "#2a2a2c" },
      { color: "#3c4042" },
      { color: "#f2f1ed", border: "#d0d0d0" },
    ],
    price: "From ₹89,999 or ₹3,749/mo. for 24 mo.",
    cta: { kind: "primary", label: "Learn more", href: "/products/airfinery" },
    pricingHref: "/products/airfinery#pricing",
    specs: [
      { icon: <IconFilter />, label: <>Pro multi-stage stack<br />with MANN+HUMMEL HEPA H14</> },
      { icon: <IconChip />, label: <>Live AQI display<br />with zone-level reporting</> },
      { icon: <IconApp />, label: "Smart MRH app + ops dashboard" },
      { icon: <IconSound />, label: "Whisper motor — under 32 dB" },
      { icon: <IconCoverage />, label: "Coverage — up to 1,800 sq ft" },
    ],
  },
];

function Swatch({ color, border }: { color: string; border?: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        background: color,
        border: border ? `1px solid ${border}` : "none",
      }}
    />
  );
}

function ProductColumn({ product }: { product: Product }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(28px, 3vw, 56px) clamp(20px, 2.4vw, 44px) clamp(40px, 4vw, 64px)",
        textAlign: "center",
      }}
    >
      {/* Product image */}
      <div
        style={{
          width: "100%",
          maxWidth: "clamp(280px, 30vw, 420px)",
          aspectRatio: "232 / 309",
          marginTop: "clamp(16px, 2vw, 32px)",
          marginBottom: "clamp(24px, 2.5vw, 40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.image}
          alt={product.imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            filter:
              "drop-shadow(0 18px 32px rgba(0, 0, 0, 0.18)) drop-shadow(0 50px 80px rgba(0, 0, 0, 0.12))",
          }}
        />
      </div>

      {/* Swatches */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "clamp(28px, 3vw, 48px)" }}>
        {product.swatches.map((s, i) => (
          <Swatch key={i} {...s} />
        ))}
      </div>

      {/* Tag + name */}
      {product.tag ? (
        <p
          style={{
            margin: 0,
            color: fire,
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "-0.12px",
            lineHeight: 1.33,
          }}
        >
          {product.tag}
        </p>
      ) : null}
      <h3
        style={{
          margin: "8px 0 0 0",
          color: ink,
          fontSize: "clamp(22px, 1.9vw, 27.34px)",
          fontWeight: 700,
          letterSpacing: "0.196px",
          lineHeight: 1.17,
        }}
      >
        {product.name}
      </h3>

      {/* Price */}
      <p
        style={{
          margin: "clamp(28px, 3vw, 56px) 0 0 0",
          color: ink,
          fontSize: "17px",
          fontWeight: 600,
          letterSpacing: "-0.374px",
          lineHeight: 1.47,
        }}
      >
        {product.price}
        <sup
          style={{
            fontSize: "13px",
            fontWeight: 600,
            verticalAlign: "super",
            textDecoration: "underline",
            marginLeft: "1px",
          }}
        >
          1
        </sup>
      </p>

      {/* CTA */}
      <div style={{ marginTop: "clamp(20px, 1.8vw, 28px)" }}>
        {product.cta.kind === "current" ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              color: "#424245",
              fontSize: "17px",
              letterSpacing: "-0.374px",
              lineHeight: 1.18,
              minHeight: "44px",
            }}
          >
            {product.cta.label}
          </span>
        ) : (
          <Link
            href={product.cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 22px",
              minHeight: "44px",
              minWidth: "135px",
              borderRadius: "9999px",
              background: "#0071e3",
              color: "#fff",
              fontSize: "17px",
              fontWeight: 400,
              letterSpacing: "-0.374px",
              textDecoration: "none",
            }}
          >
            {product.cta.label}
          </Link>
        )}
      </div>

      {/* View pricing */}
      <Link
        href={product.pricingHref}
        style={{
          marginTop: "clamp(18px, 1.6vw, 26px)",
          color: blue,
          fontSize: "17px",
          letterSpacing: "-0.374px",
          lineHeight: 1.18,
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          textDecoration: "none",
        }}
      >
        <span>View pricing</span>
        <span aria-hidden style={{ fontSize: "17px" }}>
          &rsaquo;
        </span>
      </Link>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: "1px",
          background: divider,
          marginTop: "clamp(40px, 3.6vw, 56px)",
          marginBottom: "clamp(40px, 3.6vw, 56px)",
        }}
      />

      {/* Spec rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(32px, 3vw, 48px)",
          width: "100%",
        }}
      >
        {product.specs.map((spec, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {spec.icon}
            </div>
            <p
              style={{
                margin: 0,
                color: ink,
                fontSize: "12px",
                lineHeight: 1.33,
                letterSpacing: "-0.12px",
                maxWidth: "32ch",
                textAlign: "center",
                minHeight: "calc(12px * 1.33 * 2)",
              }}
            >
              {spec.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KeepExploring() {
  return (
    <section
      style={{
        background: sectionBg,
        padding: "clamp(64px, 7vw, 120px) clamp(16px, 3vw, 40px)",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "1280px", width: "100%" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            marginBottom: "clamp(40px, 4vw, 80px)",
            padding: "0 clamp(8px, 1.2vw, 24px)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: ink,
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Keep exploring MRH.
          </h2>
          <Link
            href="/products"
            style={{
              color: blue,
              fontSize: "17px",
              letterSpacing: "-0.374px",
              lineHeight: 1.18,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
              marginTop: "8px",
            }}
          >
            <span>Explore all products</span>
            <span aria-hidden style={{ fontSize: "17px" }}>
              &rsaquo;
            </span>
          </Link>
        </div>

        {/* White rounded card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "28px",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
          }}
          className="mrh-explore-grid"
        >
          <ProductColumn product={products[0]} />
          <div style={{ background: divider }} aria-hidden />
          <ProductColumn product={products[1]} />
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .mrh-explore-grid {
            grid-template-columns: 1fr !important;
          }
          .mrh-explore-grid > [aria-hidden] {
            width: 100%;
            height: 1px;
          }
        }
      `}</style>
    </section>
  );
}
