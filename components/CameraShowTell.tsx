"use client";

import { useEffect, useRef, useState } from "react";

// "Camera — The ultimate show and tell." — Figma node 756:9302.
// Header + a media panel with a Center Stage / Desk View tab control and caption.
// Copy kept verbatim from the Figma design.

const TABS = [
  {
    label: "Center Stage",
    caption:
      "Center Stage keeps you in frame during video calls, even as you move around or when more people join your frame.",
  },
  {
    label: "Desk View",
    caption:
      "Desk View shows an overhead look at your desk, so you can present what’s in front of you.",
  },
];

export default function CameraShowTell() {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play while the video is in view (looping); stop and reset when it leaves.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
          v.currentTime = 0;
        }
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="cam" aria-label="Camera — The ultimate show and tell">
      <style>{`
        .cam {
          --gutter: clamp(20px, 6vw, 88px);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(96px, 14vh, 144px) var(--gutter);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .cam-head { max-width: 1260px; margin: 0 auto; }
        .cam-head-inner { padding-left: clamp(0px, 16vw, 210px); max-width: 840px; }
        .cam-eyebrow {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
        }
        .cam-title {
          margin: clamp(12px, 1.6vw, 20px) 0 0;
          color: #f5f5f7;
          font-size: clamp(40px, 6.4vw, 80px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.015em;
          /* break only at the explicit <br />s so it stays 3 lines */
          white-space: nowrap;
        }
        .cam-copy {
          margin: clamp(28px, 3vw, 46px) 0 0;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.19;
          letter-spacing: 0.011em;
        }
        .cam-copy b { color: #ffffff; font-weight: 600; }

        .cam-media {
          max-width: 1050px;
          margin: clamp(48px, 7vw, 90px) auto 0;
        }
        .cam-frame {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: #000000;
          aspect-ratio: 1050 / 621;
        }
        .cam-frame img,
        .cam-frame video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cam-play {
          position: absolute;
          right: 20px;
          bottom: 20px;
          width: 36px;
          height: 36px;
          border-radius: 18px;
          background: rgba(66, 66, 69, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.92);
        }
        .cam-play svg { width: 14px; height: 14px; }

        /* tabs */
        .cam-tabs {
          display: flex;
          justify-content: center;
          margin-top: clamp(20px, 2.4vw, 28px);
        }
        .cam-tablist {
          position: relative;
          display: inline-flex;
          gap: 28px;
        }
        .cam-tablist::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: rgba(66, 66, 69, 0.72);
          border-radius: 999px;
        }
        .cam-tab {
          position: relative;
          z-index: 1;
          padding: 0 0 11px;
          border: none;
          border-bottom: 1px solid transparent;
          background: none;
          color: rgba(255, 255, 255, 0.8);
          font-family: inherit;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.235;
          letter-spacing: -0.022em;
          cursor: pointer;
          transition: color 200ms ease, border-color 200ms ease;
        }
        .cam-tab.is-active { color: #ffffff; border-bottom-color: #ffffff; }

        .cam-caption {
          margin: clamp(28px, 3vw, 36px) auto 0;
          max-width: 875px;
          text-align: center;
          color: #86868b;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.235;
          letter-spacing: -0.022em;
        }

        @media (max-width: 600px) {
          .cam-head-inner { padding-left: 0; }
          .cam-title { white-space: normal; }
        }
      `}</style>

      <div className="cam-head">
        <div className="cam-head-inner">
          <p className="cam-eyebrow" data-reveal>Intelligent Space Planning</p>
          <h2 className="cam-title" data-reveal style={{ ["--ri" as string]: 1 }}>
            We don&rsquo;t guess
            <br />
            where clean air goes.
            <br />
            We simulate it.
          </h2>
          <p className="cam-copy" data-reveal style={{ ["--ri" as string]: 2 }}>
            Before a single unit is installed, our simulation engine maps your
            space and shows{" "}
            <b>exactly how fast it reaches clean air</b>, and where every
            purifier should sit.
          </p>
        </div>
      </div>

      <div className="cam-media" data-reveal>
        <div className="cam-frame">
          <video
            ref={videoRef}
            src="/classroom-air-simulation.mp4"
            loop
            muted
            playsInline
            preload="auto"
            aria-label="MANN+HUMMEL simulation of improving indoor air quality in a classroom"
          />
          <span className="cam-play" aria-label="Play Center Stage video" role="img">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5l11 7-11 7z" />
            </svg>
          </span>
        </div>

        <div className="cam-tabs">
          <div className="cam-tablist" role="tablist">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`cam-tab ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <p className="cam-caption">{TABS[active].caption}</p>
      </div>
    </section>
  );
}
