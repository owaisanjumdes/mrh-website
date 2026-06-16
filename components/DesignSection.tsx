// "Design" section — Figma node 707:3631.
// Black canvas, orange eyebrow, large two-line headline, gray paragraph, a big
// centered product render, and a glass pill CTA with a blue "+". The pill sticks
// to the bottom of this section and pops up when scrolled into view.
// Copy kept verbatim from the Figma design.

export default function DesignSection() {
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
          color: #ff791b;
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
          max-width: 760px;
          color: #86868b;
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 600;
          line-height: 1.36;
          letter-spacing: 0.011em;
          text-align: center;
        }
        .ds-media {
          margin-top: clamp(40px, 5vw, 64px);
          width: min(1048px, 100%);
        }
        .ds-media img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
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

      <p className="ds-eyebrow" data-reveal>Design</p>

      <h2 className="ds-title" data-reveal style={{ ["--ri" as string]: 1 }}>
        Unibody enclosure.
        <br />
        Makes a strong case for itself.
      </h2>

      <p className="ds-copy" data-reveal style={{ ["--ri" as string]: 2 }}>
        Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from the inside
        out to be the most powerful iPhone models ever made. At the core of the new
        design is a heat-forged aluminum unibody enclosure that maximizes
        performance, battery capacity, and durability.
      </p>

      <div className="ds-media" data-reveal style={{ ["--ri" as string]: 3 }}>
        <img
          src="/design.png"
          alt="Exploded view of the PureAir shell and internal stack"
        />
      </div>

      <a className="ds-cta reveal-bubble" href="#design" data-reveal>
        <span className="ds-cta-label">Compare iPhone design</span>
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
