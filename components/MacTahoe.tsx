"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// "macOS Tahoe — Fresh faced. Timelessly Mac." — Figma node 756:8800.
// Hero banner + intro, then a horizontal feature-card gallery with prev/next
// arrows. Copy kept verbatim from the Figma design.

type Card = {
  img: string;
  wide?: boolean;
  play?: boolean;
  contain?: boolean;
  title: string;
  desc: ReactNode;
};

const CARDS: Card[] = [
  {
    img: "/mt-card1.jpg",
    wide: true,
    title: "MANN+HUMMEL media",
    desc: "Nano-fiber filters that capture more and breathe easier, with best-in-class flow resistance.",
  },
  {
    img: "/mt-card2.jpg",
    wide: true,
    title: "Multi-stage filtration",
    desc: "Pulls PM0.1 through PM10, smoke, and gases out of the air in a single pass.",
  },
  {
    img: "/mt-card3.jpg",
    title: "Eurovent-certified performance",
    desc: "Independent, third-party verification that every M+H filter performs exactly as claimed, with the widest A+ energy-efficiency range on the market.",
  },
  {
    img: "/mt-card4.jpg",
    wide: true,
    title: "Validated efficiency",
    desc: "Captures 99.97% of particles down to 0.3 microns, independently verified by IIT Delhi.",
  },
];

function PlayBtn({ label }: { label: string }) {
  return (
    <span className="mt-play" aria-label={label} role="img">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M8 5l11 7-11 7z" />
      </svg>
    </span>
  );
}

export default function MacTahoe({
  eyebrow = "The Breakthrough",
  bannerLabel = "Partners with",
  bannerHeading = "MANN+HUMMEL",
  bannerHeadingSentence = false,
  bodyCopy,
  showCards = true,
  showBanner = true,
  bannerImage,
  trio,
  headingSub,
  showIntro = true,
  headingJustify = false,
}: {
  bannerLabel?: string | null;
  bannerHeading?: string;
  bannerHeadingSentence?: boolean;
  bodyCopy?: ReactNode;
  showCards?: boolean;
  showBanner?: boolean;
  bannerImage?: string;
  trio?: { img: string; title: string; desc: string }[];
  headingSub?: ReactNode;
  showIntro?: boolean;
  headingJustify?: boolean;
  eyebrow?: string;
} = {}) {
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
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="mt" aria-label="macOS Tahoe">
      <style>{`
        .mt {
          --gutter: clamp(20px, 6vw, 88px);
          --inset: calc(max(0px, (100vw - 1260px) / 2) + var(--gutter));
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(80px, 12vh, 144px) 0;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }

        .mt-eyebrow {
          margin: 0 auto clamp(12px, 1.6vw, 20px);
          padding: 0 var(--gutter);
          text-align: center;
          color: #ff791b;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
        }

        /* plain heading (when the image banner is hidden) */
        .mt-heading {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--gutter);
          text-align: center;
        }
        .mt-heading .mt-h2 { color: #f5f5f7; }
        .mt-headsub {
          margin: clamp(16px, 2vw, 26px) auto 0;
          max-width: 760px;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 500;
          line-height: 1.42;
          letter-spacing: -0.005em;
          text-wrap: balance;
        }
        .mt-headsub b { color: #f5f5f7; font-weight: 600; }

        /* three tall image cards (same media + caption style as the gallery) */
        .mt-trio {
          max-width: 1260px;
          margin: clamp(28px, 4vw, 56px) auto 0;
          padding: 0 var(--gutter);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 1.8vw, 24px);
        }
        .mt-trio-card { display: flex; flex-direction: column; }
        @media (max-width: 700px) {
          .mt-trio { grid-template-columns: 1fr; }
        }

        /* Hero banner */
        .mt-banner {
          position: relative;
          max-width: 1512px;
          margin: clamp(16px, 2.6vw, 38px) auto 0;
          height: clamp(360px, 48vw, 681px);
          overflow: hidden;
        }
        .mt-banner-bleed { margin: 0 var(--gutter); height: 100%; position: relative; overflow: hidden; }
        .mt-banner img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* Black scrim so the white headline stays legible over the image */
        .mt-banner-scrim {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.42);
          z-index: 1;
          pointer-events: none;
        }
        .mt-banner-head {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          padding: 0 20px;
          z-index: 2;
        }
        .mt-label {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
        }
        .mt-h2 {
          margin: clamp(6px, 1vw, 12px) 0 0;
          color: #f5f5f7;
          font-size: clamp(44px, 8vw, 104px);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }
        /* sentence headings wrap and sit a touch smaller (vs the short brand word) */
        .mt-h2--sentence {
          margin-left: auto;
          margin-right: auto;
          max-width: 18ch;
          font-size: clamp(30px, 5vw, 66px);
          line-height: 1.05;
          white-space: normal;
          text-wrap: balance;
        }
        /* wraps to ~two balanced centered lines */
        .mt-h2--justify {
          max-width: min(820px, 92vw);
          font-size: clamp(28px, 4.4vw, 56px);
          text-align: center;
          text-wrap: balance;
        }
        .mt-play {
          position: absolute;
          background: rgba(66, 66, 69, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          width: 36px;
          height: 36px;
          border-radius: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.92);
          z-index: 3;
        }
        .mt-play svg { width: 14px; height: 14px; }
        .mt-banner-play { top: clamp(16px, 3vw, 46px); right: clamp(16px, 3vw, 40px); }

        /* Intro */
        .mt-intro {
          max-width: 1260px;
          margin: clamp(48px, 6vw, 80px) auto 0;
          padding: 0 var(--gutter);
        }
        .mt-intro-inner { padding-left: clamp(0px, 16vw, 210px); max-width: 840px; }
        .mt-copy {
          margin: 0;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.19;
          letter-spacing: 0.011em;
        }
        .mt-copy b { color: #ffffff; font-weight: 600; }
        .mt-link {
          display: inline-block;
          margin-top: clamp(12px, 1.4vw, 18px);
          color: #2997ff;
          font-size: clamp(17px, 1.5vw, 21px);
          line-height: 1.38;
          letter-spacing: 0.011em;
          text-decoration: none;
        }
        .mt-link:hover { text-decoration: underline; }

        /* Gallery */
        .mt-gallery {
          margin-top: clamp(48px, 7vw, 130px);
        }
        .mt-scroller {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          /* Without this, overflow-y computes to auto (because overflow-x is set),
             turning the gallery into a vertical scroll container that swallows page
             scroll. Keep it horizontal-only so downward scrolling never snags here. */
          overflow-y: hidden;
          scroll-snap-type: x proximity;
          overscroll-behavior-x: contain;
          scroll-padding-left: var(--inset);
          padding: 10px var(--gutter) 8px var(--inset);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .mt-scroller::-webkit-scrollbar { display: none; }
        .mt-card {
          flex: none;
          width: min(696px, 86vw);
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
        }
        .mt-card--narrow { width: min(372px, 70vw); }
        .mt-card-media {
          position: relative;
          background: #000000;
          border-radius: 28px;
          overflow: hidden;
          height: clamp(300px, 30vw, 450px);
        }
        .mt-card-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        /* graph card: keep the shared card height, show the full chart, and fill
           the space below it with white (matches the chart's white background) so
           there are no black letterbox bars */
        .mt-card-media.is-contain { background: #ffffff; }
        .mt-card-media.is-contain img { object-fit: contain; object-position: top; }
        .mt-card-media .mt-play { bottom: 20px; right: 20px; top: auto; }
        .mt-cap {
          margin: 0;
          padding: 28px 15px 0;
          max-width: 510px;
          color: #86868b;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.235;
          letter-spacing: -0.022em;
        }
        .mt-cap b { color: #f5f5f7; font-weight: 600; }
        .mt-fn {
          text-decoration: underline;
          text-decoration-thickness: from-font;
        }

        .mt-nav {
          max-width: 1260px;
          margin: clamp(20px, 2.4vw, 32px) auto 0;
          padding: 0 var(--gutter);
          display: flex;
          justify-content: flex-end;
          gap: 18px;
        }
        .mt-arrow {
          width: 36px;
          height: 36px;
          border-radius: 36px;
          border: none;
          background: rgba(66, 66, 69, 0.72);
          color: #f5f5f7;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 200ms ease, background 200ms ease;
        }
        .mt-arrow:hover:not(:disabled) { background: rgba(86, 86, 89, 0.85); }
        .mt-arrow:disabled { opacity: 0.36; cursor: default; }
        .mt-arrow svg { width: 18px; height: 18px; }

        @media (max-width: 600px) {
          .mt-intro-inner { padding-left: 0; }
        }
      `}</style>

      <p className="mt-eyebrow" data-reveal>{eyebrow}</p>

      {!showBanner ? (
        <>
          <div className="mt-heading" data-reveal>
            {bannerLabel ? <p className="mt-label">{bannerLabel}</p> : null}
            <h2
              className={`mt-h2${bannerHeadingSentence ? " mt-h2--sentence" : ""}${
                headingJustify ? " mt-h2--justify" : ""
              }`}
            >
              {bannerHeading}
            </h2>
            {headingSub ? <p className="mt-headsub">{headingSub}</p> : null}
          </div>
          {bannerImage ? (
            <div className="mt-banner" data-reveal>
              <div className="mt-banner-bleed">
                <img src={bannerImage} alt="" aria-hidden />
                <span
                  className="mt-play mt-banner-play"
                  aria-label="Play video"
                  role="img"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5l11 7-11 7z" />
                  </svg>
                </span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
      <div className="mt-banner" data-reveal>
        <div className="mt-banner-bleed">
          <img src="/mh-ppt-headerimage.jpeg" alt="" aria-hidden />
          <div className="mt-banner-scrim" aria-hidden />
          <div className="mt-banner-head">
            {bannerLabel ? <p className="mt-label">{bannerLabel}</p> : null}
            <h2
              className={`mt-h2${bannerHeadingSentence ? " mt-h2--sentence" : ""}`}
            >
              {bannerHeading}
            </h2>
          </div>
          <span className="mt-play mt-banner-play" aria-label="Play macOS Tahoe animation" role="img">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5l11 7-11 7z" />
            </svg>
          </span>
        </div>
      </div>
      )}

      {trio && trio.length > 0 ? (
        <div className="mt-trio" data-reveal>
          {trio.slice(0, 3).map((c, i) => (
            <article className="mt-trio-card" key={i}>
              <div className="mt-card-media">
                <img src={c.img} alt={c.title} />
              </div>
              <p className="mt-cap">
                <b>{c.title}</b> {c.desc}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {showIntro ? (
        <div className="mt-intro" data-reveal>
          <div className="mt-intro-inner">
            <p className="mt-copy">
              {bodyCopy ?? (
                <>
                  Our filters are designed by MANN+HUMMEL, 80 years of filtration
                  science, deployed across 80+ countries and tuned for India’s
                  dust, smoke, and traffic.{" "}
                  <b>Engineered in Germany. Made in India.</b>
                </>
              )}
            </p>
            <a className="mt-link" href="#">
              Learn more about macOS Tahoe ›
            </a>
          </div>
        </div>
      ) : null}

      {showCards ? (
      <div className="mt-gallery">
        <div className="mt-scroller" ref={scrollerRef} onScroll={updateEdges}>
          {CARDS.map((c) => (
            <article
              className={`mt-card ${c.wide ? "" : "mt-card--narrow"}`}
              key={c.title}
              data-reveal
            >
              <div className={`mt-card-media${c.contain ? " is-contain" : ""}`}>
                <img src={c.img} alt={c.title} />
                {c.play ? <PlayBtn label={`Play ${c.title} animation`} /> : null}
              </div>
              <p className="mt-cap">
                <b>{c.title}</b> {c.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-nav">
          <button
            type="button"
            className="mt-arrow"
            onClick={() => scrollByDir(-1)}
            disabled={atStart}
            aria-label="Previous macOS Tahoe feature"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="mt-arrow"
            onClick={() => scrollByDir(1)}
            disabled={atEnd}
            aria-label="Next macOS Tahoe feature"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      ) : null}
    </section>
  );
}
