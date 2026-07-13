"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// AirFINEry "Coming Soon" splash. Light product-launch hero built around the
// AirFINEry film: centered headline block over a soft aurora-tinted white
// canvas, then a cinematic rounded video stage with a frosted glass chip dock
// floating over the footage. Entrances are staggered; the film plays while in
// view and pauses when scrolled away. Sits under the persistent light nav.
export default function ComingSoon() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play the film only while it is on screen; never bare autoplay.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="cs" aria-label="AirFINEry is coming soon">
      <style>{`
        .cs {
          --cs-nav: clamp(64px, 7vw, 130px);
          --cs-green: #148042;
          --cs-ink: #1d1d1f;
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: calc(-1 * var(--cs-nav));
          min-height: 100svh;
          overflow: hidden;
          background: linear-gradient(180deg, #ffffff 0%, #f2f4f6 100%);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          padding: calc(var(--cs-nav) + clamp(28px, 5vh, 64px)) clamp(20px, 5vw, 72px) clamp(56px, 9vh, 120px);
          display: flex;
          justify-content: center;
        }

        /* ---- Atmosphere: soft drifting tints for the glass to frost ---- */
        .cs-glow { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
        .cs-glow--a {
          width: 48vmax; height: 48vmax; left: -16vmax; top: -14vmax;
          background: radial-gradient(circle, rgba(20, 128, 66, 0.09) 0%, rgba(20, 128, 66, 0) 62%);
          animation: csDriftA 24s ease-in-out infinite alternate;
        }
        .cs-glow--b {
          width: 44vmax; height: 44vmax; right: -14vmax; bottom: -18vmax;
          background: radial-gradient(circle, rgba(100, 128, 152, 0.1) 0%, rgba(100, 128, 152, 0) 60%);
          animation: csDriftB 28s ease-in-out infinite alternate;
        }
        @keyframes csDriftA { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(6vmax, 4vmax, 0); } }
        @keyframes csDriftB { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-5vmax, -3vmax, 0); } }

        .cs-inner {
          position: relative; z-index: 1;
          width: 100%; max-width: 1120px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
        }

        /* ---- Staggered entrance ---- */
        .cs-up { opacity: 0; transform: translateY(24px); animation: csUp 1000ms cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .cs-d1 { animation-delay: 100ms; }
        .cs-d2 { animation-delay: 220ms; }
        .cs-d3 { animation-delay: 340ms; }
        .cs-d4 { animation-delay: 460ms; }
        @keyframes csUp { to { opacity: 1; transform: translateY(0); } }

        /* ---- Headline block ---- */
        .cs-badge {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 8px 16px; border-radius: 980px;
          background: rgba(20, 128, 66, 0.08);
          border: 1px solid rgba(20, 128, 66, 0.22);
          color: var(--cs-green);
          font-size: clamp(11px, 0.9vw, 12.5px); font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .cs-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--cs-green); animation: csPulse 2.4s ease-in-out infinite; }
        @keyframes csPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(20, 128, 66, 0.35); }
          50% { box-shadow: 0 0 0 7px rgba(20, 128, 66, 0); }
        }

        .cs-title {
          margin: clamp(16px, 2vw, 26px) 0 0;
          font-weight: 600;
          font-size: clamp(44px, 6.4vw, 88px);
          line-height: 1;
          letter-spacing: -0.035em;
          background: linear-gradient(180deg, #1d1d1f 40%, rgba(29, 29, 31, 0.6) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .cs-kicker {
          margin: clamp(10px, 1.2vw, 16px) 0 0;
          color: var(--cs-ink);
          font-size: clamp(17px, 1.7vw, 23px);
          font-weight: 500; letter-spacing: -0.02em; line-height: 1.3;
        }
        .cs-sub {
          margin: clamp(10px, 1.3vw, 16px) auto 0;
          max-width: 52ch;
          color: #6e6e73;
          font-size: clamp(15px, 1.25vw, 17px);
          font-weight: 400; line-height: 1.6;
        }

        .cs-cta-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: clamp(20px, 2.4vw, 30px); }
        .cs-cta {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.85em 1.7em; border-radius: 980px;
          font-weight: 600; font-size: clamp(14px, 1.1vw, 16px); letter-spacing: -0.01em;
          text-decoration: none;
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), background 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }
        .cs-cta--primary { background: var(--cs-ink); color: #ffffff; box-shadow: 0 10px 26px rgba(15, 23, 42, 0.18); }
        .cs-cta--primary:hover { background: #000000; transform: translateY(-2px); box-shadow: 0 16px 32px rgba(15, 23, 42, 0.24); }
        .cs-cta--primary:active { transform: translateY(0) scale(0.98); }
        .cs-cta--ghost {
          color: var(--cs-ink);
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .cs-cta--ghost:hover { border-color: rgba(0, 0, 0, 0.28); background: #ffffff; transform: translateY(-2px); }
        .cs-cta--ghost:active { transform: translateY(0) scale(0.98); }

        /* ---- Cinematic video stage ---- */
        .cs-stage {
          position: relative;
          width: 100%;
          margin-top: clamp(32px, 4.5vw, 56px);
          border-radius: clamp(20px, 2.4vw, 32px);
          overflow: hidden;
          background: #e8ebee;
          border: 1px solid rgba(0, 0, 0, 0.07);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 30px 80px rgba(15, 23, 42, 0.18);
        }
        .cs-stage-in { opacity: 0; animation: csStageIn 1200ms cubic-bezier(0.22, 1, 0.36, 1) 460ms forwards; }
        @keyframes csStageIn {
          from { opacity: 0; transform: translateY(34px) scale(0.975); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cs-video {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          height: auto;
          object-fit: cover;
        }

        /* frosted chip dock floating over the footage */
        .cs-dock {
          position: absolute;
          left: 50%; bottom: clamp(14px, 2vw, 24px);
          transform: translateX(-50%);
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: clamp(8px, 1vw, 12px);
          max-width: calc(100% - 32px);
          padding: clamp(8px, 1vw, 12px);
          border-radius: clamp(16px, 2vw, 980px);
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.65);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 14px 38px rgba(15, 23, 42, 0.2);
          backdrop-filter: blur(22px) saturate(170%);
          -webkit-backdrop-filter: blur(22px) saturate(170%);
        }
        .cs-chip {
          padding: 8px 15px; border-radius: 980px;
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(0, 0, 0, 0.06);
          color: var(--cs-ink);
          font-size: clamp(12px, 1vw, 13.5px); font-weight: 500; letter-spacing: -0.005em;
          white-space: nowrap;
        }

        /* ---- Small screens: dock moves below the film ---- */
        @media (max-width: 640px) {
          .cs-video { aspect-ratio: 4 / 5; }
          .cs-dock {
            position: static; transform: none;
            margin-top: 14px; max-width: 100%;
            background: transparent; border: none; box-shadow: none;
            backdrop-filter: none; -webkit-backdrop-filter: none;
            padding: 0;
          }
          .cs-chip { background: rgba(255, 255, 255, 0.7); border-color: rgba(0, 0, 0, 0.09); }
        }
        @media (max-width: 640px) {
          .cs-stage { overflow: visible; background: transparent; border: none; box-shadow: none; }
          .cs-stage .cs-video-wrap {
            border-radius: 20px; overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.07);
            box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-up, .cs-stage-in { animation: none !important; opacity: 1 !important; transform: none !important; }
          .cs-badge-dot, .cs-glow--a, .cs-glow--b { animation: none !important; }
          .cs-dock { position: static; transform: none; margin-top: 14px; }
        }
      `}</style>

      <span className="cs-glow cs-glow--a" aria-hidden />
      <span className="cs-glow cs-glow--b" aria-hidden />

      <div className="cs-inner">
        <span className="cs-badge cs-up cs-d1">
          <span className="cs-badge-dot" aria-hidden />
          Coming Soon
        </span>
        <h1 className="cs-title cs-up cs-d2">AirFINEry</h1>
        <p className="cs-kicker cs-up cs-d2">Clean air, beyond four walls.</p>
        <p className="cs-sub cs-up cs-d3">
          Our semi-outdoor and outdoor purification tower is in final
          engineering. Register your interest and we will let you know the
          moment it launches.
        </p>
        <div className="cs-cta-row cs-up cs-d3">
          <Link href="/contact" className="cs-cta cs-cta--primary">Notify Me</Link>
          <Link href="/products/pureair" className="cs-cta cs-cta--ghost">Explore PureAir</Link>
        </div>

        <div className="cs-stage cs-stage-in">
          <div className="cs-video-wrap">
            <video
              ref={videoRef}
              className="cs-video"
              src="/AIRFINERY%20CLIP.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="AirFINEry product film"
            />
          </div>
          <div className="cs-dock" aria-label="AirFINEry highlights">
            <span className="cs-chip">Semi-outdoor + outdoor</span>
            <span className="cs-chip">MANN+HUMMEL filtration</span>
            <span className="cs-chip">Live AQI display</span>
          </div>
        </div>
      </div>
    </section>
  );
}
