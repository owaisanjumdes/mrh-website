"use client";

import { Fragment, useEffect, useRef, useState } from "react";

// "Take a closer look." product viewer — Figma node 707:3669 (dark mode).
// Reuses the FeatureExplorer functionality from the home page (a pill list that
// swaps the product view), reskinned to the Figma's dark design: a big black
// rounded card with glass pills overlaid on the left, on a background that
// blends from the black of the "Design" section into #1d1d1f gray.

type ColorOption = { name: string; swatch: string; border?: string; image: string };
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
      "Four powder-coated finishes built to fit the room. Pick one that disappears into your space, or match it to your brand.",
    image: "/slr.png",
    accent: "#f0a48c",
    colors: [
      { name: "Silver", swatch: "#c8c5c1", image: "/slr.png" },
      { name: "Rose Gold", swatch: "#e0b6a6", image: "/rsg.png" },
      { name: "Pearl White", swatch: "#f3f0ec", border: "#5a5a5e", image: "/pwht.png" },
      { name: "Graphite Gray", swatch: "#4a4a4d", image: "/grgr.png" },
    ],
  },
  {
    id: "filtration",
    label: "Multi-stage filter",
    title: "Multi-stage filter",
    description:
      "Pre-filter, activated carbon, HEPA H13, and antimicrobial mesh, tuned for India's mix of dust, gases, and bioaerosols. Captures 99.97% of particles down to 0.3 microns.",
    image: "/multi-stage-filter.png",
  },
  {
    id: "sensor",
    label: "Live AQI sensor",
    title: "Live AQI sensor",
    description:
      "Real-time PM2.5 and AQI right on the front panel. The same air you're breathing, read continuously, in plain numbers you can trust.",
    image: "/aqimeter.png",
  },
  {
    id: "iot",
    label: "IoT",
    title: "IoT",
    description:
      "Connect PureAir to the MRH app for live readings, filter health, and scheduling from anywhere. Every unit reports into the OK Play deployment dashboard.",
    image: "/digital.png",
  },
  {
    id: "engineering",
    label: "German engineering, Indian reliability",
    title: "German engineering, Indian reliability",
    description:
      "Filters designed by MANN+HUMMEL in Germany, with 80 years of filtration science behind them. Built and serviced in India, for India's air.",
    image: "/hepa-filter.png",
  },
  {
    id: "diagnostics",
    label: "Self-diagnostic alerts",
    title: "Self-diagnostic alerts",
    description:
      "PureAir tracks its own health and flags service before you notice a thing. We get the alert, and we handle it.",
    image: "/internal.png",
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

function Chevron({ dir }: { dir: "up" | "down" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "up" ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"}
        stroke="rgba(245,245,247,0.92)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CloserLook() {
  const [activeIndex, setActiveIndex] = useState(-1); // no pill active by default
  const [imgIndex, setImgIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0); // selected finish on the Colors tab
  const [imgPhase, setImgPhase] = useState<"rest" | "out" | "in">("rest");
  // "slide" for switching features, "fade" for switching colors within a feature
  const [swapMode, setSwapMode] = useState<"slide" | "fade">("slide");
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

  // Clicking anywhere outside the pill list / nav collapses the open tab.
  useEffect(() => {
    if (activeIndex < 0) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest(".cl-list, .cl-nav")) return;
      setActiveIndex(-1);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [activeIndex]);

  const select = (i: number) => {
    setActiveIndex(i);
    if (i === imgIndex) return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setSwapMode("slide");
    setImgPhase("out");
    const t = window.setTimeout(() => {
      setImgIndex(i);
      setImgPhase("in");
    }, EXIT_MS);
    timers.current.push(t);
  };

  // Swap the product image for a different finish, with a subtle fade out/in.
  const selectColor = (ci: number) => {
    if (ci === colorIndex) return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    setSwapMode("fade");
    setImgPhase("out");
    const t = window.setTimeout(() => {
      setColorIndex(ci);
      setImgPhase("in");
    }, EXIT_MS);
    timers.current.push(t);
  };

  // Up/down chevrons step through the tabs (Apple-style). From the closed
  // state, either arrow opens the first tab.
  const go = (dir: -1 | 1) => {
    const base = activeIndex < 0 ? 0 : activeIndex;
    const next = Math.min(FEATURES.length - 1, Math.max(0, base + (activeIndex < 0 ? 0 : dir)));
    select(next);
  };

  // The Colors tab (index 0) shows the selected finish; other tabs show their own image.
  const activeColors = FEATURES[imgIndex].colors;
  const currentSrc = activeColors
    ? activeColors[colorIndex].image
    : FEATURES[imgIndex].image;

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
        /* Subtle cross-fade for swapping colors (no horizontal slide) */
        @keyframes clImgFadeOut {
          to { opacity: 0; transform: scale(0.985); }
        }
        @keyframes clImgFadeIn {
          from { opacity: 0; transform: scale(1.015); }
          to { opacity: 1; transform: scale(1); }
        }
        .cl-img-fadeout { animation: clImgFadeOut ${EXIT_MS}ms ease forwards !important; }
        .cl-img-fadein { animation: clImgFadeIn 460ms ease forwards !important; }

        /* Pill list overlaid on the left */
        .cl-list {
          position: absolute;
          left: clamp(60px, 7%, 140px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          width: min(468px, 84%);
        }
        .cl-pill {
          width: auto;
          max-width: 100%;
          text-align: left;
          cursor: pointer;
          border: none;
          border-radius: 28px;
          /* clip content to the pill's shape so the fixed-width card content
             can never spill past the rounded edges while the pill snaps to its
             narrow width during collapse */
          overflow: hidden;
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
        /* Active pill expands in place into a wider, taller card. */
        .cl-pill.is-active {
          width: 100%;
          max-width: 100%;
          cursor: default;
          background: rgba(40, 40, 43, 0.82);
        }
        .cl-pill.is-active:hover { background: rgba(40, 40, 43, 0.82); }

        .cl-pill-row {
          display: flex;
          align-items: center;
          gap: 14px;
          height: 56px;
          overflow: hidden;
          transition: height 440ms cubic-bezier(0.32, 0.72, 0, 1),
            opacity 240ms ease;
        }
        /* On open the row collapses to nothing while the expand grows to fill.
           Both are transitions, so closing plays the exact reverse. */
        .cl-pill.is-active .cl-pill-row { height: 0; opacity: 0; }
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

        /* The active pill's content: it smoothly expands its own height as the
           grid rows open, so the pill grows into a card in place. */
        .cl-pill-expand {
          display: grid;
          grid-template-rows: 0fr;
          /* width:0 + min-width:100% stops this always-mounted (but collapsed)
             content from widening the pill: it contributes 0 to the pill's
             auto width, so collapsed pills keep hugging their row/label, while
             it still fills the full width when the pill is open. */
          width: 0;
          min-width: 100%;
          opacity: 0;
          /* This (collapsed) state's transition is the one used WHEN COLLAPSING.
             Keep the height curve at 440ms (smooth reverse of expand), but fade
             the content out fast so the swatches/text don't linger getting
             clipped as the pill snaps to its narrow width. */
          transition: grid-template-rows 440ms cubic-bezier(0.32, 0.72, 0, 1),
            opacity 130ms ease;
        }
        .cl-pill.is-active .cl-pill-expand {
          grid-template-rows: 1fr;
          opacity: 1;
          /* This (open) state's transition is used WHEN EXPANDING: normal,
             gentle fade-in that grows together with the height. */
          transition: grid-template-rows 440ms cubic-bezier(0.32, 0.72, 0, 1),
            opacity 320ms ease;
        }
        .cl-pill-expand-inner {
          overflow: hidden;
          /* Fixed width = the open card's content width. Because it never
             tracks the pill, the text does NOT reflow when the pill snaps
             narrow on collapse, so the height animation stays smooth instead
             of briefly growing taller. When collapsed it just overflows the
             narrow pill at height 0 (invisible). */
          width: 420px;
        }
        /* Padding lives on this inner wrapper, NOT on the clipped element above.
           Padding on the overflow:hidden element would not collapse with the
           grid row, leaving empty space below the label when closed.
           The 6px horizontal padding also keeps the selected swatch's ring
           from being clipped on the left. */
        .cl-pill-expand-pad {
          padding: 28px 6px;
        }
        .cl-card-desc {
          margin: 0;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.5;
          color: rgba(245, 245, 247, 0.8);
          white-space: normal;
        }
        .cl-card-desc strong {
          color: #f5f5f7;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .cl-swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: 26px;
        }

        /* Up/down navigation chevrons, to the left of the pill list */
        .cl-nav {
          position: absolute;
          left: clamp(12px, 2.4%, 40px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cl-nav-btn {
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(42, 42, 45, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: inset 0 0 0.5px 0 rgba(0, 0, 0, 0.11);
          transition: background 220ms ease, transform 220ms ease;
        }
        .cl-nav-btn:hover { background: rgba(60, 60, 64, 0.82); }
        .cl-nav-btn:active { transform: scale(0.92); }
        .cl-nav-btn:disabled { opacity: 0.32; cursor: default; }
        .cl-swatch {
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          line-height: 0;
          border-radius: 50%;
        }
        .cl-swatch-dot {
          display: block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex: none;
          transition: box-shadow 200ms ease;
        }
        .cl-swatch:hover .cl-swatch-dot {
          box-shadow: 0 0 0 2.5px rgba(40, 40, 43, 1), 0 0 0 3.5px rgba(245, 245, 247, 0.4);
        }
        .cl-swatch.is-selected .cl-swatch-dot {
          box-shadow: 0 0 0 2.5px rgba(40, 40, 43, 1), 0 0 0 4px rgba(245, 245, 247, 0.85);
        }

        /* --- Entrance timeline ---
           1. title fades up
           2. black card fades up (stage)
           3. image slides in from the right
           4. the lead pill (#3) appears as a small circle and smoothly
              expands into its pill shape
           5. the remaining five pills bubble in, top to bottom */
        .cl-viewer { opacity: 0; transform: translateY(28px); }
        .cl-img { opacity: 0; }
        .cl-pill { opacity: 0; }
        .cl-nav { opacity: 0; }

        .cl.is-in .cl-viewer {
          animation: clUp 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cl.is-in .cl-nav {
          animation: clFade 600ms ease 2450ms forwards;
        }
        .cl.is-in .cl-img {
          animation: clSlideRight 720ms cubic-bezier(0.22, 1, 0.36, 1) 450ms forwards;
        }
        .cl.is-in .cl-pill-bubble {
          animation: clBubble 1100ms cubic-bezier(0.65, 0, 0.35, 1) var(--d, 0ms) both;
        }
        .cl.is-in .cl-pill-pop {
          transform-origin: left center;
          animation: clPop 520ms cubic-bezier(0.34, 1.25, 0.64, 1) var(--d, 0ms) both;
        }

        @keyframes clUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes clFade { to { opacity: 1; } }
        @keyframes clSlideRight {
          from { opacity: 0; transform: translateX(90px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        /* lead pill: a small circle pops in on the left, holds for a beat,
           then unclips horizontally to reveal the full pill shape. The clip is
           a stadium inset so the left cap stays a perfect circle throughout. */
        @keyframes clBubble {
          0%   { opacity: 0; clip-path: inset(0 calc(100% - 56px) 0 0 round 999px); }
          14%  { opacity: 1; clip-path: inset(0 calc(100% - 56px) 0 0 round 999px); }
          42%  { opacity: 1; clip-path: inset(0 calc(100% - 56px) 0 0 round 999px); }
          100% { opacity: 1; clip-path: inset(0 0 0 0 round 28px); }
        }
        /* the rest: a gentle bubble pop, no circle morph */
        @keyframes clPop {
          0%   { opacity: 0; transform: scale(0.7); }
          60%  { opacity: 1; }
          75%  { transform: scale(1.03); }
          100% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 860px) {
          .cl-img { padding-left: clamp(28px, 5vw, 80px); padding-top: clamp(120px, 30vh, 220px); object-position: bottom; }
          .cl-list { left: clamp(16px, 5%, 40px); top: clamp(20px, 5%, 40px); transform: none; width: min(86%, 340px); }
          /* pills are directly tappable on touch; the floating chevrons would
             sit far below the top-anchored list, so drop them here. */
          .cl-nav { display: none; }
        }
        @media (max-width: 640px) {
          .cl-viewer { height: clamp(560px, 86vh, 760px); }
          .cl-img { padding-top: clamp(260px, 40vh, 360px); }
          .cl-pill-row { height: 46px; }
          .cl-pill-icon { width: 20px; height: 20px; }
          .cl-pill-label { font-size: 15px; }
          .cl-pill { padding: 0 18px; }
          .cl-card-desc { font-size: 15px; }
          .cl-pill-expand-pad { padding: 22px 6px; }
          /* match the open card width on mobile so the text never reflows
             on collapse (kept just under the pill's content width) */
          .cl-pill-expand-inner { width: min(304px, calc(86vw - 64px)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cl-viewer, .cl-title, .cl-img, .cl-pill, .cl-nav {
            opacity: 1 !important; animation: none !important;
          }
          .cl-viewer, .cl-title, .cl-img, .cl-pill { transform: none !important; }
          .cl-img-out, .cl-img-in { animation: none !important; }
          .cl-pill-row, .cl-pill-expand { transition: none !important; }
        }
      `}</style>

      <div className="cl-head">
        <h2 className="cl-title" data-reveal>Take a closer look.</h2>
      </div>

      <div className="cl-viewer" ref={viewerRef}>
        <img
          className={`cl-img ${
            imgPhase === "out"
              ? swapMode === "fade"
                ? "cl-img-fadeout"
                : "cl-img-out"
              : imgPhase === "in"
              ? swapMode === "fade"
                ? "cl-img-fadein"
                : "cl-img-in"
              : ""
          }`}
          src={currentSrc}
          alt={FEATURES[imgIndex].label}
        />

        <div className="cl-nav">
          <button
            type="button"
            className="cl-nav-btn"
            onClick={() => go(-1)}
            disabled={activeIndex <= 0}
            aria-label="Previous feature"
          >
            <Chevron dir="up" />
          </button>
          <button
            type="button"
            className="cl-nav-btn"
            onClick={() => go(1)}
            disabled={activeIndex >= FEATURES.length - 1}
            aria-label="Next feature"
          >
            <Chevron dir="down" />
          </button>
        </div>

        <div className="cl-list">
          {FEATURES.map((f, i) => {
            const isActive = i === activeIndex;
            // pill #3 (index 2) leads: it grows from a circle into a pill.
            // Once it has settled, the rest bubble in evenly, top to bottom.
            const isBubble = i === 2;
            const delay = isBubble ? 700 : 1900 + i * 90;
            return (
              <Fragment key={f.id}>
                <div
                  role="button"
                  tabIndex={0}
                  className={`cl-pill ${isBubble ? "cl-pill-bubble" : "cl-pill-pop"} ${
                    isActive ? "is-active" : ""
                  }`}
                  style={{ ["--d" as string]: `${delay}ms` }}
                  onClick={() => select(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(i);
                    }
                  }}
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

                  <div className="cl-pill-expand" aria-hidden={!isActive}>
                    <div className="cl-pill-expand-inner">
                      <div className="cl-pill-expand-pad">
                        <p className="cl-card-desc">
                          <strong>{f.title}.</strong> {f.description}
                        </p>
                        {f.colors ? (
                          <div className="cl-swatches">
                            {f.colors.map((c, ci) => (
                              <button
                                type="button"
                                className={`cl-swatch ${ci === colorIndex ? "is-selected" : ""}`}
                                key={c.name}
                                tabIndex={isActive ? 0 : -1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectColor(ci);
                                }}
                                aria-label={c.name}
                                aria-pressed={ci === colorIndex}
                              >
                                <span
                                  className="cl-swatch-dot"
                                  style={{
                                    background: c.swatch,
                                    border: c.border ? `1px solid ${c.border}` : "none",
                                  }}
                                />
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
