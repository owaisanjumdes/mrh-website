"use client";

import { useEffect, useRef, useState } from "react";

// "Take a closer look." product viewer — Figma node 707:3669 (dark mode).
// Reuses the FeatureExplorer functionality from the home page (a pill list that
// swaps the product view), reskinned to the Figma's dark design: a big black
// rounded card with glass pills overlaid on the left, on a background that
// blends from the black of the "Design" section into #1d1d1f gray.

type ColorOption = { name: string; swatch: string; border?: string };
type Feature = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  accent?: string;
  colors?: ColorOption[];
};

const FEATURES: Feature[] = [
  {
    id: "colors",
    label: "Colors",
    title: "Colors",
    description:
      "Four powder-coated finishes built for institutional deployment — each tuned to disappear into the room it cleans.",
    image: "/productshot.png",
    accent: "#148042",
    colors: [
      { name: "Stainless", swatch: "#b8b3af" },
      { name: "Charcoal", swatch: "#2a2a2c" },
      { name: "Champagne", swatch: "#d4b896" },
      { name: "Snow", swatch: "#f5f5f5", border: "#5a5a5e" },
    ],
  },
  {
    id: "filtration",
    label: "Multi-stage filter",
    title: "Multi-stage filter",
    description:
      "Pre-filter, activated carbon, HEPA H13, and antimicrobial mesh tuned for India's particulate, gas, and bioaerosol mix.",
    image: "/multi-stage-filter.png",
  },
  {
    id: "media",
    label: "MANN+HUMMEL HEPA H13",
    title: "MANN+HUMMEL HEPA H13",
    description:
      "German-engineered filter media. Captures 99.97% of particles down to 0.3 microns, independently validated by IIT Delhi.",
    image: "/hepa-filter.png",
  },
  {
    id: "sensor",
    label: "Live AQI sensor",
    title: "Live AQI sensor",
    description:
      "Real-time PM 2.5 and AQI display on the front panel. The same air you're breathing, read continuously, in plain numbers.",
    image: "/aqimeter.png",
  },
  {
    id: "quiet",
    label: "Whisper-quiet motor",
    title: "Whisper-quiet motor",
    description:
      "Tuned for bedrooms, classrooms, and consultation rooms. Sleep mode drops below 28 dB — softer than a library.",
    image: "/honeycomb-grill.png",
  },
  {
    id: "chassis",
    label: "Steel chassis",
    title: "Steel chassis",
    description:
      "Powder-coated steel built for institutional deployment cycles. No plastic creak. No warping. Field-serviceable.",
    image: "/steelbody.png",
  },
  {
    id: "smart",
    label: "Smart controls",
    title: "Smart controls",
    description:
      "App control, scheduling, and filter-life alerts. Ships ready for the OK Play deployment ops dashboard.",
    image: "/digital.png",
  },
];

const EXIT_MS = 360;

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="rgba(245,245,247,0.9)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CloserLook() {
  const [activeIndex, setActiveIndex] = useState(-1); // no pill active by default
  const [imgIndex, setImgIndex] = useState(0);
  const [imgPhase, setImgPhase] = useState<"rest" | "out" | "in">("rest");
  const timers = useRef<number[]>([]);

  // Trigger the in-card sequence (image slide + pill bubble/pop) when the CARD
  // itself scrolls into view — not when the section's top edge peeks in.
  const viewerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const select = (i: number) => {
    setActiveIndex(i);
    if (i === imgIndex) return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setImgPhase("out");
    const t = window.setTimeout(() => {
      setImgIndex(i);
      setImgPhase("in");
    }, EXIT_MS);
    timers.current.push(t);
  };

  return (
    <section
      className={`cl ${inView ? "is-in" : ""}`}
      aria-label="Take a closer look"
    >
      <style>{`
        .cl {
          --edge: clamp(16px, 2.4vw, 44px);
          background: linear-gradient(180deg, #000000 0%, #1d1d1f 50%);
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 9vh, 114px) var(--edge) clamp(96px, 14vh, 160px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .cl-head {
          max-width: 1720px;
          margin: 0 auto clamp(36px, 5vw, 80px);
          padding-left: clamp(24px, 3vw, 56px);
        }
        .cl-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(30px, 4vw, 56px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.005em;
        }

        .cl-viewer {
          position: relative;
          max-width: 1720px;
          margin: 0 auto;
          height: clamp(700px, 94vh, 1080px);
          background: #000000;
          border-radius: clamp(20px, 2vw, 28px);
          overflow: hidden;
        }

        /* Product image (swaps on selection) */
        .cl-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: clamp(28px, 5vw, 80px);
          padding-left: clamp(220px, 30%, 420px);
        }
        @keyframes clImgOut {
          to { opacity: 0; transform: translateX(-48px) scale(0.96); }
        }
        @keyframes clImgIn {
          from { opacity: 0; transform: translateX(56px) scale(0.96); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .cl-img-out { animation: clImgOut ${EXIT_MS}ms cubic-bezier(0.55, 0, 0.7, 0.2) forwards !important; }
        .cl-img-in { animation: clImgIn 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards !important; }

        /* Pill list overlaid on the left */
        .cl-list {
          position: absolute;
          left: clamp(16px, 5%, 90px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          width: min(340px, 70%);
        }
        .cl-pill {
          width: auto;
          max-width: 100%;
          text-align: left;
          cursor: pointer;
          border: none;
          border-radius: 28px;
          padding: 0 24px;
          background: rgba(42, 42, 45, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: inset 0 0 0.5px 0 rgba(0, 0, 0, 0.11);
          color: #f5f5f7;
          font-family: inherit;
          transition: background 320ms cubic-bezier(0.32, 0.72, 0, 1),
            max-width 320ms ease;
        }
        .cl-pill:hover { background: rgba(60, 60, 64, 0.82); }
        .cl-pill.is-active { background: rgba(58, 58, 62, 0.86); max-width: 100%; }

        .cl-pill-row {
          display: flex;
          align-items: center;
          gap: 14px;
          height: 56px;
        }
        .cl-pill-icon {
          flex: none;
          width: 24px;
          height: 24px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .cl-pill-icon--plus { border: 1.5px solid rgba(245, 245, 247, 0.5); border-radius: 50%; }
        .cl-pill-label {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.022em;
          line-height: 1.24;
          white-space: nowrap;
          color: #f5f5f7;
        }

        /* Expanding detail (active pill) */
        .cl-pill-detail {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 360ms cubic-bezier(0.32, 0.72, 0, 1),
            opacity 360ms ease;
        }
        .cl-pill.is-active .cl-pill-detail {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        .cl-pill-detail > div { overflow: hidden; }
        .cl-pill-desc {
          margin: 0;
          padding: 0 0 20px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          color: rgba(245, 245, 247, 0.72);
          white-space: normal;
        }
        .cl-swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding-bottom: 22px;
        }
        .cl-swatch { display: inline-flex; align-items: center; gap: 7px; }
        .cl-swatch-dot { width: 18px; height: 18px; border-radius: 50%; flex: none; }
        .cl-swatch-name { font-size: 12.5px; font-weight: 500; color: #f5f5f7; }

        /* --- Entrance timeline ---
           1. title fades up
           2. black card fades up (stage)
           3. image slides in from the right
           4. pill #3 slides in from the right with a bubble (circle → pill)
           5. the rest of the pills pop in, top to bottom */
        .cl-viewer { opacity: 0; transform: translateY(28px); }
        .cl-img { opacity: 0; }
        .cl-pill { opacity: 0; }

        .cl.is-in .cl-viewer {
          animation: clUp 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cl.is-in .cl-img {
          animation: clSlideRight 720ms cubic-bezier(0.22, 1, 0.36, 1) 850ms forwards;
        }
        .cl.is-in .cl-pill-bubble {
          animation: clBubble 780ms cubic-bezier(0.34, 1.45, 0.5, 1) var(--d, 0ms) forwards;
        }
        .cl.is-in .cl-pill-pop {
          animation: clPop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0ms) forwards;
        }

        @keyframes clUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes clSlideRight {
          from { opacity: 0; transform: translateX(90px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        /* starts as a tiny fully-round bubble flying in from the right,
           overshoots, then relaxes from a circle to the pill shape */
        @keyframes clBubble {
          0%   { opacity: 0; transform: translateX(80px) scale(0.28); border-radius: 999px; }
          55%  { opacity: 1; transform: translateX(-6px) scale(1.08); border-radius: 999px; }
          78%  { transform: translateX(0) scale(0.98); border-radius: 999px; }
          100% { opacity: 1; transform: translateX(0) scale(1); border-radius: 28px; }
        }
        @keyframes clPop {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { opacity: 1; transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 860px) {
          .cl-img { padding-left: clamp(28px, 5vw, 80px); padding-top: clamp(120px, 30vh, 220px); object-position: bottom; }
          .cl-list { top: clamp(20px, 5%, 40px); transform: none; width: min(86%, 340px); }
        }
        @media (max-width: 640px) {
          .cl-viewer { height: clamp(560px, 86vh, 760px); }
          .cl-img { padding-top: clamp(260px, 40vh, 360px); }
          .cl-pill-row { height: 46px; }
          .cl-pill-icon { width: 20px; height: 20px; }
          .cl-pill-label { font-size: 15px; }
          .cl-pill { padding: 0 18px; }
          .cl-pill-desc { font-size: 13px; padding-bottom: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cl-viewer, .cl-title, .cl-img, .cl-pill {
            opacity: 1 !important; transform: none !important; animation: none !important;
          }
          .cl-img-out, .cl-img-in { animation: none !important; }
        }
      `}</style>

      <div className="cl-head">
        <h2 className="cl-title" data-reveal>Take a closer look.</h2>
      </div>

      <div className="cl-viewer" ref={viewerRef}>
        <img
          className={`cl-img ${
            imgPhase === "out" ? "cl-img-out" : imgPhase === "in" ? "cl-img-in" : ""
          }`}
          src={FEATURES[imgIndex].image}
          alt={FEATURES[imgIndex].label}
        />

        <div className="cl-list">
          {FEATURES.map((f, i) => {
            const isActive = i === activeIndex;
            // pill #3 (index 2) gets the bubble entrance; the rest pop in.
            const isBubble = i === 2;
            const delay = isBubble ? 1450 : 2000 + i * 80;
            return (
              <button
                key={f.id}
                type="button"
                className={`cl-pill ${isBubble ? "cl-pill-bubble" : "cl-pill-pop"} ${
                  isActive ? "is-active" : ""
                }`}
                style={{ ["--d" as string]: `${delay}ms` }}
                onClick={() => select(i)}
                aria-expanded={isActive}
              >
                <span className="cl-pill-row">
                  <span
                    className={`cl-pill-icon ${f.accent ? "" : "cl-pill-icon--plus"}`}
                    style={f.accent ? { background: f.accent } : undefined}
                    aria-hidden
                  >
                    {f.accent ? null : <PlusIcon />}
                  </span>
                  <span className="cl-pill-label">{f.label}</span>
                </span>

                <span className="cl-pill-detail">
                  <div>
                    <p className="cl-pill-desc">{f.description}</p>
                    {f.colors ? (
                      <div className="cl-swatches">
                        {f.colors.map((c) => (
                          <span className="cl-swatch" key={c.name}>
                            <span
                              className="cl-swatch-dot"
                              style={{
                                background: c.swatch,
                                border: c.border ? `1px solid ${c.border}` : "none",
                              }}
                            />
                            <span className="cl-swatch-name">{c.name}</span>
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
