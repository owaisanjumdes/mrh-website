"use client";

import { useEffect, useRef, useState } from "react";

// Impact — "Our IIT results" gallery. Figma node 794:11579 (Apple's "Use. Recover.
// Reuse." horizontal card gallery). Green-highlighted heading + subtext, then four
// rounded image cards (overlaid title + caption below), scrolled with prev/next
// arrows. Heading changed to "Our IIT results" per request.

type Card = {
  img: string;
  title: string[];
  titlePos: "bottom" | "center";
  titleColor: string;
  large?: boolean;
  lead: string;
  desc: string;
  fn?: string;
};

const CARDS: Card[] = [
  {
    img: "/impact-gallery-1.jpg",
    title: ["Products that", "pass the test."],
    titlePos: "bottom",
    titleColor: "#f5f5f7",
    lead: "High efficacy, ranging from 70% to 90%, was observed indoors",
    desc: " during both medium and heavy pollution, while efficacy ranged from 70% to 97% outdoors.",
  },
  {
    img: "/impact-gallery-2.jpg",
    title: ["Chipping away", "at emissions."],
    titlePos: "center",
    titleColor: "#1d1d1f",
    large: true,
    lead: "A significant ~75% reduction in ultrafine, coarse particles,",
    desc: " and others was observed within 3 to 6 hours in a naturally ventilated room with doors and windows open, and ongoing activities.",
  },
  {
    img: "/impact-gallery-3.jpg",
    title: ["Disassembly done", "differently."],
    titlePos: "bottom",
    titleColor: "#f5f5f7",
    lead: "After the reduction, the purifier can maintain safe levels and even reduce the concentration to below 20 µg/m³",
    desc: " (WHO recommended levels).",
  },
  {
    img: "/impact-gallery-4.jpg",
    title: ["Renewable energy.", "Remarkable scale."],
    titlePos: "bottom",
    titleColor: "#1d1d1f",
    lead: "Continuous use in a controlled environment can help achieve an ISO 1000 clean room standard",
    desc: " (≤ 1000 particles/cm³) — ideal for highly sensitive spaces like operation theaters, labs, and ICUs.",
  },
];

type Caption = { lead: string; desc: string };

export default function ImpactGallery({
  showHeader = true,
  captions,
}: {
  showHeader?: boolean;
  captions?: Caption[];
} = {}) {
  // keep each card's image/title; optionally override the bold lead + caption text
  const cards = captions
    ? CARDS.map((c, i) => ({ ...c, lead: captions[i].lead, desc: captions[i].desc, fn: undefined }))
    : CARDS;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  const scrollByDir = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section
      className={`ig ${showHeader ? "" : "ig--nohead"}`}
      aria-label="Our IIT results"
    >
      <style>{`
        .ig {
          --gutter: clamp(20px, 6vw, 126px);
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 10vw, 144px) 0 clamp(64px, 9vw, 130px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .ig--nohead { padding-top: clamp(24px, 4vw, 56px); }
        .ig--nohead .ig-scroller { margin-top: 0; }

        /* ---- Header ---- */
        .ig-head {
          max-width: 945px;
          margin: 0 auto;
          padding: 0 var(--gutter);
          text-align: center;
        }
        .ig-title {
          margin: 0;
          color: #1d1d1f;
          font-size: clamp(36px, 6.2vw, 80px);
          font-weight: 600;
          line-height: 1.0;
          letter-spacing: -0.015em;
        }
        .ig-hl {
          background: #00d959;
          color: #1d1d1f;
          border-radius: clamp(10px, 1.2vw, 20px);
          padding: 0.02em 0.2em;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .ig-sub {
          margin: clamp(18px, 2.2vw, 28px) auto 0;
          max-width: 840px;
          color: #1d1d1f;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
        }

        /* ---- Scroller ---- */
        .ig-scroller {
          margin-top: clamp(40px, 7vw, 96px);
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          overscroll-behavior-x: contain;
          scroll-padding-left: var(--gutter);
          padding: 10px var(--gutter) 8px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .ig-scroller::-webkit-scrollbar { display: none; }

        .ig-card {
          flex: none;
          width: clamp(300px, 82vw, 372px);
          scroll-snap-align: start;
        }
        .ig-media {
          position: relative;
          height: clamp(460px, 124vw, 580px);
          border-radius: 28px;
          overflow: hidden;
        }
        .ig-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ig-card-title {
          position: absolute;
          left: 0;
          right: 0;
          margin: 0;
          padding: 0 24px;
          text-align: center;
          font-size: clamp(24px, 3vw, 28px);
          font-weight: 600;
          line-height: 1.14;
          letter-spacing: 0.007em;
        }
        .ig-card-title.is-bottom { bottom: clamp(24px, 3vw, 36px); }
        .ig-card-title.is-center { top: 35%; }
        .ig-card-title.is-large { font-size: clamp(30px, 4.2vw, 40px); line-height: 1.1; }

        .ig-caption {
          margin: 0;
          padding: 28px 15px 0;
          color: #6e6e73;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.235;
          letter-spacing: -0.022em;
        }
        .ig-caption b { color: #1d1d1f; font-weight: 600; }
        .ig-fn { font-size: 0.78em; vertical-align: super; text-decoration: underline; }

        /* ---- Arrows ---- */
        .ig-nav {
          margin: clamp(20px, 2.4vw, 24px) 0 0;
          padding: 0 var(--gutter);
          display: flex;
          justify-content: flex-end;
          gap: 18px;
        }
        .ig-arrow {
          width: 36px;
          height: 36px;
          border-radius: 36px;
          border: none;
          background: rgba(210, 210, 215, 0.64);
          color: #1d1d1f;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 200ms ease, background 200ms ease;
        }
        .ig-arrow:hover:not(:disabled) { background: rgba(190, 190, 196, 0.82); }
        .ig-arrow:disabled { opacity: 0.42; cursor: default; }
        .ig-arrow svg { width: 18px; height: 18px; }
      `}</style>

      {showHeader && (
        <div className="ig-head">
          <h2 className="ig-title" data-reveal>
            <span className="ig-hl">Our IIT results</span>
          </h2>
          <p className="ig-sub" data-reveal style={{ ["--ri" as string]: 1 }}>
            Making products that last and can be recycled at their end of life helps
            protect the earth’s precious resources.
          </p>
        </div>
      )}

      <div
        className="ig-scroller"
        ref={scrollerRef}
        onScroll={updateEdges}
        data-reveal
        style={{ ["--ri" as string]: 1 }}
      >
        {cards.map((c) => (
          <article className="ig-card" key={c.lead}>
            <div className="ig-media">
              <img src={c.img} alt={c.title.join(" ")} />
              <p
                className={`ig-card-title ${c.titlePos === "center" ? "is-center" : "is-bottom"} ${c.large ? "is-large" : ""}`}
                style={{ color: c.titleColor }}
              >
                {c.title[0]}
                <br />
                {c.title[1]}
              </p>
            </div>
            <p className="ig-caption">
              <b>{c.lead}</b>
              {c.desc}
              {c.fn ? <span className="ig-fn">{c.fn}</span> : null}
            </p>
          </article>
        ))}
      </div>

      <div className="ig-nav">
        <button
          type="button"
          className="ig-arrow"
          onClick={() => scrollByDir(-1)}
          disabled={atStart}
          aria-label="Previous item"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="ig-arrow"
          onClick={() => scrollByDir(1)}
          disabled={atEnd}
          aria-label="Next item"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
