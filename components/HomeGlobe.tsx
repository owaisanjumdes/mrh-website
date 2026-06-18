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

// Cluster of small markers across India's landmass (lat 8–35, lon 68–97) so the
// whole region reads as a glowing red hot-zone rather than a single dot.
const INDIA_MARKERS: { loc: [number, number]; size: number }[] = [
  { loc: [28.6, 77.2], size: 0.04 },  // Delhi
  { loc: [19.0, 72.8], size: 0.04 },  // Mumbai
  { loc: [13.0, 80.2], size: 0.035 }, // Chennai
  { loc: [22.5, 88.3], size: 0.035 }, // Kolkata
  { loc: [12.9, 77.6], size: 0.035 }, // Bengaluru
  { loc: [17.4, 78.5], size: 0.035 }, // Hyderabad
  { loc: [23.0, 72.6], size: 0.03 },  // Ahmedabad
  { loc: [26.9, 75.8], size: 0.03 },  // Jaipur
  { loc: [21.1, 79.1], size: 0.03 },  // Nagpur
  { loc: [25.3, 82.9], size: 0.03 },  // Varanasi
  { loc: [30.7, 76.8], size: 0.028 }, // Chandigarh
  { loc: [15.3, 75.1], size: 0.028 }, // Hubli
  { loc: [11.0, 76.9], size: 0.028 }, // Coimbatore
  { loc: [26.1, 91.7], size: 0.028 }, // Guwahati
];

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
          phi += dPhi * 0.06;
          theta += (targetTheta - theta) * 0.06;
          lit += (1 - lit) * 0.08;
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
          theta += (DEFAULT_THETA - theta) * 0.06;
          lit += (0 - lit) * 0.1;
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
      aria-label="India ranks 3rd in global pollution"
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
          transition: opacity 1.2s ease;
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
          transition: opacity 0.6s ease 0.15s, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
          pointer-events: none;
        }
        .hg.is-arrived .hg-glow { opacity: 1; transform: translate(-50%, -50%) scale(1); }

        /* headline overlay */
        .hg-headline {
          position: absolute;
          left: 50%;
          bottom: 8%;
          transform: translate(-50%, 16px);
          margin: 0;
          width: max-content;
          max-width: 92vw;
          text-align: center;
          color: var(--paper);
          font-size: clamp(24px, 3.4vw, 44px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          opacity: 0;
          transition: opacity 0.6s ease 0.25s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s;
          pointer-events: none;
        }
        .hg.is-arrived .hg-headline { opacity: 1; transform: translate(-50%, 0); }
        .hg-pollution {
          background: linear-gradient(180deg, #ff7e6b 0%, #ff3b30 48%, #cf0a2c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          .hg-canvas, .hg-glow, .hg-headline { transition: none; }
        }
      `}</style>

      <div className="hg-stage">
        <canvas ref={canvasRef} className="hg-canvas" />
        <span className="hg-glow" aria-hidden />
        <h2 className="hg-headline">
          India Ranks 3rd in Global <span className="hg-pollution">Pollution</span>.
        </h2>
      </div>
    </section>
  );
}
