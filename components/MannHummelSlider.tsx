"use client";

import { useEffect, useRef, useState } from "react";

// MANN+HUMMEL brand-story rail: 8 tall cards you can drag, scroll, or step through
// with the keyboard. Styled to match the site (Inter Tight, site greys/green).
// Images are placeholders for now; `img` gets filled in later per card.
type Card = {
  tag: string;
  year: string;
  title: string;
  copy?: string;
  img?: string;
  type?: "stats";
};

const CARDS: Card[] = [
  {
    tag: "Origin",
    year: "Ludwigsburg",
    title: "Global Headquarters in Germany",
    copy: "The Ludwigsburg campus, where MANN+HUMMEL filtration has been engineered since 1941.",
    img: "/mhh.jpg",
  },
  {
    tag: "Legacy",
    year: "Since 1941",
    title: "MANN+HUMMEL Legacy",
    type: "stats",
    img: "/mh2.png",
  },
  {
    tag: "Agreement",
    year: "Symposium",
    title: "A Perpetual Exclusive Manufacturing and Distribution License Agreement",
    copy: "MRH and MANN+HUMMEL formalise a partnership built to last, signed at the Air Pollution Symposium.",
    img: "/mh4.jpeg",
  },
  {
    tag: "Manufacturing",
    year: "India",
    title: "Aligned with Make in India",
    copy: "German Filtration Technology, Now Proudly Manufactured in India",
    img: "/mh5.png",
  },
  {
    tag: "Trusted by",
    year: "Automotive Leaders",
    title: "Proven with Leading OEMs",
    copy: "MANN+HUMMEL: Over Two Decades of Presence in India",
    img: "/mhs2.jpeg",
  },
  {
    tag: "Partnership",
    year: "MRH",
    title: "Strategic Partnership with MRH",
    copy: "MRH's strong engineering capabilities, customer-first approach, and deep understanding of local market requirements make them the ideal partner of MANN+HUMMEL.",
    img: "/mhx.jpeg",
  },
  {
    tag: "Symposium",
    year: "New Delhi",
    title: "Symposium on Air Pollution",
    copy: "Shri Tarun Kapoor, Advisor to the Prime Minister's Office, on India's clean air imperative.",
    img: "/mht.jpeg",
  },
];

export default function MannHummelSlider() {
  const railRef = useRef<HTMLDivElement>(null);

  // Live "filters produced" counter (32/sec). Starts counting only once the
  // section scrolls into view. Falls back to a static value under reduced-motion.
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setReduced(true));
      return () => cancelAnimationFrame(raf);
    }
    const el = railRef.current;
    if (!el) return;
    let intervalId = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !intervalId) {
          const t0 = Date.now();
          intervalId = window.setInterval(() => {
            setCount(Math.floor(((Date.now() - t0) / 1000) * 32));
          }, 90);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const step = () => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(".mh-card");
    if (!rail || !card) return 1;
    const gap = parseFloat(getComputedStyle(rail).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const go = (dir: number) =>
    railRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  // Drag to scrub (desktop pointer); touch uses native overflow scrolling.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let down = false;
    let x0 = 0;
    let s0 = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      down = true;
      x0 = e.clientX;
      s0 = rail.scrollLeft;
      rail.classList.add("is-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      rail.scrollLeft = s0 - (e.clientX - x0);
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      rail.classList.remove("is-dragging");
    };
    rail.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      rail.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="mh">
      <style>{`
        .mh { width: 100%; margin-top: clamp(32px, 4vw, 56px); }
        .mh-inner { position: relative; }
        /* Prev / next arrows on either end (match the site's other carousels) */
        .mh-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 5;
          width: clamp(38px, 3.4vw, 48px); height: clamp(38px, 3.4vw, 48px);
          border: none; border-radius: 50%; background: #ffffff; color: #333336;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
          transition: background 200ms ease, transform 150ms ease;
        }
        .mh-arrow:hover { background: #f0f0f2; }
        .mh-arrow:active { transform: translateY(-50%) scale(0.92); }
        .mh-arrow--prev { left: clamp(8px, 2vw, 20px); }
        .mh-arrow--next { right: clamp(8px, 2vw, 20px); }
        .mh-arrow svg { width: 44%; height: 44%; }
        .mh-rail {
          display: flex;
          gap: clamp(14px, 1.4vw, 20px);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-padding-left: clamp(20px, 6vw, 72px);
          scroll-behavior: smooth;
          padding: 4px clamp(20px, 6vw, 72px) 8px;
          scrollbar-width: none;
          cursor: grab;
        }
        .mh-rail::-webkit-scrollbar { display: none; }
        .mh-rail.is-dragging { cursor: grabbing; scroll-behavior: auto; scroll-snap-type: none; }
        .mh-card {
          position: relative;
          flex: 0 0 clamp(236px, 25vw, 320px);
          aspect-ratio: 3 / 4.15;
          scroll-snap-align: start;
          border-radius: clamp(18px, 1.6vw, 24px);
          overflow: hidden;
          background: #0b0f0d;
          isolation: isolate;
        }
        /* Placeholder slot — exact background from the source HTML (swapped for
           real images later) */
        .mh-ph {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            repeating-linear-gradient(135deg, #20272400 0 11px, #ffffff0a 11px 12px),
            linear-gradient(160deg, #1C2320 0%, #0B0F0D 70%);
        }
        /* Image on the top half of the card; the rest stays the dark placeholder
           bg with the text. The bottom edge fades into the dark half. */
        .mh-top-img {
          position: absolute;
          top: 0; left: 0; right: 0;
          width: 100%;
          height: 52%;
          z-index: 1;
          object-fit: cover;
          object-position: center 45%;
          -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
        }
        /* Bottom scrim keeps the text readable over any image */
        .mh-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(to top,
            rgba(6, 9, 8, 0.92) 0%,
            rgba(6, 9, 8, 0.72) 26%,
            rgba(6, 9, 8, 0.28) 55%,
            rgba(6, 9, 8, 0.05) 100%);
        }
        .mh-body {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          z-index: 2;
          padding: clamp(18px, 1.6vw, 26px);
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 0.8vw, 11px);
          color: #ffffff;
        }
        .mh-tag {
          font-size: clamp(11px, 1vw, 12px);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4ade80;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .mh-tag b { color: rgba(255, 255, 255, 0.55); font-weight: 500; letter-spacing: 0.04em; }
        .mh-title {
          margin: 0;
          font-size: clamp(17px, 1.4vw, 21px);
          font-weight: 600;
          line-height: 1.22;
          letter-spacing: -0.012em;
          text-wrap: balance;
        }
        .mh-copy {
          margin: 0;
          font-size: clamp(12.5px, 1.1vw, 14px);
          font-weight: 400;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.74);
          max-width: 32ch;
        }
        /* Image cards with no body copy: a taller image fills the space so the
           bottom-anchored text keeps a balanced gap (matching the copy cards). */
        .mh-top-img--tall { height: 64%; }

        /* ---- Stats / live-counter card (card 2): image on top, stats below ---- */
        .mh-si {
          display: flex;
          flex-direction: column;
          background:
            repeating-linear-gradient(135deg, #20272400 0 11px, #ffffff0a 11px 12px),
            linear-gradient(160deg, #1c2320 0%, #0b0f0d 38%);
        }
        .mh-si-media { position: relative; flex: none; height: 33%; }
        .mh-si-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .mh-si-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top,
            rgba(6, 9, 8, 0.9) 0%,
            rgba(6, 9, 8, 0.5) 32%,
            rgba(6, 9, 8, 0) 62%);
        }
        .mh-si-label {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: clamp(16px, 1.5vw, 22px);
          display: flex;
          flex-direction: column;
          gap: clamp(7px, 0.7vw, 9px);
          color: #ffffff;
        }
        .mh-si-stats {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(11px, 1.3vw, 15px);
          padding: clamp(16px, 1.6vw, 22px) clamp(15px, 1.5vw, 21px) clamp(22px, 2.2vw, 30px);
        }
        .mh-live {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
        }
        .mh-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #30d158;
          animation: mhPulse 1.9s ease-in-out infinite;
        }
        @keyframes mhPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(48, 209, 88, 0); }
          50% { opacity: 0.65; box-shadow: 0 0 7px 1px rgba(48, 209, 88, 0.55); }
        }
        @media (prefers-reduced-motion: reduce) { .mh-dot { animation: none; } }
        .mh-count {
          margin: clamp(7px, 0.8vw, 10px) 0 0;
          font-size: clamp(27px, 2.9vw, 34px);
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 1;
          color: #ffffff;
          font-variant-numeric: tabular-nums;
        }
        .mh-ticker-sub {
          margin: clamp(6px, 0.7vw, 8px) 0 0;
          font-size: 12px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.5);
          max-width: 28ch;
        }
        /* 2×2 figures — no boxes, subtle hairline dividers only */
        .mh-figs {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .mh-fig {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: clamp(8px, 0.9vw, 11px) 0;
        }
        .mh-fig:nth-child(odd) { padding-right: clamp(14px, 1.5vw, 20px); }
        .mh-fig:nth-child(even) {
          padding-left: clamp(14px, 1.5vw, 20px);
          border-left: 1px solid rgba(255, 255, 255, 0.09);
        }
        .mh-fig:nth-child(n + 3) { border-top: 1px solid rgba(255, 255, 255, 0.09); }
        .mh-fig-n {
          font-size: clamp(19px, 1.9vw, 23px);
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1;
          color: #ffffff;
          font-variant-numeric: tabular-nums;
        }
        .mh-fig-u { font-size: 0.5em; font-weight: 500; letter-spacing: 0; color: rgba(255, 255, 255, 0.5); }
        .mh-fig-l {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(255, 255, 255, 0.48);
        }
      `}</style>

      <div className="mh-inner">
      <button type="button" className="mh-arrow mh-arrow--prev" aria-label="Previous" onClick={() => go(-1)}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className="mh-arrow mh-arrow--next" aria-label="Next" onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="mh-rail"
        ref={railRef}
        tabIndex={0}
        aria-label={`MANN+HUMMEL brand story, ${CARDS.length} slides`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
      >
        {CARDS.map((c, i) =>
          c.type === "stats" ? (
            <article
              className="mh-card mh-si"
              key={i}
              data-reveal
              style={{ ["--ri" as string]: i }}
            >
              <div className="mh-si-media">
                {c.img ? <img src={c.img} alt={c.title} /> : null}
                <div className="mh-si-scrim" aria-hidden />
                <div className="mh-si-label">
                  <span className="mh-tag">
                    {c.tag} <b>· {c.year}</b>
                  </span>
                  <h3 className="mh-title">{c.title}</h3>
                </div>
              </div>
              <div className="mh-si-stats">
                <div className="mh-lead">
                  <div className="mh-live">
                    <span className="mh-dot" aria-hidden />
                    Producing now
                  </div>
                  <div className="mh-count">
                    {reduced ? "32/sec" : count.toLocaleString("en-IN")}
                  </div>
                  <p className="mh-ticker-sub">
                    Filters produced while you&rsquo;ve been here, at 32 a second.
                  </p>
                </div>
                <div className="mh-figs">
                  <div className="mh-fig">
                    <span className="mh-fig-n">1941</span>
                    <span className="mh-fig-l">Founded</span>
                  </div>
                  <div className="mh-fig">
                    <span className="mh-fig-n">&euro;4.7B</span>
                    <span className="mh-fig-l">Revenue</span>
                  </div>
                  <div className="mh-fig">
                    <span className="mh-fig-n">80+</span>
                    <span className="mh-fig-l">Locations</span>
                  </div>
                  <div className="mh-fig">
                    <span className="mh-fig-n">
                      32<span className="mh-fig-u">/sec</span>
                    </span>
                    <span className="mh-fig-l">Filters made</span>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <article
              className="mh-card"
              key={i}
              data-reveal
              style={{ ["--ri" as string]: i }}
            >
              <div className="mh-ph" aria-hidden />
              {c.img ? (
                <img
                  className={`mh-top-img${c.copy ? "" : " mh-top-img--tall"}`}
                  src={c.img}
                  alt={c.title}
                />
              ) : null}
              <div className="mh-scrim" aria-hidden />
              <div className="mh-body">
                <span className="mh-tag">
                  {c.tag} <b>· {c.year}</b>
                </span>
                <h3 className="mh-title">{c.title}</h3>
                {c.copy ? <p className="mh-copy">{c.copy}</p> : null}
              </div>
            </article>
          )
        )}
      </div>
      </div>
    </div>
  );
}
