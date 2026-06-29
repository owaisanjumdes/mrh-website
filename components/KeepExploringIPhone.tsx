"use client";

import {
  Layers,
  AirVent,
  Maximize2,
  Wind,
  RefreshCw,
  Timer,
  Volume1,
  Zap,
  Clock,
  Wallet,
  ShieldCheck,
  Wrench,
  Gauge,
  Building2,
  Factory,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/lib/useInView";

// "Find your PureAir" spec sheet — Apple "Keep exploring" layout adapted to the
// three MRH PureAir variants. #1d1d1f section, black rounded card with three
// variant columns (PureAir / Pro / Max): render, swatches, name, price, then an
// aligned, icon-led spec grid where every row lines up across the columns.

type Variant = { phone: string; swatches: string[]; name: string; price: string };
type Cell = { big?: string; unit?: string; text: string; small?: boolean };
type SpecRow = { Icon: LucideIcon; cells: [Cell, Cell, Cell] };

// Shared finishes (Rose Gold, Silver, Pearl White, Graphite Gray).
const SWATCHES = ["#eea487", "#c8c5c1", "#f3f0ec", "#343b47"];

const VARIANTS: Variant[] = [
  { phone: "/pwp.png", swatches: SWATCHES, name: "PureAir", price: "₹XX,XXX" },
  { phone: "/fronts.png", swatches: SWATCHES, name: "PureAir Pro", price: "₹XX,XXX" },
  { phone: "/sp.png", swatches: SWATCHES, name: "PureAir Max", price: "₹XX,XXX" },
];

// Same spec across all three variants.
const same = (c: Cell): [Cell, Cell, Cell] => [c, c, c];

// Apple tech-spec style: one row per category, fixed order so columns align.
// Coverage leads. Number-led specs render a large figure + small unit with a
// caption beneath; text-only specs render as a single lead line.
const SPEC_ROWS: SpecRow[] = [
  { Icon: Maximize2, cells: [
    { big: "400", unit: "sq ft", text: "Coverage area" },
    { big: "~2,000", unit: "sq ft", text: "Coverage area" },
    { big: "~2,000", unit: "sq ft", text: "Coverage area" },
  ] },
  { Icon: Layers, cells: [
    { big: "4-Stage", text: "Advanced filtration system" },
    { big: "10-Stage", text: "Advanced filtration system" },
    { big: "14-Stage", text: "Advanced filtration system" },
  ] },
  { Icon: AirVent, cells: [
    { big: "2 + 2", unit: "filters", text: "Pre-filters + Main-filters" },
    { big: "4 + 6", unit: "filters", text: "Pre-filters + Main-filters" },
    { big: "6 + 8", unit: "filters", text: "Pre-filters + Main-filters" },
  ] },
  { Icon: Wind, cells: same({ text: "Captures PM2.5, PM10, and NO2" }) },
  { Icon: RefreshCw, cells: same({ big: "30", unit: "/hr", text: "Air exchanges, rated for 1,000 sq ft" }) },
  { Icon: Timer, cells: same({ big: "4", unit: "min", text: "Full air recirculation, 1,000 sq ft" }) },
  { Icon: Volume1, cells: same({ big: "<55", unit: "dB", text: "Low-noise operation" }) },
  { Icon: Zap, cells: same({ big: "<80", unit: "W", text: "Energy-efficient" }) },
  { Icon: Clock, cells: same({ big: "3,000–4,000", unit: "hrs", text: "≈ 18–24 months of use", small: true }) },
  { Icon: Wallet, cells: same({ text: "Low operating cost. Highly effective against PM2.5, PM10, VOCs, and allergens." }) },
  { Icon: ShieldCheck, cells: same({ big: "ISO 16890", text: "Clean-room certified" }) },
  { Icon: Wrench, cells: same({ text: "Wall-mounted design" }) },
  { Icon: Gauge, cells: same({ text: "Onboard AQI display" }) },
  { Icon: Building2, cells: same({ text: "Schools, offices, meeting rooms, warehouses, residences, libraries, labs" }) },
  { Icon: Factory, cells: same({ text: "Mass-production ready. Made in India." }) },
];

export default function KeepExploringIPhone() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`kei ${inView ? "is-in" : ""}`}
      aria-label="Find your PureAir"
    >
      <style>{`
        .kei {
          --gutter: clamp(20px, 6vw, 88px);
          background: #1d1d1f;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 10vh, 160px) var(--gutter) clamp(72px, 10vh, 160px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .kei-wrap { max-width: 1260px; margin: 0 auto; }
        .kei-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: clamp(24px, 3vw, 40px);
        }
        .kei-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(30px, 4vw, 56px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.03em;
          white-space: nowrap;
        }
        .kei-explore {
          flex: none;
          color: #2997ff;
          font-size: 17px;
          letter-spacing: -0.022em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .kei-explore:hover { text-decoration: underline; }

        .kei-card {
          background: #000000;
          border-radius: 28px;
          padding: clamp(56px, 8vw, 120px) clamp(16px, 3vw, 48px) clamp(56px, 8vw, 96px);
        }
        .kei-list { width: min(1160px, 100%); margin: 0 auto; }

        .kei-products { display: flex; gap: clamp(16px, 2.6vw, 20px); }
        .kei-product {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .kei-phone { display: block; width: clamp(200px, 100%, 420px); height: auto; }
        .kei-swatches {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 24px;
        }
        .kei-swatch { width: 12px; height: 12px; border-radius: 6px; }
        .kei-new {
          margin: 24px 0 0;
          color: #ff791b;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.33;
          letter-spacing: -0.01em;
        }
        .kei-name {
          margin: 8px 0 0;
          color: #f5f5f7;
          font-size: clamp(22px, 2.2vw, 27px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: 0.007em;
        }
        .kei-price {
          margin: 20px 0 0;
          color: #f5f5f7;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.47;
          letter-spacing: -0.022em;
        }
        .kei-cta {
          height: 44px;
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 980px;
          font-size: 17px;
          letter-spacing: -0.022em;
          text-decoration: none;
        }
        .kei-cta--viewing { color: #d2d2d7; }
        .kei-cta--learn { background: #0071e3; color: #ffffff; padding: 0 24px; }
        .kei-cta--learn:hover { background: #0077ed; }
        .kei-viewpricing {
          margin-top: 18px;
          color: #2997ff;
          font-size: 17px;
          letter-spacing: -0.022em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .kei-viewpricing:hover { text-decoration: underline; }

        .kei-divider {
          height: 1px;
          background: #424245;
          margin: clamp(28px, 4vw, 48px) 0;
        }

        /* Row-major grid: each spec row's three cells share a grid track, so
           rows line up across the three variant columns regardless of text
           length. A border-top on every cell forms a continuous row rule. */
        .kei-specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: clamp(16px, 2.6vw, 20px);
          margin-top: clamp(28px, 4vw, 48px);
        }
        .kei-spec {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: clamp(18px, 2vw, 24px) 8px;
          border-top: 1px solid #2f2f31;
        }
        .kei-spec-icon { width: 26px; height: 26px; flex: none; color: #a1a1a6; }
        /* Big lead figure with a small trailing unit, Apple tech-spec style. */
        .kei-big {
          margin: 0;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
          color: #f5f5f7;
          font-size: clamp(26px, 2.9vw, 40px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        /* Long figures (e.g. a range) shrink to stay on one line. */
        .kei-big--sm { font-size: clamp(17px, 1.7vw, 24px); }
        .kei-unit { font-size: 0.4em; font-weight: 500; letter-spacing: 0; color: #86868b; }
        .kei-text {
          margin: 8px 0 0;
          color: #86868b;
          font-size: clamp(12px, 1.05vw, 13.5px);
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }
        /* Text-only specs read as a lead line (no figure above them). */
        .kei-text--lead { margin: 0; color: #f5f5f7; font-size: clamp(13px, 1.2vw, 15px); font-weight: 500; }

        @media (max-width: 700px) {
          .kei-phone { width: 96%; }
          .kei-spec { padding: 14px 4px; gap: 9px; }
          .kei-spec-icon { width: 22px; height: 22px; }
          .kei-big { font-size: clamp(17px, 4.6vw, 26px); }
          .kei-big--sm { font-size: clamp(13px, 3.2vw, 18px); }
          .kei-text { font-size: 11px; margin-top: 6px; }
          .kei-text--lead { font-size: 12px; }
        }
        @media (max-width: 560px) {
          .kei-name { font-size: 20px; }
          .kei-price { font-size: 15px; }
        }
      `}</style>

      <div className="kei-wrap">
        <div className="kei-head" data-reveal>
          <h2 className="kei-title">Find your PureAir</h2>
        </div>

        <div className="kei-card" data-reveal style={{ ["--ri" as string]: 1 }}>
          <div className="kei-list">
            {/* Variant tops */}
            <div className="kei-products">
              {VARIANTS.map((p) => (
                <div className="kei-product" key={p.name}>
                  <img loading="lazy" className="kei-phone" src={p.phone} alt={p.name} />
                  <div className="kei-swatches">
                    {p.swatches.map((c, i) => (
                      <span className="kei-swatch" key={i} style={{ background: c }} />
                    ))}
                  </div>
                  <p className="kei-name">{p.name}</p>
                  <p className="kei-price">{p.price}</p>
                </div>
              ))}
            </div>

            {/* Spec rows, aligned across the three variant columns */}
            <div className="kei-specs">
              {SPEC_ROWS.map((row, i) =>
                row.cells.map((cell, c) => (
                  <div className="kei-spec" key={`${i}-${c}`}>
                    <row.Icon className="kei-spec-icon" strokeWidth={1.5} aria-hidden />
                    {cell.big ? (
                      <p className={cell.small ? "kei-big kei-big--sm" : "kei-big"}>
                        {cell.big}
                        {cell.unit ? <span className="kei-unit">{cell.unit}</span> : null}
                      </p>
                    ) : null}
                    <p className={cell.big ? "kei-text" : "kei-text kei-text--lead"}>{cell.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
