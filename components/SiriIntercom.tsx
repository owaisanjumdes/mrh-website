// "Siri, tell everyone, Dinner is ready" — Figma node 755:6839.
// Centered gradient + white heading above an isometric floor-plan image.
// Copy kept verbatim from the design.

const PLAN_IMG =
  "/siri-floorplan.png";

export default function SiriIntercom() {
  return (
    <section className="si" aria-label="Siri, tell everyone, Dinner is ready">
      <style>{`
        .si {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(80px, 12vh, 125px) clamp(20px, 6vw, 88px) clamp(60px, 9vh, 100px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .si-text { max-width: 760px; }
        .si-siri {
          margin: 0;
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 600;
          line-height: 1.125;
          background: linear-gradient(90deg, rgb(116,198,251) 0%, rgb(96,209,241) 45%, rgb(41,151,255) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .si-line {
          margin: clamp(8px, 1.4vw, 14px) 0 0;
          color: #f5f5f7;
          font-size: clamp(30px, 4.8vw, 48px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.003em;
        }
        .si-plan {
          display: block;
          width: min(700px, 100%);
          height: auto;
          margin: clamp(32px, 5vw, 72px) auto 0;
        }
      `}</style>

      <div className="si-text" data-reveal>
        <p className="si-siri">Air Simulation Technology</p>
        <p className="si-line">
          tell everyone,
          <br />
          Dinner is ready
        </p>
      </div>

      <img
        className="si-plan"
        src={PLAN_IMG}
        alt="Various Siri commands written over a home's floor plan"
        data-reveal
        style={{ ["--ri" as string]: 1 }}
      />
    </section>
  );
}
