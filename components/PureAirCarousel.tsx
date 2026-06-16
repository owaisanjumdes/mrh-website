// "PURE · AIR" testimonial/showcase — Figma node ~665:2873.
// Staggered oversized backdrop wordmark, a tilted card stack (orange + white +
// photo), and green circular nav controls. Photo left as a placeholder for now.

const UNIT = "PURE · AIR · ";
// One group, repeated enough to exceed any viewport width so the rows never
// reveal empty space mid-scroll. Two groups per row → seamless -50% loop.
const GROUP = UNIT.repeat(6);
// Per-row scroll speeds (seconds). Even rows scroll left, odd rows scroll right.
const ROW_DURATIONS = [64, 52, 76, 58, 68];

export default function PureAirCarousel() {
  return (
    <section className="pa2-section" aria-label="PURE · AIR">
      <style>{`
        .pa2-section {
          position: relative;
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          overflow: hidden;
          padding-block: clamp(48px, 7vh, 96px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .pa2-backdrop {
          position: relative;
          z-index: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(4px, 0.6vw, 12px);
        }
        .pa2-row {
          flex: none;
          margin: 0;
          width: max-content;
          white-space: nowrap;
          font-size: clamp(72px, 15vw, 220px);
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #000000;
          animation: pa2-marquee-left 32s linear infinite;
          will-change: transform;
        }
        .pa2-row--right { animation-name: pa2-marquee-right; }
        @keyframes pa2-marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pa2-marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pa2-row { animation: none; transform: none; }
        }
        .pa2-stack {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: clamp(240px, 30vw, 420px);
          aspect-ratio: 426 / 561;
        }
        .pa2-card {
          position: absolute;
          inset: 0;
          border-radius: 0;
        }
        /* Back white card — pokes out bottom-left. */
        .pa2-card--white-b {
          background: #ffffff;
          transform: translate(-2.5%, 5%) rotate(2deg);
          box-shadow: 0 18px 44px -22px rgba(0, 0, 0, 0.28);
          z-index: 1;
        }
        /* Accent (green) card — subtle peek at top and right. */
        .pa2-card--accent {
          background: #148042;
          transform: translate(4%, -2.5%) rotate(-3deg);
          z-index: 2;
        }
        /* Front white card — pokes out right and bottom-right. */
        .pa2-card--white-a {
          background: #ffffff;
          transform: translate(3.5%, 3%) rotate(2.5deg);
          box-shadow: 0 18px 44px -22px rgba(0, 0, 0, 0.28);
          z-index: 3;
        }
        .pa2-card--photo {
          background: #e7e7e7;
          transform: rotate(1.5deg);
          box-shadow: 0 30px 64px -26px rgba(0, 0, 0, 0.4);
          z-index: 4;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bdbdbd;
        }
        .pa2-ph-icon { width: 22%; height: auto; }
        .pa2-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: clamp(52px, 6vw, 94px);
          height: clamp(52px, 6vw, 94px);
          border-radius: 9999px;
          background: #148042;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
          z-index: 4;
          transition: transform 200ms ease, background 200ms ease;
        }
        .pa2-nav:hover { background: #0f6a36; transform: translateY(-50%) scale(1.06); }
        .pa2-nav--left { left: clamp(16px, 7%, 104px); }
        .pa2-nav--right { right: clamp(16px, 7%, 104px); }
        .pa2-arrow { width: clamp(20px, 2.2vw, 30px); height: auto; }
      `}</style>

      {/* Backdrop wordmark — staggered rows that bleed off both edges */}
      <div className="pa2-backdrop" aria-hidden>
        {ROW_DURATIONS.map((dur, i) => (
          <p
            className={`pa2-row ${i % 2 === 1 ? "pa2-row--right" : ""}`}
            key={i}
            style={{ animationDuration: `${dur}s` }}
          >
            <span>{GROUP}</span>
            <span>{GROUP}</span>
          </p>
        ))}
      </div>

      {/* Card stack — photo left as a placeholder */}
      <div className="pa2-stack">
        <div className="pa2-card pa2-card--white-b" aria-hidden />
        <div className="pa2-card pa2-card--accent" aria-hidden />
        <div className="pa2-card pa2-card--white-a" aria-hidden />
        <div className="pa2-card pa2-card--photo">
          <svg
            className="pa2-ph-icon"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden
          >
            <rect
              x="6"
              y="9"
              width="36"
              height="30"
              rx="3"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <circle cx="17" cy="19" r="3.5" fill="currentColor" />
            <path
              d="M9 35l10-10 7 7 6-6 7 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Nav controls */}
      <button type="button" className="pa2-nav pa2-nav--left" aria-label="Previous">
        <svg className="pa2-arrow" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M19 12H5M11 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button type="button" className="pa2-nav pa2-nav--right" aria-label="Next">
        <svg className="pa2-arrow" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
