"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";

// "Get the highlights." carousel — Figma node 707:3535.
// Dark (#1d1d1f) section, black rounded cards (one text-only, the rest full-bleed
// covers), and a glass control pill (segmented progress + play/pause) that sticks
// to the bottom of the viewport ONLY while this section is on screen.

type Slide = {
  title: string;
  image?: string; // omitted → text-only card
};

const SLIDES: Slide[] = [
  {
    title: "Heat‑forged steel unibody, engineered to outlast the room it cleans.",
  },
  {
    title: "Three‑stage filtration captures 99.97% of particles down to 0.3 microns.",
    image: "/multi-stage-filter.png",
  },
  {
    title: "A live AQI readout you can trust — clean air you can actually see.",
    image: "/aqimeter.png",
  },
  {
    title: "Proven clean air in the rooms where people live and work.",
    image: "/environment.png",
  },
];

export default function Highlights() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const n = SLIDES.length;

  const next = () => setActive((i) => (i + 1) % n);

  const { ref, inView } = useInView<HTMLElement>();

  // The sticky control pill should only appear once the section is substantially
  // in view — otherwise it pins to the viewport bottom while a preceding full-bleed
  // hero is still on screen and looks like it's overlapping it.
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setPinned(e.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -65% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return (
    <section
      ref={ref}
      className={`hl ${inView ? "is-in" : ""}`}
      id="highlights"
      aria-label="Get the highlights"
    >
      <style>{`
        .hl {
          --gutter: clamp(20px, 6vw, 88px);
          --gap: clamp(16px, 1.6vw, 24px);
          --cardw: min(1260px, calc(100vw - 2 * var(--gutter) - clamp(40px, 6vw, 96px)));
          position: relative;
          background: #1d1d1f;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 11vh, 160px) 0 clamp(96px, 16vh, 216px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          flex-direction: column;
        }
        .hl-head {
          padding: 0 var(--gutter);
          margin-bottom: clamp(28px, 4vw, 56px);
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hl-title {
          margin: 0;
          font-size: clamp(30px, 4vw, 56px);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #f5f5f7;
        }
        .hl-watch {
          flex: none;
          color: #3bbf6a;
          font-size: clamp(15px, 1.2vw, 17px);
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 200ms ease;
        }
        .hl-watch:hover { color: #4ade80; }
        .hl-watch svg { width: 1em; height: 1em; }

        /* Viewport clips the horizontally-translated track. Kept separate from the
           section so the section has no overflow clip (which would break sticky). */
        .hl-viewport { position: relative; width: 100%; overflow: hidden; }
        .hl-track {
          /* Max leftward shift: when reached, the last card's right edge aligns
             with the right gutter (i.e. with "Watch the film"). 4 cards, 3 gaps. */
          --maxshift: max(0px, calc(4 * var(--cardw) + 3 * var(--gap) + 2 * var(--gutter) - 100vw));
          display: flex;
          gap: var(--gap);
          padding: 0 var(--gutter);
          transform: translateX(calc(-1 * min(var(--active, 0) * (var(--cardw) + var(--gap)), var(--maxshift))));
          transition: transform 640ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hl-card {
          position: relative;
          flex: none;
          width: var(--cardw);
          height: clamp(540px, 78vh, 840px);
          background: #000000;
          border-radius: clamp(20px, 2vw, 28px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Text-only card — centered statement */
        .hl-card-text {
          margin: auto;
          max-width: 22ch;
          padding: clamp(24px, 3vw, 48px);
          text-align: center;
          font-size: clamp(20px, 2.4vw, 28px);
          font-weight: 600;
          line-height: 1.16;
          letter-spacing: 0.007em;
          color: rgba(255, 255, 255, 0.92);
        }

        /* Cover image cards */
        .hl-card-cover {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
        }
        .hl-card-scrim {
          position: absolute;
          inset: 0 0 auto 0;
          height: 46%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
        }
        .hl-card-caption {
          position: relative;
          z-index: 2;
          margin: 0;
          max-width: 22ch;
          padding: clamp(28px, 3.4vw, 48px) clamp(28px, 3.4vw, 48px) 0;
          text-align: center;
          align-self: center;
          font-size: clamp(17px, 1.7vw, 24px);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0.007em;
          color: #ffffff;
        }

        /* --- Control pill: sticks to bottom of viewport while section is in view --- */
        .hl-controls {
          position: sticky;
          bottom: clamp(20px, 4vh, 40px);
          z-index: 5;
          align-self: center;
          /* pull up so it floats over the bottom of the card area */
          margin-top: clamp(-128px, -13vh, -72px);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: opacity 300ms ease;
        }
        /* keep the pill hidden until the section is properly in view, so it doesn't
           pin over a preceding full-bleed hero */
        .hl-controls.is-prehidden { opacity: 0 !important; pointer-events: none; }
        .hl-progress {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          height: clamp(48px, 5vw, 56px);
          padding: 0 24px;
          border-radius: 980px;
          background: rgba(42, 42, 45, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
        .hl-seg {
          position: relative;
          height: 8px;
          width: 8px;
          padding: 0;
          border: none;
          border-radius: 980px;
          background: rgba(245, 245, 247, 0.32);
          cursor: pointer;
          overflow: hidden;
          transition: width 480ms cubic-bezier(0.22, 1, 0.36, 1),
            background 300ms ease;
        }
        .hl-seg.is-active {
          width: 48px;
          background: rgba(245, 245, 247, 0.3);
        }
        @keyframes hlFill { from { width: 0%; } to { width: 100%; } }
        .hl-fill {
          display: block;
          height: 100%;
          width: 0%;
          border-radius: 980px;
          background: #f5f5f7;
          animation: hlFill 6000ms linear forwards;
        }
        .hl-play {
          width: clamp(48px, 5vw, 56px);
          height: clamp(48px, 5vw, 56px);
          border-radius: 980px;
          border: none;
          background: rgba(42, 42, 45, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          color: #f5f5f7;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 200ms ease, background 200ms ease;
        }
        .hl-play:hover { background: rgba(60, 60, 64, 0.82); transform: scale(1.04); }
        .hl-play svg { width: 20px; height: 20px; }

        @media (max-width: 720px) {
          .hl-head { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hl-track { transition: none; }
          .hl-fill { animation: none; width: 100%; }
        }
      `}</style>

      <div className="hl-head" data-reveal>
        <h2 className="hl-title">Get the highlights.</h2>
        <a className="hl-watch" href="#highlights">
          Watch the film
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M8 5l11 7-11 7z" fill="currentColor" />
          </svg>
        </a>
      </div>

      <div className="hl-viewport" data-reveal style={{ ["--ri" as string]: 1 }}>
        <div className="hl-track" style={{ ["--active" as string]: active }}>
          {SLIDES.map((s, i) => (
            <article className="hl-card" key={i}>
              {s.image ? (
                <>
                  <img className="hl-card-cover" src={s.image} alt={s.title} />
                  <div className="hl-card-scrim" aria-hidden />
                  <h3 className="hl-card-caption">{s.title}</h3>
                </>
              ) : (
                <p className="hl-card-text">{s.title}</p>
              )}
            </article>
          ))}
        </div>
      </div>

      <div
        className={`hl-controls reveal-bubble ${pinned ? "" : "is-prehidden"}`}
        data-reveal
      >
        <div className="hl-progress">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              type="button"
              className={`hl-seg ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Go to highlight ${i + 1}`}
              aria-current={i === active}
            >
              {i === active && (
                <span
                  key={active}
                  className="hl-fill"
                  style={{ animationPlayState: playing ? "running" : "paused" }}
                  onAnimationEnd={next}
                />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="hl-play"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause highlights" : "Play highlights"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5l11 7-11 7z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
