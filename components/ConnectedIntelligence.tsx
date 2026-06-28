// "Connected Intelligence — See the air. Control the unit. Skip the maintenance."
// Dark-mode adaptation of the home page bento grid, for the Technology page.
// Blue-gradient eyebrow to match the other Technology-page eyebrows.
export default function ConnectedIntelligence() {
  return (
    <section className="ci" aria-label="Connected Intelligence">
      <style>{`
        .ci {
          --gutter: clamp(20px, 6vw, 88px);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 11vh, 150px) 0;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          text-align: center;
        }
        .ci-wrap { max-width: 1260px; margin: 0 auto; padding: 0 var(--gutter); }
        .ci-eyebrow {
          margin: 0 0 clamp(10px, 1.4vw, 16px);
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          letter-spacing: 0.01em;
          background: linear-gradient(90deg, rgb(116,198,251) 0%, rgb(96,209,241) 45%, rgb(41,151,255) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .ci-title {
          margin: 0 auto;
          max-width: 18ch;
          color: #f5f5f7;
          font-size: clamp(32px, 5.2vw, 76px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.02em;
        }
        .ci-sub {
          margin: clamp(18px, 2vw, 28px) auto 0;
          max-width: 52ch;
          color: #86868b;
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 500;
          line-height: 1.45;
        }
        .ci-bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 1.6vw, 22px);
          margin-top: clamp(36px, 4vw, 60px);
          text-align: left;
        }
        .ci-card {
          background: #1d1d1f;
          border-radius: 22px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: clamp(380px, 42vw, 560px);
        }
        .ci-card.span2 { grid-column: 1 / -1; }
        .ci-card.split { display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; min-height: clamp(260px, 28vw, 340px); }
        .ci-card.split .ci-text { align-self: center; }
        .ci-text { padding: clamp(28px, 3vw, 44px); }
        .ci-label { margin: 0 0 10px; font-size: clamp(15px, 1.4vw, 18px); font-weight: 600; background: linear-gradient(90deg, rgb(116,198,251) 0%, rgb(96,209,241) 45%, rgb(41,151,255) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; width: fit-content; }
        .ci-body { margin: 0; font-size: clamp(17px, 1.7vw, 22px); font-weight: 500; line-height: 1.3; letter-spacing: -0.01em; color: #f5f5f7; max-width: 36ch; }
        .ci-media { position: relative; flex: 1; min-height: clamp(180px, 20vw, 260px); }
        .ci-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
        @media (max-width: 860px) {
          .ci-bento { grid-template-columns: 1fr; }
          .ci-card { min-height: clamp(320px, 70vw, 460px); }
          .ci-card.split { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ci-wrap">
        <p className="ci-eyebrow" data-reveal>Connected Intelligence</p>
        <h2 className="ci-title" data-reveal style={{ ["--ri" as string]: 1 }}>
          See the air.<br />Control the unit.<br />Skip the maintenance.
        </h2>
        <p className="ci-sub" data-reveal style={{ ["--ri" as string]: 2 }}>
          Every unit online, every reading in one place.
        </p>

        <div className="ci-bento">
          <article className="ci-card" data-reveal style={{ ["--ri" as string]: 0 }}>
            <div className="ci-text">
              <p className="ci-label">Live AQI, everywhere</p>
              <p className="ci-body">Watch your air quality update in real time. PM2.5, PM10, and AQI for every unit, on one screen, from anywhere.</p>
            </div>
            <div className="ci-media"><img loading="lazy" src="/liveaqi.jpg" alt="Live AQI, everywhere" /></div>
          </article>

          <article className="ci-card" data-reveal style={{ ["--ri" as string]: 1 }}>
            <div className="ci-text">
              <p className="ci-label">Every unit, one dashboard</p>
              <p className="ci-body">See all your purifiers in a single view. One room or two hundred, every reading sits in the same place.</p>
            </div>
            <div className="ci-media"><img loading="lazy" src="/timings.jpg" alt="Every unit, one dashboard" style={{ objectPosition: "center 35%" }} /></div>
          </article>

          <article className="ci-card span2 split" data-reveal style={{ ["--ri" as string]: 2 }}>
            <div className="ci-media"><img loading="lazy" src="/Icon.jpg" alt="Control from your phone" style={{ objectPosition: "center 22%" }} /></div>
            <div className="ci-text">
              <p className="ci-label">Control from your phone</p>
              <p className="ci-body">Set fan speed, modes, and schedules without leaving your desk. Full control of every unit, wherever you are.</p>
            </div>
          </article>

          <article className="ci-card" data-reveal style={{ ["--ri" as string]: 3 }}>
            <div className="ci-media"><img loading="lazy" src="/fhm.jpg" alt="Filter health, tracked" /></div>
            <div className="ci-text">
              <p className="ci-label">Filter health, tracked</p>
              <p className="ci-body">Know exactly how much life each filter has left. No more guesswork, no more checking units by hand.</p>
            </div>
          </article>

          <article className="ci-card" data-reveal style={{ ["--ri" as string]: 4 }}>
            <div className="ci-media"><img loading="lazy" src="/sow.jpg" alt="Service on wheels" /></div>
            <div className="ci-text">
              <p className="ci-label">Service on wheels</p>
              <p className="ci-body">When a filter nears the end, the unit tells us first. Service is scheduled before you ever notice a drop.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
