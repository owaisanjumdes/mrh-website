"use client";

import { useEffect, useState } from "react";
import {
  Maximize2,
  Layers,
  Wind,
  Gauge,
  Wallet,
  ChevronLeft,
  ChevronRight,
  X,
  type LucideIcon,
} from "lucide-react";

// "Compare PureAir Design" — adapted from Figma node 859:4743 (Apple's "Compare
// latest iPhone models" module). A glass pill sticks to the bottom of the Design
// section; clicking it opens a centered modal with three PureAir rows whose
// feature cards scroll horizontally, driven by the bottom tab bar and arrows.
//
// Product images, variant names and specs are reused from the "Find Your PureAir"
// section (KeepExploringIPhone.tsx) so the two stay in sync.

type Cell = {
  img?: boolean;
  big?: string;
  unit?: string;
  title?: string;
  lines?: string[];
};
type Model = { name: string; tag?: string; image: string };
type Category = { id: string; label: string; Icon: LucideIcon; cells: [Cell, Cell, Cell] };

const MODELS: Model[] = [
  { name: "PureAir", image: "/pmm.png" },
  { name: "PureAir Pro", tag: "Most popular", image: "/pap.png" },
  { name: "PureAir Max", image: "/frg.png" },
];

// One shared cell repeated across all three variants.
const same = (c: Cell): [Cell, Cell, Cell] => [c, c, c];

const CATEGORIES: Category[] = [
  {
    id: "coverage",
    label: "Coverage",
    Icon: Maximize2,
    cells: [
      { img: true, big: "400", unit: "sq ft", lines: ["Coverage area"] },
      { img: true, big: "~2,000", unit: "sq ft", lines: ["Coverage area"] },
      { img: true, big: "~2,000", unit: "sq ft", lines: ["Coverage area"] },
    ],
  },
  {
    id: "filter",
    label: "Filtration",
    Icon: Layers,
    cells: [
      { img: true, title: "4-Stage filtration", lines: ["2 + 2 filters", "PM2.5, PM10, NO2"] },
      { img: true, title: "10-Stage filtration", lines: ["4 + 6 filters", "PM2.5, PM10, NO2"] },
      { img: true, title: "Multi-Stage filtration", lines: ["6 + 8 filters", "PM2.5, PM10, NO2"] },
    ],
  },
  {
    id: "airflow",
    label: "Airflow",
    Icon: Wind,
    cells: same({ big: "30", unit: "/hr", lines: ["Air exchanges", "4 min full recirculation"] }),
  },
  {
    id: "sensor",
    label: "Sensors",
    Icon: Gauge,
    cells: same({ title: "Onboard AQI display", lines: ["Live PM2.5 / PM10", "ISO 16890 certified"] }),
  },
  {
    id: "price",
    label: "Price",
    Icon: Wallet,
    cells: same({ big: "₹XX,XXX", lines: ["Low operating cost", "Made in India"] }),
  },
];

export default function ComparePureAir() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const n = CATEGORIES.length;

  const prev = () => setActive((i) => (i - 1 + n) % n);
  const next = () => setActive((i) => (i + 1) % n);

  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Track shift: each step is one card width (100% of the viewport minus the 44px
  // peek) plus the 12px gap, i.e. (100% - 32px). The track's width is pinned to
  // 100% so the percentage resolves against the viewport, not the overflowing row.
  const trackShift = `translateX(calc(${active} * (32px - 100%)))`;

  return (
    <>
      <button
        type="button"
        className="ds-cta reveal-bubble"
        data-reveal
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="ds-cta-label">Compare PureAir Design</span>
        <span className="ds-cta-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {open ? (
        <div
          className="cpa-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Compare PureAir models"
          onClick={() => setOpen(false)}
        >
          <div className="cpa-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cpa-close"
              onClick={() => setOpen(false)}
              aria-label="Close comparison"
            >
              <X strokeWidth={2.2} aria-hidden />
            </button>

            <h2 className="cpa-modal-title">
              Compare PureAir
              <br />
              models.
            </h2>

            <div className="cpa-gallery">
              <div className="cpa-rows">
                {MODELS.map((m, ri) => (
                  <div className="cpa-row" key={m.name}>
                    <div className="cpa-rowlabel">
                      <span className="cpa-rowname">{m.name}</span>
                      {m.tag ? <span className="cpa-rowtag">{m.tag}</span> : null}
                    </div>
                    <div className="cpa-vp">
                      <div className="cpa-track" style={{ transform: trackShift }}>
                        {CATEGORIES.map((c) => {
                          const cell = c.cells[ri];
                          return (
                            <div className="cpa-card" key={c.id}>
                              {cell.img ? (
                                <div className="cpa-card-img">
                                  <img loading="lazy" src={m.image} alt={m.name} />
                                </div>
                              ) : null}
                              <div className={`cpa-card-text ${cell.img ? "" : "is-wide"}`}>
                                {cell.big ? (
                                  <p className="cpa-card-big">
                                    {cell.big}
                                    {cell.unit ? <span className="cpa-card-unit">{cell.unit}</span> : null}
                                  </p>
                                ) : null}
                                {cell.title ? <p className="cpa-card-title">{cell.title}</p> : null}
                                {cell.lines?.length ? (
                                  <ul className="cpa-card-lines">
                                    {cell.lines.map((l, i) => (
                                      <li key={i}>{l}</li>
                                    ))}
                                  </ul>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cpa-foot">
              <div className="cpa-arrows">
                <button type="button" className="cpa-arrow" onClick={prev} aria-label="Previous feature">
                  <ChevronLeft aria-hidden />
                </button>
                <button type="button" className="cpa-arrow" onClick={next} aria-label="Next feature">
                  <ChevronRight aria-hidden />
                </button>
              </div>

              <div className="cpa-tabs" role="tablist" aria-label="Compare by feature">
                {CATEGORIES.map((c, i) => {
                  const Icon = c.Icon;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      className={`cpa-tab ${i === active ? "is-active" : ""}`}
                      onClick={() => setActive(i)}
                    >
                      <Icon className="cpa-tab-ico" strokeWidth={1.8} aria-hidden />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <style>{`
        .cpa-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(12px, 3vw, 32px);
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px) saturate(120%);
          -webkit-backdrop-filter: blur(10px) saturate(120%);
          animation: cpaFade 240ms ease both;
        }
        @keyframes cpaFade { from { opacity: 0; } to { opacity: 1; } }

        .cpa-modal {
          position: relative;
          width: min(600px, 100%);
          max-height: min(88vh, 800px);
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: clamp(22px, 2.4vw, 30px);
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          animation: cpaPop 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes cpaPop {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }

        .cpa-close {
          position: absolute;
          top: clamp(18px, 2vw, 26px);
          right: clamp(18px, 2vw, 26px);
          z-index: 5;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: #1d1d1f;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 200ms ease, transform 200ms ease;
        }
        .cpa-close:hover { background: #000000; transform: scale(1.05); }
        .cpa-close svg { width: 20px; height: 20px; }

        .cpa-modal-title {
          flex: none;
          margin: 0;
          padding: clamp(28px, 3.4vw, 40px) clamp(64px, 8vw, 80px) clamp(16px, 2vw, 24px) clamp(24px, 3vw, 34px);
          color: #1d1d1f;
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
        }

        .cpa-gallery {
          position: relative;
          flex: 1;
          min-height: 0;
          /* Cap the scroll area so the third row (PureAir Max) always peeks,
             signalling there's more to scroll rather than cutting cleanly. */
          max-height: min(56vh, 500px);
          overflow-y: auto;
          padding: 0 clamp(20px, 3vw, 30px) clamp(8px, 1.5vw, 16px);
        }
        .cpa-rows { display: flex; flex-direction: column; gap: clamp(16px, 2vw, 24px); }
        .cpa-row { display: flex; flex-direction: column; gap: 8px; }
        .cpa-rowlabel { display: flex; align-items: baseline; gap: 10px; }
        .cpa-rowname {
          color: #1d1d1f;
          font-size: clamp(15px, 1.4vw, 17px);
          font-weight: 600;
          letter-spacing: -0.022em;
        }
        .cpa-rowtag {
          color: #b64400;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        .cpa-vp { width: 100%; overflow: hidden; }
        .cpa-track {
          width: 100%;
          display: flex;
          gap: 12px;
          transition: transform 480ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cpa-card {
          flex: 0 0 calc(100% - 44px);
          min-height: 150px;
          display: flex;
          align-items: stretch;
          background: #f5f5f7;
          border-radius: 12px;
          overflow: hidden;
        }
        .cpa-card-img {
          flex: none;
          width: clamp(112px, 38%, 156px);
          background: #ececf0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cpa-card-img img { width: 100%; height: 100%; object-fit: contain; }
        .cpa-card-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding: clamp(16px, 2vw, 22px) clamp(18px, 2vw, 24px);
        }
        .cpa-card-text.is-wide { padding-left: clamp(22px, 2.6vw, 30px); }
        .cpa-card-big {
          margin: 0;
          display: flex;
          align-items: baseline;
          gap: 4px;
          color: #1d1d1f;
          font-size: clamp(30px, 3.4vw, 40px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }
        .cpa-card-unit { font-size: 0.4em; font-weight: 500; letter-spacing: 0; color: #86868b; }
        .cpa-card-title {
          margin: 0;
          color: #1d1d1f;
          font-size: clamp(16px, 1.5vw, 18px);
          font-weight: 600;
          letter-spacing: -0.022em;
          line-height: 1.25;
        }
        .cpa-card-lines {
          list-style: none;
          margin: 6px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .cpa-card-lines li {
          color: #6e6e73;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        /* Footer holds the tab bar with the floating arrows anchored just above it. */
        .cpa-foot { position: relative; flex: none; }

        /* Floating prev/next, centered just above the tab bar like the Figma. */
        .cpa-arrows {
          position: absolute;
          left: 50%;
          bottom: 100%;
          transform: translate(-50%, -10px);
          display: flex;
          gap: 10px;
          z-index: 4;
          pointer-events: none;
        }
        .cpa-arrow {
          pointer-events: auto;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: none;
          background: rgba(232, 232, 237, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #1d1d1f;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 200ms ease;
        }
        .cpa-arrow:hover { background: rgba(220, 220, 225, 0.95); }
        .cpa-arrow svg { width: 20px; height: 20px; }

        /* Bottom category tab bar (sticky within the modal). */
        .cpa-tabs {
          flex: none;
          display: flex;
          gap: 4px;
          padding: clamp(10px, 1.4vw, 14px) clamp(14px, 2vw, 20px) clamp(14px, 2vw, 20px);
          border-top: 1px solid #ededf0;
          background: #ffffff;
        }
        .cpa-tab {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 6px;
          border: none;
          background: transparent;
          border-radius: 12px;
          cursor: pointer;
          color: #6e6e73;
          font-family: inherit;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: -0.02em;
          transition: background 200ms ease, color 200ms ease;
        }
        .cpa-tab.is-active { background: #1d1d1f; color: #ffffff; }
        .cpa-tab-ico { width: 22px; height: 22px; }

        @media (max-width: 520px) {
          .cpa-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .cpa-tab { flex: 0 0 auto; min-width: 72px; }
          .cpa-card-big { font-size: clamp(26px, 8vw, 34px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cpa-overlay, .cpa-modal { animation: none; }
          .cpa-track { transition: none; }
        }
      `}</style>
    </>
  );
}
