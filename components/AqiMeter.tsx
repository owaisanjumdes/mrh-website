"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, CloudFog, Wind } from "lucide-react";

// AQI meter — a circular progress ring (green → red) with the live AQI in the
// centre and three Apple-style stat rows alongside (PM2.5, PM10, daily average).
// On scroll-in the value counts up, the ring fills and shifts from green toward
// red, the status label follows, and the ambient tint warms with the reading.

const START = 30;
const END = 482;
const DURATION = 2200; // ms
const MAX = 500;

type Band = { max: number; label: string; color: string };
const BANDS: Band[] = [
  { max: 50, label: "Good", color: "#4ade80" },
  { max: 100, label: "Moderate", color: "#eab308" },
  { max: 150, label: "Poor", color: "#f97316" },
  { max: 200, label: "Unhealthy", color: "#ef4444" },
  { max: 300, label: "Very Unhealthy", color: "#dc2626" },
  { max: 99999, label: "Hazardous", color: "#b91c1c" },
];
const bandFor = (v: number): Band =>
  BANDS.find((b) => v <= b.max) ?? BANDS[BANDS.length - 1];

const STATS = [
  { label: "PM2.5 · µg/m³", value: 268, color: "#4ade80", Icon: Wind },
  { label: "PM10 · µg/m³", value: 402, color: "#7c8cf8", Icon: CloudFog },
  { label: "Daily avg · AQI", value: 421, color: "#f87171", Icon: CalendarDays },
];

// Ring colour ramp (green → red), keyed to angle so colour reflects the value.
const STOPS: [number, string][] = [
  [0, "#4ade80"],
  [36, "#a3e635"],
  [72, "#facc15"],
  [108, "#f97316"],
  [150, "#ef4444"],
  [220, "#dc2626"],
  [360, "#7f1d1d"],
];
const toRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const colorAt = (deg: number): string => {
  for (let i = 1; i < STOPS.length; i++) {
    if (deg <= STOPS[i][0]) {
      const [d0, c0] = STOPS[i - 1];
      const [d1, c1] = STOPS[i];
      const t = (deg - d0) / (d1 - d0);
      const a = toRgb(c0);
      const b = toRgb(c1);
      const m = a.map((x, k) => Math.round(x + (b[k] - x) * t));
      return `rgb(${m[0]}, ${m[1]}, ${m[2]})`;
    }
  }
  return STOPS[STOPS.length - 1][1];
};
// Build a conic gradient that's solid (value-coloured) up to `fillDeg`, then
// transparent — no mask compositing needed, just the plain ring mask.
const ringGradient = (fillDeg: number): string => {
  const parts = STOPS.filter(([d]) => d < fillDeg).map(([d, c]) => `${c} ${d}deg`);
  parts.push(`${colorAt(fillDeg)} ${fillDeg}deg`, `transparent ${fillDeg}deg`);
  // start at the top (12 o'clock) so the fill, the gap, and the knob all align
  return `conic-gradient(from 0deg, ${parts.join(", ")})`;
};

export default function AqiMeter() {
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);
  const [value, setValue] = useState(START);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(END);
          return;
        }
        let raf = 0;
        let t0 = 0;
        const tick = (ts: number) => {
          if (!t0) t0 = ts;
          const t = Math.min(1, (ts - t0) / DURATION);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(START + (END - START) * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const band = bandFor(value);
  const fillDeg = Math.min(1, value / MAX) * 360;

  return (
    <section ref={ref} className="aq" aria-label="Live air quality index">
      <style>{`
        .aq {
          /* transparent / black so the section blends with the black sections
             before and after it — no contained box */
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(80px, 14vh, 180px) clamp(20px, 6vw, 88px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          justify-content: center;
        }

        .aq-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1040px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(40px, 7vw, 110px);
        }

        /* --- ring meter --- */
        .aq-meter {
          /* thickness must use viewport/absolute units (not %) — a % resolves
             against the radius inside the ring mask but against the full width in
             the disc's calc(), which desynced the two and reopened the gap */
          --t: clamp(22px, 4vw, 28px);
          --w: clamp(12px, 2.6vw, 18px);
          position: relative;
          flex: none;
          width: clamp(300px, 40vw, 440px);
          aspect-ratio: 1;
        }
        .aq-track, .aq-fill, .aq-white {
          position: absolute;
          inset: 0;
          border-radius: 50%;
        }
        .aq-track {
          background: rgba(255, 255, 255, 0.07);
          -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - var(--t)), #000 calc(100% - var(--t)));
          mask: radial-gradient(farthest-side, #0000 calc(100% - var(--t)), #000 calc(100% - var(--t)));
        }
        .aq-fill {
          /* background (the conic) is set inline so the transparent cutoff tracks
             the value; only the simple ring mask is needed here */
          -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - var(--t)), #000 calc(100% - var(--t)));
          mask: radial-gradient(farthest-side, #0000 calc(100% - var(--t)), #000 calc(100% - var(--t)));
        }
        /* white ring — a progress arc just inside the colored arc, ending at the
           same angle (the knob) so the two sweep together instead of the white
           running ahead as a full circle */
        .aq-white {
          background: conic-gradient(from 0deg, #ffffff 0 var(--fill), transparent var(--fill));
          -webkit-mask: radial-gradient(farthest-side,
            #0000 calc(100% - var(--t) - var(--w)),
            #000 calc(100% - var(--t) - var(--w)),
            #000 calc(100% - var(--t)),
            #0000 calc(100% - var(--t)));
          mask: radial-gradient(farthest-side,
            #0000 calc(100% - var(--t) - var(--w)),
            #000 calc(100% - var(--t) - var(--w)),
            #000 calc(100% - var(--t)),
            #0000 calc(100% - var(--t)));
        }
        /* white knob at the leading edge */
        .aq-cap-rot {
          position: absolute;
          inset: 0;
          transform: rotate(var(--cap));
          transition: transform 120ms linear;
        }
        .aq-cap {
          position: absolute;
          top: calc(var(--t) / 2);
          left: 50%;
          width: calc(var(--t) * 1.04);
          height: calc(var(--t) * 1.04);
          border-radius: 50%;
          background: #ffffff;
          transform: translate(-50%, -50%);
          box-shadow: 0 2px 7px rgba(0, 0, 0, 0.55);
        }
        /* white ring + dark centre disc */
        .aq-core {
          position: absolute;
          top: 50%;
          left: 50%;
          /* dark centre, sized to sit just inside the white arc (+overlap to avoid
             a seam); the white border is now the separate sweeping arc */
          width: calc(100% - 2 * var(--t) - 2 * var(--w) + 4px);
          height: calc(100% - 2 * var(--t) - 2 * var(--w) + 4px);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: #1b1b1d;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .aq-value {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(52px, 10vw, 104px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.04em;
        }
        .aq-status {
          margin: clamp(8px, 1.4vw, 14px) 0 0;
          font-size: clamp(15px, 1.8vw, 22px);
          font-weight: 600;
          letter-spacing: -0.01em;
          transition: color 200ms linear;
        }
        .aq-sub {
          margin: 4px 0 0;
          color: rgba(245, 245, 247, 0.42);
          font-size: clamp(11px, 1.1vw, 14px);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* --- stats --- */
        .aq-stats {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 2.8vw, 38px);
        }
        .aq-stat {
          display: flex;
          align-items: center;
          gap: clamp(14px, 1.6vw, 22px);
        }
        .aq-stat-ico {
          flex: none;
          width: clamp(48px, 5.4vw, 66px);
          aspect-ratio: 1;
          border-radius: 50%;
          border: 2px solid currentColor;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .aq-stat-ico svg { width: 44%; height: 44%; }
        .aq-stat-val {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(30px, 3.6vw, 48px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.025em;
        }
        .aq-stat-label {
          margin: 7px 0 0;
          color: rgba(245, 245, 247, 0.5);
          font-size: clamp(12px, 1.2vw, 15px);
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        @media (max-width: 820px) {
          .aq-inner { flex-direction: column; gap: clamp(36px, 8vw, 56px); }
          .aq-stats { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: clamp(24px, 7vw, 48px); }
          .aq-stat { flex-direction: column; text-align: center; gap: 12px; }
          .aq-stat-label { margin-top: 4px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aq-cap-rot { transition: none; }
        }
      `}</style>

      <div className="aq-inner">
        <div
          className="aq-meter"
          style={{
            ["--fill" as string]: `${fillDeg}deg`,
            ["--cap" as string]: `${fillDeg}deg`,
          }}
        >
          <div className="aq-track" aria-hidden />
          <div
            className="aq-fill"
            style={{ background: ringGradient(fillDeg) }}
            aria-hidden
          />
          <div className="aq-white" aria-hidden />
          <div className="aq-cap-rot" aria-hidden>
            <span className="aq-cap" />
          </div>
          <div className="aq-core">
            <p className="aq-value">{value.toLocaleString()}</p>
            <p className="aq-status" style={{ color: band.color }}>
              {band.label}
            </p>
            <p className="aq-sub">NEW DELHI AQI</p>
          </div>
        </div>

        <div className="aq-stats">
          {STATS.map(({ label, value: v, color, Icon }) => (
            <div className="aq-stat" key={label}>
              <span className="aq-stat-ico" style={{ color }} aria-hidden>
                <Icon strokeWidth={2} />
              </span>
              <div>
                <p className="aq-stat-val">{v}</p>
                <p className="aq-stat-label">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
