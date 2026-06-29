// "Design" section — Figma node 707:3631.
// Black canvas, orange eyebrow, large two-line headline, gray paragraph, a big
// centered product render, and a glass pill CTA with a blue "+". The pill sticks
// to the bottom of this section and pops up when scrolled into view.
// Copy kept verbatim from the Figma design.

import type { ReactNode } from "react";

export default function DesignSection({
  eyebrow = "Design",
  title,
  copy,
  cols,
}: {
  eyebrow?: string;
  title?: ReactNode;
  copy?: ReactNode;
  cols?: {
    title: ReactNode;
    desc: ReactNode;
    cta?: { label: string; href?: string };
  }[];
} = {}) {
  return (
    <section className="ds" id="design" aria-label="Design">
      <style>{`
        .ds {
          --gutter: clamp(20px, 6vw, 88px);
          position: relative;
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(80px, 11vh, 160px) var(--gutter) clamp(64px, 10vh, 100px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ds-eyebrow {
          margin: 0;
          background: linear-gradient(90deg, #1D976C, #93F9B9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.16;
          letter-spacing: 0.009em;
          text-align: center;
        }
        .ds-title {
          margin: clamp(10px, 1.4vw, 16px) 0 0;
          color: #f5f5f7;
          font-size: clamp(32px, 5.2vw, 76px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.015em;
          text-align: center;
          text-wrap: balance;
        }
        .ds-copy {
          margin: clamp(18px, 2vw, 28px) 0 0;
          max-width: 1080px;
          color: #86868b;
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 600;
          line-height: 1.36;
          letter-spacing: 0.011em;
          text-align: center;
          text-wrap: balance;
        }
        .ds-media {
          margin-top: clamp(44px, 5.2vw, 80px);
          width: min(1048px, 100%);
        }
        /* Distinct scale + fade reveal for the product render (overrides the
           generic fade-up) when this element scrolls into view. */
        .ds-media[data-reveal] {
          opacity: 0;
          transform: translateY(36px) scale(1.06);
          transform-origin: center top;
        }
        .ds-media[data-reveal].is-revealed {
          animation: dsMediaIn 1200ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(var(--ri, 0) * 90ms);
        }
        @keyframes dsMediaIn {
          from { opacity: 0; transform: translateY(36px) scale(1.06); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ds-media[data-reveal] { opacity: 1; transform: none; }
          .ds-media[data-reveal].is-revealed { animation: none; }
        }
        /* two feature blocks (title + divider + paragraph), like the Benchmark grid */
        .ds-cols {
          width: 100%;
          max-width: 840px;
          margin: clamp(48px, 6vw, 80px) auto 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(24px, 3vw, 48px);
          text-align: left;
        }
        .ds-col-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(19px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.38;
          letter-spacing: 0.011em;
        }
        .ds-col-body {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 0.8px solid #424245;
        }
        .ds-col-desc {
          margin: 0;
          color: #86868b;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.47;
          letter-spacing: -0.022em;
        }
        .ds-col-desc b { color: #f5f5f7; font-weight: 600; }
        .ds-col-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 16px;
          color: #2997ff;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.47;
          letter-spacing: -0.022em;
          text-decoration: none;
        }
        .ds-col-link:hover { text-decoration: underline; }
        .ds-col-link span { transition: transform 200ms ease; }
        .ds-col-link:hover span { transform: translateX(3px); }
        @media (max-width: 720px) {
          .ds-cols { grid-template-columns: 1fr; gap: 36px; }
        }
        .ds-media img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: clamp(16px, 2vw, 28px);
        }
        .ds-cta {
          position: sticky;
          bottom: clamp(20px, 4vh, 40px);
          z-index: 5;
          margin-top: clamp(72px, 11vw, 160px);
          display: inline-flex;
          align-items: center;
          gap: clamp(24px, 3vw, 48px);
          height: 56px;
          padding: 0 10px 0 24px;
          border-radius: 28px;
          background: rgba(42, 42, 45, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          text-decoration: none;
          transition: background 200ms ease;
        }
        .ds-cta:hover { background: rgba(60, 60, 64, 0.82); }
        .ds-cta-label {
          color: #f5f5f7;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.24;
          letter-spacing: -0.022em;
          white-space: nowrap;
        }
        .ds-cta-icon {
          flex: none;
          width: 36px;
          height: 36px;
          border-radius: 50px;
          background: #0071e3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: background 200ms ease;
        }
        .ds-cta:hover .ds-cta-icon { background: #0077ed; }
        .ds-cta-icon svg { width: 16px; height: 16px; }

      `}</style>

      <p className="ds-eyebrow" data-reveal>{eyebrow}</p>

      <h2 className="ds-title" data-reveal style={{ ["--ri" as string]: 1 }}>
        {title ?? (
          <>
            Unibody enclosure.
            <br />
            Makes a strong case for itself.
          </>
        )}
      </h2>

      <p className="ds-copy" data-reveal style={{ ["--ri" as string]: 2 }}>
        {copy ?? (
          <>
            Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from the
            inside out to be the most powerful iPhone models ever made. At the core
            of the new design is a heat-forged aluminum unibody enclosure that
            maximizes performance, battery capacity, and durability.
          </>
        )}
      </p>

      <div className="ds-media" data-reveal style={{ ["--ri" as string]: 3 }}>
        <img loading="lazy"
          src="/paf.jpg"
          alt="Exploded view of the PureAir shell and internal stack"
        />
      </div>

      {cols && cols.length > 0 ? (
        <div className="ds-cols">
          {cols.map((c, i) => (
            <div
              className="ds-col"
              key={i}
              data-reveal
              style={{ ["--ri" as string]: 4 + i }}
            >
              <h3 className="ds-col-title">{c.title}</h3>
              <div className="ds-col-body">
                <p className="ds-col-desc">{c.desc}</p>
                {c.cta ? (
                  <a className="ds-col-link" href={c.cta.href ?? "#"}>
                    {c.cta.label}
                    <span aria-hidden>→</span>
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <a className="ds-cta reveal-bubble" href="#design" data-reveal>
        <span className="ds-cta-label">Compare PureAir Design</span>
        <span className="ds-cta-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </a>
    </section>
  );
}
