"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

// Scroll-triggered globe. Spins continuously; when the section scrolls into view
// it eases its rotation to face India, slows to a stop, lights up a red marker on
// India, dims the globe and fades in a headline. Reverses when scrolled away.
// Colours mirror our design tokens (paper / deep surfaces / severity red).

// India ~ lat 22, lon 79 — used as the rotation focus target
const INDIA: [number, number] = [22, 79];
const DEFAULT_THETA = 0.2;
const SPIN = 0.0035;

// The single India hot-spot is drawn as a CSS overlay (a red-gradient dot with
// four concentric ripple rings) that appears once the globe settles on India, so
// the 3D globe itself renders no cobe markers.
const INDIA_MARKERS: { loc: [number, number]; size: number }[] = [];

// token-derived cobe colours (0–1 RGB)
const BASE: [number, number, number] = [0.431, 0.42, 0.396]; // --paper-3 #6E6B65
const MARKER: [number, number, number] = [0.78, 0.278, 0.18]; // --severity #C7472E
const GLOW: [number, number, number] = [0.078, 0.094, 0.118]; // --surface-deep-2 #14181E

// [phi, theta] that brings a lat/lon to face the viewer
const locationToAngles = (lat: number, lon: number): [number, number] => [
  Math.PI - (lon * Math.PI) / 180 + Math.PI / 2,
  (lat * Math.PI) / 180,
];

export default function HomeGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusedRef = useRef(false);
  const arrivedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [arrived, setArrived] = useState(false);

  // Observe the section: focus India when ~half in view, reverse otherwise.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        focusedRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (!focusedRef.current && arrivedRef.current) {
          arrivedRef.current = false;
          setArrived(false);
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let raf = 0;
    let phi = 0;
    let theta = DEFAULT_THETA;
    let lit = 0; // 0–1: how "lit up" the India cluster is
    const [targetPhi, targetTheta] = locationToAngles(INDIA[0], INDIA[1]);

    const init = () => {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: DEFAULT_THETA,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        mapBaseBrightness: 0.02,
        baseColor: BASE,
        markerColor: MARKER,
        glowColor: GLOW,
        markerElevation: 0,
        markers: INDIA_MARKERS.map((m) => ({
          location: m.loc,
          size: 0,
          color: MARKER,
        })),
      });

      const animate = () => {
        if (focusedRef.current) {
          // ease to India along the shortest angular path, slowing to a stop
          let dPhi = targetPhi - phi;
          dPhi = ((dPhi % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
          phi += dPhi * 0.12;
          theta += (targetTheta - theta) * 0.12;
          lit += (1 - lit) * 0.16;
          if (
            !arrivedRef.current &&
            Math.abs(dPhi) < 0.02 &&
            Math.abs(targetTheta - theta) < 0.02
          ) {
            arrivedRef.current = true;
            setArrived(true);
          }
        } else {
          phi += SPIN;
          theta += (DEFAULT_THETA - theta) * 0.12;
          lit += (0 - lit) * 0.2;
        }

        globe!.update({
          phi,
          theta,
          markers: INDIA_MARKERS.map((m) => ({
            location: m.loc,
            size: Math.max(0, m.size * lit),
            color: MARKER,
          })),
        });
        raf = requestAnimationFrame(animate);
      };

      animate();
      window.setTimeout(() => setReady(true), 0);
    };

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hg ${ready ? "is-ready" : ""} ${arrived ? "is-arrived" : ""}`}
      aria-label="India is breathing the worst air in the world"
    >
      <style>{`
        .hg {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(80px, 12vh, 160px) clamp(20px, 6vw, 88px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .hg-stage {
          position: relative;
          width: min(560px, 86vw);
          aspect-ratio: 1 / 1;
        }
        .hg-canvas {
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.6s ease;
          contain: layout paint size;
        }
        .hg.is-ready .hg-canvas { opacity: 1; }
        .hg.is-arrived .hg-canvas { opacity: 0.4; }

        /* soft red haze over India's region (front-centre when stopped) so the
           marker cluster reads as one glowing hot-zone */
        .hg-glow {
          position: absolute;
          left: 50%;
          top: 41%;
          width: 36%;
          height: 30%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, color-mix(in srgb, var(--severity) 50%, transparent) 0%, color-mix(in srgb, var(--severity) 18%, transparent) 45%, transparent 72%);
          filter: blur(8px);
          transform: translate(-50%, -50%) scale(0.6);
          opacity: 0;
          transition: opacity 0.3s ease 0.075s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.075s;
          pointer-events: none;
        }
        .hg.is-arrived .hg-glow { opacity: 1; transform: translate(-50%, -50%) scale(1); }

        /* single India hot-spot: a red-gradient dot with four concentric ripple
           rings of decreasing opacity, revealed when the globe settles on India */
        .hg-ping {
          position: absolute;
          left: 50%;
          top: 41%;
          transform: translate(-50%, -50%);
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease 0.12s;
        }
        .hg.is-arrived .hg-ping { opacity: 1; }
        .hg-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle at 35% 30%, #ff8a7a 0%, #ff3b30 52%, #c20e2c 100%);
          box-shadow: 0 0 10px 2px rgba(255, 59, 48, 0.55);
        }
        .hg-ripple {
          position: absolute;
          left: 50%;
          top: 50%;
          /* the size each ring grows TO; the animation scales it up from the dot */
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 2px solid #ff4d3d;
          transform: translate(-50%, -50%) scale(0.2);
          opacity: 0;
        }
        /* Four ripples on one cycle, started exactly 1/4 apart (negative delays),
           so four rings sit on screen at once — expanding outward with a
           75 / 50 / 25 / 10% opacity falloff. Each fades in quickly just outside the
           dot and fades out only at the edge, so all four stay clearly visible. */
        .hg.is-arrived .hg-ripple { animation: hgRipple 3.6s linear infinite; }
        .hg-ripple--1 { animation-delay: 0s; }
        .hg-ripple--2 { animation-delay: -0.9s; }
        .hg-ripple--3 { animation-delay: -1.8s; }
        .hg-ripple--4 { animation-delay: -2.7s; }
        @keyframes hgRipple {
          0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
          10%  { opacity: 0.75; }
          37%  { opacity: 0.50; }
          64%  { opacity: 0.25; }
          90%  { opacity: 0.10; }
          100% { transform: translate(-50%, -50%) scale(1);   opacity: 0; }
        }

        /* heading + subtext — sits below the globe, revealed together */
        .hg-text {
          margin-top: clamp(-40px, -4vh, -14px);
          max-width: 94vw;
          text-align: center;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.3s ease 0.125s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.125s;
        }
        .hg.is-arrived .hg-text { opacity: 1; transform: translateY(0); }
        /* eyebrow — sits above the globe; matches the "Benchmark" eyebrow in Performance */
        .hg-eyebrow {
          margin: 0 0 clamp(10px, 1.6vw, 20px);
          color: #ff791b;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
          text-align: center;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hg.is-arrived .hg-eyebrow { opacity: 1; transform: translateY(0); }
        /* headline now sits between the eyebrow and the globe */
        .hg-headline {
          margin: 0 auto clamp(-24px, -2.5vh, -8px);
          max-width: min(640px, 92vw);
          color: var(--paper);
          font-size: clamp(28px, 5vw, 60px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
          text-align: center;
          text-wrap: balance;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hg.is-arrived .hg-headline { opacity: 1; transform: translateY(0); }
        .hg-sub {
          margin: clamp(12px, 1.6vw, 18px) auto 0;
          max-width: min(820px, 92vw);
          color: var(--paper-2);
          font-size: clamp(15px, 1.5vw, 18px);
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.005em;
          text-wrap: balance;
        }
        .hg-sub b { color: var(--paper); font-weight: 600; }
        .hg-pollution {
          background: linear-gradient(180deg, #ff7e6b 0%, #ff3b30 48%, #cf0a2c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          .hg-canvas, .hg-glow, .hg-text, .hg-eyebrow, .hg-headline { transition: none; }
          /* static concentric rings at the defined opacities under reduced motion */
          .hg-ripple { animation: none; }
          .hg-ripple--1 { transform: translate(-50%, -50%) scale(0.25); opacity: 0.75; }
          .hg-ripple--2 { transform: translate(-50%, -50%) scale(0.5);  opacity: 0.50; }
          .hg-ripple--3 { transform: translate(-50%, -50%) scale(0.75); opacity: 0.25; }
          .hg-ripple--4 { transform: translate(-50%, -50%) scale(1);    opacity: 0.10; }
        }
      `}</style>

      <p className="hg-eyebrow">
        <span className="hg-pollution">The Crisis</span>
      </p>
      <h2 className="hg-headline">
        India Is Breathing the{" "}
        <span className="hg-pollution">Worst Air</span> in the World
      </h2>
      <div className="hg-stage">
        <canvas ref={canvasRef} className="hg-canvas" />
        <span className="hg-glow" aria-hidden />
        <span className="hg-ping" aria-hidden>
          <span className="hg-ripple hg-ripple--4" />
          <span className="hg-ripple hg-ripple--3" />
          <span className="hg-ripple hg-ripple--2" />
          <span className="hg-ripple hg-ripple--1" />
          <span className="hg-dot" />
        </span>
      </div>
      <div className="hg-text">
        <p className="hg-sub">
          On a bad day, breathing it is like smoking <b>70</b> cigarettes. It
          costs focus, attendance, and health, quietly, every day. MRH exists to
          change the number on the meter.
        </p>
      </div>
    </section>
  );
}
