"use client";

import { useState, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";

// "18MP Center Stage front camera." — Figma node 707:4137.
// Black section: centered heading + paragraph, a phone mockup whose screen swaps
// with a 4-tab segmented control, and a caption below. Copy kept verbatim.

type Tab = {
  icon: string;
  l1: string;
  l2: string;
  screen: string;
};

const TABS: Tab[] = [
  { icon: "/cs-ic2.svg", l1: "One Unified", l2: "Dashboard", screen: "/app-timings.jpg" },
  { icon: "/tab-aqi.svg", l1: "Live AQI,", l2: "everywhere", screen: "/app-aqi.jpg" },
  { icon: "/tab-service.svg", l1: "Service on", l2: "Wheels", screen: "/app-serviceonwheels.jpg" },
  { icon: "/tab-filter.svg", l1: "Filter health,", l2: "tracked", screen: "/app-filterhealth.jpg" },
];

const BLOCKS = [
  {
    title: "See everything",
    desc: (
      <>
        Connect every unit and see it all in one place. One dashboard, whether
        it&rsquo;s one room or two hundred.
      </>
    ),
  },
  {
    title: "Control in real time",
    desc: (
      <>
        Live AQI, filter health, and fan speed, adjustable from your phone,
        wherever you are.
      </>
    ),
  },
  {
    title: "It services itself",
    desc: (
      <>
        Your purifier knows when it needs service and tells us before you notice.
        No checking, no guesswork, no maintenance you forgot about. We already
        know, and we&rsquo;re already on the way.
      </>
    ),
  },
];

export default function CenterStage({
  eyebrow,
  heading,
  body,
  showBlocks = false,
}: {
  eyebrow?: string;
  heading?: ReactNode;
  body?: ReactNode;
  showBlocks?: boolean;
} = {}) {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`cs ${inView ? "is-in" : ""}`}
      aria-label="18MP Center Stage front camera"
    >
      <style>{`
        .cs {
          --gutter: clamp(20px, 6vw, 88px);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(120px, 24vh, 240px) var(--gutter) clamp(96px, 14vh, 160px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cs-eyebrow {
          margin: 0 auto clamp(12px, 1.6vw, 20px);
          color: #ff791b;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
          text-align: center;
        }
        .cs-title {
          margin: 0;
          max-width: 1260px;
          color: #f5f5f7;
          font-size: clamp(32px, 4.4vw, 56px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.005em;
          text-align: center;
        }
        .cs-text {
          margin: clamp(16px, 1.6vw, 24px) auto 0;
          max-width: 840px;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.38;
          letter-spacing: 0.011em;
          text-align: center;
        }
        .cs-text b { color: #f5f5f7; font-weight: 600; }

        /* Phone mockup — screen behind a transparent bezel frame */
        .cs-phone {
          position: relative;
          width: min(322px, 78vw);
          aspect-ratio: 322 / 662;
          margin: clamp(44px, 6vw, 64px) auto 0;
        }
        .cs-screen {
          position: absolute;
          inset: 2% 4.4%;
          border-radius: clamp(26px, 12%, 44px);
          overflow: hidden;
          background: #000000;
        }
        .cs-screen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          animation: csFade 500ms ease;
        }
        @keyframes csFade { from { opacity: 0; } to { opacity: 1; } }
        .cs-bezel {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        /* Tab control */
        .cs-tabs {
          display: flex;
          gap: 0;
          margin-top: clamp(36px, 4vw, 42px);
          padding: 4px;
          background: #333336;
          border-radius: 20px;
          max-width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .cs-tabs::-webkit-scrollbar { display: none; }
        .cs-tab {
          flex: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          height: 84px;
          padding: 0 20px;
          border: none;
          border-radius: 16px;
          background: transparent;
          color: #f5f5f7;
          opacity: 0.8;
          cursor: pointer;
          font-family: inherit;
          transition: background 300ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms ease;
        }
        .cs-tab.is-active { background: #f5f5f7; color: #000000; opacity: 1; }
        .cs-tab-icon {
          width: 22px;
          height: 25px;
          background: currentColor;
          -webkit-mask: var(--ic) center / contain no-repeat;
          mask: var(--ic) center / contain no-repeat;
        }
        .cs-tab-label {
          font-size: 12px;
          font-weight: 600;
          line-height: 1.285;
          letter-spacing: -0.016em;
          text-align: center;
          white-space: nowrap;
        }

        .cs-caption {
          margin: clamp(40px, 5vw, 54px) auto 0;
          max-width: 630px;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.38;
          letter-spacing: 0.011em;
          text-align: center;
        }

        /* three feature blocks (title + divider + paragraph) */
        .cs-grid {
          max-width: 1260px;
          margin: clamp(48px, 6vw, 80px) auto 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(24px, 2.7vw, 34px);
          text-align: left;
        }
        .cs-col-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(19px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.38;
          letter-spacing: 0.011em;
        }
        .cs-col-body {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 0.8px solid #424245;
        }
        .cs-col-desc {
          margin: 0;
          color: #86868b;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.47;
          letter-spacing: -0.022em;
        }
        .cs-col-desc b { color: #f5f5f7; font-weight: 600; }
        @media (max-width: 720px) {
          .cs-grid { grid-template-columns: 1fr; gap: 36px; }
        }
      `}</style>

      {eyebrow ? (
        <p className="cs-eyebrow" data-reveal>
          {eyebrow}
        </p>
      ) : null}

      <h2 className="cs-title" data-reveal>
        {heading ?? (
          <>
            18MP Center Stage front camera.
            <br />
            It’s a total frame changer.
          </>
        )}
      </h2>

      <p className="cs-text" data-reveal style={{ ["--ri" as string]: 1 }}>
        {body ?? (
          <>
            The new front camera gives you flexible ways to frame your photos and
            videos — and so much more. Tap to expand the field of view and rotate
            from portrait to landscape <b>without moving your iPhone</b>. And when
            friends join the shot, the field of view expands so you get more
            friendsies in your selfies.
          </>
        )}
      </p>

      <div className="cs-phone" data-reveal style={{ ["--ri" as string]: 2 }}>
        <div className="cs-screen">
          <img key={active} src={TABS[active].screen} alt={`${TABS[active].l1} ${TABS[active].l2}`} />
        </div>
        <img className="cs-bezel" src="/cs-bezel.png" alt="" aria-hidden />
      </div>

      <div className="cs-tabs" role="tablist" data-reveal style={{ ["--ri" as string]: 3 }}>
        {TABS.map((t, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`cs-tab ${i === active ? "is-active" : ""}`}
            style={{ ["--ic" as string]: `url(${t.icon})` }}
            onClick={() => setActive(i)}
          >
            <span className="cs-tab-icon" aria-hidden />
            <span className="cs-tab-label">
              {t.l1}
              <br />
              {t.l2}
            </span>
          </button>
        ))}
      </div>

      {showBlocks ? (
        <div className="cs-grid">
          {BLOCKS.map((b, i) => (
            <div
              className="cs-col"
              key={b.title}
              data-reveal
              style={{ ["--ri" as string]: 4 + i }}
            >
              <h3 className="cs-col-title">{b.title}</h3>
              <div className="cs-col-body">
                <p className="cs-col-desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="cs-caption" data-reveal style={{ ["--ri" as string]: 4 }}>
          An all-new square sensor enables zoom and rotate options, for more
          flexible ways to frame selfies and videos. And it gets everyone in a
          group shot — automatically.
        </p>
      )}
    </section>
  );
}
