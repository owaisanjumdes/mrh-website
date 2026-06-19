// Impact hero — light gradient top with a blue misty glow carrying the headline
// "Products that are backed by data.", over a full-bleed forest photo with white
// overlay copy and a green-highlighted line.

export default function ImpactHero() {
  return (
    <section className="ie" aria-label="Products that are backed by data">
      <style>{`
        .ie {
          --gutter: clamp(20px, 6vw, 126px);
          --ie-nav: clamp(64px, 7vw, 130px);
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }

        /* ---- Top: headline — fills the hero viewport ---- */
        .ie-top {
          position: relative;
          z-index: 2;
          min-height: calc(100svh - var(--ie-nav));
          padding: clamp(60px, 8vw, 120px) var(--gutter);
          background: linear-gradient(180deg, #f4f4f6 0%, #e6edef 50%, #ece9e3 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        /* blue misty glow behind the headline */
        .ie-glow {
          position: absolute;
          left: 50%;
          top: 46%;
          transform: translate(-50%, -50%);
          width: min(1120px, 92vw);
          height: clamp(360px, 48vw, 640px);
          background: radial-gradient(ellipse at center,
            rgba(96, 156, 200, 0.55) 0%,
            rgba(140, 186, 216, 0.40) 32%,
            rgba(180, 206, 226, 0.18) 56%,
            rgba(255, 255, 255, 0) 76%);
          filter: blur(70px);
          z-index: 0;
          pointer-events: none;
        }
        .ie-top-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ie-headline {
          margin: 0;
          max-width: 16ch;
          color: #1d1d1f;
          font-size: clamp(40px, 7vw, 96px);
          font-weight: 500;
          line-height: 1.06;
          letter-spacing: -0.02em;
        }

        /* ---- Forest photo with overlay copy ---- */
        .ie-forest {
          position: relative;
          z-index: 1;
          width: 100%;
          height: clamp(520px, 50vw, 728px);
        }
        .ie-forest-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        /* darken the upper area so the white overlay copy stays legible */
        .ie-forest-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.45) 38%,
            rgba(0, 0, 0, 0.18) 64%,
            rgba(0, 0, 0, 0) 86%);
          pointer-events: none;
        }
        .ie-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          padding: 0 var(--gutter);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .ie-stat {
          margin: 0;
          color: #ffffff;
          font-weight: 500;
          letter-spacing: -0.003em;
        }
        .ie-stat-up { font-size: clamp(30px, 4.4vw, 48px); line-height: 1.08; }
        .ie-stat-down {
          display: block;
          margin-top: clamp(2px, 0.4vw, 6px);
          font-size: clamp(22px, 3.2vw, 34px);
          line-height: 1.08;
        }
        .ie-body {
          margin: clamp(18px, 2vw, 26px) auto 0;
          max-width: 718px;
          color: #ffffff;
          font-size: clamp(16px, 1.6vw, 21px);
          font-weight: 600;
          line-height: 1.38;
          letter-spacing: 0.006em;
        }
        .ie-caption {
          position: absolute;
          right: var(--gutter);
          bottom: clamp(20px, 3vw, 40px);
          z-index: 3;
          margin: 0;
          color: #d2d2d7;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
      `}</style>

      <div className="ie-top">
        <div className="ie-glow" aria-hidden />
        <div className="ie-top-content">
          <h1 className="ie-headline" data-reveal>
            Products that are backed by data
          </h1>
        </div>
      </div>

      <div className="ie-forest">
        <img
          className="ie-forest-img"
          src="/impacthero.jpg"
          alt="Our planet — the landscape MRH works to keep breathable"
        />
        <div className="ie-forest-scrim" aria-hidden />
        <div className="ie-overlay">
          <p className="ie-stat" data-reveal>
            <span className="ie-stat-up">Tested in the open.</span>
            <span className="ie-stat-down">Not on paper.</span>
          </p>
          <p className="ie-body" data-reveal style={{ ["--ri" as string]: 1 }}>
            60+ days of field evaluation at IIT Delhi, through Diwali, Dussehra, and
            live classroom activity — PureAir reduced AQI from severe to good within
            3–6 hours, while competitors offer no public test reports.
          </p>
        </div>
      </div>
    </section>
  );
}
