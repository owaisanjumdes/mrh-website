import { Building2, House, TriangleAlert, TrendingDown } from "lucide-react";

// "Air pollution reaches every space" — Apple-style 2x2 bento of four equal gray
// cards. Each card has a relevant icon (light-red Apple gradient stroke) above a
// bold-lead statement.

export default function IoTMonitoring() {
  return (
    <section className="iot" aria-label="Air pollution reaches every space">
      <style>{`
        .iot {
          --gutter: clamp(20px, 6vw, 88px);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 12vh, 160px) 0 clamp(72px, 12vh, 160px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .iot-head {
          max-width: 920px;
          margin: 0 auto clamp(40px, 5vw, 72px);
          padding: 0 var(--gutter);
          text-align: center;
        }
        .iot-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(26px, 3.8vw, 46px);
          font-weight: 600;
          line-height: 1.12;
          letter-spacing: -0.025em;
          text-wrap: balance;
        }

        .iot-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 var(--gutter);
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: clamp(14px, 1.6vw, 22px);
        }
        .iot-card {
          border-radius: clamp(20px, 2vw, 28px);
          background: #1d1d1f;
          padding: clamp(26px, 3vw, 44px);
          min-height: clamp(220px, 30vh, 320px);
          display: flex;
          flex-direction: column;
        }
        .iot-body {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 1.8vw, 22px);
        }
        .iot-ico {
          width: clamp(32px, 3.4vw, 42px);
          height: auto;
          /* light-red Apple gradient stroke (def below) */
          stroke: url(#iot-grad);
        }
        .iot-text {
          margin: 0;
          max-width: 40ch;
          color: rgba(245, 245, 247, 0.74);
          font-size: clamp(16px, 1.7vw, 21px);
          font-weight: 500;
          line-height: 1.32;
          letter-spacing: -0.005em;
        }
        .iot-text b { color: #ffffff; font-weight: 600; }

        @media (max-width: 760px) {
          .iot-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
          .iot-card { min-height: clamp(180px, 30vh, 260px); }
        }
      `}</style>

      {/* shared gradient for all icon strokes */}
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <linearGradient
            id="iot-grad"
            gradientUnits="userSpaceOnUse"
            x1="12"
            y1="0"
            x2="12"
            y2="24"
          >
            <stop offset="0%" stopColor="#ff9e8d" />
            <stop offset="100%" stopColor="#ff5a5f" />
          </linearGradient>
        </defs>
      </svg>

      <div className="iot-head" data-reveal>
        <h2 className="iot-title">
          Air pollution isn&rsquo;t just an indoor problem anymore. Every space is
          contaminated.
        </h2>
      </div>

      <div className="iot-grid">
        <article className="iot-card" data-reveal>
          <div className="iot-body">
            <Building2 className="iot-ico" strokeWidth={1.8} aria-hidden />
            <p className="iot-text">
              <b>No space is safe.</b> PM2.5, PM10, VOCs, and industrial emissions
              reach offices, schools, malls, hospitals, and public spaces alike.
            </p>
          </div>
        </article>

        <article className="iot-card" data-reveal style={{ ["--ri" as string]: 1 }}>
          <div className="iot-body">
            <TrendingDown className="iot-ico" strokeWidth={1.8} aria-hidden />
            <p className="iot-text">
              <b>It costs more than comfort.</b> Lower productivity, weaker
              learning, higher absenteeism, and lasting harm to developing lungs.
            </p>
          </div>
        </article>

        <article className="iot-card" data-reveal style={{ ["--ri" as string]: 2 }}>
          <div className="iot-body">
            <TriangleAlert className="iot-ico" strokeWidth={1.8} aria-hidden />
            <p className="iot-text">
              <b>Open spaces have no answer.</b> Corridors, balconies, playgrounds,
              and markets have had zero real purification. Until now.
            </p>
          </div>
        </article>

        <article className="iot-card" data-reveal style={{ ["--ri" as string]: 3 }}>
          <div className="iot-body">
            <House className="iot-ico" strokeWidth={1.8} aria-hidden />
            <p className="iot-text">
              <b>Indoors can be worse.</b> Trapped by poor ventilation, indoor air
              often runs 3 to 5 times dirtier than the air outside.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
