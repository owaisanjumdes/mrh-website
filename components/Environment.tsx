"use client";

import { useEffect, useRef, useState } from "react";
import { PlusIcon, Flag, Globe, Award, GraduationCap } from "lucide-react";
import ImpactDevices from "@/components/ImpactDevices";
import ProofDashboard from "@/components/ProofDashboard";
import SiteFooter from "@/components/SiteFooter";
import VideoEmbed from "@/components/VideoEmbed";

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
  imgSrc?: string;
  pillDark?: boolean;
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

/* Auto-advancing card carousel with a segmented progress bar below the cards. */
function Carousel({ cards }: { cards: CardItem[] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const n = cards.length;
  const advance = () => setActive((i) => (i + 1) % n);

  // Center the active card in the viewport whenever it changes, so the previous
  // and next cards bleed equally off the left and right edges.
  useEffect(() => {
    const track = trackRef.current;
    const card = track?.children[active] as HTMLElement | undefined;
    if (track && card) {
      const left = card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2;
      track.scrollTo({ left, behavior: "smooth" });
    }
  }, [active]);

  // Only auto-advance once the section is on screen, so it starts when the user
  // lands on it (and pauses when they leave).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="env-carousel" ref={rootRef}>
      <div className="env-track" ref={trackRef}>
        {cards.map((c, i) => (
          <article className="env-card" key={i} style={{ background: "#000000" }}>
            {c.withImage ? (
              c.imgSrc ? (
                <img loading="lazy" className="env-card-img" src={c.imgSrc} alt={c.imgLabel ?? ""} />
              ) : (
                <Slot className="env-card-img" label={c.imgLabel ?? "Image"} />
              )
            ) : null}
            {c.imgLabel ? <span className={`env-card-pill ${c.pillDark ? "env-card-pill--dark" : ""}`}>{c.imgLabel}</span> : null}
          </article>
        ))}
      </div>

      <div className="env-cprog">
        {cards.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`env-cseg ${i === active ? "is-active" : ""}`}
            aria-label={`Go to space ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
          >
            {i === active && (
              <span
                key={active}
                className="env-cfill"
                style={{ animationPlayState: inView ? "running" : "paused" }}
                onAnimationEnd={advance}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------- placeholder content ------ */

const SPACES_CARDS: CardItem[] = [
  { title: "", withImage: true, imgLabel: "Classroom", imgSrc: "/pac.jpg" },
  { title: "", withImage: true, imgLabel: "Office", imgSrc: "/pao.jpg" },
  { title: "", withImage: true, imgLabel: "Gym", imgSrc: "/gym.jpg" },
  { title: "", withImage: true, imgLabel: "Cafe", imgSrc: "/cafe.jpg" },
  { title: "", withImage: true, imgLabel: "Hospital", imgSrc: "/hospital.jpg", pillDark: true },
  { title: "", withImage: true, imgLabel: "Hotel", imgSrc: "/hlf.jpg" },
];

const LOGOS = [
  { name: "Delhi Public School", src: "/logos/dps.png" },
  { name: "GD Goenka", src: "/logos/gdgoenka.png" },
  { name: "Birla Estates", src: "/logos/birlaestates.png" },
  { name: "O.P. Jindal", src: "/logos/opjindal.png" },
  { name: "Isparva", src: "/logos/isparva.png" },
  { name: "Forest Essentials", src: "/logos/forestessentials.png" },
  { name: "Unox", src: "/logos/unox.png" },
  { name: "Bal Bharati", src: "/logos/balbharti.png" },
];

/* ---------------------------------------------------------------- page ----- */

export default function Environment() {
  return (
    <main className="env">
      <style>{`
        .env {
          --gutter: clamp(20px, 6vw, 88px);
          --maxw: 1260px;
          --cardw: min(1120px, 92vw);
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

        /* ---------- 1. Hero (full-screen image) ---------- */
        .env-hero { position: relative; overflow: hidden; padding: 0; background: #ffffff; }
        .env-hero-img { display: block; width: 100%; height: auto; }

        /* ---------- generic section heading ---------- */
        .env-section { padding: clamp(72px, 11vh, 150px) 0; }
        .env-eyebrow { margin: 0 0 clamp(10px, 1.4vw, 16px); text-align: center; font-size: clamp(17px, 2vw, 24px); font-weight: 600; letter-spacing: 0.01em; color: #1a8f3c; }
        .env-h2 { margin: 0 auto; max-width: 18ch; text-align: center; font-size: clamp(32px, 5.2vw, 76px); font-weight: 600; line-height: 1.07; letter-spacing: -0.02em; text-wrap: balance; }
        .env-sub { margin: clamp(18px, 2vw, 28px) auto 0; max-width: 52ch; text-align: center; font-size: clamp(15px, 1.4vw, 19px); font-weight: 500; line-height: 1.45; color: #6e6e73; }
        .env-h2--left { text-align: left; margin-left: 0; max-width: 22ch; }
        .env-h2--nowrap { max-width: none; white-space: nowrap; }

        /* ---------- 2. two product cards (large split, Apple-style) ---------- */
        .env-products { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(20px, 2.4vw, 44px); width: min(1600px, 92vw); margin: clamp(40px, 5vw, 72px) auto 0; }
        .env-prod-card { position: relative; border-radius: clamp(22px, 2vw, 30px); overflow: hidden; aspect-ratio: 7 / 5; background: #ffffff; }
        .env-prod-card .env-ph { width: 100%; height: 100%; transition: filter 300ms ease; }
        .env-prod-img { display: block; width: 100%; height: 100%; object-fit: cover; transition: filter 300ms ease; }
        .env-prod-card--shop:hover .env-prod-img,
        .env-prod-card--shop:hover .env-ph { filter: brightness(0.5); }
        .env-prod-cta { position: absolute; right: clamp(18px, 2vw, 28px); bottom: clamp(18px, 2vw, 28px); opacity: 0; pointer-events: none; background: #ffffff; color: #333336; font-size: clamp(14px, 1.3vw, 16px); font-weight: 600; letter-spacing: -0.01em; padding: 0.72em 1.6em; border-radius: 980px; text-decoration: none; white-space: nowrap; transform: translateY(8px); transition: opacity 300ms ease, transform 300ms ease, background 200ms ease; }
        .env-prod-card--shop:hover .env-prod-cta { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .env-prod-cta:hover { background: #ececee; }
        .env-prod-cap { margin: clamp(18px, 1.8vw, 26px) 0 0; font-size: clamp(15px, 1.4vw, 17px); font-weight: 500; line-height: 1.45; color: #6e6e73; max-width: 48ch; }
        .env-prod-cap b { color: #1d1d1f; font-weight: 600; }

        /* ---------- 2b. impact blocks (image + 3 stats) ---------- */
        .env-im { display: grid; grid-template-columns: 1fr 1fr; align-items: center; background: #ffffff; width: 100vw; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
        .env-im + .env-im { border-top: 0; }
        .env-im-media { align-self: stretch; min-height: clamp(360px, 44vw, 640px); }
        .env-im-media .env-ph { width: 100%; height: 100%; }
        .env-im-img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .env-im-text { padding: clamp(48px, 7vh, 100px) clamp(28px, 6vw, 96px); }
        .env-im-head { margin: 0 0 clamp(22px, 3vw, 38px); font-size: clamp(20px, 1.8vw, 24px); font-weight: 600; color: #1d1d1f; }
        .env-im-stat { margin-bottom: clamp(22px, 3vw, 38px); }
        .env-im-stat:last-child { margin-bottom: 0; }
        .env-im-stat-top { display: flex; align-items: flex-end; gap: 12px; }
        .env-im-icon { width: clamp(26px, 2.2vw, 32px); height: clamp(26px, 2.2vw, 32px); color: #1a8f3c; flex: none; align-self: center; }
        .env-im-num { font-size: clamp(28px, 3.4vw, 44px); font-weight: 600; letter-spacing: -0.02em; color: #1d1d1f; line-height: 1; }
        .env-im-unit { font-size: clamp(14px, 1.3vw, 17px); font-weight: 600; color: #1d1d1f; padding-bottom: 0.35em; }
        .env-im-desc { margin: clamp(8px, 1vw, 12px) 0 0; font-size: clamp(15px, 1.4vw, 18px); font-weight: 500; color: #6e6e73; line-height: 1.4; max-width: 34ch; }
        /* "Explore X" pill (reveal-bubble animation), placed below the stats */
        .env-im-cta-wrap { margin-top: clamp(26px, 3.2vw, 46px); }
        .env-xcta-pill { display: inline-flex; align-items: center; height: 54px; padding: 0 32px; border-radius: 27px; background: #1d1d1f; color: #ffffff; font-size: clamp(15px, 1.5vw, 18px); font-weight: 600; letter-spacing: -0.01em; text-decoration: none; white-space: nowrap; transition: background 200ms ease; }
        .env-xcta-pill:hover { background: #333335; }

        /* ---------- 5. design section (light) ---------- */
        .env-design-media { position: relative; margin: clamp(40px, 5vw, 64px) auto 0; width: min(1048px, 100%); aspect-ratio: 16 / 9; border-radius: 20px; overflow: hidden; }
        .env-design-media .env-ph { width: 100%; height: 100%; }
        .env-design-vid { display: block; width: 100%; height: 100%; object-fit: cover; }
        .env-design-cta-row { display: flex; justify-content: center; margin-top: clamp(40px, 5vw, 64px); }
        .env-design-cta { display: inline-flex; align-items: center; height: 56px; padding: 0 32px; border-radius: 28px; background: #1d1d1f; text-decoration: none; cursor: pointer; transition: background 200ms ease; }
        .env-design-cta:hover { background: #333335; }
        .env-design-cta-label { color: #ffffff; font-size: 17px; font-weight: 600; letter-spacing: -0.022em; white-space: nowrap; }
        .env-stats3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(28px, 4vw, 60px); max-width: 980px; margin: clamp(48px, 6vw, 80px) auto 0; text-align: center; }
        .env-stat3-up { margin: 0; font-size: clamp(15px, 1.4vw, 17px); font-weight: 500; color: #6e6e73; line-height: 1.4; }
        .env-stat3-big { margin: 4px 0; font-size: clamp(30px, 3.4vw, 46px); font-weight: 600; letter-spacing: -0.01em; line-height: 1.12; background: linear-gradient(180deg, #2a2a2c 0%, #1d1d1f 100%); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
        .env-stat3-desc { margin: 0; font-size: clamp(14px, 1.3vw, 16px); font-weight: 500; color: #6e6e73; line-height: 1.38; }

        /* ---------- carousel ---------- */
        .env-carousel { margin-top: clamp(36px, 4vw, 60px); }
        .env-track { display: flex; gap: clamp(16px, 1.6vw, 22px); padding: 4px max(var(--gutter), calc((100vw - var(--cardw)) / 2)); overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
        .env-track::-webkit-scrollbar { display: none; }
        .env-track.is-center { justify-content: center; }
        .env-card { position: relative; scroll-snap-align: center; flex: none; width: var(--cardw); aspect-ratio: 16 / 9; border-radius: 24px; overflow: hidden; display: flex; flex-direction: column; }
        .env-card-pill { position: absolute; left: 50%; bottom: clamp(20px, 2.4vw, 34px); transform: translateX(-50%); z-index: 3; padding: clamp(9px, 0.9vw, 13px) clamp(20px, 1.9vw, 30px); border-radius: 999px; background: rgba(255, 255, 255, 0.26); border: 1px solid rgba(255, 255, 255, 0.4); backdrop-filter: blur(34px) saturate(180%); -webkit-backdrop-filter: blur(34px) saturate(180%); color: #ffffff; font-size: clamp(14px, 1.4vw, 19px); font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; }
        .env-card-pill--dark { color: #333336; }
        .env-cprog { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: clamp(28px, 3.4vw, 48px); padding: 0 var(--gutter); }
        .env-cseg { position: relative; height: 8px; width: 8px; padding: 0; border: none; border-radius: 980px; background: rgba(0, 0, 0, 0.18); cursor: pointer; overflow: hidden; transition: width 480ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms ease; }
        .env-cseg.is-active { width: 52px; background: rgba(0, 0, 0, 0.14); }
        @keyframes envCfill { from { width: 0%; } to { width: 100%; } }
        .env-cfill { display: block; height: 100%; width: 0%; border-radius: 980px; background: #1d1d1f; animation: envCfill 4500ms linear forwards; }
        @media (prefers-reduced-motion: reduce) { .env-cfill { animation: none; width: 100%; } }
        .env-card-img { flex: 1; width: 100%; min-height: 0; object-fit: cover; }
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
        .env-stats-row { display: grid; grid-template-columns: 1fr; gap: clamp(36px, 5vw, 64px); margin-top: clamp(40px, 5vw, 72px); }
        .env-stats-media { border-radius: 20px; overflow: hidden; }
        .env-stats-media .env-ph { width: 100%; height: 100%; }
        .env-stats-img { display: block; width: 100%; height: auto; border-radius: 20px; }
        .env-ub { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .env-ub-col { display: flex; flex-direction: column; gap: 20px; }
        .env-ub-card { position: relative; border-radius: 28px; overflow: hidden; background: #20CA9D; }
        .env-ub-tall { height: clamp(330px, 41vw, 401px); }
        .env-ub-short { height: clamp(196px, 25vw, 241px); display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: clamp(12px, 1.4vw, 18px); padding: clamp(24px, 3vw, 40px); }
        .env-ub-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        /* frosted bottom: blurs only the lower part of the photo (masked fade),
           matching the original Apple stat-card look behind the text */
        .env-ub-blur { position: absolute; inset: 0; z-index: 1; pointer-events: none; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); -webkit-mask-image: linear-gradient(to top, #000 0%, #000 12%, rgba(0,0,0,0) 46%); mask-image: linear-gradient(to top, #000 0%, #000 12%, rgba(0,0,0,0) 46%); }
        .env-ub-scrim { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 100%); }
        .env-ub-inner { position: relative; z-index: 2; height: 100%; padding: clamp(28px, 3.4vw, 40px); display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; gap: clamp(12px, 1.4vw, 18px); }
        /* same box for every icon, sized to sit just under the number */
        .env-ub-ic { width: clamp(32px, 3.4vw, 44px); height: clamp(32px, 3.4vw, 44px); flex: none; stroke: #ffffff; }
        .env-ub-tall .env-ub-ic { margin-top: auto; }
        .env-ub-text { display: flex; flex-direction: column; }
        .env-ub-num { margin: 0; font-weight: 600; line-height: 1; letter-spacing: -0.02em; font-size: clamp(38px, 4.8vw, 64px); color: #ffffff; }
        .env-ub-label { margin: clamp(6px, 0.8vw, 10px) 0 0; font-weight: 500; font-size: clamp(15px, 1.4vw, 18px); color: rgba(245, 245, 247, 0.8); }
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

        /* ---------- 6. bento grid ---------- */
        .env-bento { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(16px, 1.6vw, 22px); margin-top: clamp(36px, 4vw, 60px); }
        .env-bento-card { background: #ffffff; border-radius: 22px; overflow: hidden; display: flex; flex-direction: column; min-height: clamp(380px, 42vw, 560px); }
        .env-bento-card.span2 { grid-column: 1 / -1; }
        .env-bento-card.split { display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; min-height: clamp(260px, 28vw, 340px); }
        .env-bento-card.split .env-bento-text { align-self: center; }
        .env-bento-text { padding: clamp(28px, 3vw, 44px); }
        .env-bento-label { margin: 0 0 10px; font-size: clamp(15px, 1.4vw, 18px); font-weight: 600; color: #1a8f3c; }
        .env-bento-body { margin: 0; font-size: clamp(17px, 1.7vw, 22px); font-weight: 500; line-height: 1.3; letter-spacing: -0.01em; color: #1d1d1f; max-width: 36ch; }
        .env-bento-media { position: relative; flex: 1; min-height: clamp(180px, 20vw, 260px); }
        .env-bento-media .env-ph { position: absolute; inset: 0; width: 100%; height: 100%; }
        .env-bento-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }

        /* ---------- 6c. impact bento (1 full + 3) ---------- */
        .env-ib { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 1.6vw, 22px); margin-top: clamp(36px, 4vw, 60px); }
        .env-ib-card { background: #ffffff; border-radius: 22px; overflow: hidden; display: flex; flex-direction: column; min-height: clamp(300px, 26vw, 380px); }
        .env-ib-card.full { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; align-items: stretch; min-height: clamp(300px, 30vw, 400px); }
        .env-ib-card.full .env-ib-text { align-self: center; }
        .env-ib-media { position: relative; min-height: clamp(220px, 24vw, 320px); }
        .env-ib-card:not(.full) .env-ib-media { flex: none; height: clamp(220px, 24vw, 320px); }
        .env-ib-media .env-ph { position: absolute; inset: 0; width: 100%; height: 100%; }
        .env-ib-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .env-ib-text { padding: clamp(24px, 2.6vw, 40px); }
        .env-ib-label { margin: 0 0 8px; font-size: clamp(15px, 1.4vw, 18px); font-weight: 600; color: #1a8f3c; }
        .env-ib-num { margin: 0 0 clamp(10px, 1.2vw, 16px); font-size: clamp(34px, 4.4vw, 56px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.04; color: #1d1d1f; }
        .env-ib-desc { margin: 0; font-size: clamp(15px, 1.4vw, 17px); font-weight: 500; line-height: 1.42; color: #6e6e73; max-width: 34ch; }

        /* ---------- proof dashboard (metric cards, matched to the page) ---------- */
        .env-dash { grid-column: 1 / -1; display: flex; flex-direction: column; gap: clamp(16px, 1.6vw, 22px); font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        .env-dash-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 1.6vw, 22px); }
        .env-dash-card { position: relative; display: flex; flex-direction: column; background: #ffffff; border-radius: 22px; padding: clamp(20px, 2vw, 28px); min-height: clamp(208px, 19vw, 260px); box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 30px rgba(0,0,0,0.035); }
        .env-dash-label { margin: 0 0 clamp(12px, 1.4vw, 18px); display: inline-flex; align-items: center; gap: 9px; font-size: clamp(15px, 1.4vw, 18px); font-weight: 600; color: #1a8f3c; }
        .env-dash-label svg { color: #1a8f3c; flex: none; }
        .env-dash-num { margin: 0; display: flex; align-items: baseline; gap: 7px; font-size: clamp(30px, 3.2vw, 44px); font-weight: 500; letter-spacing: -0.02em; line-height: 1; color: #1d1d1f; font-variant-numeric: tabular-nums; }
        .env-dash-num .u { font-size: 0.42em; font-weight: 500; letter-spacing: 0; color: #6e6e73; }
        .env-dash-num.gauge { font-size: clamp(24px, 2.4vw, 34px); }
        .env-dash-cap { margin: clamp(7px, 0.9vw, 10px) 0 0; font-size: clamp(14px, 1.3vw, 16px); font-weight: 500; line-height: 1.4; color: #6e6e73; }
        .env-dash-viz { margin-top: clamp(14px, 1.6vw, 20px); }
        .env-dash-foot { margin-top: auto; padding-top: clamp(14px, 1.6vw, 20px); font-size: clamp(13px, 1.2vw, 15px); font-weight: 500; color: #86868b; }
        .env-dash-gauge { position: relative; width: 240px; max-width: 100%; margin: clamp(4px, 0.8vw, 10px) auto clamp(12px, 1.6vw, 20px); }
        @keyframes envPulseDot { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        @media (max-width: 900px) { .env-dash-row { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .env-dash-row { grid-template-columns: 1fr; } }

        /* ---------- 6d. logo wall ---------- */
        .env-logos { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid #d2d2d7; border-left: 1px solid #d2d2d7; margin-top: clamp(40px, 5vw, 64px); }
        .env-logo-cell { position: relative; display: flex; align-items: center; justify-content: center; min-height: clamp(110px, 12vw, 150px); padding: clamp(20px, 3vw, 40px); border-right: 1px solid #d2d2d7; border-bottom: 1px solid #d2d2d7; }
        .env-logo-ph { color: #b4b4b9; font-size: clamp(16px, 1.7vw, 22px); font-weight: 700; letter-spacing: -0.01em; }
        .env-logo-img { max-width: 100%; max-height: clamp(46px, 6vw, 76px); width: auto; height: auto; object-fit: contain; }
        .env-logo-plus { position: absolute; right: -12.5px; bottom: -12.5px; width: 24px; height: 24px; color: #9a9aa0; z-index: 1; }

        /* ---------- 6e. testimonials ---------- */
        .env-tm-track { margin-top: clamp(36px, 4vw, 60px); display: flex; gap: clamp(16px, 1.6vw, 22px); padding: 4px 0 4px var(--gutter); scroll-padding-left: var(--gutter); overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
        .env-tm-track::-webkit-scrollbar { display: none; }
        .env-tm-card { flex: none; width: min(420px, 84vw); scroll-snap-align: start; background: #ffffff; border-radius: 24px; padding: clamp(28px, 3vw, 40px); display: flex; flex-direction: column; min-height: clamp(290px, 30vw, 360px); box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .env-tm-quote { margin: 0; font-size: clamp(17px, 1.6vw, 21px); font-weight: 500; line-height: 1.4; letter-spacing: -0.01em; color: #1d1d1f; }
        .env-tm-author { margin-top: auto; padding-top: clamp(22px, 2.4vw, 30px); display: flex; align-items: center; gap: 13px; }
        .env-tm-avatar { flex: none; width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 15px; font-weight: 600; letter-spacing: 0.01em; background: linear-gradient(135deg, #5fe488, #18a544); }
        .env-tm-meta { display: flex; flex-direction: column; }
        .env-tm-name { font-size: 15px; font-weight: 600; color: #1d1d1f; }
        .env-tm-role { font-size: 14px; font-weight: 500; color: #6e6e73; }
        .env-tm-nav { display: flex; justify-content: center; gap: 12px; margin-top: clamp(24px, 3vw, 40px); padding: 0 var(--gutter); }

        /* ---------- 6b. simulation (light) ---------- */
        .env-sim-media { max-width: 1200px; margin: clamp(40px, 6vw, 80px) auto 0; padding: 0 var(--gutter); }
        .env-sim-frame { border-radius: 22px; overflow: hidden; isolation: isolate; transform: translateZ(0); }
        .env-sim-media video { display: block; width: 100%; height: auto; }
        .env-sim-foot { text-align: center; margin-top: clamp(36px, 5vw, 64px); }
        .env-sim-copy { max-width: 840px; margin: 0 auto; font-size: clamp(17px, 1.5vw, 21px); font-weight: 500; line-height: 1.4; letter-spacing: 0.011em; color: #6e6e73; }
        .env-sim-copy b { color: #1d1d1f; font-weight: 600; }
        .env-sim-link { display: inline-flex; align-items: center; gap: 6px; margin-top: clamp(18px, 2vw, 28px); color: #0066cc; font-size: clamp(16px, 1.4vw, 19px); font-weight: 600; letter-spacing: -0.01em; text-decoration: none; transition: color 200ms ease; }
        .env-sim-link:hover { color: #0a84ff; }
        .env-sim-link span { display: inline-block; transition: transform 200ms ease; }
        .env-sim-link:hover span { transform: translateX(3px); }

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
          .env-ub { grid-template-columns: 1fr; }
          .env-bento { grid-template-columns: 1fr; }
          .env-bento-card { min-height: clamp(320px, 70vw, 460px); }
          .env-bento-card.split { grid-template-columns: 1fr; }
          .env-ib { grid-template-columns: 1fr; }
          .env-ib-card.full { grid-template-columns: 1fr; }
          .env-h2--nowrap { white-space: normal; }
          .env-logos { grid-template-columns: repeat(2, 1fr); }
          .env-logo-plus { display: none; }
          .env-stats-row { grid-template-columns: 1fr; }
          .env-tri { grid-template-columns: 1fr; }
          .env-duo { grid-template-columns: 1fr; }
          .env-res-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* 1 — HERO */}
      <header className="env-hero">
        <img loading="lazy" className="env-hero-img" src="/3pa.webp" alt="" />
      </header>

      {/* 2 — TWO PRODUCTS */}
      <section className="env-section">
        <div className="env-wrap">
          <p className="env-eyebrow" data-reveal>Two Products, Every Space</p>
          <h2 className="env-h2" data-reveal style={{ ["--ri" as string]: 1 }}>One purifier for indoors. One for everywhere else.</h2>
          <p className="env-sub" data-reveal style={{ ["--ri" as string]: 2 }}>PureAir works inside. AirFINEry works where the air is open.</p>
        </div>
        <div className="env-products">
          <div className="env-prod" data-reveal style={{ ["--ri" as string]: 0 }}>
            <div className="env-prod-card env-prod-card--shop">
              <img loading="lazy" className="env-prod-img" src="/spa.jpg" alt="PureAir" />
              <a className="env-prod-cta" href="/contact">Buy Now</a>
            </div>
            <p className="env-prod-cap">
              <b>PureAir.</b> Handles indoor and large indoor areas, schools,
              offices, meeting rooms, warehouses, libraries, and labs, up to
              2,000 sq ft per unit.
            </p>
          </div>
          <div className="env-prod" data-reveal style={{ ["--ri" as string]: 1 }}>
            <div className="env-prod-card env-prod-card--shop">
              <img loading="lazy" className="env-prod-img" src="/afd.webp" alt="AirFINEry" />
              <a className="env-prod-cta" href="/contact">Buy Now</a>
            </div>
            <p className="env-prod-cap">
              <b>AirFINEry.</b> Handles semi-outdoor and outdoor areas,
              corridors, lobbies, playgrounds, courts, cafes, and gyms, up to
              3,500 sq ft per unit.
            </p>
          </div>
        </div>
      </section>

      {/* 2b — PureAir / AirFINEry impact blocks (from Proof page) */}
      <ImpactBlock
        title="PureAir"
        imgLabel="PureAir image"
        img="/pa3.jpg"
        stats={[
          { icon: "frame", num: "2,000", unit: "sq ft.", desc: "of area coverage from a single unit, built for large, open indoor spaces." },
          { icon: "filter", num: "99.9%", unit: "", desc: "filter efficiency, capturing fine particles down to 0.3 microns." },
          { icon: "wind", num: "2,800", unit: "m³/h", desc: "Clean Air Delivery Rate (CADR) for rapid, whole-room purification." },
        ]}
        cta={{ label: "Explore PureAir", href: "/products/pureair" }}
      />
      <ImpactBlock
        reverse
        title="AirFINEry"
        imgLabel="AirFINEry image"
        img="/afp.webp"
        stats={[
          { icon: "frame", num: "4,000", unit: "sq ft.", desc: "of area coverage from a single unit, built for the largest open indoor spaces." },
          { icon: "filter", num: "99.9%", unit: "", desc: "filter efficiency, capturing fine particles down to 0.3 microns." },
          { icon: "wind", num: "3,500", unit: "m³/h", desc: "Clean Air Delivery Rate (CADR) for rapid, whole-room purification." },
        ]}
        cta={{ label: "Explore AirFINEry", href: "/products/airfinery" }}
      />

      {/* 3 — STATS */}
      <section className="env-section" style={{ background: "#ffffff" }}>
        <div className="env-wrap">
          <p className="env-eyebrow" data-reveal>Powered By MANN+HUMMEL</p>
          <h2 className="env-h2 env-h2--nowrap" data-reveal style={{ ["--ri" as string]: 1 }}>
            80 years of German filtration<br />now made in India.
          </h2>
          <p className="env-sub" data-reveal style={{ ["--ri" as string]: 2 }}>The world&rsquo;s filtration benchmark, built for Indian air.</p>
          <div className="env-stats-row">
            <div className="env-stats-media" data-reveal><img loading="lazy" className="env-stats-img" src="/mhh.jpg" alt="" /></div>
            <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
              <defs>
                <linearGradient id="sb-grad" gradientUnits="userSpaceOnUse" x1="12" y1="0" x2="12" y2="24">
                  <stop offset="0%" stopColor="#6cb8ff" />
                  <stop offset="100%" stopColor="#0a84ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="env-ub">
              <div className="env-ub-col">
                <article className="env-ub-card env-ub-tall" data-reveal style={{ ["--ri" as string]: 0 }}>
                  <img loading="lazy" className="env-ub-photo" src="/h1.jpg" alt="" aria-hidden />
                  <div className="env-ub-blur" aria-hidden />
                  <div className="env-ub-scrim" aria-hidden />
                  <div className="env-ub-inner">
                    <Flag className="env-ub-ic" strokeWidth={1.8} aria-hidden />
                    <div className="env-ub-text">
                      <p className="env-ub-num"><Counter to={1941} group={false} /></p>
                      <p className="env-ub-label">Founded</p>
                    </div>
                  </div>
                </article>
                <article className="env-ub-card env-ub-short" data-reveal style={{ background: "#20CA9D", ["--ri" as string]: 1 }}>
                  <Globe className="env-ub-ic" strokeWidth={1.8} aria-hidden />
                  <div className="env-ub-text">
                    <p className="env-ub-num"><Counter to={80} suffix="+" /></p>
                    <p className="env-ub-label">Countries</p>
                  </div>
                </article>
              </div>
              <div className="env-ub-col">
                <article className="env-ub-card env-ub-short" data-reveal style={{ background: "#0C6553", ["--ri" as string]: 2 }}>
                  <Award className="env-ub-ic" strokeWidth={1.8} aria-hidden />
                  <div className="env-ub-text">
                    <p className="env-ub-num"><Counter to={4700} suffix="+" /></p>
                    <p className="env-ub-label">Patents</p>
                  </div>
                </article>
                <article className="env-ub-card env-ub-tall" data-reveal style={{ ["--ri" as string]: 3 }}>
                  <img loading="lazy" className="env-ub-photo" src="/h2.jpg" alt="" aria-hidden />
                  <div className="env-ub-blur" aria-hidden />
                  <div className="env-ub-scrim" aria-hidden />
                  <div className="env-ub-inner">
                    <GraduationCap className="env-ub-ic" strokeWidth={1.8} aria-hidden />
                    <div className="env-ub-text">
                      <p className="env-ub-num"><Counter to={60} suffix="+" /></p>
                      <p className="env-ub-label">University partnerships</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3b — VIDEO */}
      <section className="env-section" style={{ background: "#ffffff", paddingTop: 0 }}>
        <div className="env-wrap">
          <VideoEmbed id="81e35zV81WY" title="MANN+HUMMEL filtration" />
        </div>
      </section>

      {/* 4 — WHERE MRH WORKS (6-image carousel) */}
      <section className="env-section">
        <div className="env-wrap">
          <p className="env-eyebrow" data-reveal>Where MRH Works</p>
          <h2 className="env-h2" data-reveal style={{ ["--ri" as string]: 1 }}>From classrooms to courtyards.</h2>
          <p className="env-sub" data-reveal style={{ ["--ri" as string]: 2 }}>200+ spaces, and counting.</p>
        </div>
        <Carousel cards={SPACES_CARDS} />
      </section>

      {/* 5 — DESIGN (light) */}
      <section className="env-section" style={{ background: "#ffffff" }}>
        <div className="env-wrap">
          <p className="env-eyebrow" data-reveal>The Technology Inside</p>
          <h2 className="env-h2" data-reveal style={{ ["--ri" as string]: 1 }}>Multi-Stage Filtration</h2>
          <p className="env-sub" data-reveal style={{ ["--ri" as string]: 2 }}>Catches the fine particles ordinary purifiers miss.</p>
          <div className="env-design-media" data-reveal>
            <SectionVideo className="env-design-vid" src="/filtervid.mp4" />
          </div>
          <div className="env-stats3">
            <div className="env-stat3" data-reveal style={{ ["--ri" as string]: 0 }}>
              <p className="env-stat3-up">Up to</p>
              <p className="env-stat3-big">2,000 sq ft</p>
              <p className="env-stat3-desc">cleaned per unit, so you need fewer</p>
            </div>
            <div className="env-stat3" data-reveal style={{ ["--ri" as string]: 1 }}>
              <p className="env-stat3-up">Down to</p>
              <p className="env-stat3-big">0.3 microns</p>
              <p className="env-stat3-desc">captured, including ultrafine particles</p>
            </div>
            <div className="env-stat3" data-reveal style={{ ["--ri" as string]: 2 }}>
              <p className="env-stat3-up">Certified to</p>
              <p className="env-stat3-big">ISO 16890</p>
              <p className="env-stat3-desc">the global clean-air standard</p>
            </div>
          </div>

          <div className="env-design-cta-row" data-reveal>
            <a className="env-design-cta" href="/technology">
              <span className="env-design-cta-label">Explore Technology</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6 — REPORTS / CONNECTED (bento) */}
      <Reports />

      {/* 6b — SIMULATION (light) */}
      <section className="env-section" style={{ background: "#ffffff" }}>
        <div className="env-wrap">
          <p className="env-eyebrow" data-reveal>Intelligent Space Planning</p>
          <h2 className="env-h2" data-reveal style={{ maxWidth: "none", ["--ri" as string]: 1 }}>
            We don&rsquo;t guess where clean air goes.
            <br />
            We simulate it.
          </h2>
        </div>
        <div className="env-sim-media" data-reveal>
          <div className="env-sim-frame">
            <SectionVideo src="/simvid.mp4" />
          </div>
        </div>
        <div className="env-wrap env-sim-foot">
          <p className="env-sim-copy" data-reveal>
            Before a single unit is installed,{" "}
            <b>
              our simulation engine maps your space and shows exactly how fast it
              reaches clean air
            </b>
            , and where every purifier should sit. In a real classroom test, one
            unit took the air from 100 µg/m³ to zero in 30 minutes. The simulation
            called the placement.
          </p>
          <a className="env-sim-link" href="/technology" data-reveal style={{ ["--ri" as string]: 1 }}>
            Discover Simulation <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* 6c — INDEPENDENTLY VALIDATED (4-card bento) */}
      <section className="env-section">
        <div className="env-wrap">
          <p className="env-eyebrow" data-reveal>Independently Validated</p>
          <h2 className="env-h2" data-reveal style={{ maxWidth: "none", ["--ri" as string]: 1 }}>
            We didn&rsquo;t test it ourselves.
            <br />
            IIT Delhi did.
          </h2>
          <p className="env-sub" data-reveal style={{ ["--ri" as string]: 2 }}>60 days, real spaces, Delhi&rsquo;s worst air.</p>

          <ProofDashboard />
        </div>
      </section>

      {/* 6d — LOGO WALL (Trusted across India) */}
      <section className="env-section" style={{ background: "#ffffff" }}>
        <div className="env-wrap">
          <p className="env-eyebrow" data-reveal>Trusted Across India</p>
          <h2 className="env-h2" data-reveal style={{ ["--ri" as string]: 1 }}>Trusted by the places people share.</h2>
          <p className="env-sub" data-reveal style={{ ["--ri" as string]: 2 }}>The names that already run MRH.</p>
          <div className="env-logos">
            {LOGOS.map((logo, i) => (
              <div className="env-logo-cell" key={i} data-reveal style={{ ["--ri" as string]: i }}>
                <img loading="lazy" className="env-logo-img" src={logo.src} alt={logo.name} />
                {i < 3 ? (
                  <PlusIcon className="env-logo-plus" strokeWidth={1} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6e — TESTIMONIALS */}
      <Testimonials />

      {/* 7 — ASSESSMENT CTA CARD (from Proof page) */}
      <ImpactDevices
        title={<>Find out what your<br />air is hiding.</>}
        sub="Tell us about your space and we return a coverage plan, the number of units you need, and the AQI you can expect."
        cta={{ label: "Get a free assessment", href: "/contact" }}
        art={
          <svg viewBox="0 0 1310 500" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
            <g stroke="#4ade80" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
              {/* PureAir — compact indoor unit */}
              <rect x={690} y={182} width={208} height={228} rx={24} />
              <circle cx={794} cy={300} r={80} />
              <circle cx={794} cy={300} r={52} strokeWidth={6} />
              <circle cx={794} cy={300} r={20} strokeWidth={6} />
              <rect x={712} y={202} width={52} height={20} rx={6} strokeWidth={5} />
              <rect x={826} y={352} width={48} height={36} rx={6} strokeWidth={5} />
              <path d="M716 410v20M872 410v20" />
              {/* AirFINEry — large-space unit */}
              <rect x={952} y={110} width={262} height={300} rx={28} />
              <circle cx={1083} cy={248} r={98} />
              <circle cx={1083} cy={248} r={64} strokeWidth={6} />
              <circle cx={1083} cy={248} r={26} strokeWidth={6} />
              <rect x={978} y={132} width={64} height={22} rx={6} strokeWidth={5} />
              <rect x={1134} y={352} width={54} height={38} rx={6} strokeWidth={5} />
              <path d="M982 410v20M1182 410v20" />
            </g>
          </svg>
        }
      />

      {/* 8 — FOOTER (light) */}
      <SiteFooter light />
    </main>
  );
}

/* ----------------------------------------------------------- sub-blocks --- */

function Reports() {
  return (
    <section className="env-section">
      <div className="env-wrap">
        <p className="env-eyebrow" data-reveal>Connected Intelligence</p>
        <h2 className="env-h2" data-reveal style={{ ["--ri" as string]: 1 }}>See the air.<br />Control the unit.<br />Skip the maintenance.</h2>
        <p className="env-sub" data-reveal style={{ ["--ri" as string]: 2 }}>Every unit online, every reading in one place.</p>

        <div className="env-bento">
          {/* 1 — top left: text on top, image below */}
          <article className="env-bento-card" data-reveal style={{ ["--ri" as string]: 0 }}>
            <div className="env-bento-text">
              <p className="env-bento-label">Live AQI, everywhere</p>
              <p className="env-bento-body">Watch your air quality update in real time. PM2.5, PM10, and AQI for every unit, on one screen, from anywhere.</p>
            </div>
            <div className="env-bento-media"><img loading="lazy" src="/liveaqi.jpg" alt="Live AQI, everywhere" /></div>
          </article>

          {/* 2 — top right: text on top, image below */}
          <article className="env-bento-card" data-reveal style={{ ["--ri" as string]: 1 }}>
            <div className="env-bento-text">
              <p className="env-bento-label">Every unit, one dashboard</p>
              <p className="env-bento-body">See all your purifiers in a single view. One room or two hundred, every reading sits in the same place.</p>
            </div>
            <div className="env-bento-media"><img loading="lazy" src="/timings.jpg" alt="Every unit, one dashboard" style={{ objectPosition: "center 35%" }} /></div>
          </article>

          {/* 3 — full width: image left, text right */}
          <article className="env-bento-card span2 split" data-reveal style={{ ["--ri" as string]: 2 }}>
            <div className="env-bento-media"><img loading="lazy" src="/Icon.jpg" alt="Control from your phone" style={{ objectPosition: "center 22%" }} /></div>
            <div className="env-bento-text">
              <p className="env-bento-label">Control from your phone</p>
              <p className="env-bento-body">Set fan speed, modes, and schedules without leaving your desk. Full control of every unit, wherever you are.</p>
            </div>
          </article>

          {/* 4 — bottom left: image on top, text below */}
          <article className="env-bento-card" data-reveal style={{ ["--ri" as string]: 3 }}>
            <div className="env-bento-media"><img loading="lazy" src="/fhm.jpg" alt="Filter health, tracked" /></div>
            <div className="env-bento-text">
              <p className="env-bento-label">Filter health, tracked</p>
              <p className="env-bento-body">Know exactly how much life each filter has left. No more guesswork, no more checking units by hand.</p>
            </div>
          </article>

          {/* 5 — bottom right: image on top, text below */}
          <article className="env-bento-card" data-reveal style={{ ["--ri" as string]: 4 }}>
            <div className="env-bento-media"><img loading="lazy" src="/sow.jpg" alt="Service on wheels" /></div>
            <div className="env-bento-text">
              <p className="env-bento-label">Service on wheels</p>
              <p className="env-bento-body">When a filter nears the end, the unit tells us first. Service is scheduled before you ever notice a drop.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { quote: "Our classrooms used to smell of the road outside. Now the AQI board stays green all day, and the parents notice.", name: "Anjali Mehta", role: "Principal, Delhi Public School" },
  { quote: "One unit covers our whole floor. We replaced three old purifiers with a single PureAir, and the readings are better.", name: "Rohan Kapoor", role: "Facilities Head, Corporate Office" },
  { quote: "Reliable in the harshest conditions. The team deployed fast and the units have run without a hitch.", name: "Col. Vikram Singh", role: "Indian Army" },
  { quote: "Guests comment on how fresh the lobby feels. AirFINEry handles our open atrium that nothing else could.", name: "Priya Nair", role: "General Manager, The Grand Hotel" },
  { quote: "In our wards, clean air is not optional. The independent IIT data is what convinced our board.", name: "Dr. Sameer Rao", role: "Administrator, City Hospital" },
  { quote: "The app flags filter health before we ever think about it. Service just happens. We never chase it.", name: "Neha Gupta", role: "Operations Manager, WorkHub" },
  { quote: "We deployed across six campuses. One dashboard, every reading in one place. It made the rollout simple.", name: "Arjun Desai", role: "Trustee, Vidya Schools" },
  { quote: "Quiet, efficient, and it actually works. The PM2.5 numbers dropped within the first hour.", name: "Meera Iyer", role: "Office Admin, Lumen Labs" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => /[a-z]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <section className="env-section">
      <div className="env-wrap">
        <p className="env-eyebrow" data-reveal>In Their Words</p>
        <h2 className="env-h2" data-reveal style={{ ["--ri" as string]: 1 }}>The people breathing it, on the difference.</h2>
        <p className="env-sub" data-reveal style={{ ["--ri" as string]: 2 }}>Real results, from the teams who deployed MRH.</p>
      </div>

      <div className="env-tm-track" ref={ref}>
        {REVIEWS.map((r, i) => (
          <article className="env-tm-card" key={i} data-reveal style={{ ["--ri" as string]: i }}>
            <p className="env-tm-quote">{r.quote}</p>
            <div className="env-tm-author">
              <span className="env-tm-avatar">{initials(r.name)}</span>
              <span className="env-tm-meta">
                <span className="env-tm-name">{r.name}</span>
                <span className="env-tm-role">{r.role}</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="env-tm-nav">
        <button type="button" className="env-arrow" aria-label="Previous" onClick={() => scroll(-1)}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className="env-arrow" aria-label="Next" onClick={() => scroll(1)}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </section>
  );
}

// Self-hosted video that plays only while its section is in view, and pauses
// (keeping its position) when scrolled away.
function SectionVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      loop
      muted
      playsInline
      preload="none"
      aria-hidden
    />
  );
}

// Count-up number that animates from 0 to `to` when it scrolls into view.
function Counter({
  to,
  suffix = "",
  group = true,
  duration = 1500,
}: {
  to: number;
  suffix?: string;
  group?: boolean;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          let startTime = 0;
          const tick = (now: number) => {
            if (!startTime) startTime = now;
            const p = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {group ? val.toLocaleString("en-US") : String(val)}
      {suffix}
    </span>
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
  img,
  stats,
  cta,
}: {
  reverse?: boolean;
  title: string;
  imgLabel: string;
  img?: string;
  stats: ImpactStat[];
  cta?: { label: string; href: string };
}) {
  const media = (
    <div className="env-im-media" data-reveal>
      {img ? <img loading="lazy" className="env-im-img" src={img} alt="" /> : <Slot label={imgLabel} />}
    </div>
  );
  const text = (
    <div className="env-im-text">
      <h3 className="env-im-head" data-reveal>{title}</h3>
      {stats.map((s, i) => (
        <div className="env-im-stat" key={i} data-reveal style={{ ["--ri" as string]: i + 1 }}>
          <div className="env-im-stat-top">
            <ImpactIcon kind={s.icon} />
            <span className="env-im-num">{s.num}</span>
            {s.unit ? <span className="env-im-unit">{s.unit}</span> : null}
          </div>
          <p className="env-im-desc">{s.desc}</p>
        </div>
      ))}
      {cta ? (
        <div className="env-im-cta-wrap">
          <a className="env-xcta-pill reveal-bubble" href={cta.href} data-reveal>
            <span>{cta.label}</span>
          </a>
        </div>
      ) : null}
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
