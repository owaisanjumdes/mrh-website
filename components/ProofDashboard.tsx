"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, Wind, BarChart3, Gauge, Waves, AudioLines, ShieldCheck } from "lucide-react";

// "We didn't test it ourselves. IIT Delhi did." proof block — the full-width
// "60 Days" hero card followed by the six-card PureAir metrics dashboard.
// Self-contained (own scoped CSS + computed chart data). Everything animates on
// scroll-into-view. Pass `dark` to render dark glass cards (used on the black
// product-page section); default is light glass (home).

const dashIcon = { size: 18, strokeWidth: 2 } as const;
const GREEN = "#30d158";
const GREEN_DEEP = "#1a8f3c";

// Per-card accent pairs — bright fill + deep text/line. Multi-hue for pop, with
// brand green anchoring the headline "overall efficiency" card.
type Ac = { "--ac": string; "--acd": string };
const AC: Record<string, Ac> = {
  green: { "--ac": "#34c759", "--acd": "#1a8f3c" },
  cyan: { "--ac": "#22c1d6", "--acd": "#0e8194" },
  blue: { "--ac": "#0a84ff", "--acd": "#0060df" },
  brand: { "--ac": "#30d158", "--acd": "#1a8f3c" },
  violet: { "--ac": "#bf5af2", "--acd": "#8e3fb0" },
  orange: { "--ac": "#ff9f0a", "--acd": "#c76d00" },
};
const acStyle = (a: Ac) => a as unknown as React.CSSProperties;
const barStyle = (w: string, d: number) =>
  ({ "--w": w, "--d": `${d}s` }) as unknown as React.CSSProperties;

function buildDashData(inactive: string) {
  const lerp = (a: number[], b: number[], f: number) => {
    const c = [0, 1, 2].map((k) => Math.round(a[k] + (b[k] - a[k]) * f));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  };
  const gLight = [150, 214, 170];
  const gDark = [26, 143, 60];

  // Semicircular tick gauge (84-90% -> ~0.87 active)
  const gcx = 140, gcy = 150, gR = 120, gr = 108, gN = 60, gActive = 0.87;
  const gaugeTicks: { x1: number; y1: number; x2: number; y2: number; color: string; w: number }[] = [];
  for (let i = 0; i < gN; i++) {
    const f = i / (gN - 1);
    const ang = ((180 - f * 180) * Math.PI) / 180;
    const x1 = gcx + gr * Math.cos(ang), y1 = gcy - gr * Math.sin(ang);
    const x2 = gcx + gR * Math.cos(ang), y2 = gcy - gR * Math.sin(ang);
    let color: string, w: number;
    if (f <= gActive) { color = lerp(gLight, gDark, f / gActive); w = 3.2; }
    else { color = inactive; w = 2.2; }
    gaugeTicks.push({ x1: +x1.toFixed(1), y1: +y1.toFixed(1), x2: +x2.toFixed(1), y2: +y2.toFixed(1), color, w });
  }
  const aMid = (gr + gR) / 2, aAng = ((180 - gActive * 180) * Math.PI) / 180;
  const markerX = +(gcx + aMid * Math.cos(aAng)).toFixed(1);
  const markerY = +(gcy - aMid * Math.sin(aAng)).toFixed(1);

  // Vertical audio-style bars + center playhead
  const abN = 36, abW = 4, abGap = 4, abLeft = 10, abCY = 54, abMax = 44, playIdx = 22;
  const audioBars: { x: number; y: number; h: number; w: number; op: number }[] = [];
  for (let i = 0; i < abN; i++) {
    const base = Math.sin(i * 0.55) * 0.5 + 0.5;
    const noise = Math.sin(i * 1.7 + 1) * 0.25 + 0.75;
    const h = Math.max(6, (0.25 + 0.7 * base * noise) * abMax);
    const hNorm = Math.min(1, (h - 6) / (abMax - 6));
    const x = abLeft + i * (abW + abGap);
    audioBars.push({ x: +x.toFixed(1), y: +(abCY - h / 2).toFixed(1), h: +h.toFixed(1), w: abW, op: +(0.35 + 0.6 * hNorm).toFixed(2) });
  }
  const playheadX = +(abLeft + playIdx * (abW + abGap) + abW / 2).toFixed(1);

  // Soft waveform (Air Quality Score)
  const wfW = 300, wfH = 92, wfN = 64;
  const pts: number[][] = [];
  for (let i = 0; i < wfN; i++) {
    const t = i / (wfN - 1);
    const x = t * wfW;
    const y = 58 - (Math.sin(t * Math.PI * 2.2) * 0.5 + 0.5) * 30 - Math.sin(t * Math.PI * 6 + 1) * 4.5;
    pts.push([+x.toFixed(1), +Math.max(8, Math.min(74, y)).toFixed(1)]);
  }
  const wfLine = "M" + pts.map((p) => p[0] + "," + p[1]).join(" L");
  const wfFill = wfLine + ` L${wfW},${wfH} L0,${wfH} Z`;

  return { gaugeTicks, markerX, markerY, audioBars, playheadX, wfLine, wfFill };
}

const DASH = buildDashData("rgba(0,0,0,0.07)");
const DASH_DARK = buildDashData("rgba(255,255,255,0.12)");

// Count-up number that runs once, when `run` flips true (scroll-into-view).
function CountUp({ to, run, className }: { to: number; run: boolean; className?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return;
    }
    if (!run) return;
    let raf = 0;
    let start = 0;
    const dur = 1400;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(e * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <span className={className}>{n}</span>;
}

export default function ProofDashboard({ dark = false }: { dark?: boolean } = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // On phones the metric cards become a horizontal slider; the arrows step it by
  // exactly one card (measured from the pitch between the first two cards).
  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".pd2-card");
    const pitch =
      cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : el.clientWidth;
    el.scrollBy({ left: dir * pitch, behavior: "smooth" });
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cardText = dark ? "#f5f5f7" : "#1d1d1f";
  const muted = dark ? "#a1a1a6" : "#6e6e73";
  const subtle = "#86868b";
  const gridLine = dark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.1)";
  const offDot = dark ? "rgba(255,255,255,0.34)" : "#c7c7cc";
  const dash = dark ? DASH_DARK : DASH;
  const run = inView;

  return (
    <div className={`pd ${dark ? "pd-dark" : ""} ${inView ? "is-in" : ""}`} ref={rootRef}>
      <style>{CSS}</style>

      {/* full-width "60 Days" hero card */}
      <article className="pd-hero" data-reveal>
        <div className="pd-hero-media"><img loading="lazy" src="/IIIT.jpg" alt="IIT Delhi study" /></div>
        <div className="pd-hero-text">
          <p className="pd-hero-label">The Duration</p>
          <p className="pd-hero-num"><CountUp to={60} run={run} /> Days</p>
          <p className="pd-hero-desc">Continuous field testing, not a lab simulation.</p>
        </div>
      </article>

      {/* six-card metrics bento */}
      <div className="pd2" data-reveal style={{ ["--ri" as string]: 1 }}>
        <div className="pd2-atmo" aria-hidden>
          <span className="pd2-orb pd2-orb--a" />
          <span className="pd2-orb pd2-orb--b" />
          <span className="pd2-orb pd2-orb--c" />
        </div>

        {/* Prev / next arrows — only shown on phones, where the grid becomes a slider */}
        <button type="button" className="pd2-arrow pd2-arrow--prev" aria-label="Previous" onClick={() => scrollByCard(-1)}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="pd2-arrow pd2-arrow--next" aria-label="Next" onClick={() => scrollByCard(1)}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="pd2-grid" ref={trackRef}>
          {/* AQI recovery — wide top banner (cyan) */}
          <div className="pd2-card pd2-aqi" style={acStyle(AC.cyan)}>
            <div className="pd2-wide">
              <div className="pd2-wide-info">
                <p className="pd2-label"><span className="pd2-ic"><Wind {...dashIcon} /></span> AQI Recovery</p>
                <p className="pd2-num"><CountUp to={3} run={run} />-<CountUp to={6} run={run} /><span className="u">hrs</span></p>
                <p className="pd2-cap">Severe air back to Good, held there.</p>
                <p className="pd2-foot">Held below the WHO guideline</p>
              </div>
              <div className="pd2-wide-chart">
                <svg viewBox="0 0 300 92" width="100%" style={{ display: "block" }}>
                  <defs>
                    <linearGradient id="pdAqF" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--ac)" stopOpacity="0.22" />
                      <stop offset="1" stopColor="var(--ac)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="6" y1="66" x2="294" y2="66" stroke={gridLine} strokeWidth="1" strokeDasharray="2 5" />
                  <text x="294" y="60" textAnchor="end" fontSize="9" fill={muted}>WHO 20 µg/m³</text>
                  <path className="pd2-area" d="M6,14 C46,26 80,58 120,72 C160,84 220,88 294,89 L294,92 L6,92 Z" fill="url(#pdAqF)" />
                  <path className="pd2-draw" pathLength={1} d="M6,14 C46,26 80,58 120,72 C160,84 220,88 294,89" fill="none" stroke="var(--acd)" strokeWidth="2.6" strokeLinecap="round" style={{ filter: "drop-shadow(0 3px 6px color-mix(in srgb, var(--ac) 45%, transparent))" }} />
                  <circle className="pd2-endpt" cx="294" cy="89" r="3.4" fill="var(--acd)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Overall efficiency — tall left (brand green) */}
          <div className="pd2-card pd2-overall" style={acStyle(AC.brand)}>
            <p className="pd2-label"><span className="pd2-ic"><Gauge {...dashIcon} /></span> Overall Efficiency</p>
            <div className="pd2-overall-mid">
              <div className="pd2-gauge">
                <svg viewBox="0 0 280 158" width="100%" style={{ display: "block" }}>
                  {dash.gaugeTicks.map((t, i) => (
                    <line key={i} className="pd2-tick" style={{ animationDelay: `${i * 13}ms` }} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={t.color} strokeWidth={t.w} strokeLinecap="round" />
                  ))}
                  <circle className="pd2-gmark" cx={dash.markerX} cy={dash.markerY} r="4.5" fill={dark ? GREEN : GREEN_DEEP} />
                </svg>
                <div className="pd2-gauge-num">
                  <p className="pd2-num gauge"><CountUp to={84} run={run} />-<CountUp to={90} run={run} /><span className="u">%</span></p>
                </div>
              </div>
              <p className="pd2-cap" style={{ textAlign: "center" }}>Overall reduction, sustained.</p>
            </div>
            <p className="pd2-foot pd2-foot--center">
              <ShieldCheck size={15} strokeWidth={2} /> Verified to ISO Class 1000
            </p>
          </div>

          {/* Particle removal (green) */}
          <div className="pd2-card pd2-particle" style={acStyle(AC.green)}>
            <p className="pd2-label"><span className="pd2-ic"><Layers {...dashIcon} /></span> Particle Removal</p>
            <p className="pd2-num"><CountUp to={99} run={run} /><span className="u">%</span></p>
            <p className="pd2-cap">PM10 mass captured, by particle size.</p>
            <div className="pd2-bars">
              {[{ k: "PM10", v: 99 }, { k: "PM2.5", v: 95 }, { k: "PM0.1", v: 83 }].map((r, i) => (
                <div className="pd2-bar" key={r.k}>
                  <div className="pd2-bar-top">
                    <span style={{ color: muted }}>{r.k}</span>
                    <span className="pd2-bar-val" style={{ color: cardText }}>{r.v}%</span>
                  </div>
                  <div className="pd2-bar-track">
                    <div className="pd2-bar-fill" style={barStyle(`${r.v}%`, i * 0.12)} />
                  </div>
                </div>
              ))}
            </div>
            <p className="pd2-foot">60-day field mean</p>
          </div>

          {/* Air quality score (violet) */}
          <div className="pd2-card pd2-airq" style={acStyle(AC.violet)}>
            <div className="pd2-airq-head">
              <p className="pd2-label" style={{ margin: 0 }}><span className="pd2-ic"><Waves {...dashIcon} /></span> Air Quality Score</p>
              <span className="pd2-badge">Good</span>
            </div>
            <p className="pd2-num" style={{ marginTop: 20 }}><CountUp to={92} run={run} /></p>
            <p className="pd2-cap">Average across tested indoor spaces.</p>
            <div className="pd2-viz">
              <svg viewBox="0 0 300 80" width="100%" style={{ display: "block" }}>
                <defs>
                  <linearGradient id="pdWfF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--ac)" stopOpacity="0.2" />
                    <stop offset="1" stopColor="var(--ac)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="pd2-area" d={dash.wfFill} fill="url(#pdWfF)" />
                <path className="pd2-draw" pathLength={1} d={dash.wfLine} fill="none" stroke="var(--acd)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="pd2-foot pd2-foot--split">
              <span>Indoor <b style={{ color: cardText }}>70-90%</b></span>
              <span>Outdoor <b style={{ color: cardText }}>70-97%</b></span>
            </p>
          </div>

          {/* Removal efficiency (blue) */}
          <div className="pd2-card pd2-removal" style={acStyle(AC.blue)}>
            <p className="pd2-label"><span className="pd2-ic"><BarChart3 {...dashIcon} /></span> Removal Efficiency</p>
            <p className="pd2-num"><CountUp to={83} run={run} /><span className="u">%</span></p>
            <p className="pd2-cap">Sustained mean reduction.</p>
            <div className="pd2-groups">
              {[
                { k: "PM10", on: 95, off: 38 },
                { k: "PM2.5", on: 91, off: 29 },
                { k: "PM1", on: 84, off: 21 },
                { k: "PM0.3", on: 80, off: 17 },
                { k: "PM0.1", on: 75, off: 13 },
              ].map((g, i) => (
                <div className="pd2-group" key={g.k}>
                  <div className="pd2-group-bars">
                    <div className="pd2-gbar pd2-gbar--on" style={barStyle(`${g.on}%`, i * 0.07)} />
                    <div className="pd2-gbar pd2-gbar--off" style={barStyle(`${g.off}%`, i * 0.07 + 0.05)} />
                  </div>
                  <span className="pd2-group-k" style={{ color: subtle }}>{g.k}</span>
                </div>
              ))}
            </div>
            <p className="pd2-foot"><span className="pd2-dot" /> With purifier&nbsp;&nbsp;<span className="pd2-dot" style={{ background: offDot }} /> Without</p>
          </div>

          {/* Filtration performance (orange) */}
          <div className="pd2-card pd2-filtration" style={acStyle(AC.orange)}>
            <p className="pd2-label"><span className="pd2-ic"><AudioLines {...dashIcon} /></span> Filtration Performance</p>
            <p className="pd2-num"><CountUp to={83} run={run} /><span className="u">%</span></p>
            <p className="pd2-cap">Fine particle capture, measured continuously.</p>
            <div className="pd2-viz">
              <svg viewBox="0 0 300 100" width="100%" style={{ display: "block" }}>
                {dash.audioBars.map((b, i) => (
                  <rect key={i} className="pd2-abar" style={barStyle("", i * 0.02)} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill="var(--ac)" opacity={b.op} />
                ))}
                <line x1={dash.playheadX} y1="10" x2={dash.playheadX} y2="98" stroke="var(--acd)" strokeWidth="1.4" strokeDasharray="2 4" opacity="0.5" />
                <circle cx={dash.playheadX} cy="54" r="3.6" fill="var(--acd)" style={{ animation: "pdPulseDot 2.4s ease-in-out infinite" }} />
              </svg>
            </div>
            <p className="pd2-foot">Ultrafine <b style={{ color: cardText }}>66%</b>&nbsp;&nbsp;Fine <b style={{ color: cardText }}>83%</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
  .pd { display: flex; flex-direction: column; gap: clamp(16px, 1.6vw, 22px); margin-top: clamp(36px, 4vw, 60px); font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }

  /* full-width "60 Days" hero card */
  .pd-hero { background: #ffffff; border-radius: 22px; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; min-height: clamp(300px, 30vw, 400px); box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 30px rgba(0,0,0,0.04); }
  .pd-hero-media { position: relative; min-height: clamp(220px, 24vw, 320px); }
  .pd-hero-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .pd-hero-text { padding: clamp(24px, 2.6vw, 40px); align-self: center; }
  .pd-hero-label { margin: 0 0 8px; font-size: clamp(15px, 1.4vw, 18px); font-weight: 600; color: #1a8f3c; }
  .pd-hero-num { margin: 0 0 clamp(10px, 1.2vw, 16px); font-size: clamp(34px, 4.4vw, 56px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.04; color: #1d1d1f; font-variant-numeric: tabular-nums; }
  .pd-hero-desc { margin: 0; font-size: clamp(15px, 1.4vw, 17px); font-weight: 500; line-height: 1.42; color: #6e6e73; max-width: 34ch; }

  /* ---- bento dashboard ---- */
  .pd2 { position: relative; --pd2-track: #e8e8ed; }
  .pd2-atmo { position: absolute; inset: -8% -4%; z-index: 0; pointer-events: none; overflow: hidden; }
  .pd2-orb { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.42; }
  .pd2-orb--a { width: 40%; height: 60%; top: -14%; left: 42%; background: radial-gradient(circle, rgba(34,193,214,0.5), transparent 68%); animation: pdOrb 26s ease-in-out infinite alternate; }
  .pd2-orb--b { width: 34%; height: 55%; bottom: -12%; left: -6%; background: radial-gradient(circle, rgba(48,209,88,0.42), transparent 68%); animation: pdOrb 30s ease-in-out infinite alternate-reverse; }
  .pd2-orb--c { width: 32%; height: 55%; bottom: -14%; right: -4%; background: radial-gradient(circle, rgba(191,90,242,0.4), transparent 68%); animation: pdOrb 34s ease-in-out infinite alternate; }
  @keyframes pdOrb { to { transform: translate3d(4%, 5%, 0) scale(1.12); } }

  .pd2-grid { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 1.5vw, 20px); }

  /* Prev/next arrows: hidden on desktop, shown only when the grid is a phone slider */
  .pd2-arrow { display: none; }
  .pd2-aqi { grid-column: 1 / -1; }
  .pd2-overall { grid-column: 1; grid-row: 2 / span 2; }
  .pd2-particle { grid-column: 2; grid-row: 2; }
  .pd2-airq { grid-column: 3; grid-row: 2; }
  .pd2-removal { grid-column: 2; grid-row: 3; }
  .pd2-filtration { grid-column: 3; grid-row: 3; }

  .pd2-card {
    position: relative; display: flex; flex-direction: column;
    border-radius: 24px; padding: clamp(20px, 2vw, 28px); min-height: clamp(200px, 18vw, 248px);
    background:
      radial-gradient(130% 90% at 100% 0%, color-mix(in srgb, var(--ac) 13%, transparent), transparent 58%),
      rgba(255,255,255,0.72);
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 16px 40px -20px rgba(0,0,0,0.16);
    -webkit-backdrop-filter: blur(22px) saturate(1.5);
    backdrop-filter: blur(22px) saturate(1.5);
    overflow: hidden;
    opacity: 0; transform: translateY(22px);
    transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, opacity 0.7s ease;
  }
  .pd2-card::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.7); }
  .is-in .pd2-card { opacity: 1; transform: translateY(0); }
  .is-in .pd2-aqi { transition-delay: 0.02s; }
  .is-in .pd2-overall { transition-delay: 0.08s; }
  .is-in .pd2-particle { transition-delay: 0.12s; }
  .is-in .pd2-airq { transition-delay: 0.16s; }
  .is-in .pd2-removal { transition-delay: 0.2s; }
  .is-in .pd2-filtration { transition-delay: 0.24s; }
  .pd2-card:hover { transform: translateY(-6px); box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 30px 60px -22px color-mix(in srgb, var(--ac) 42%, rgba(0,0,0,0.28)); }

  .pd2-label { margin: 0 0 clamp(14px, 1.5vw, 18px); display: inline-flex; align-items: center; gap: 10px; font-size: clamp(15px, 1.35vw, 17px); font-weight: 600; color: var(--acd); }
  .pd2-ic { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 10px; background: color-mix(in srgb, var(--ac) 16%, #ffffff); color: var(--acd); flex: none; }
  .pd2-ic svg { display: block; }
  .pd2-num { margin: 0; display: flex; align-items: baseline; gap: 6px; font-size: clamp(30px, 3.3vw, 46px); font-weight: 600; letter-spacing: -0.025em; line-height: 1; font-variant-numeric: tabular-nums;
    background: linear-gradient(155deg, #1d1d1f 28%, var(--acd) 125%); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .pd2-num .u { font-size: 0.4em; font-weight: 600; letter-spacing: 0; -webkit-text-fill-color: #6e6e73; }
  .pd2-num.gauge { font-size: clamp(26px, 2.6vw, 36px); }
  .pd2-cap { margin: clamp(8px, 1vw, 11px) 0 0; font-size: clamp(14px, 1.25vw, 15px); font-weight: 500; line-height: 1.4; color: #6e6e73; }
  .pd2-foot { margin-top: auto; padding-top: clamp(14px, 1.5vw, 18px); display: flex; align-items: center; gap: 7px; font-size: clamp(12.5px, 1.15vw, 14px); font-weight: 500; color: #86868b; }
  .pd2-foot--center { justify-content: center; }
  .pd2-foot--split { justify-content: flex-start; gap: 26px; }
  .pd2-foot b { font-weight: 600; }
  .pd2-foot svg { color: var(--acd); }
  .pd2-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--ac); }
  .pd2-viz { margin-top: clamp(14px, 1.6vw, 20px); }

  /* wide AQI card */
  .pd2-wide { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: clamp(20px, 3vw, 48px); align-items: center; height: 100%; }
  .pd2-wide-info { display: flex; flex-direction: column; }
  .pd2-wide-info .pd2-foot { margin-top: clamp(14px, 1.6vw, 20px); }
  .pd2-wide-chart { align-self: center; }

  /* particle bars */
  .pd2-bars { display: flex; flex-direction: column; gap: 13px; margin-top: clamp(14px, 1.6vw, 18px); }
  .pd2-bar-top { display: flex; justify-content: space-between; margin-bottom: 7px; font-size: 13.5px; font-weight: 500; }
  .pd2-bar-val { font-variant-numeric: tabular-nums; }
  .pd2-bar-track { height: 7px; border-radius: 999px; background: var(--pd2-track); overflow: hidden; }
  .pd2-bar-fill { height: 100%; width: 0; border-radius: 999px; background: linear-gradient(90deg, var(--acd), var(--ac)); box-shadow: 0 0 10px color-mix(in srgb, var(--ac) 55%, transparent); transition: width 1.1s cubic-bezier(0.16,1,0.3,1); transition-delay: var(--d); }
  .is-in .pd2-bar-fill { width: var(--w); }

  /* gauge */
  .pd2-overall-mid { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: clamp(6px, 1vw, 12px); }
  .pd2-gauge { position: relative; width: 272px; max-width: 100%; margin: 0 auto; }
  .pd2-gauge-num { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 6%; }
  .pd2-tick { opacity: 0; }
  .is-in .pd2-tick { animation: pdTickIn 0.45s ease forwards; }
  @keyframes pdTickIn { from { opacity: 0; } to { opacity: 1; } }
  .pd2-gmark { opacity: 0; }
  .is-in .pd2-gmark { animation: pdMarkIn 0.5s ease 0.85s forwards; filter: drop-shadow(0 0 5px color-mix(in srgb, var(--ac) 70%, transparent)); }
  @keyframes pdMarkIn { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: scale(1); } }

  /* air-quality badge */
  .pd2-airq-head { display: flex; align-items: center; justify-content: space-between; }
  .pd2-badge { font-size: 12px; font-weight: 600; color: var(--acd); background: color-mix(in srgb, var(--ac) 15%, #ffffff); padding: 4px 11px; border-radius: 999px; }

  /* removal grouped bars */
  .pd2-groups { display: flex; justify-content: space-between; align-items: flex-end; margin-top: clamp(14px, 1.6vw, 20px); padding: 0 2px; }
  .pd2-group { display: flex; flex-direction: column; align-items: center; gap: 7px; width: 18%; }
  .pd2-group-bars { display: flex; gap: 3px; align-items: flex-end; height: 48px; }
  .pd2-gbar { width: 8px; border-radius: 3px; transform: scaleY(0); transform-origin: bottom; transition: transform 0.9s cubic-bezier(0.16,1,0.3,1); transition-delay: var(--d); }
  .pd2-gbar--on { height: var(--w); background: linear-gradient(180deg, var(--ac), var(--acd)); box-shadow: 0 0 8px color-mix(in srgb, var(--ac) 50%, transparent); }
  .pd2-gbar--off { height: var(--w); background: var(--pd2-track); }
  .is-in .pd2-gbar { transform: scaleY(1); }
  .pd2-group-k { font-size: 11.5px; font-weight: 500; }

  /* svg draw / area / audio bars */
  .pd2-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
  .is-in .pd2-draw { stroke-dashoffset: 0; transition: stroke-dashoffset 1.7s cubic-bezier(0.16,1,0.3,1) 0.15s; }
  .pd2-area { opacity: 0; }
  .is-in .pd2-area { opacity: 1; transition: opacity 1s ease 0.5s; }
  .pd2-endpt { opacity: 0; }
  .is-in .pd2-endpt { animation: pdMarkIn 0.4s ease 1.5s forwards; }
  .pd2-abar { transform: scaleY(0); transform-origin: center bottom; transform-box: fill-box; transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); transition-delay: var(--d); }
  .is-in .pd2-abar { transform: scaleY(1); }

  @keyframes pdPulseDot { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

  /* ---- dark variant ---- */
  .pd-dark .pd-hero { background: #1c1c1e; box-shadow: none; border: 1px solid rgba(255,255,255,0.08); }
  .pd-dark .pd-hero-label { color: #30d158; }
  .pd-dark .pd-hero-num { color: #f5f5f7; }
  .pd-dark .pd-hero-desc { color: #a1a1a6; }
  .pd-dark .pd2 { --pd2-track: rgba(255,255,255,0.14); }
  .pd-dark .pd2-orb { opacity: 0.3; }
  .pd-dark .pd2-card {
    background:
      radial-gradient(130% 90% at 100% 0%, color-mix(in srgb, var(--ac) 22%, transparent), transparent 58%),
      rgba(28,28,30,0.66);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 16px 40px -20px rgba(0,0,0,0.6);
  }
  .pd-dark .pd2-card::after { box-shadow: inset 0 1px 0 rgba(255,255,255,0.12); }
  .pd-dark .pd2-card:hover { box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 30px 60px -22px color-mix(in srgb, var(--ac) 55%, rgba(0,0,0,0.6)); }
  .pd-dark .pd2-label { color: color-mix(in srgb, var(--ac) 78%, #ffffff); }
  .pd-dark .pd2-ic { background: color-mix(in srgb, var(--ac) 26%, transparent); color: color-mix(in srgb, var(--ac) 60%, #ffffff); }
  .pd-dark .pd2-num { background: linear-gradient(155deg, #f5f5f7 22%, var(--ac) 130%); -webkit-background-clip: text; background-clip: text; }
  .pd-dark .pd2-num .u { -webkit-text-fill-color: #a1a1a6; }
  .pd-dark .pd2-cap { color: #a1a1a6; }
  .pd-dark .pd2-foot { color: #86868b; }
  .pd-dark .pd2-badge { color: color-mix(in srgb, var(--ac) 70%, #ffffff); background: color-mix(in srgb, var(--ac) 24%, transparent); }

  /* ---- responsive ---- */
  @media (max-width: 900px) {
    .pd2-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .pd2-aqi { grid-column: 1 / -1; grid-row: auto; }
    .pd2-overall, .pd2-particle, .pd2-airq, .pd2-removal, .pd2-filtration { grid-column: auto; grid-row: auto; }
    .pd2-overall { grid-column: 1 / -1; }
  }
  @media (max-width: 860px) { .pd-hero { grid-template-columns: 1fr; } }
  @media (max-width: 640px) {
    .pd2-wide { grid-template-columns: 1fr; gap: 18px; }
  }
  @media (max-width: 560px) {
    /* Cards become a horizontal, snap-scrolling slider driven by the arrows.
       The track is full-bleed (100vw) so the vw-based sizing centers correctly:
       9vw side padding + half of an 82vw card lands the active card at 50vw. */
    .pd2-grid {
      display: flex;
      grid-template-columns: none;
      width: 100vw;
      margin-left: calc(50% - 50vw);
      gap: 14px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 9vw 10px;
    }
    .pd2-grid::-webkit-scrollbar { display: none; }
    .pd2-card { flex: 0 0 82vw; scroll-snap-align: center; grid-column: auto !important; grid-row: auto !important; min-height: 300px; }

    .pd2-arrow {
      position: absolute; top: 50%; transform: translateY(-50%); z-index: 6;
      width: 42px; height: 42px; border: none; border-radius: 50%;
      background: #ffffff; color: #333336;
      display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
      transition: background 200ms ease, transform 150ms ease;
    }
    .pd2-arrow:active { transform: translateY(-50%) scale(0.92); }
    .pd2-arrow svg { width: 44%; height: 44%; }
    .pd2-arrow--prev { left: 4px; }
    .pd2-arrow--next { right: 4px; }
    .pd-dark .pd2-arrow { background: #2a2a2c; color: #f5f5f7; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pd2-card { opacity: 1; transform: none; transition: none; }
    .pd2-bar-fill { width: var(--w); transition: none; }
    .pd2-gbar { transform: scaleY(1); transition: none; }
    .pd2-abar { transform: scaleY(1); transition: none; }
    .pd2-tick, .pd2-gmark, .pd2-endpt { opacity: 1; animation: none; }
    .pd2-draw { stroke-dashoffset: 0; }
    .pd2-area { opacity: 1; }
    .pd2-orb { animation: none; }
  }
`;
