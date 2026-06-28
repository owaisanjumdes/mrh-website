// "Made In India" banner — Figma node 681:4539.
// Infinite horizontal marquee on the brand-green strip, cycling three phrases
// separated by the Make-in-India emblem.

const PHRASES = [
  "Manufactured in India",
  "Designed for Indian Air",
  "Engineered in Germany",
];

// 12 is a multiple of the 3-phrase cycle, so the pattern tiles exactly — and the
// half is wide enough to exceed any viewport, so duplicating it makes the -50%
// loop seamless.
const HALF = Array.from({ length: 12 }, (_, i) => PHRASES[i % PHRASES.length]);
const TRACK = [...HALF, ...HALF];

export default function MadeInIndiaStrip() {
  return (
    <section
      aria-label="Manufactured in India · Designed for Indian Air · Engineered in Germany"
      style={{ background: "#148042", overflow: "hidden" }}
    >
      <style>{`
        .mii-track {
          display: flex;
          align-items: center;
          width: max-content;
          padding-block: clamp(16px, 2.4vw, 32px);
          animation: mii-scroll 40s linear infinite;
          will-change: transform;
        }
        .mii-track:hover { animation-play-state: paused; }
        @keyframes mii-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .mii-seg {
          display: flex;
          align-items: center;
          gap: clamp(20px, 2.4vw, 32px);
          padding-right: clamp(20px, 2.4vw, 32px);
          flex: none;
        }
        .mii-text {
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(20px, 2.6vw, 34px);
          line-height: 1.12;
          letter-spacing: -0.6px;
          white-space: nowrap;
          color: #ffffff;
        }
        .mii-logo {
          height: clamp(22px, 2.4vw, 30px);
          width: auto;
          display: block;
        }
        @media (prefers-reduced-motion: reduce) {
          .mii-track { animation: none; }
        }
      `}</style>

      <div className="mii-track" aria-hidden>
        {TRACK.map((text, i) => (
          <div className="mii-seg" key={i}>
            <span className="mii-text">{text}</span>
            <img loading="lazy" src="/make-in-india.png" alt="" className="mii-logo" />
          </div>
        ))}
      </div>
    </section>
  );
}
