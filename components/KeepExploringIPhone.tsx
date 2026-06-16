"use client";

import { useInView } from "@/lib/useInView";

// "Keep exploring iPhone." comparison — Figma node 4017:24633 (Apple Sept 2024).
// #1d1d1f section, black rounded card with two product columns (iPhone 16 Pro /
// iPhone 16): phone, swatches, name, price, CTA, then a divider and an aligned
// spec list. Copy kept verbatim from the Figma design.

type Spec = { icon: string; lines: string[]; fn?: string };
type Product = {
  phone: string;
  swatches: string[];
  name: string;
  price: string;
  cta: { kind: "viewing" | "learn"; label: string };
  specs: Spec[];
};

const PRODUCTS: Product[] = [
  {
    phone: "/ke-16pro.jpg",
    swatches: ["#a8907e", "#a6a198", "#dbdad7", "#202121"],
    name: "iPhone 16 Pro",
    price: "From $999 or $41.62/mo. for 24 mo.",
    cta: { kind: "viewing", label: "Currently viewing" },
    specs: [
      { icon: "/ke-ai.png", lines: ["Apple Intelligence"], fn: "2" },
      { icon: "/ke-chippro.png", lines: ["A18 Pro chip", "with 6‑core GPU"] },
      { icon: "/ke-camerabtn.png", lines: ["Camera Control"] },
      {
        icon: "/ke-campro.png",
        lines: [
          "Pro camera system",
          "Our most advanced 48MP Fusion camera",
          "5x Telephoto camera",
          "48MP Ultra Wide camera",
        ],
      },
      { icon: "/ke-battery.png", lines: ["Up to 33 hours video playback"], fn: "19" },
    ],
  },
  {
    phone: "/ke-16.jpg",
    swatches: ["#6473b0", "#82a8a6", "#c981b0", "#e0e0e0", "#191b1c"],
    name: "iPhone 16",
    price: "From $799 or $33.29/mo. for 24 mo.",
    cta: { kind: "learn", label: "Learn more" },
    specs: [
      { icon: "/ke-ai.png", lines: ["Apple Intelligence"], fn: "2" },
      { icon: "/ke-chip.png", lines: ["A18 chip", "with 5‑core GPU"] },
      { icon: "/ke-camerabtn.png", lines: ["Camera Control"] },
      {
        icon: "/ke-cam16.png",
        lines: [
          "Advanced dual‑camera system",
          "Advanced 48MP Fusion camera",
          "2x Telephoto",
          "12MP Ultra Wide camera",
        ],
      },
      { icon: "/ke-battery.png", lines: ["Up to 27 hours video playback"], fn: "19" },
    ],
  },
];

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden style={{ width: "0.6em", height: "0.6em" }}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function KeepExploringIPhone() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`kei ${inView ? "is-in" : ""}`}
      aria-label="Keep exploring iPhone"
    >
      <style>{`
        .kei {
          --gutter: clamp(20px, 6vw, 88px);
          background: #1d1d1f;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 10vh, 160px) var(--gutter) clamp(72px, 10vh, 160px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .kei-wrap { max-width: 1260px; margin: 0 auto; }
        .kei-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: clamp(24px, 3vw, 40px);
        }
        .kei-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(30px, 4vw, 56px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.03em;
          white-space: nowrap;
        }
        .kei-explore {
          flex: none;
          color: #2997ff;
          font-size: 17px;
          letter-spacing: -0.022em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .kei-explore:hover { text-decoration: underline; }

        .kei-card {
          background: #000000;
          border-radius: 28px;
          padding: clamp(56px, 8vw, 120px) clamp(16px, 3vw, 48px) clamp(56px, 8vw, 96px);
        }
        .kei-list { width: min(764px, 100%); margin: 0 auto; }

        .kei-products { display: flex; gap: clamp(16px, 2.6vw, 20px); }
        .kei-product {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .kei-phone { display: block; width: clamp(150px, 62%, 232px); height: auto; }
        .kei-swatches {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 24px;
        }
        .kei-swatch { width: 12px; height: 12px; border-radius: 6px; }
        .kei-new {
          margin: 24px 0 0;
          color: #ff791b;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.33;
          letter-spacing: -0.01em;
        }
        .kei-name {
          margin: 8px 0 0;
          color: #f5f5f7;
          font-size: clamp(22px, 2.2vw, 27px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: 0.007em;
        }
        .kei-price {
          margin: 20px 0 0;
          color: #f5f5f7;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.47;
          letter-spacing: -0.022em;
        }
        .kei-cta {
          height: 44px;
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 980px;
          font-size: 17px;
          letter-spacing: -0.022em;
          text-decoration: none;
        }
        .kei-cta--viewing { color: #d2d2d7; }
        .kei-cta--learn { background: #0071e3; color: #ffffff; padding: 0 24px; }
        .kei-cta--learn:hover { background: #0077ed; }
        .kei-viewpricing {
          margin-top: 18px;
          color: #2997ff;
          font-size: 17px;
          letter-spacing: -0.022em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .kei-viewpricing:hover { text-decoration: underline; }

        .kei-divider {
          height: 1px;
          background: #424245;
          margin: clamp(28px, 4vw, 48px) 0;
        }

        .kei-specs { display: flex; gap: clamp(16px, 2.6vw, 20px); }
        .kei-spec-col { flex: 1; min-width: 0; }
        .kei-spec {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .kei-spec:nth-child(1) { height: 126px; }
        .kei-spec:nth-child(2) { height: 142px; }
        .kei-spec:nth-child(3) { height: 126px; }
        .kei-spec:nth-child(4) { height: 202px; }
        .kei-spec:nth-child(5) { min-height: 96px; }
        .kei-spec-icon { width: 56px; height: 56px; display: block; }
        .kei-spec-label {
          margin-top: 14px;
          color: #f5f5f7;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.33;
          letter-spacing: -0.01em;
        }
        .kei-spec-label p { margin: 0; }

        .kei-fn {
          font-size: 0.62em;
          vertical-align: super;
          text-decoration: underline;
          text-decoration-thickness: from-font;
        }

        /* On phones the fixed spec-row heights can clip wrapped text and the
           62%/150px phone min can overflow the narrow columns — relax both. */
        @media (max-width: 700px) {
          .kei-phone { width: 74%; }
          .kei-spec:nth-child(1),
          .kei-spec:nth-child(2),
          .kei-spec:nth-child(3),
          .kei-spec:nth-child(4),
          .kei-spec:nth-child(5) {
            height: auto;
            min-height: 0;
            margin-bottom: 24px;
          }
          .kei-spec-label { font-size: 11px; }
          .kei-spec-icon { width: 48px; height: 48px; }
        }
        @media (max-width: 560px) {
          .kei-name { font-size: 20px; }
          .kei-price, .kei-cta, .kei-viewpricing { font-size: 15px; }
        }
      `}</style>

      <div className="kei-wrap">
        <div className="kei-head" data-reveal>
          <h2 className="kei-title">Keep exploring iPhone.</h2>
          <a className="kei-explore" href="#">
            Explore all iPhone <Chevron />
          </a>
        </div>

        <div className="kei-card" data-reveal style={{ ["--ri" as string]: 1 }}>
          <div className="kei-list">
            {/* Product tops */}
            <div className="kei-products">
              {PRODUCTS.map((p) => (
                <div className="kei-product" key={p.name}>
                  <img className="kei-phone" src={p.phone} alt={p.name} />
                  <div className="kei-swatches">
                    {p.swatches.map((c, i) => (
                      <span className="kei-swatch" key={i} style={{ background: c }} />
                    ))}
                  </div>
                  <p className="kei-new">New</p>
                  <p className="kei-name">{p.name}</p>
                  <p className="kei-price">
                    {p.price}
                    <span className="kei-fn">1</span>
                  </p>
                  {p.cta.kind === "viewing" ? (
                    <span className="kei-cta kei-cta--viewing">{p.cta.label}</span>
                  ) : (
                    <a className="kei-cta kei-cta--learn" href="#">
                      {p.cta.label}
                    </a>
                  )}
                  <a className="kei-viewpricing" href="#">
                    View pricing <Chevron />
                  </a>
                </div>
              ))}
            </div>

            <div className="kei-divider" />

            {/* Spec columns */}
            <div className="kei-specs">
              {PRODUCTS.map((p) => (
                <div className="kei-spec-col" key={p.name}>
                  {p.specs.map((s, i) => (
                    <div className="kei-spec" key={i}>
                      <img className="kei-spec-icon" src={s.icon} alt="" aria-hidden />
                      <div className="kei-spec-label">
                        {s.lines.map((line, j) => (
                          <p key={j}>
                            {line}
                            {s.fn && j === s.lines.length - 1 ? (
                              <span className="kei-fn">{s.fn}</span>
                            ) : null}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
