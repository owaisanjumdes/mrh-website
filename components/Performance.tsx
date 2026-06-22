// "Intelligent Space Planning" — blue-gradient eyebrow + headline, the air
// simulation video, a supporting paragraph, and a link to the technology page.

import Link from "next/link";

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
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
          background: linear-gradient(180deg, #6cb8ff 0%, #2b8fff 52%, #0a84ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .pf-title {
          margin: clamp(10px, 1.4vw, 16px) 0 0;
          color: #f5f5f7;
          font-size: clamp(28px, 4.8vw, 58px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.015em;
          text-wrap: balance;
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
        .pf-foot {
          max-width: 1260px;
          margin: clamp(36px, 5vw, 64px) auto 0;
          text-align: center;
        }
        .pf-foot .pf-copy { margin-top: 0; }
        .pf-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: clamp(18px, 2vw, 28px);
          color: #2997ff;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .pf-link:hover { color: #4aa8ff; }
        .pf-link span { display: inline-block; transition: transform 200ms ease; }
        .pf-link:hover span { transform: translateX(3px); }

        .pf-media {
          max-width: 1200px;
          margin: clamp(56px, 8vw, 120px) auto 0;
          padding: 0 clamp(20px, 6vw, 88px);
        }
        .pf-media img,
        .pf-media video {
          display: block;
          width: 100%;
          height: auto;
          border-radius: clamp(12px, 1.4vw, 22px);
        }

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
        <p className="pf-eyebrow" data-reveal>Intelligent Space Planning</p>
        <h2 className="pf-title" data-reveal style={{ ["--ri" as string]: 1 }}>
          We don&rsquo;t guess where clean air goes.
          <br />
          We simulate it.
        </h2>
      </div>

      <div className="pf-media" data-reveal>
        <video
          src="/classroom-air-simulation.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Air simulation showing how fast one unit clears a classroom"
        />
      </div>

      <div className="pf-foot">
        <p className="pf-copy" data-reveal>
          Before a single unit is installed,{" "}
          <b>
            our simulation engine maps your space and shows exactly how fast it
            reaches clean air
          </b>
          , and where every purifier should sit. In a real classroom test, one
          unit took the air from 100 µg/m³ to zero in 30 minutes. The simulation
          called the placement.
        </p>
        <Link className="pf-link" href="/technology" data-reveal>
          Discover Simulation <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
