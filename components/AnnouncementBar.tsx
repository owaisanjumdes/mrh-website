// Thin scrolling announcement strip shown above the nav on the home page only.
// The message is duplicated so the track can loop seamlessly by translating -50%.

const MESSAGE =
  "MRH, exclusive partners of MANN+HUMMEL, global leaders in filtration technology with over 85 years of expertise. Every solution is validated by IIT Delhi. Now proudly manufactured in India.";

export default function AnnouncementBar() {
  return (
    <div className="mrh-ann" role="region" aria-label="Announcement">
      <style>{`
        .mrh-ann {
          background: #2a2a2a;
          color: rgba(255, 255, 255, 0.82);
          overflow: hidden;
          white-space: nowrap;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          font-size: clamp(11px, 1.05vw, 13px);
          font-weight: 400;
          letter-spacing: 0.01em;
          line-height: 1;
        }
        .mrh-ann-track {
          display: inline-flex;
          width: max-content;
          animation: mrhAnnScroll 38s linear infinite;
        }
        .mrh-ann:hover .mrh-ann-track { animation-play-state: paused; }
        .mrh-ann-item {
          display: inline-flex;
          align-items: center;
          padding: 7px 0;
        }
        .mrh-ann-sep {
          margin: 0 2.4em;
          color: rgba(255, 255, 255, 0.4);
        }
        @keyframes mrhAnnScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mrh-ann-track { animation: none; }
          .mrh-ann { text-align: center; text-overflow: ellipsis; }
        }
      `}</style>
      <div className="mrh-ann-track">
        <span className="mrh-ann-item">
          {MESSAGE}
          <span className="mrh-ann-sep" aria-hidden>
            •
          </span>
        </span>
        <span className="mrh-ann-item" aria-hidden>
          {MESSAGE}
          <span className="mrh-ann-sep">•</span>
        </span>
      </div>
    </div>
  );
}
