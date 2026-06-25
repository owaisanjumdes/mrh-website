"use client";

import { useRef, useState } from "react";

// Neutral page template — layout and design system only.
// Section structure, grid, type scale, the highlight motif, carousels, stat
// blocks, and card grids, with placeholder copy and gray image slots. Drop your
// own content in. Light (#f5f5f7 / #ffffff) canvas.

/* ---------------------------------------------------------------- icons --- */

function LoopMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className="env-loop">
      <path d="M10 24a14 14 0 0 1 24-9.9M38 24a14 14 0 0 1-24 9.9" stroke="#1d1d1f" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M34 6v9h-9M14 42v-9h9" stroke="#1d1d1f" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1 0-1-1Z" fill="#30d158" />
      <path d="M6 18c3-4 6-6 10-7" stroke="#0b8a3a" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* Gray image placeholder slot */
function Slot({ className = "", label = "Image" }: { className?: string; label?: string }) {
  return (
    <div className={`env-ph ${className}`} aria-hidden>
      <span>{label}</span>
    </div>
  );
}

/* ----------------------------------------------------------- shared bits --- */

type CardItem = {
  eyebrow?: string;
  title: string;
  body?: string;
  bg?: string;
  fg?: string;
  accent?: string;
  withImage?: boolean;
  imgLabel?: string;
  graphic?: "recycle" | "bolt" | "bricks" | "waves" | "drop" | "sun";
};

function Graphic({ kind, color }: { kind: NonNullable<CardItem["graphic"]>; color: string }) {
  const common = { stroke: color, strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "recycle":
      return (
        <svg viewBox="0 0 64 64" className="env-g" aria-hidden>
          <path d="M22 26 32 9l10 17M42 26h10L42 44 32 27M22 26H12l10 18h12" {...common} />
          <path d="M27 44h10l-5 9-6-9ZM18 24l-5 8 9 2 2-9-6-1ZM46 24l5 8-9 2-2-9 6-1Z" fill={color} stroke="none" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 64 64" className="env-g" aria-hidden>
          <path d="M36 6 18 36h12l-4 22 22-32H34l6-20Z" fill={color} stroke="none" />
        </svg>
      );
    case "bricks":
      return (
        <svg viewBox="0 0 80 70" className="env-g" aria-hidden>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <rect key={`${r}-${c}`} x={6 + c * 14 + (r % 2 ? 7 : 0)} y={6 + r * 15} width="12" height="12" rx="2" {...common} strokeWidth={2.4} />
            ))
          )}
        </svg>
      );
    case "waves":
      return (
        <svg viewBox="0 0 90 60" className="env-g" aria-hidden>
          {[8, 28, 48].map((y) => (
            <path key={y} d={`M6 ${y}q12 -10 22 0t22 0 22 0`} {...common} strokeWidth={4} />
          ))}
        </svg>
      );
    case "drop":
      return (
        <svg viewBox="0 0 64 64" className="env-g" aria-hidden>
          <path d="M32 8c10 13 16 21 16 29a16 16 0 0 1-32 0c0-8 6-16 16-29Z" fill={color} stroke="none" />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 64 64" className="env-g" aria-hidden>
          <circle cx="32" cy="32" r="11" {...common} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI) / 4;
            const x1 = 32 + Math.cos(a) * 17, y1 = 32 + Math.sin(a) * 17;
            const x2 = 32 + Math.cos(a) * 24, y2 = 32 + Math.sin(a) * 24;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...common} />;
          })}
        </svg>
      );
  }
}

/* A horizontal card carousel with the segmented progress pill. */
function Carousel({ cards, controls = true, center = false }: { cards: CardItem[]; controls?: boolean; center?: boolean }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const n = cards.length;

  const go = (i: number) => {
    const next = Math.max(0, Math.min(n - 1, i));
    setActive(next);
    const track = trackRef.current;
    if (track) {
      const card = track.children[next] as HTMLElement | undefined;
      if (card) track.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
    }
  };

  return (
    <div className="env-carousel">
      <div className={`env-track ${center ? "is-center" : ""}`} ref={trackRef}>
        {cards.map((c, i) => (
          <article className="env-card" key={i} style={{ background: c.bg ?? "#ffffff", color: c.fg ?? "#1d1d1f" }}>
            {c.withImage ? (
              <Slot className="env-card-img" label={c.imgLabel ?? "Image"} />
            ) : c.graphic ? (
              <div className="env-card-graphic">
                <Graphic kind={c.graphic} color={c.accent ?? "#30d158"} />
              </div>
            ) : null}
            {c.eyebrow || c.title || c.body ? (
              <div className="env-card-text">
                {c.eyebrow ? <p className="env-card-eyebrow">{c.eyebrow}</p> : null}
                {c.title ? <h3 className="env-card-title">{c.title}</h3> : null}
                {c.body ? <p className="env-card-body">{c.body}</p> : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>
      {controls ? (
        <div className="env-controls">
          <div className="env-dots">
            {cards.map((_, i) => (
              <button key={i} type="button" className={`env-dot ${i === active ? "is-active" : ""}`} aria-label={`Go to card ${i + 1}`} onClick={() => go(i)} />
            ))}
          </div>
          <div className="env-arrows">
            <button type="button" className="env-arrow" aria-label="Previous" onClick={() => go(active - 1)} disabled={active === 0}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="env-arrow" aria-label="Next" onClick={() => go(active + 1)} disabled={active === n - 1}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------- placeholder content ------ */

const LIPSUM = "Supporting copy goes here. Use this space for a short description that fills one or two lines.";

const SPACES_CARDS: CardItem[] = [
  { title: "", withImage: true, imgLabel: "Classroom" },
  { title: "", withImage: true, imgLabel: "Office" },
  { title: "", withImage: true, imgLabel: "Court" },
  { title: "", withImage: true, imgLabel: "Lobby" },
  { title: "", withImage: true, imgLabel: "Playground" },
  { title: "", withImage: true, imgLabel: "Gym" },
];

const VALUE_CARDS = [
  { title: "Value one", body: LIPSUM, icon: "a" },
  { title: "Value two", body: LIPSUM, icon: "b" },
  { title: "Value three and four", body: LIPSUM, icon: "c" },
  { title: "Value four", body: LIPSUM, icon: "d" },
] as const;

const REPORT_TABS = ["Tab one", "Tab two", "Tab three", "Tab four", "Tab five"] as const;

const RESOURCE_GROUPS = [
  { title: "Group one", body: LIPSUM, links: ["Link text one", "Link text two", "Link text three"] },
  { title: "Group two", body: LIPSUM, links: ["Link text one", "Link text two"] },
  { title: "Group three", body: LIPSUM, links: ["Link text one", "Link text two", "Link text three"] },
  { title: "Group four", body: LIPSUM, links: ["Link text one"] },
];

/* ---------------------------------------------------------------- page ----- */

export default function Environment() {
  return (
    <main className="env">
      <style>{`
        .env {
          --gutter: clamp(20px, 6vw, 88px);
          --maxw: 1260px;
          background: #f5f5f7;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          color: #1d1d1f;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          overflow-x: hidden;
        }
        .env-wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 var(--gutter); }
        .env mark { background: #30d158; color: #1d1d1f; border-radius: 2px; padding: 0 0.06em; }

        /* gray image placeholder */
        .env-ph { background: repeating-linear-gradient(135deg,#e3e3e6,#e3e3e6 18px,#dcdce0 18px,#dcdce0 36px); display: flex; align-items: center; justify-content: center; color: #8a8a8f; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }

        /* ---------- 1. Hero (white, full screen) ---------- */
        .env-hero { position: relative; min-height: 100svh; display: flex; align-items: center; justify-content: center; text-align: center; padding: clamp(72px, 11vh, 120px) var(--gutter); background: #ffffff; color: #1d1d1f; }
        .env-hero-h1 { margin: 0; font-weight: 400; white-space: nowrap; text-transform: uppercase; font-size: clamp(16px, 4vw, 60px); line-height: 1.05; letter-spacing: 0.01em; color: #1d1d1f; }

        /* ---------- generic section heading ---------- */
        .env-section { padding: clamp(72px, 11vh, 150px) 0; }
        .env-eyebrow { margin: 0 0 clamp(10px, 1.4vw, 16px); text-align: center; font-size: clamp(17px, 2vw, 24px); font-weight: 600; letter-spacing: 0.01em; color: #1a8f3c; }
        .env-h2 { margin: 0 auto; max-width: 18ch; text-align: center; font-size: clamp(32px, 5.2vw, 76px); font-weight: 600; line-height: 1.07; letter-spacing: -0.02em; text-wrap: balance; }
        .env-sub { margin: clamp(18px, 2vw, 28px) auto 0; max-width: 52ch; text-align: center; font-size: clamp(15px, 1.4vw, 19px); font-weight: 500; line-height: 1.45; color: #6e6e73; }
        .env-h2--left { text-align: left; margin-left: 0; max-width: 22ch; }

        /* ---------- 2. two product cards ---------- */
        .env-products { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(20px, 2.4vw, 40px); margin-top: clamp(36px, 4vw, 60px); }
        .env-prod-card { border-radius: 22px; overflow: hidden; aspect-ratio: 11 / 8; }
        .env-prod-card .env-ph { width: 100%; height: 100%; }
        .env-prod-cap { margin: clamp(16px, 1.6vw, 22px) 0 0; font-size: clamp(14px, 1.3vw, 16px); font-weight: 500; line-height: 1.45; color: #6e6e73; max-width: 48ch; }
        .env-prod-cap b { color: #1d1d1f; font-weight: 600; }

        /* ---------- 2b. impact blocks (image + 3 stats) ---------- */
        .env-im { display: grid; grid-template-columns: 1fr 1fr; align-items: center; background: #ffffff; width: 100vw; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
        .env-im-media { align-self: stretch; min-height: clamp(360px, 44vw, 640px); }
        .env-im-media .env-ph { width: 100%; height: 100%; }
        .env-im-text { padding: clamp(48px, 7vh, 100px) clamp(28px, 6vw, 96px); }
        .env-im-head { margin: 0 0 clamp(22px, 3vw, 38px); font-size: clamp(20px, 1.8vw, 24px); font-weight: 600; color: #1d1d1f; }
        .env-im-stat { margin-bottom: clamp(22px, 3vw, 38px); }
        .env-im-stat:last-child { margin-bottom: 0; }
        .env-im-stat-top { display: flex; align-items: flex-end; gap: 12px; }
        .env-im-icon { width: clamp(26px, 2.2vw, 32px); height: clamp(26px, 2.2vw, 32px); color: #1a8f3c; flex: none; align-self: center; }
        .env-im-num { font-size: clamp(34px, 4vw, 52px); font-weight: 600; letter-spacing: -0.02em; color: #1d1d1f; line-height: 1; }
        .env-im-unit { font-size: clamp(14px, 1.3vw, 17px); font-weight: 600; color: #1d1d1f; padding-bottom: 0.35em; }
        .env-im-desc { margin: clamp(8px, 1vw, 12px) 0 0; font-size: clamp(15px, 1.4vw, 18px); font-weight: 500; color: #6e6e73; line-height: 1.4; max-width: 34ch; }

        /* ---------- 5. design section (light) ---------- */
        .env-design-media { position: relative; margin: clamp(40px, 5vw, 64px) auto 0; width: min(1048px, 100%); aspect-ratio: 16 / 9; border-radius: 20px; overflow: hidden; }
        .env-design-media .env-ph { width: 100%; height: 100%; }
        .env-design-cta-row { display: flex; justify-content: center; margin-top: clamp(40px, 5vw, 64px); }
        .env-design-cta { display: inline-flex; align-items: center; height: 56px; padding: 0 32px; border-radius: 28px; background: #1d1d1f; text-decoration: none; cursor: pointer; transition: background 200ms ease; }
        .env-design-cta:hover { background: #333335; }
        .env-design-cta-label { color: #ffffff; font-size: 17px; font-weight: 600; letter-spacing: -0.022em; white-space: nowrap; }
        .env-stats3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(28px, 4vw, 60px); max-width: 980px; margin: clamp(48px, 6vw, 80px) auto 0; text-align: center; }
        .env-stat3-up { margin: 0; font-size: clamp(15px, 1.4vw, 17px); font-weight: 500; color: #6e6e73; line-height: 1.4; }
        .env-stat3-big { margin: 4px 0; font-size: clamp(30px, 3.4vw, 46px); font-weight: 600; letter-spacing: -0.01em; line-height: 1.12; background: linear-gradient(180deg, #f6d0bf 0%, #e3a98f 48%, #c98a72 100%); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
        .env-stat3-desc { margin: 0; font-size: clamp(14px, 1.3vw, 16px); font-weight: 500; color: #6e6e73; line-height: 1.38; }

        /* ---------- carousel ---------- */
        .env-carousel { margin-top: clamp(36px, 4vw, 60px); }
        .env-track { display: flex; gap: clamp(16px, 1.6vw, 22px); padding: 4px var(--gutter); overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
        .env-track::-webkit-scrollbar { display: none; }
        .env-track.is-center { justify-content: center; }
        .env-card { scroll-snap-align: start; flex: none; width: min(560px, 82vw); min-height: clamp(420px, 48vw, 560px); border-radius: 24px; overflow: hidden; padding: clamp(28px, 3vw, 44px); display: flex; flex-direction: column; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .env-card-img { flex: 1; width: 100%; min-height: 0; border-radius: 14px; }
        .env-card-graphic { flex: 1; display: flex; align-items: center; justify-content: center; }
        .env-g { width: clamp(90px, 12vw, 140px); height: clamp(90px, 12vw, 140px); }
        .env-card-text { margin-top: clamp(20px, 2vw, 28px); }
        .env-card-eyebrow { margin: 0 0 8px; font-size: clamp(17px, 1.6vw, 22px); font-weight: 600; letter-spacing: -0.01em; }
        .env-card-title { margin: 0; font-size: clamp(16px, 1.5vw, 20px); font-weight: 500; line-height: 1.32; letter-spacing: -0.01em; }
        .env-card-body { margin: 12px 0 0; font-size: clamp(14px, 1.3vw, 17px); font-weight: 500; line-height: 1.4; opacity: 0.82; }
        .env-controls { display: flex; align-items: center; justify-content: center; gap: 22px; margin-top: clamp(24px, 3vw, 40px); }
        .env-dots { display: inline-flex; align-items: center; gap: 10px; height: 14px; }
        .env-dot { width: 8px; height: 8px; padding: 0; border: none; border-radius: 999px; background: #c7c7cc; cursor: pointer; transition: width 320ms cubic-bezier(0.22,1,0.36,1), background 200ms ease; }
        .env-dot.is-active { width: 30px; background: #1d1d1f; }
        .env-arrows { display: inline-flex; gap: 10px; }
        .env-arrow { width: 36px; height: 36px; border: none; border-radius: 999px; background: #e3e3e6; color: #1d1d1f; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: background 200ms ease, opacity 200ms ease; }
        .env-arrow:hover { background: #d6d6da; }
        .env-arrow:disabled { opacity: 0.4; cursor: default; }
        .env-arrow svg { width: 18px; height: 18px; }

        /* ---------- 3. made to last (stats) ---------- */
        .env-stats-row { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(32px, 5vw, 80px); align-items: center; margin-top: clamp(40px, 5vw, 72px); }
        .env-stats-media { border-radius: 20px; overflow: hidden; aspect-ratio: 4/3; }
        .env-stats-media .env-ph { width: 100%; height: 100%; }
        .env-stats { display: flex; flex-direction: column; gap: clamp(20px, 2.4vw, 34px); }
        .env-stat { display: flex; align-items: center; gap: 16px; }
        .env-stat-ico { flex: none; width: 40px; height: 40px; }
        .env-stat-num { margin: 0; font-size: clamp(34px, 4vw, 52px); font-weight: 600; letter-spacing: -0.02em; line-height: 1; }
        .env-stat-desc { margin: 4px 0 0; font-size: clamp(13px, 1.2vw, 15px); font-weight: 500; color: #6e6e73; line-height: 1.35; }
        .env-tri { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 1.6vw, 22px); margin-top: clamp(36px, 4vw, 60px); }
        .env-tri-card { background: #ffffff; border-radius: 20px; padding: clamp(24px, 2.6vw, 36px); min-height: 230px; display: flex; flex-direction: column; }
        .env-tri-card.dark { background: #1d1d1f; color: #f5f5f7; }
        .env-tri-card.green { background: #30d158; color: #08320f; }
        .env-tri-graphic { flex: 1; display: flex; align-items: center; justify-content: center; }
        .env-tri-title { margin: 0; font-size: clamp(17px, 1.5vw, 21px); font-weight: 600; line-height: 1.2; }
        .env-tri-note { margin: 12px 0 0; font-size: 13px; font-weight: 500; line-height: 1.4; opacity: 0.7; }

        /* ---------- 4. packaging ---------- */
        .env-pack-big { margin: clamp(36px, 4vw, 60px) 0 0; font-size: clamp(48px, 9vw, 120px); font-weight: 700; letter-spacing: -0.04em; line-height: 0.9; }
        .env-pack-media { margin: clamp(24px, 3vw, 40px) auto 0; max-width: 820px; border-radius: 20px; overflow: hidden; aspect-ratio: 16/10; }
        .env-pack-media .env-ph { width: 100%; height: 100%; }
        .env-duo { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 1.6vw, 22px); margin-top: clamp(36px, 4vw, 60px); }
        .env-duo-card { border-radius: 22px; padding: clamp(28px, 3vw, 44px); min-height: clamp(260px, 30vw, 360px); display: flex; flex-direction: column; }
        .env-duo-graphic { flex: 1; display: flex; align-items: center; justify-content: center; }
        .env-duo-title { margin: 0; font-size: clamp(20px, 2vw, 28px); font-weight: 600; line-height: 1.14; letter-spacing: -0.01em; }
        .env-duo-note { margin: 16px 0 0; font-size: clamp(13px, 1.2vw, 15px); font-weight: 500; line-height: 1.4; color: #6e6e73; }

        /* ---------- 6. reports ---------- */
        .env-tabs { display: flex; gap: 10px; overflow-x: auto; margin-top: clamp(28px, 3vw, 44px); padding-bottom: 6px; scrollbar-width: none; }
        .env-tabs::-webkit-scrollbar { display: none; }
        .env-tab { flex: none; display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 20px; border: none; border-radius: 999px; background: #e3e3e6; color: #1d1d1f; font-family: inherit; font-size: 15px; font-weight: 500; cursor: pointer; transition: background 200ms ease, color 200ms ease; }
        .env-tab.is-active { background: #30d158; color: #06310f; }
        .env-reports-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: clamp(20px, 2vw, 32px); margin-top: clamp(28px, 3vw, 44px); padding-top: clamp(28px, 3vw, 40px); border-top: 1px solid #d2d2d7; }
        .env-report-name { margin: 0; font-size: 15px; font-weight: 600; line-height: 1.3; }
        .env-report-link { display: inline-block; margin-top: 4px; color: #0066cc; font-size: 15px; font-weight: 500; text-decoration: none; }
        .env-report-link:hover { text-decoration: underline; }
        .env-reports-foot { margin-top: clamp(28px, 3vw, 40px); padding-top: 20px; border-top: 1px solid #d2d2d7; text-align: center; }

        /* ---------- 7/8 link sections ---------- */
        .env-closer { padding: clamp(56px, 8vh, 110px) 0; }
        .env-link { color: #0066cc; font-size: clamp(15px, 1.3vw, 17px); font-weight: 500; text-decoration: none; cursor: pointer; }
        .env-link:hover { text-decoration: underline; }
        .env-divider { border: none; border-top: 1px solid #d2d2d7; margin: clamp(28px, 3vw, 44px) 0 0; }
        .env-res-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 5vw, 72px) clamp(40px, 6vw, 96px); margin-top: clamp(40px, 5vw, 72px); }
        .env-res-title { margin: 0 0 14px; font-size: clamp(17px, 1.5vw, 20px); font-weight: 600; }
        .env-res-body { margin: 0 0 18px; font-size: clamp(14px, 1.3vw, 16px); font-weight: 500; line-height: 1.5; color: #424245; max-width: 46ch; }
        .env-res-links { display: flex; flex-direction: column; gap: 12px; }

        /* ---------- 9. values ---------- */
        .env-values-grid { display: flex; gap: clamp(16px, 1.6vw, 22px); overflow-x: auto; margin-top: clamp(36px, 4vw, 60px); padding: 4px var(--gutter); scroll-snap-type: x mandatory; scrollbar-width: none; }
        .env-values-grid::-webkit-scrollbar { display: none; }
        .env-value { scroll-snap-align: start; flex: none; width: min(300px, 78vw); background: #ffffff; border-radius: 20px; padding: clamp(24px, 2.4vw, 34px); min-height: 250px; }
        .env-value-ico { width: 34px; height: 34px; color: #1d1d1f; }
        .env-value-title { margin: 18px 0 0; font-size: clamp(19px, 1.7vw, 24px); font-weight: 600; line-height: 1.12; letter-spacing: -0.01em; }
        .env-value-body { margin: 14px 0 0; font-size: clamp(14px, 1.3vw, 16px); font-weight: 500; line-height: 1.42; color: #424245; }
        .env-value-link { display: inline-block; margin-top: 14px; color: #0066cc; font-size: 15px; font-weight: 500; text-decoration: none; cursor: pointer; }
        .env-value-link:hover { text-decoration: underline; }

        @media (max-width: 860px) {
          .env-products { grid-template-columns: 1fr; }
          .env-stats3 { grid-template-columns: 1fr; }
          .env-im { grid-template-columns: 1fr; }
          .env-im--rev .env-im-media { order: -1; }
          .env-stats-row { grid-template-columns: 1fr; }
          .env-tri { grid-template-columns: 1fr; }
          .env-duo { grid-template-columns: 1fr; }
          .env-res-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1 — HERO */}
      <header className="env-hero">
        <h1 className="env-hero-h1">The best air you will ever breathe.</h1>
      </header>

      {/* 2 — TWO PRODUCTS */}
      <section className="env-section">
        <div className="env-wrap">
          <p className="env-eyebrow">Two products, every space</p>
          <h2 className="env-h2">One purifier for indoors. One for everywhere else.</h2>
          <p className="env-sub">PureAir works inside. AirFINEry works where the air is open.</p>
          <div className="env-products">
            <div>
              <div className="env-prod-card"><Slot label="PureAir" /></div>
              <p className="env-prod-cap">
                <b>PureAir.</b> Handles indoor and large indoor areas, schools,
                offices, meeting rooms, warehouses, libraries, and labs, up to
                2,000 sq ft per unit.
              </p>
            </div>
            <div>
              <div className="env-prod-card"><Slot label="AirFINEry" /></div>
              <p className="env-prod-cap">
                <b>AirFINEry.</b> Handles semi-outdoor and outdoor areas,
                corridors, lobbies, playgrounds, courts, cafes, and gyms, up to
                3,500 sq ft per unit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2b — PureAir / AirFINEry impact blocks (from Proof page) */}
      <ImpactBlock
        title="PureAir"
        imgLabel="PureAir image"
        stats={[
          { icon: "frame", num: "2,000", unit: "sq ft.", desc: "of area coverage from a single unit, built for large, open indoor spaces." },
          { icon: "filter", num: "99.9%", unit: "", desc: "filter efficiency, capturing fine particles down to 0.3 microns." },
          { icon: "wind", num: "2,800", unit: "m³/h", desc: "Clean Air Delivery Rate (CADR) for rapid, whole-room purification." },
        ]}
      />
      <ImpactBlock
        reverse
        title="AirFINEry"
        imgLabel="AirFINEry image"
        stats={[
          { icon: "frame", num: "4,000", unit: "sq ft.", desc: "of area coverage from a single unit, built for the largest open indoor spaces." },
          { icon: "filter", num: "99.9%", unit: "", desc: "filter efficiency, capturing fine particles down to 0.3 microns." },
          { icon: "wind", num: "3,500", unit: "m³/h", desc: "Clean Air Delivery Rate (CADR) for rapid, whole-room purification." },
        ]}
      />

      {/* 3 — STATS */}
      <section className="env-section" style={{ background: "#ffffff" }}>
        <div className="env-wrap">
          <p className="env-eyebrow">Powered by MANN+HUMMEL</p>
          <h2 className="env-h2" style={{ maxWidth: "none", whiteSpace: "nowrap" }}>
            80 years of German filtration<br />now made in India.
          </h2>
          <p className="env-sub">The world&rsquo;s filtration benchmark, built for Indian air.</p>
          <div className="env-stats-row">
            <div className="env-stats-media"><Slot label="MANN+ HUMMEL image" /></div>
            <div className="env-stats">
              {[
                { num: "1941", desc: "founded" },
                { num: "80+", desc: "countries" },
                { num: "4,700+", desc: "patents" },
                { num: "60+", desc: "university partnerships" },
              ].map((s, i) => (
                <div className="env-stat" key={i}>
                  <span className="env-stat-ico"><Leaf /></span>
                  <div>
                    <p className="env-stat-num">{s.num}</p>
                    <p className="env-stat-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 — WHERE MRH WORKS (6-image carousel) */}
      <section className="env-section">
        <div className="env-wrap">
          <p className="env-eyebrow">Where MRH works</p>
          <h2 className="env-h2">From classrooms to courtyards.</h2>
          <p className="env-sub">200+ spaces, and counting.</p>
        </div>
        <Carousel cards={SPACES_CARDS} />
      </section>

      {/* 5 — DESIGN (light) */}
      <section className="env-section" style={{ background: "#ffffff" }}>
        <div className="env-wrap">
          <p className="env-eyebrow">The technology inside</p>
          <h2 className="env-h2">Multi-Stage Filtration</h2>
          <p className="env-sub">Catches the fine particles ordinary purifiers miss.</p>
          <div className="env-design-media"><Slot label="Filter image" /></div>
          <div className="env-stats3">
            <div className="env-stat3">
              <p className="env-stat3-up">up to</p>
              <p className="env-stat3-big">2,000 sq ft</p>
              <p className="env-stat3-desc">cleaned per unit, so you need fewer</p>
            </div>
            <div className="env-stat3">
              <p className="env-stat3-up">down to</p>
              <p className="env-stat3-big">0.3 microns</p>
              <p className="env-stat3-desc">captured, including ultrafine particles</p>
            </div>
            <div className="env-stat3">
              <p className="env-stat3-up">certified to</p>
              <p className="env-stat3-big">ISO 16890</p>
              <p className="env-stat3-desc">the global clean-air standard</p>
            </div>
          </div>

          <div className="env-design-cta-row">
            <a className="env-design-cta" href="/technology">
              <span className="env-design-cta-label">Explore Technology</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6 — REPORTS */}
      <Reports />

      {/* 7 — CLOSER LOOK */}
      <section className="env-closer">
        <div className="env-wrap">
          <h2 className="env-h2 env-h2--left">Section headline goes here.</h2>
          <p className="env-sub" style={{ textAlign: "left", marginLeft: 0 }}>Supporting copy goes here on one line.</p>
          <p style={{ marginTop: "clamp(24px,3vw,40px)" }}><a className="env-link">Link text goes here (PDF)</a></p>
          <hr className="env-divider" />
        </div>
      </section>

      {/* 8 — RESOURCES */}
      <section className="env-section" style={{ paddingTop: 0 }}>
        <div className="env-wrap">
          <h2 className="env-h2 env-h2--left" style={{ maxWidth: "none" }}>Section headline goes here</h2>
          <div className="env-res-grid">
            {RESOURCE_GROUPS.map((g) => (
              <div key={g.title}>
                <h3 className="env-res-title">{g.title}</h3>
                <p className="env-res-body">{g.body}</p>
                <div className="env-res-links">
                  {g.links.map((l, i) => (
                    <a key={i} className="env-link">{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — VALUES (carousel) */}
      <section className="env-section" style={{ background: "#ffffff", paddingBottom: "clamp(96px,14vh,180px)" }}>
        <div className="env-wrap">
          <h2 className="env-h2 env-h2--left">Section headline goes here.</h2>
        </div>
        <div className="env-values-grid">
          {VALUE_CARDS.map((v) => (
            <article className="env-value" key={v.title}>
              <ValueIcon kind={v.icon} />
              <h3 className="env-value-title">{v.title}</h3>
              <p className="env-value-body">{v.body}</p>
              <a className="env-value-link">Learn more</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ----------------------------------------------------------- sub-blocks --- */

function Reports() {
  const [tab, setTab] = useState(0);
  return (
    <section className="env-section">
      <div className="env-wrap">
        <h2 className="env-h2 env-h2--left">Section headline goes here.</h2>
        <p className="env-sub" style={{ textAlign: "left", marginLeft: 0 }}>Supporting copy goes here on one line.</p>
        <div className="env-tabs">
          {REPORT_TABS.map((t, i) => (
            <button key={t} type="button" className={`env-tab ${i === tab ? "is-active" : ""}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
        <div className="env-reports-grid">
          {["Item one", "Item two", "Item three", "Item four", "Item five"].map((name) => (
            <div key={name}>
              <p className="env-report-name">{name}</p>
              <a className="env-report-link">Link text (PDF)</a>
            </div>
          ))}
        </div>
        <div className="env-reports-foot"><a className="env-link">Link text goes here</a></div>
      </div>
    </section>
  );
}

function ImpactIcon({ kind }: { kind: string }) {
  const p = { stroke: "currentColor", strokeWidth: 2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg className="env-im-icon" viewBox="0 0 24 24" aria-hidden>
      {kind === "frame" && (
        <>
          <path d="M4 8V6a2 2 0 0 1 2-2h2" {...p} />
          <path d="M16 4h2a2 2 0 0 1 2 2v2" {...p} />
          <path d="M20 16v2a2 2 0 0 1-2 2h-2" {...p} />
          <path d="M8 20H6a2 2 0 0 1-2-2v-2" {...p} />
        </>
      )}
      {kind === "filter" && <path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" {...p} />}
      {kind === "wind" && (
        <>
          <path d="M3 8h10a2.5 2.5 0 1 0-2.5-2.5" {...p} />
          <path d="M3 12h14a2.5 2.5 0 1 1-2.5 2.5" {...p} />
          <path d="M3 16h8a2 2 0 1 1-2 2" {...p} />
        </>
      )}
    </svg>
  );
}

type ImpactStat = { icon: string; num: string; unit: string; desc: string };

function ImpactBlock({
  reverse = false,
  title,
  imgLabel,
  stats,
}: {
  reverse?: boolean;
  title: string;
  imgLabel: string;
  stats: ImpactStat[];
}) {
  const media = (
    <div className="env-im-media">
      <Slot label={imgLabel} />
    </div>
  );
  const text = (
    <div className="env-im-text">
      <h3 className="env-im-head">{title}</h3>
      {stats.map((s, i) => (
        <div className="env-im-stat" key={i}>
          <div className="env-im-stat-top">
            <ImpactIcon kind={s.icon} />
            <span className="env-im-num">{s.num}</span>
            {s.unit ? <span className="env-im-unit">{s.unit}</span> : null}
          </div>
          <p className="env-im-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  );
  return (
    <section className={`env-im ${reverse ? "env-im--rev" : ""}`}>
      {reverse ? (
        <>
          {text}
          {media}
        </>
      ) : (
        <>
          {media}
          {text}
        </>
      )}
    </section>
  );
}

function ValueIcon({ kind }: { kind: string }) {
  const p = { stroke: "currentColor", strokeWidth: 1.8, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg className="env-value-ico" viewBox="0 0 32 32" aria-hidden>
      {kind === "a" && <><circle cx="16" cy="16" r="12" {...p} /><path d="M16 10v12M10 16h12" {...p} /></>}
      {kind === "b" && <><path d="M16 7 3 13l13 6 13-6-13-6Z" {...p} /><path d="M9 16v6c0 1.5 3.1 3 7 3s7-1.5 7-3v-6" {...p} /></>}
      {kind === "c" && <><circle cx="16" cy="11" r="4" {...p} /><circle cx="7" cy="13" r="3" {...p} /><circle cx="25" cy="13" r="3" {...p} /><path d="M10 24c0-3.3 2.7-6 6-6s6 2.7 6 6" {...p} /></>}
      {kind === "d" && <><rect x="8" y="14" width="16" height="12" rx="2.5" {...p} /><path d="M11 14v-3a5 5 0 0 1 10 0v3" {...p} /></>}
    </svg>
  );
}
