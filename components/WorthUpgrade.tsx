"use client";

import { useEffect, useRef, useState } from "react";

// "Worth the upgrade? 100 percent." comparison panel — Figma node 707:4889.
// Implemented exactly as designed: #121214 rounded panel, heading + compare
// dropdown, a 3×2 grid of black feature cards, and an Apple Trade In footer.
// On scroll into view the header fades in, then the six cards fade in one by one.
// Copy kept verbatim from the Figma design.

const COMPARE_OPTIONS = [
  "iPhone 16 Pro",
  "iPhone 16",
  "iPhone 15 Pro",
  "iPhone 15",
  "iPhone 14 Pro",
  "iPhone 13",
];

export default function WorthUpgrade() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`wtu ${inView ? "is-in" : ""}`}
      aria-label="Worth the upgrade"
    >
      <style>{`
        .wtu {
          /* gray (continuing from "Take a closer look") fading down to black */
          background: linear-gradient(180deg, #1d1d1f 0%, #000000 50%);
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(16px, 2.4vw, 44px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .wtu-panel {
          max-width: 1260px;
          margin: 0 auto;
          background: #121214;
          border-radius: 28px;
          padding: clamp(48px, 6vw, 80px) 0 clamp(72px, 9vw, 120px);
        }
        .wtu-inner { padding: 0 clamp(20px, 8vw, 105px); }

        /* Header row: heading + compare dropdown */
        .wtu-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .wtu-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(34px, 4.4vw, 56px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.005em;
        }
        .wtu-select-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 306px;
          max-width: 100%;
        }
        .wtu-select-label {
          margin: 0;
          padding-left: 20px;
          color: #f5f5f7;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.235;
          letter-spacing: -0.022em;
        }
        .wtu-select {
          position: relative;
          height: 50px;
        }
        .wtu-select select {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          height: 50px;
          padding: 0 44px 0 20px;
          border-radius: 26px;
          background: #121214;
          border: 1px solid rgba(180, 180, 180, 0.3);
          color: #f5f5f7;
          font-family: inherit;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.022em;
          cursor: pointer;
        }
        .wtu-select::after {
          content: "";
          position: absolute;
          right: 22px;
          top: 50%;
          width: 9px;
          height: 9px;
          border-right: 2px solid #2997ff;
          border-bottom: 2px solid #2997ff;
          transform: translateY(-65%) rotate(45deg);
          pointer-events: none;
        }

        .wtu-sub {
          margin: clamp(28px, 3vw, 46px) 0 clamp(20px, 2.4vw, 34px);
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.19;
          letter-spacing: 0.011em;
        }
        .wtu-sub b { color: #f5f5f7; font-weight: 600; }

        /* Feature grid */
        .wtu-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }
        .wtu-card {
          position: relative;
          background: #000000;
          border-radius: 28px;
          min-height: 300px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .wtu-card--center { justify-content: center; padding: 24px; }
        .wtu-card--media { padding-top: 30px; }

        .wtu-card-title {
          margin: 0;
          max-width: 280px;
          padding: 0 12px;
          color: #86868b;
          font-size: clamp(18px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.19;
          letter-spacing: 0.011em;
        }
        .wtu-card-label {
          margin: 0;
          color: #86868b;
          font-size: clamp(18px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.19;
          letter-spacing: 0.011em;
        }
        .wtu-card-big {
          margin: 8px 0;
          color: #f5f5f7;
          font-size: clamp(38px, 3.6vw, 48px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.003em;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .wtu-card-big .row {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .wtu-batt { height: 0.62em; width: auto; display: inline-block; }
        .wtu-foot11 {
          font-size: 0.62em;
          vertical-align: super;
          text-decoration: underline;
          text-decoration-thickness: from-font;
          color: #86868b;
        }

        .wtu-media {
          flex: 1;
          width: 100%;
          min-height: 60px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-top: 12px;
        }
        .wtu-media--mid { align-items: center; }
        .wtu-media img { display: block; max-width: 100%; }
        .wtu-img-unibody { width: 82%; height: auto; object-fit: contain; margin-bottom: 36px; }
        .wtu-img-cameras { width: 100%; height: auto; object-fit: contain; }
        .wtu-img-center { height: 268px; width: auto; object-fit: contain; }
        .wtu-film { width: 56px; height: auto; margin-bottom: 18px; }

        /* Footer — Apple Trade In */
        .wtu-footer {
          margin-top: clamp(48px, 6vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 0 clamp(20px, 8vw, 105px);
        }
        .wtu-tradein { height: 30px; width: auto; display: block; }
        .wtu-footer-text {
          margin: 0;
          max-width: 640px;
          text-align: center;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.19;
          letter-spacing: 0.011em;
        }
        .wtu-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #2997ff;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.19;
          letter-spacing: 0.011em;
          text-decoration: none;
        }
        .wtu-footer-link:hover { text-decoration: underline; }
        .wtu-footer-link svg { width: 0.7em; height: 0.7em; }

        /* Entrance handled per-element via the global [data-reveal] system. */

        @media (max-width: 900px) {
          .wtu-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 600px) {
          .wtu-grid { grid-template-columns: 1fr; }
          .wtu-select-wrap { width: 100%; }
        }
      `}</style>

      <div className="wtu-panel">
        <div className="wtu-inner">
          <div className="wtu-top" data-reveal>
            <h2 className="wtu-title">
              Worth the upgrade?
              <br />
              &nbsp;100 percent.
            </h2>

            <div className="wtu-select-wrap">
              <p className="wtu-select-label">
                Select an iPhone to
                <br />
                compare to iPhone 17 Pro:
              </p>
              <div className="wtu-select">
                <select aria-label="Select an iPhone to compare to iPhone 17 Pro">
                  <option value="">Select a model</option>
                  {COMPARE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="wtu-sub" data-reveal>
            A few ways <b>iPhone 17 Pro</b> gives you more.
          </p>

          <div className="wtu-grid">
            {/* 1 — Unibody */}
            <article className="wtu-card wtu-card--media" data-reveal style={{ ["--ri" as string]: 0 }}>
              <p className="wtu-card-title">Forged aluminum unibody design</p>
              <div className="wtu-media">
                <img
                  className="wtu-img-unibody"
                  src="/wtu-unibody.jpg"
                  alt="Forged aluminum unibody design"
                />
              </div>
            </article>

            {/* 2 — Battery */}
            <article className="wtu-card wtu-card--center" data-reveal style={{ ["--ri" as string]: 1 }}>
              <p className="wtu-card-label">Up to</p>
              <div className="wtu-card-big">
                <span>16 more</span>
                <span className="row">
                  hours
                  <img className="wtu-batt" src="/wtu-battery.png" alt="" aria-hidden />
                </span>
              </div>
              <p className="wtu-card-label">
                video playback
                <br />
                on iPhone 17 Pro Max<span className="wtu-foot11">11</span>
              </p>
            </article>

            {/* 3 — Cameras */}
            <article className="wtu-card wtu-card--media" data-reveal style={{ ["--ri" as string]: 2 }}>
              <p className="wtu-card-title">48MP rear cameras and Camera Control</p>
              <div className="wtu-media">
                <img
                  className="wtu-img-cameras"
                  src="/wtu-cameras.jpg"
                  alt="48MP rear cameras and Camera Control"
                />
              </div>
            </article>

            {/* 4 — GPU */}
            <article className="wtu-card wtu-card--center" data-reveal style={{ ["--ri" as string]: 0 }}>
              <p className="wtu-card-label">Up to</p>
              <div className="wtu-card-big">
                <span>2x</span>
                <span>faster</span>
              </div>
              <p className="wtu-card-label">GPU performance</p>
            </article>

            {/* 5 — Center Stage */}
            <article className="wtu-card wtu-card--media" data-reveal style={{ ["--ri" as string]: 1 }}>
              <p className="wtu-card-title">18MP Center Stage front camera</p>
              <div className="wtu-media">
                <img
                  className="wtu-img-center"
                  src="/wtu-centerstage.jpg"
                  alt="18MP Center Stage front camera"
                />
              </div>
            </article>

            {/* 6 — 4K video */}
            <article className="wtu-card wtu-card--center" data-reveal style={{ ["--ri" as string]: 2 }}>
              <img className="wtu-film" src="/wtu-film.png" alt="" aria-hidden />
              <p className="wtu-card-label">
                Record video in
                <br />
                4K 120 fps Dolby Vision
              </p>
            </article>
          </div>
        </div>

        <div className="wtu-footer" data-reveal>
          <img className="wtu-tradein" src="/wtu-tradein.jpg" alt="Apple Trade In" />
          <p className="wtu-footer-text">
            Get credit toward a new iPhone when you trade in an eligible device.
          </p>
          <a className="wtu-footer-link" href="#">
            Find your trade‑in value
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
