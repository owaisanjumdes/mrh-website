"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Finish = {
  name: string;
  image: string;
  swatch: string;
  needsBorder?: boolean;
};

const FINISHES: Finish[] = [
  { name: "Rose Gold", image: "/RG.png", swatch: "#b88a7a" },
  { name: "Stainless", image: "/SLVR.png", swatch: "#c5c6c8" },
  { name: "Pearl White", image: "/PW.png", swatch: "#f3f1ec", needsBorder: true },
  { name: "Graphite Gray", image: "/GG.png", swatch: "#4a4a4d" },
];

const N = FINISHES.length;
const REPEAT = 9;
// Repeated strip so there is always content bleeding off both edges.
const TRACK = Array.from({ length: N * REPEAT }, (_, k) => FINISHES[k % N]);
const MID = Math.floor(REPEAT / 2) * N; // 16 — the centre band

export default function PremiumFinishes() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const first = useRef(true);
  const [index, setIndex] = useState(MID);

  const activeFinish = ((index % N) + N) % N;

  const position = useCallback((i: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const vw = window.innerWidth;
    const w = Math.max(340, Math.min(0.5 * vw, 600));
    const gap = Math.max(80, Math.min(0.16 * vw, 260));
    const step = w + gap;
    track.style.setProperty("--w", `${w}px`);
    track.style.setProperty("--gap", `${gap}px`);
    track.style.transition = animate
      ? "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    track.style.transform = `translateX(${vw / 2 - w / 2 - i * step}px)`;
  }, []);

  useEffect(() => {
    position(index, !first.current);
    first.current = false;
  }, [index, position]);

  useEffect(() => {
    const onResize = () => position(index, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, position]);

  // When the slide settles near an edge, snap back a whole number of cycles to
  // the equivalent finish in the centre band — content N apart is identical, so
  // it's invisible. Keeps the loop infinite.
  const handleEnd = () => {
    if (index < N || index >= TRACK.length - N) {
      const snapped = MID + activeFinish;
      position(snapped, false);
      setIndex(snapped);
    }
  };

  const go = (d: number) => setIndex((i) => i + d);
  const toFinish = (target: number) => {
    let d = target - activeFinish;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    if (d !== 0) setIndex((i) => i + d);
  };

  return (
    <section className="pf">
      <style>{`
        .pf {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(56px, 8vh, 120px) 0 clamp(48px, 6vh, 88px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          overflow: hidden;
        }
        .pf-heading {
          margin: 0 0 clamp(28px, 4vw, 56px);
          text-align: center;
          font-size: clamp(28px, 3.4vw, 44px);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: #ffffff;
        }
        .pf-stage {
          position: relative;
          overflow: hidden;
          height: clamp(400px, 58vh, 640px);
        }
        .pf-track {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          display: flex;
          align-items: center;
          --w: clamp(340px, 50vw, 600px);
          --gap: clamp(80px, 16vw, 260px);
          gap: var(--gap);
          will-change: transform;
          /* Initial (pre-JS) centre on MID so there's no flash. */
          transform: translateX(calc(50vw - var(--w) / 2 - 16 * (var(--w) + var(--gap))));
        }
        .pf-item {
          width: var(--w);
          height: auto;
          max-height: 100%;
          flex: none;
          display: block;
          pointer-events: none;
        }
        .pf-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(16px, 2vw, 24px);
          margin-top: clamp(20px, 3vw, 40px);
        }
        .pf-finish {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(8px, 1vw, 12px);
        }
        .pf-name {
          font-size: clamp(12px, 1vw, 14px);
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.6);
        }
        .pf-swatches { display: flex; align-items: center; gap: clamp(12px, 1.4vw, 18px); }
        .pf-swatch {
          width: clamp(18px, 1.8vw, 24px);
          height: clamp(18px, 1.8vw, 24px);
          border-radius: 9999px;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: outline-color 220ms ease, transform 220ms ease;
          outline: 2px solid transparent;
          outline-offset: 3px;
        }
        .pf-swatch:hover { transform: scale(1.08); }
        .pf-swatch.is-active { outline-color: #ffffff; }
        .pf-nav { display: flex; align-items: center; gap: clamp(24px, 3vw, 40px); }
        .pf-arrow {
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
          color: #ffffff;
          display: inline-flex;
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .pf-arrow:hover { opacity: 0.55; }
        .pf-arrow svg { width: clamp(24px, 2.2vw, 30px); height: clamp(24px, 2.2vw, 30px); }
      `}</style>

      <h2 className="pf-heading">Premium Finishes</h2>

      <div className="pf-stage">
        <div ref={trackRef} className="pf-track" onTransitionEnd={handleEnd}>
          {TRACK.map((f, k) => (
            <img loading="lazy" key={k} className="pf-item" src={f.image} alt={f.name} />
          ))}
        </div>
      </div>

      <div className="pf-controls">
        <div className="pf-finish">
          <span className="pf-name">{FINISHES[activeFinish].name}</span>
          <div className="pf-swatches">
            {FINISHES.map((f, i) => (
              <button
                key={f.name}
                type="button"
                className={`pf-swatch ${i === activeFinish ? "is-active" : ""}`}
                onClick={() => toFinish(i)}
                aria-label={f.name}
                aria-pressed={i === activeFinish}
                style={{
                  background: f.swatch,
                  boxShadow: f.needsBorder
                    ? "inset 0 0 0 1px rgba(11,12,14,0.18)"
                    : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="pf-nav">
          <button
            type="button"
            className="pf-arrow"
            onClick={() => go(-1)}
            aria-label="Previous finish"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="pf-arrow"
            onClick={() => go(1)}
            aria-label="Next finish"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
