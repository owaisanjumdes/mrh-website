import { Layers, Wind, BarChart3, Gauge, Waves, AudioLines, ShieldCheck } from "lucide-react";

// "We didn't test it ourselves. IIT Delhi did." proof block — the full-width
// "60 Days" hero card followed by the six-card PureAir metrics dashboard.
// Self-contained (own scoped CSS + computed chart data). Pass `dark` to render
// dark cards (used on the black product-page section); default is light (home).

const dashIcon = { size: 18, strokeWidth: 1.9 } as const;
const GREEN = "#30d158";
const GREEN_DEEP = "#1a8f3c";
const TRACK = "#e8e8ed";

function buildDashData(inactive: string) {
  const lerp = (a: number[], b: number[], f: number) => {
    const c = [0, 1, 2].map((k) => Math.round(a[k] + (b[k] - a[k]) * f));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  };
  // Green/neutral palette matched to the page (#1a8f3c accent, light track).
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
    if (f <= gActive) { color = lerp(gLight, gDark, f / gActive); w = 3; }
    else { color = inactive; w = 2.2; }
    gaugeTicks.push({ x1: +x1.toFixed(1), y1: +y1.toFixed(1), x2: +x2.toFixed(1), y2: +y2.toFixed(1), color, w });
  }
  const aMid = (gr + gR) / 2, aAng = ((180 - gActive * 180) * Math.PI) / 180;
  const markerX = +(gcx + aMid * Math.cos(aAng)).toFixed(1);
  const markerY = +(gcy - aMid * Math.sin(aAng)).toFixed(1);

  // Vertical audio-style bars + center playhead
  const abN = 36, abW = 4, abGap = 4, abLeft = 10, abCY = 54, abMax = 44, playIdx = 22;
  const audioBars: { x: number; y: number; h: number; w: number; color: string }[] = [];
  for (let i = 0; i < abN; i++) {
    const base = Math.sin(i * 0.55) * 0.5 + 0.5;
    const noise = Math.sin(i * 1.7 + 1) * 0.25 + 0.75;
    const h = Math.max(6, (0.25 + 0.7 * base * noise) * abMax);
    const hNorm = Math.min(1, (h - 6) / (abMax - 6));
    const x = abLeft + i * (abW + abGap);
    audioBars.push({ x: +x.toFixed(1), y: +(abCY - h / 2).toFixed(1), h: +h.toFixed(1), w: abW, color: lerp(gLight, gDark, 0.22 + 0.6 * hNorm) });
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

function DashBars({
  rows,
  track,
  nameColor,
  valueColor,
}: {
  rows: { k: string; v: number }[];
  track: string;
  nameColor: string;
  valueColor: string;
}) {
  return (
    <div className="pd-viz" style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      {rows.map((r) => (
        <div key={r.k}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontSize: 14, color: nameColor, fontWeight: 500 }}>{r.k}</span>
            <span style={{ fontSize: 14, color: valueColor, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{r.v}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: track, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${r.v}%`, borderRadius: 999, background: GREEN }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProofDashboard({ dark = false }: { dark?: boolean } = {}) {
  // Color tokens for inline-styled chart bits (CSS handles the class-based ones).
  const cardText = dark ? "#f5f5f7" : "#1d1d1f";
  const muted = dark ? "#a1a1a6" : "#6e6e73";
  const subtle = dark ? "#86868b" : "#86868b";
  const track = dark ? "rgba(255,255,255,0.14)" : TRACK;
  const accent = dark ? GREEN : GREEN_DEEP;
  const gridLine = dark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.1)";
  const offDot = dark ? "rgba(255,255,255,0.34)" : "#c7c7cc";
  const dash = dark ? DASH_DARK : DASH;

  return (
    <div className={dark ? "pd pd-dark" : "pd"}>
      <style>{`
        .pd { display: flex; flex-direction: column; gap: clamp(16px, 1.6vw, 22px); margin-top: clamp(36px, 4vw, 60px); }

        /* full-width "60 Days" hero card (image left, text right) */
        .pd-hero { background: #ffffff; border-radius: 22px; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; min-height: clamp(300px, 30vw, 400px); }
        .pd-hero-media { position: relative; min-height: clamp(220px, 24vw, 320px); }
        .pd-hero-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .pd-hero-text { padding: clamp(24px, 2.6vw, 40px); align-self: center; }
        .pd-hero-label { margin: 0 0 8px; font-size: clamp(15px, 1.4vw, 18px); font-weight: 600; color: #1a8f3c; }
        .pd-hero-num { margin: 0 0 clamp(10px, 1.2vw, 16px); font-size: clamp(34px, 4.4vw, 56px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.04; color: #1d1d1f; }
        .pd-hero-desc { margin: 0; font-size: clamp(15px, 1.4vw, 17px); font-weight: 500; line-height: 1.42; color: #6e6e73; max-width: 34ch; }

        /* six-card metrics dashboard */
        .pd-dash { display: flex; flex-direction: column; gap: clamp(16px, 1.6vw, 22px); font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        .pd-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 1.6vw, 22px); }
        .pd-card { position: relative; display: flex; flex-direction: column; background: #ffffff; border-radius: 22px; padding: clamp(20px, 2vw, 28px); min-height: clamp(208px, 19vw, 260px); box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 30px rgba(0,0,0,0.035); }
        .pd-label { margin: 0 0 clamp(12px, 1.4vw, 18px); display: inline-flex; align-items: center; gap: 9px; font-size: clamp(15px, 1.4vw, 18px); font-weight: 600; color: #1a8f3c; }
        .pd-label svg { color: #1a8f3c; flex: none; }
        .pd-num { margin: 0; display: flex; align-items: baseline; gap: 7px; font-size: clamp(30px, 3.2vw, 44px); font-weight: 500; letter-spacing: -0.02em; line-height: 1; color: #1d1d1f; font-variant-numeric: tabular-nums; }
        .pd-num .u { font-size: 0.42em; font-weight: 500; letter-spacing: 0; color: #6e6e73; }
        .pd-num.gauge { font-size: clamp(24px, 2.4vw, 34px); }
        .pd-cap { margin: clamp(7px, 0.9vw, 10px) 0 0; font-size: clamp(14px, 1.3vw, 16px); font-weight: 500; line-height: 1.4; color: #6e6e73; }
        .pd-viz { margin-top: clamp(14px, 1.6vw, 20px); }
        .pd-foot { margin-top: auto; padding-top: clamp(14px, 1.6vw, 20px); font-size: clamp(13px, 1.2vw, 15px); font-weight: 500; color: #86868b; }
        .pd-gauge { position: relative; width: 240px; max-width: 100%; margin: clamp(4px, 0.8vw, 10px) auto clamp(12px, 1.6vw, 20px); }
        @keyframes pdPulseDot { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }

        /* ---- dark variant (product page, black section) ---- */
        .pd-dark .pd-hero,
        .pd-dark .pd-card { background: #1c1c1e; box-shadow: none; border: 1px solid rgba(255,255,255,0.08); }
        .pd-dark .pd-hero-label,
        .pd-dark .pd-label,
        .pd-dark .pd-label svg { color: #30d158; }
        .pd-dark .pd-hero-num,
        .pd-dark .pd-num { color: #f5f5f7; }
        .pd-dark .pd-num .u { color: #a1a1a6; }
        .pd-dark .pd-hero-desc,
        .pd-dark .pd-cap { color: #a1a1a6; }
        .pd-dark .pd-foot { color: #86868b; }

        @media (max-width: 900px) { .pd-row { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 860px) { .pd-hero { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .pd-row { grid-template-columns: 1fr; } }
      `}</style>

      {/* full-width "60 Days" hero card */}
      <article className="pd-hero" data-reveal>
        <div className="pd-hero-media"><img loading="lazy" src="/IIIT.jpg" alt="IIT Delhi study" /></div>
        <div className="pd-hero-text">
          <p className="pd-hero-label">The Duration</p>
          <p className="pd-hero-num">60 Days</p>
          <p className="pd-hero-desc">Continuous field testing, not a lab simulation.</p>
        </div>
      </article>

      {/* six-card metrics dashboard */}
      <div className="pd-dash" data-reveal style={{ ["--ri" as string]: 1 }}>
        {/* ---- ROW 1 ---- */}
        <div className="pd-row">
          {/* Particle removal by size */}
          <div className="pd-card">
            <p className="pd-label"><Layers {...dashIcon} /> Particle removal</p>
            <p className="pd-num">99<span className="u">%</span></p>
            <p className="pd-cap">PM10 mass captured, broken down by particle size.</p>
            <DashBars rows={[{ k: "PM10", v: 99 }, { k: "PM2.5", v: 95 }, { k: "PM0.1", v: 83 }]} track={track} nameColor={muted} valueColor={cardText} />
            <p className="pd-foot">60-day field mean</p>
          </div>

          {/* AQI recovery */}
          <div className="pd-card">
            <p className="pd-label"><Wind {...dashIcon} /> AQI recovery</p>
            <p className="pd-num">3-6 <span className="u">hrs</span></p>
            <p className="pd-cap">Severe air back to Good.</p>
            <div className="pd-viz">
              <svg viewBox="0 0 300 92" width="100%" style={{ display: "block" }}>
                <defs>
                  <linearGradient id="pdAqF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={GREEN} stopOpacity="0.18" />
                    <stop offset="1" stopColor={GREEN} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="6" y1="66" x2="294" y2="66" stroke={gridLine} strokeWidth="1" strokeDasharray="2 5" />
                <text x="294" y="60" textAnchor="end" fontSize="9" fill={muted}>WHO 20 µg/m³</text>
                <path d="M6,14 C46,26 80,58 120,72 C160,84 220,88 294,89 L294,92 L6,92 Z" fill="url(#pdAqF)" />
                <path d="M6,14 C46,26 80,58 120,72 C160,84 220,88 294,89" fill="none" stroke={GREEN_DEEP} strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="294" cy="89" r="3" fill={GREEN_DEEP} />
              </svg>
            </div>
            <p className="pd-foot">Held below the WHO guideline</p>
          </div>

          {/* Removal efficiency */}
          <div className="pd-card">
            <p className="pd-label"><BarChart3 {...dashIcon} /> Removal efficiency</p>
            <p className="pd-num">83<span className="u">%</span></p>
            <p className="pd-cap">Sustained mean reduction.</p>
            <div className="pd-viz" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: 64, padding: "0 2px" }}>
              {[
                { k: "PM10", on: 95, off: 38 },
                { k: "PM2.5", on: 91, off: 29 },
                { k: "PM1", on: 84, off: 21 },
                { k: "PM0.3", on: 80, off: 17 },
                { k: "PM0.1", on: 75, off: 13 },
              ].map((g) => (
                <div key={g.k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: "18%" }}>
                  <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 44 }}>
                    <div style={{ width: 8, height: `${g.on}%`, borderRadius: 3, background: GREEN }} />
                    <div style={{ width: 8, height: `${g.off}%`, borderRadius: 3, background: track }} />
                  </div>
                  <span style={{ fontSize: 11.5, color: subtle, fontWeight: 500 }}>{g.k}</span>
                </div>
              ))}
            </div>
            <p className="pd-foot"><span style={{ color: accent }}>●</span> With purifier&nbsp;&nbsp;<span style={{ color: offDot }}>●</span> Without</p>
          </div>
        </div>

        {/* ---- ROW 2 ---- */}
        <div className="pd-row">
          {/* Overall efficiency gauge */}
          <div className="pd-card">
            <p className="pd-label"><Gauge {...dashIcon} /> Overall efficiency</p>
            <div className="pd-gauge">
              <svg viewBox="0 0 280 158" width="100%" style={{ display: "block" }}>
                {dash.gaugeTicks.map((t, i) => (
                  <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={t.color} strokeWidth={t.w} strokeLinecap="round" />
                ))}
                <circle cx={dash.markerX} cy={dash.markerY} r="4" fill={accent} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "7%" }}>
                <p className="pd-num gauge" style={{ justifyContent: "center" }}>84-90<span className="u">%</span></p>
              </div>
            </div>
            <p className="pd-cap" style={{ textAlign: "center" }}>Overall reduction</p>
            <p className="pd-foot" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <ShieldCheck size={15} strokeWidth={1.9} color={accent} /> Verified to ISO Class 1000
            </p>
          </div>

          {/* Air quality score */}
          <div className="pd-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p className="pd-label" style={{ margin: 0 }}><Waves {...dashIcon} /> Air quality score</p>
              <span style={{ fontSize: 12, fontWeight: 600, color: accent, background: "rgba(48,209,88,0.12)", padding: "4px 11px", borderRadius: 999 }}>Good</span>
            </div>
            <p className="pd-num" style={{ marginTop: 22 }}>92</p>
            <p className="pd-cap">Average across tested indoor spaces.</p>
            <div className="pd-viz">
              <svg viewBox="0 0 300 80" width="100%" style={{ display: "block" }}>
                <defs>
                  <linearGradient id="pdWfF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={GREEN} stopOpacity="0.16" />
                    <stop offset="1" stopColor={GREEN} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={dash.wfFill} fill="url(#pdWfF)" />
                <path d={dash.wfLine} fill="none" stroke={GREEN_DEEP} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="pd-foot" style={{ display: "flex", gap: 28 }}>
              <span>Indoor <b style={{ color: cardText, fontWeight: 500 }}>70–90%</b></span>
              <span>Outdoor <b style={{ color: cardText, fontWeight: 500 }}>70–97%</b></span>
            </p>
          </div>

          {/* Filtration performance */}
          <div className="pd-card">
            <p className="pd-label"><AudioLines {...dashIcon} /> Filtration performance</p>
            <p className="pd-num">83<span className="u">%</span></p>
            <p className="pd-cap">Fine particle capture, measured continuously.</p>
            <div className="pd-viz">
              <svg viewBox="0 0 300 100" width="100%" style={{ display: "block" }}>
                {dash.audioBars.map((b, i) => (
                  <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill={b.color} />
                ))}
                <line x1={dash.playheadX} y1="10" x2={dash.playheadX} y2="98" stroke={GREEN_DEEP} strokeWidth="1.4" strokeDasharray="2 4" opacity="0.5" />
                <circle cx={dash.playheadX} cy="54" r="3.5" fill={GREEN_DEEP} style={{ animation: "pdPulseDot 2.4s ease-in-out infinite" }} />
              </svg>
            </div>
            <p className="pd-foot">Ultrafine <b style={{ color: cardText, fontWeight: 500 }}>66%</b>&nbsp;&nbsp;Fine <b style={{ color: cardText, fontWeight: 500 }}>83%</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}
