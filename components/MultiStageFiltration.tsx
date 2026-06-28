"use client";

import { useEffect, useRef } from "react";

// "The Technology Inside — Multi-Stage Filtration" — dark-mode adaptation of the
// home page section, for the Technology page. Blue-gradient eyebrow to match the
// other Technology-page eyebrows. Video plays only while on screen.
export default function MultiStageFiltration() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="msf" aria-label="The Technology Inside — Multi-Stage Filtration">
      <style>{`
        .msf {
          --gutter: clamp(20px, 6vw, 88px);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 11vh, 150px) var(--gutter);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          text-align: center;
        }
        .msf-wrap { max-width: 1260px; margin: 0 auto; }
        .msf-eyebrow {
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
        .msf-title {
          margin: 0 auto;
          max-width: 18ch;
          color: #f5f5f7;
          font-size: clamp(32px, 5.2vw, 76px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.02em;
        }
        .msf-sub {
          margin: clamp(18px, 2vw, 28px) auto 0;
          max-width: 52ch;
          color: #86868b;
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 500;
          line-height: 1.45;
        }
        .msf-media {
          position: relative;
          margin: clamp(40px, 5vw, 64px) auto 0;
          width: min(1048px, 100%);
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          overflow: hidden;
          background: #1d1d1f;
        }
        .msf-vid { display: block; width: 100%; height: 100%; object-fit: cover; }
        .msf-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 4vw, 60px);
          max-width: 980px;
          margin: clamp(48px, 6vw, 80px) auto 0;
        }
        .msf-stat-up { margin: 0; font-size: clamp(15px, 1.4vw, 17px); font-weight: 500; color: #86868b; line-height: 1.4; }
        .msf-stat-big {
          margin: 4px 0;
          font-size: clamp(30px, 3.4vw, 46px);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.12;
          background: linear-gradient(180deg, #ffffff 0%, #b8b8bd 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .msf-stat-desc { margin: 0; font-size: clamp(14px, 1.3vw, 16px); font-weight: 500; color: #86868b; line-height: 1.38; }
        @media (max-width: 860px) { .msf-stats { grid-template-columns: 1fr; } }
      `}</style>

      <div className="msf-wrap">
        <p className="msf-eyebrow" data-reveal>The Technology Inside</p>
        <h2 className="msf-title" data-reveal style={{ ["--ri" as string]: 1 }}>Multi-Stage Filtration</h2>
        <p className="msf-sub" data-reveal style={{ ["--ri" as string]: 2 }}>
          Catches the fine particles ordinary purifiers miss.
        </p>

        <div className="msf-media" data-reveal>
          <video
            ref={videoRef}
            className="msf-vid"
            src="/filtervid.mp4"
            loop
            muted
            playsInline
            preload="none"
            aria-hidden
          />
        </div>

        <div className="msf-stats">
          <div className="msf-stat" data-reveal style={{ ["--ri" as string]: 0 }}>
            <p className="msf-stat-up">Up to</p>
            <p className="msf-stat-big">2,000 sq ft</p>
            <p className="msf-stat-desc">cleaned per unit, so you need fewer</p>
          </div>
          <div className="msf-stat" data-reveal style={{ ["--ri" as string]: 1 }}>
            <p className="msf-stat-up">Down to</p>
            <p className="msf-stat-big">0.3 microns</p>
            <p className="msf-stat-desc">captured, including ultrafine particles</p>
          </div>
          <div className="msf-stat" data-reveal style={{ ["--ri" as string]: 2 }}>
            <p className="msf-stat-up">Certified to</p>
            <p className="msf-stat-big">ISO 16890</p>
            <p className="msf-stat-desc">the global clean-air standard</p>
          </div>
        </div>
      </div>
    </section>
  );
}
