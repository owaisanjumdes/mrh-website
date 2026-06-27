"use client";

import { useEffect, useRef } from "react";

// "Siri, tell everyone, Dinner is ready" — Figma node 755:6839.
// Centered gradient + white heading above an isometric floor-plan video.
// Copy kept verbatim from the design.

export default function SiriIntercom() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only while the section is on screen; pause when it scrolls away.
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
    <section className="si" aria-label="Siri, tell everyone, Dinner is ready">
      <style>{`
        .si {
          position: relative;
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: 0;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .si-text {
          flex: none;
          max-width: 760px;
          padding: clamp(80px, 12vh, 125px) clamp(20px, 6vw, 88px) clamp(28px, 4vh, 52px);
        }
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
          width: min(1200px, 88vw);
          height: auto;
          margin: 0 auto;
          border-radius: clamp(16px, 2vw, 28px);
          overflow: hidden;
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

      <video
        ref={videoRef}
        className="si-plan"
        src="/simvid.mp4"
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Air simulation of a floor plan"
        data-reveal
        style={{ ["--ri" as string]: 1 }}
      />
    </section>
  );
}
