import CountUp from "@/components/CountUp";
import FadeInOnView from "@/components/FadeInOnView";

// "Backed by Two Legacies" — Figma node 665:2826 (Frame 353).
// Two-column comparison: OK Play + MRH (India) vs MANN+HUMMEL (Germany).

const INTRO =
  "Two companies. One product. OK Play brings three decades of Indian manufacturing at scale. MANN+HUMMEL brings eighty years of German filtration. PureAir and AirFINEry are where the two meet — German engineering, made and maintained on the ground in India.";

const OKPLAY_DESC =
  "OK Play is a publicly listed Indian manufacturer with over three decades of building products at scale. The factories, the supply chain, the service network — all here, all ours. When you buy MRH, you’re buying a company you can look up.";

const MANN_DESC =
  "MANN+HUMMEL has set the global standard in filtration since 1941. The same German technology used in industry, automotive, and healthcare worldwide now filters the air in your building.";

export default function TwoLegacies() {
  return (
    <section
      style={{
        background: "#ffffff",
        padding: "clamp(72px, 11vh, 144px) 0",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <style>{`
        .legacy-inner {
          /* Same gutter as the nav and hero text so both edges line up. */
          padding: 0 clamp(20px, 8.85%, 127px);
        }
        .legacy-head {
          display: grid;
          /* Match the body grid so the intro aligns over "80+ Years" and the
             title over "30+ Years". */
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: start;
        }
        .legacy-title {
          margin: 0;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--ink);
        }
        .legacy-intro {
          margin: 0;
          max-width: 677px;
          font-size: clamp(15px, 1.35vw, 18px);
          line-height: 1.5;
          color: var(--ink);
        }
        .legacy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 5vw, 80px);
          margin-top: clamp(88px, 12vh, 168px);
        }
        .legacy-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .legacy-logos {
          display: flex;
          align-items: center;
          gap: clamp(16px, 1.6vw, 24px);
          height: clamp(44px, 5vw, 70px);
          margin-bottom: clamp(20px, 2.6vw, 34px);
        }
        .legacy-logo-lg {
          height: clamp(40px, 4.6vw, 64px);
          width: auto;
          object-fit: contain;
          display: block;
        }
        .legacy-logo-sm {
          height: clamp(24px, 2.7vw, 38px);
          width: auto;
          object-fit: contain;
          display: block;
        }
        .legacy-div {
          width: 1px;
          height: clamp(34px, 4vw, 56px);
          background: var(--border-paper);
          flex: none;
        }
        .legacy-stat {
          margin: 0;
          font-size: clamp(52px, 9vw, 128px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--ink);
          white-space: nowrap;
        }
        .legacy-desc {
          margin: clamp(18px, 2.2vw, 28px) 0 0;
          max-width: 560px;
          font-size: clamp(14px, 1.25vw, 18px);
          line-height: 1.5;
          color: var(--ink-3);
        }
        @media (max-width: 820px) {
          .legacy-head {
            grid-template-columns: 1fr;
            gap: clamp(20px, 5vw, 32px);
          }
          .legacy-grid {
            grid-template-columns: 1fr;
            gap: clamp(48px, 9vw, 72px);
            margin-top: clamp(40px, 9vw, 72px);
          }
        }
      `}</style>

      <div className="legacy-inner">
        <div className="legacy-head">
          <h2 className="legacy-title">Backed by Two Legacies</h2>
          <p className="legacy-intro">{INTRO}</p>
        </div>

        <div className="legacy-grid">
          {/* India — OK Play + MRH */}
          <div className="legacy-col">
            <FadeInOnView className="legacy-logos">
              <img
                src="/Ok_Play_Logo.png"
                alt="OK Play"
                className="legacy-logo-lg"
              />
              <span className="legacy-div" aria-hidden />
              <img src="/MRH blacklogo.png" alt="MRH" className="legacy-logo-sm" />
            </FadeInOnView>
            <p className="legacy-stat">
              <CountUp end={30} />+ Years
            </p>
            <p className="legacy-desc">{OKPLAY_DESC}</p>
          </div>

          {/* Germany — MANN+HUMMEL */}
          <div className="legacy-col">
            <FadeInOnView className="legacy-logos" delayMs={150}>
              <img
                src="/MANN+HUMMEL_Logo.svg"
                alt="MANN+HUMMEL"
                className="legacy-logo-lg"
              />
            </FadeInOnView>
            <p className="legacy-stat">
              <CountUp end={80} />+ Years
            </p>
            <p className="legacy-desc">{MANN_DESC}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
