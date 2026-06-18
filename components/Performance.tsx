// "Performance — New dimensions in power." — Figma node 772:11025.
// Orange eyebrow + headline + paragraph, a full-bleed gaming shot, and a
// three-column spec grid. Copy kept verbatim from the Figma design.

const COLS = [
  {
    title: "A19 Pro chip",
    desc: (
      <>
        The Apple silicon powering iPhone 17 Pro delivers the highest iPhone
        performance ever, ideal for advanced gaming and the most demanding tasks.
      </>
    ),
  },
  {
    title: "Graphics and speed",
    desc: (
      <>
        Paired with an innovative thermal design, the GPU and CPU deliver up to{" "}
        <b>40 percent better</b> sustained performance.
      </>
    ),
  },
  {
    title: "Neural Accelerators",
    desc: (
      <>
        With Neural Accelerators integrated into each GPU core, iPhone 17 Pro is
        more powerful than ever when working with local AI models.
      </>
    ),
  },
];

export default function Performance() {
  return (
    <section className="pf" aria-label="Performance">
      <style>{`
        .pf {
          --gutter: clamp(20px, 6vw, 88px);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(96px, 14vh, 170px) var(--gutter) clamp(96px, 14vh, 170px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .pf-head { max-width: 1260px; margin: 0 auto; text-align: center; }
        .pf-eyebrow {
          margin: 0;
          color: #ff791b;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
        }
        .pf-title {
          margin: clamp(10px, 1.4vw, 16px) 0 0;
          color: #f5f5f7;
          font-size: clamp(40px, 6.4vw, 80px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.015em;
        }
        .pf-copy {
          margin: clamp(18px, 2vw, 24px) auto 0;
          max-width: 840px;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.38;
          letter-spacing: 0.011em;
        }
        .pf-copy b { color: #f5f5f7; font-weight: 600; }

        .pf-media {
          max-width: 1512px;
          margin: clamp(56px, 8vw, 120px) auto 0;
        }
        .pf-media img { display: block; width: 100%; height: auto; }

        .pf-grid {
          max-width: 1260px;
          margin: clamp(56px, 8vw, 120px) auto 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(24px, 2.7vw, 34px);
        }
        .pf-col-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(19px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.38;
          letter-spacing: 0.011em;
        }
        .pf-col-body {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 0.8px solid #424245;
        }
        .pf-col-desc {
          margin: 0;
          color: #86868b;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.47;
          letter-spacing: -0.022em;
        }
        .pf-col-desc b { color: #f5f5f7; font-weight: 600; }

        @media (max-width: 720px) {
          .pf-grid { grid-template-columns: 1fr; gap: 36px; }
        }
      `}</style>

      <div className="pf-head">
        <p className="pf-eyebrow" data-reveal>Benchmark</p>
        <h2 className="pf-title" data-reveal style={{ ["--ri" as string]: 1 }}>
          New dimensions
          <br />
          in power.
        </h2>
        <p className="pf-copy" data-reveal style={{ ["--ri" as string]: 2 }}>
          Whether you’re working with intensive graphics or massive media files,
          iPhone 17 Pro offers blazing-fast performance — with advanced cooling
          technology. An Apple-designed laser-welded vapor chamber works with the
          aluminum unibody structure to efficiently move heat away from the A19 Pro
          chip, allowing for even <b>higher sustained performance</b>. This
          breakthrough in thermal management is key to the most powerful iPhone ever
          created.
        </p>
      </div>

      <div className="pf-media" data-reveal>
        <img
          src="/perf-game.jpg"
          alt="iPhone 17 Pro running Arknights: Endfield, demonstrating the A19 Pro chip"
        />
      </div>

      <div className="pf-grid">
        {COLS.map((c, i) => (
          <div className="pf-col" key={c.title} data-reveal style={{ ["--ri" as string]: i }}>
            <h3 className="pf-col-title">{c.title}</h3>
            <div className="pf-col-body">
              <p className="pf-col-desc">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
