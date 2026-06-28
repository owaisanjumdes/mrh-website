import Link from "next/link";

// Impact — "Designed, sourced, and made to last." materials section. Figma node
// 794:11503. Centered heading (first line green-highlighted) + subtext, then a
// large citrus MacBook keyboard photo bleeding off the left, with a right-hand
// stats column ("MacBook Neo…" + three icon/percentage stats). Copy verbatim.

// Line-art icons (dark green), matching the section's eco line-art style.
const AreaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 3H3v6M21 9V3h-6M15 21h6v-6M3 15v6h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M3 5h18l-7 8.5V20l-4 1v-7.5L3 5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const AirIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M3 8h10.5a2.8 2.8 0 1 0-2.7-3.5M3 16h8.5a2.5 2.5 0 1 1-2.3 3.5M3 12h15a2.8 2.8 0 1 1-2.7 3.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const STATS = [
  {
    icon: <AreaIcon />,
    num: "2,000",
    unit: "sq ft.",
    desc: "of area coverage from a single unit — built for large, open indoor spaces.",
  },
  {
    icon: <FilterIcon />,
    num: "99.9%",
    unit: "",
    desc: "filter efficiency, capturing fine particles down to 0.3 microns.",
  },
  {
    icon: <AirIcon />,
    num: "2,800",
    unit: "m³/h",
    desc: "Clean Air Delivery Rate (CADR) for rapid, whole-room purification.",
  },
];

type StatOverride = { num: string; unit: string; desc: string };

export default function ImpactMaterials({
  showHeader = true,
  reverse = false,
  stats,
  statsHeader = "PureAir",
  dark = false,
  image = "/impact-macbook.jpg",
  cta,
}: {
  showHeader?: boolean;
  reverse?: boolean;
  stats?: StatOverride[];
  statsHeader?: string;
  dark?: boolean;
  image?: string;
  cta?: { label: string; href: string };
} = {}) {
  // reuse the default icons (area / filter / air) by index when stats are overridden
  const items = stats ? stats.map((s, i) => ({ icon: STATS[i].icon, ...s })) : STATS;

  const media = (
    <div className="dm-media" data-reveal>
      <img loading="lazy" src={image} alt={statsHeader} />
    </div>
  );

  const statsCol = (
    <div className="dm-stats">
      <p className="dm-stats-head" data-reveal style={{ ["--ri" as string]: 1 }}>
        {statsHeader}
      </p>
      {items.map((s, i) => (
        <div className="dm-stat" key={i} data-reveal style={{ ["--ri" as string]: i + 2 }}>
          <div className="dm-stat-fig">
            <span className="dm-stat-icon">{s.icon}</span>
            <span className="dm-stat-num">{s.num}</span>
            {s.unit ? <span className="dm-stat-unit">{s.unit}</span> : null}
          </div>
          <p className="dm-stat-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section
      className={`dm ${showHeader ? "" : "dm--nohead"} ${dark ? "dm--dark" : ""}`}
      aria-label="Designed, sourced, and made to last."
    >
      <style>{`
        .dm {
          --gutter: clamp(20px, 6vw, 126px);
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(64px, 9vw, 130px) 0;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }
        .dm--nohead { padding-top: clamp(24px, 3.5vw, 56px); }
        .dm--nohead .dm-body { margin-top: 0; }

        /* ---- Header ---- */
        .dm-head {
          max-width: 945px;
          margin: 0 auto;
          padding: 0 var(--gutter);
          text-align: center;
        }
        .dm-title {
          margin: 0;
          color: #1d1d1f;
          font-size: clamp(36px, 6.2vw, 80px);
          font-weight: 600;
          line-height: 1.0;
          letter-spacing: -0.015em;
        }
        .dm-hl {
          background: #00d959;
          color: #1d1d1f;
          border-radius: clamp(10px, 1.2vw, 20px);
          padding: 0.02em 0.16em;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .dm-sub {
          margin: clamp(20px, 2.6vw, 36px) auto 0;
          max-width: 840px;
          color: #1d1d1f;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
        }

        /* ---- Body: keyboard photo (bleeds left) + stats column ---- */
        .dm-body {
          margin-top: clamp(40px, 7vw, 96px);
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 64px);
          padding-right: var(--gutter);
        }
        /* reversed layout: stats left, photo right (photo bleeds off the right) */
        .dm-body--rev { padding-right: 0; padding-left: var(--gutter); }
        .dm-body--rev .dm-media { justify-content: flex-start; }
        .dm-media {
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          justify-content: flex-end;
          overflow: hidden;
        }
        .dm-media img {
          display: block;
          height: clamp(360px, 44vw, 760px);
          width: auto;
          max-width: none;
        }

        .dm-stats { flex: 0 0 clamp(260px, 23vw, 300px); }
        .dm-stats-head {
          margin: 0 0 clamp(18px, 2vw, 28px);
          color: #636366;
          font-size: clamp(20px, 1.7vw, 28px);
          font-weight: 600;
          line-height: 1.14;
          letter-spacing: 0.007em;
        }
        .dm-stat { margin-top: clamp(24px, 3vw, 42px); }
        .dm-stat:first-of-type { margin-top: 0; }
        .dm-stat-fig { display: flex; align-items: center; gap: 10px; }
        .dm-stat-icon { color: #0b3d2e; display: inline-flex; flex: none; }
        .dm-stat-icon svg {
          display: block;
          width: clamp(38px, 4vw, 50px);
          height: clamp(38px, 4vw, 50px);
        }
        .dm-stat-num {
          color: #1d1d1f;
          font-size: clamp(34px, 4vw, 48px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .dm-stat-unit {
          color: #1d1d1f;
          font-size: clamp(16px, 1.5vw, 21px);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .dm-stat-desc {
          margin: clamp(8px, 1vw, 14px) 0 0;
          color: #6d6d6d;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.235;
          letter-spacing: -0.022em;
        }

        /* ---- Dark-mode overrides ---- */
        .dm--dark { background: #000000; }
        .dm--dark .dm-title { color: #f5f5f7; }
        .dm--dark .dm-sub { color: #c7c7cc; }
        .dm--dark .dm-stats-head { color: #86868b; }
        .dm--dark .dm-stat-icon { color: #4ade80; }
        .dm--dark .dm-stat-num { color: #f5f5f7; }
        .dm--dark .dm-stat-unit { color: #f5f5f7; }
        .dm--dark .dm-stat-desc { color: #86868b; }

        /* Bottom CTA — glass pill (same as the product CTA) */
        .dm-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: clamp(40px, 6vw, 80px);
          padding: 0 var(--gutter);
        }
        .dm-cta {
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
        .dm-cta:hover { background: rgba(60, 60, 64, 0.82); }
        .dm-cta-label {
          color: #f5f5f7;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.24;
          letter-spacing: -0.022em;
          white-space: nowrap;
        }

        @media (max-width: 820px) {
          .dm-body {
            flex-direction: column;
            gap: clamp(32px, 6vw, 48px);
            padding-right: 0;
          }
          .dm-body--rev { padding-left: 0; }
          .dm-media { width: 100%; justify-content: center; }
          .dm-media img { height: auto; width: 100%; max-width: 720px; }
          .dm-stats {
            flex: none;
            width: 100%;
            max-width: 520px;
            margin: 0 auto;
            padding: 0 var(--gutter);
          }
        }
      `}</style>

      {showHeader && (
        <div className="dm-head">
          <h2 className="dm-title" data-reveal>
            <span className="dm-hl">Products that speak</span>
            <br />
            for itself
          </h2>
          <p className="dm-sub" data-reveal style={{ ["--ri" as string]: 1 }}>
            We design our products with the environment in mind. That starts by using
            recycled and responsibly sourced materials.
          </p>
        </div>
      )}

      <div className={`dm-body ${reverse ? "dm-body--rev" : ""}`}>
        {reverse ? (
          <>
            {statsCol}
            {media}
          </>
        ) : (
          <>
            {media}
            {statsCol}
          </>
        )}
      </div>

      {cta ? (
        <div className="dm-cta-wrap">
          <Link className="dm-cta reveal-bubble" href={cta.href} data-reveal>
            <span className="dm-cta-label">{cta.label}</span>
          </Link>
        </div>
      ) : null}
    </section>
  );
}
