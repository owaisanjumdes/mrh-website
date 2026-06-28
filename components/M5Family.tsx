import Link from "next/link";

// "M5 family of chips" — Figma node 756:8505. Three alternating MacBook
// image / text rows (each with a gradient chip icon, paragraph, and gradient
// spec list) plus a bottom CTA. Copy kept verbatim from the Figma design.

type Chip = {
  name: string;
  logo: string;
  img: string;
  caption: string;
  chipGradient: string;
  textGradient: string;
  fnColor: string;
  para: string;
  line1: string;
  line2: string;
  fn: string;
};

const CHIPS: Chip[] = [
  {
    name: "M5",
    logo: "/m5-logo1.png",
    img: "/m5-premiere.jpg",
    caption: "Adobe Premiere",
    chipGradient:
      "linear-gradient(45deg, rgb(191,235,224) 0%, rgb(42,186,158) 33.333%, rgb(23,140,155) 66.667%, rgb(18,56,90) 100%)",
    textGradient:
      "linear-gradient(90deg, rgb(228,246,240) 0%, rgb(157,207,202) 31%, rgb(107,149,172) 68%, rgb(69,101,125) 100%)",
    fnColor: "#45657d",
    para: "M5 brings next-generation speed and powerful on-device AI to college students, business users, and aspiring creators.",
    line1: "Available in 14”",
    line2: "Up to 6x faster than M1",
    fn: "1",
  },
  {
    name: "M5 Pro",
    logo: "/m5-logo2.png",
    img: "/m5-vscode.jpg",
    caption: "Visual Studio Code",
    chipGradient:
      "linear-gradient(45deg, rgb(155,204,225) 0%, rgb(66,113,220) 33.333%, rgb(13,48,156) 66.667%, rgb(3,10,97) 100%)",
    textGradient:
      "linear-gradient(90deg, rgb(225,229,255) 7%, rgb(131,160,239) 80%)",
    fnColor: "#83a0ef",
    para: "M5 Pro delivers even more power for scientists, engineers, software developers, and creative pros tackling intensive projects.",
    line1: "Available in 14” and 16”",
    line2: "Up to 7.8x faster than M1 Pro",
    fn: "8",
  },
  {
    name: "M5 Max",
    logo: "/m5-logo3.png",
    img: "/m5-vector.jpg",
    caption: "Vectorworks, Maxon Redshift",
    chipGradient:
      "linear-gradient(45deg, rgb(204,184,215) 0%, rgb(164,119,195) 33.333%, rgb(132,87,187) 66.667%, rgb(27,12,83) 100%)",
    textGradient:
      "linear-gradient(90deg, rgb(255,225,252) 7%, rgb(198,131,239) 79%)",
    fnColor: "#c683ef",
    para: "Our most advanced chip ever built for a pro laptop. M5 Max is perfect for 3D VFX artists, AI developers, and film composers.",
    line1: "Available in 14” and 16”",
    line2: "Up to 8x faster than M1 Max",
    fn: "14",
  },
];

export default function M5Family({
  ctaLabel = "Explore PureAir",
  ctaHref = "/products/pureair",
}: {
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="m5" aria-label="M5 family of chips">
      <style>{`
        .m5 {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(96px, 14vh, 170px) clamp(20px, 6vw, 88px) clamp(80px, 12vh, 120px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .m5-wrap { max-width: 1260px; margin: 0 auto; }

        .m5-row {
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 40px);
        }
        .m5-row + .m5-row { margin-top: clamp(72px, 11vw, 200px); }
        .m5-row--rev { flex-direction: row-reverse; }

        .m5-imgcol { flex: 1 1 0; min-width: 0; overflow: hidden; }
        .m5-device {
          position: relative;
          width: 116%;
          margin-left: -16%;
          aspect-ratio: 2200 / 1340;
        }
        .m5-row--rev .m5-device { margin-left: 0; margin-right: -16%; }
        .m5-base { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
        .m5-screen {
          position: absolute;
          top: 2.1%;
          left: 8%;
          width: 84%;
          height: 83.5%;
          object-fit: cover;
          object-position: top center;
          border-radius: 1.2%;
        }
        .m5-caption {
          margin: clamp(8px, 1vw, 12px) 0 0;
          color: #86868b;
          font-size: 12px;
          line-height: 1.33;
          letter-spacing: -0.01em;
          text-align: right;
        }
        .m5-imgcol--right .m5-caption { text-align: left; }

        .m5-textcol { flex: none; width: 315px; max-width: 100%; }
        .m5-chip {
          width: 59px;
          height: 59px;
          border-radius: 12px;
          overflow: hidden;
        }
        .m5-chip img { width: 100%; height: 100%; object-fit: contain; }
        .m5-para {
          margin: clamp(18px, 1.6vw, 22px) 0 0;
          color: #f5f5f7;
          font-size: clamp(22px, 2vw, 28px);
          font-weight: 600;
          line-height: 1.14;
          letter-spacing: 0.007em;
        }
        .m5-list {
          margin-top: clamp(18px, 1.6vw, 22px);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .m5-line {
          margin: 0;
          font-size: clamp(22px, 2vw, 28px);
          font-weight: 600;
          line-height: 1.14;
          letter-spacing: 0.007em;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .m5-fn {
          text-decoration: underline;
          text-decoration-thickness: from-font;
        }

        /* Bottom CTA */
        .m5-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: clamp(64px, 9vw, 130px);
        }
        .m5-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          padding: 0 clamp(24px, 3vw, 34px);
          border-radius: 28px;
          background: rgba(42, 42, 45, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          text-decoration: none;
          transition: background 200ms ease;
        }
        .m5-cta:hover { background: rgba(60, 60, 64, 0.82); }
        .m5-cta-label {
          color: #f5f5f7;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.24;
          letter-spacing: -0.022em;
          white-space: nowrap;
        }
        .m5-cta-icon {
          flex: none;
          width: 36px;
          height: 36px;
          border-radius: 50px;
          background: #0071e3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .m5-cta-icon svg { width: 16px; height: 16px; }

        @media (max-width: 900px) {
          .m5-row, .m5-row--rev { flex-direction: column; align-items: stretch; }
          .m5-device { width: 100%; margin: 0; }
          .m5-row--rev .m5-device { margin: 0; }
          .m5-caption, .m5-imgcol--right .m5-caption { text-align: left; }
          .m5-textcol { width: 100%; }
        }
      `}</style>

      <div className="m5-wrap">
        {CHIPS.map((c, i) => (
          <div
            className={`m5-row ${i % 2 === 1 ? "m5-row--rev" : ""}`}
            key={c.name}
            data-reveal
          >
            <div className={`m5-imgcol ${i % 2 === 1 ? "m5-imgcol--right" : ""}`}>
              <div className="m5-device">
                <img loading="lazy" className="m5-base" src="/m5-base.jpg" alt="" aria-hidden />
                <img loading="lazy" className="m5-screen" src={c.img} alt={c.name} />
              </div>
            </div>

            <div className="m5-textcol">
              <div className="m5-chip" style={{ backgroundImage: c.chipGradient }}>
                <img loading="lazy" src={c.logo} alt={c.name} />
              </div>
              <p className="m5-para">{c.para}</p>
              <div className="m5-list">
                <p className="m5-line" style={{ backgroundImage: c.textGradient }}>
                  {c.line1}
                </p>
                <p className="m5-line" style={{ backgroundImage: c.textGradient }}>
                  {c.line2}
                  <span
                    className="m5-fn"
                    style={{ color: c.fnColor, WebkitTextFillColor: c.fnColor }}
                  >
                    {c.fn}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="m5-cta-wrap">
        <Link className="m5-cta reveal-bubble" href={ctaHref} data-reveal>
          <span className="m5-cta-label">{ctaLabel}</span>
        </Link>
      </div>
    </section>
  );
}
