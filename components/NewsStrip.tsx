"use client";

// "In the news" press strip — ported from news.html. A horizontal, snap-scrolling
// rail of press tiles with prev/next nav and edge fades. Publisher logos load from
// /assets/press/*.svg; until those exist each tile falls back to a clean
// typographic wordmark. Uses the site font (Inter Tight) instead of SF Pro.
import { useEffect, useRef, useState, type ReactNode } from "react";

type Item = {
  href: string;
  logo: string;
  alt: string;
  markClass: string;
  mark: ReactNode;
  date: string;
  title: string;
};

const ITEMS: Item[] = [
  {
    href: "https://www.mann-hummel.com/en/filtration-company/news-press/2026/mann-hummel-launches-global-technology-and-innovation-center-in-karnataka.html",
    logo: "/assets/press/mann-hummel.svg",
    alt: "MANN+HUMMEL",
    markClass: "press__wordmark--mh",
    mark: "MANN+HUMMEL",
    date: "21 May 2026",
    title: "Global Technology & Innovation Center opens in Karnataka",
  },
  {
    href: "https://www.businesswireindia.com/hindware-teams-up-with-ok-play-and-mannhummel-to-address-rising-air-pollution-88798.html",
    logo: "/assets/press/business-wire-india.svg",
    alt: "Business Wire India",
    markClass: "press__wordmark--bw",
    mark: (
      <>
        Business<b>Wire</b>
        <i>India</i>
      </>
    ),
    date: "20 Feb 2024",
    title: "Hindware teams up with OK Play and MANN+HUMMEL on air pollution",
  },
  {
    href: "https://www.facebook.com/mannhummelofficial/posts/together-for-cleaner-air-in-indiawe-are-excited-to-announce-our-exclusive-partne/1197775092351291/",
    logo: "/assets/press/facebook.svg",
    alt: "Facebook",
    markClass: "press__wordmark--fb",
    mark: "facebook",
    date: "Announcement",
    title: "Together for cleaner air in India, the exclusive partnership",
  },
];

const GO_ICON = (
  <svg viewBox="0 0 16 16" width="11" height="11">
    <path d="M4 12L12 4M12 4H5.5M12 4v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function PressLogo({ item }: { item: Item }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // onError won't fire for an <img> that already failed before hydration, so
  // re-check completion state on mount (mirrors the original vanilla fallback).
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <span className="press__logo">
      {failed ? (
        <span className={`press__wordmark ${item.markClass}`} aria-hidden>
          {item.mark}
        </span>
      ) : (
        <img ref={imgRef} src={item.logo} alt={item.alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

export default function NewsStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = rootRef.current;
    if (!section) return;
    const wrap = section.querySelector<HTMLElement>(".press__rail-wrap");
    const rail = section.querySelector<HTMLElement>("[data-rail]");
    const prev = section.querySelector<HTMLButtonElement>("[data-prev]");
    const next = section.querySelector<HTMLButtonElement>("[data-next]");
    if (!wrap || !rail || !prev || !next) return;

    const step = () => {
      const cell = rail.querySelector<HTMLElement>(".press__cell");
      return cell ? cell.getBoundingClientRect().width : rail.clientWidth * 0.25;
    };

    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const x = rail.scrollLeft;
      const atStart = x <= 1;
      const atEnd = x >= max - 1;
      const overflows = max > 1;
      prev.disabled = atStart || !overflows;
      next.disabled = atEnd || !overflows;
      wrap.classList.toggle("can-prev", overflows && !atStart);
      wrap.classList.toggle("can-next", overflows && !atEnd);
    };

    const onPrev = () => rail.scrollBy({ left: -step(), behavior: "smooth" });
    const onNext = () => rail.scrollBy({ left: step(), behavior: "smooth" });

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();

    return () => {
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section className="press" id="in-the-news" aria-labelledby="press-heading" ref={rootRef}>
      <style>{PRESS_CSS}</style>

      <div className="press__inner">
        <header className="press__head">
          <p className="press__eyebrow">In the News</p>
          <h2 className="press__heading" id="press-heading">
            The MANN+HUMMEL Partnership, Covered
          </h2>
        </header>

        <div className="press__rail-wrap">
          <button className="press__nav press__nav--prev" type="button" aria-label="Previous" data-prev>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <ul className="press__rail" data-rail role="list">
            {ITEMS.map((item) => (
              <li className="press__cell" key={item.href}>
                <a className="press__item" href={item.href} target="_blank" rel="noopener noreferrer">
                  <PressLogo item={item} />
                  <span className="press__meta">
                    <span className="press__date">{item.date}</span>
                    <span className="press__title">{item.title}</span>
                  </span>
                  <span className="press__go" aria-hidden="true">
                    {GO_ICON}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button className="press__nav press__nav--next" type="button" aria-label="Next" data-next>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <span className="press__fade press__fade--l" aria-hidden="true" />
          <span className="press__fade press__fade--r" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

const PRESS_CSS = `
  .press {
    --p-bg:        #FFFFFF;
    --p-ink:       #0B0C0E;
    --p-ink-soft:  #6B7076;
    --p-ink-faint: #A2A7AD;
    --p-line:      #E8EAED;
    --p-rule:      #F1F2F4;
    --p-font: var(--font-sans), -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    --p-ease: cubic-bezier(0.32, 0.72, 0, 1);
    position: relative;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: clamp(56px, 6vw, 88px) 24px;
    background: var(--p-bg);
    color: var(--p-ink);
    font-family: var(--p-font);
    -webkit-font-smoothing: antialiased;
    border-top: 1px solid var(--p-rule);
    border-bottom: 1px solid var(--p-rule);
  }
  .press *, .press *::before, .press *::after { box-sizing: border-box; }
  .press__inner { max-width: 1200px; margin-inline: auto; }

  .press__head { text-align: center; margin-bottom: clamp(30px, 3.4vw, 46px); }
  .press__eyebrow { margin: 0 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--p-ink-faint); }
  .press__heading { margin: 0; font-size: clamp(21px, 2.2vw, 28px); font-weight: 600; letter-spacing: -0.022em; line-height: 1.25; color: var(--p-ink); }

  .press__rail-wrap { position: relative; display: flex; align-items: center; gap: 8px; }
  .press__rail { display: flex; justify-content: safe center; gap: 0; flex: 1; margin: 0; padding: 0; list-style: none; overflow-x: auto; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; }
  .press__rail::-webkit-scrollbar { display: none; }
  .press__cell { flex: 0 0 33.333%; min-width: 0; scroll-snap-align: start; border-right: 1px solid var(--p-rule); }
  .press__cell:last-child { border-right: 0; }

  .press__item { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 0; height: 100%; padding: 26px 22px 24px; text-decoration: none; color: inherit; transition: background 0.35s var(--p-ease); }
  .press__item:hover { background: #FAFBFC; }
  .press__item:focus-visible { outline: 2px solid var(--p-ink); outline-offset: -2px; border-radius: 4px; }

  .press__logo { display: flex; align-items: center; justify-content: center; height: 34px; margin-bottom: 18px; }
  .press__logo img { max-height: 100%; max-width: 175px; width: auto; object-fit: contain; filter: grayscale(1) contrast(1.05); opacity: 0.62; transition: filter 0.4s var(--p-ease), opacity 0.4s var(--p-ease), transform 0.4s var(--p-ease); }
  .press__item:hover .press__logo img { filter: grayscale(0); opacity: 1; transform: scale(1.03); }

  .press__wordmark { display: block; font-size: 17px; font-weight: 700; letter-spacing: 0.02em; color: var(--p-ink); opacity: 0.62; transition: opacity 0.4s var(--p-ease); white-space: nowrap; }
  .press__item:hover .press__wordmark { opacity: 1; }
  .press__wordmark--mh { letter-spacing: -0.01em; font-weight: 700; color: #1a8f3c; opacity: 1; }
  .press__wordmark--bw { font-weight: 400; letter-spacing: -0.005em; color: #012169; opacity: 1; }
  .press__wordmark--bw b { font-weight: 700; }
  .press__wordmark--bw i { font-style: normal; font-weight: 400; margin-left: 5px; padding-left: 6px; border-left: 1px solid currentColor; font-size: 13px; }
  .press__wordmark--fb { text-transform: lowercase; letter-spacing: -0.04em; color: #1877f2; opacity: 1; }

  .press__meta { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
  .press__date { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--p-ink-faint); }
  .press__title { font-size: 13px; line-height: 1.45; font-weight: 450; letter-spacing: -0.006em; color: var(--p-ink-soft); max-width: 24ch; transition: color 0.3s var(--p-ease); }
  .press__item:hover .press__title { color: var(--p-ink); }

  .press__go { position: absolute; top: 14px; right: 14px; display: grid; place-items: center; width: 20px; height: 20px; color: var(--p-ink-faint); opacity: 0; transform: translate(-3px, 3px); transition: opacity 0.32s var(--p-ease), transform 0.32s var(--p-ease); }
  .press__item:hover .press__go { opacity: 1; transform: translate(0, 0); }

  .press__nav { flex: 0 0 auto; display: grid; place-items: center; width: 36px; height: 36px; padding: 0; background: none; border: 0; border-radius: 50%; color: var(--p-ink-faint); cursor: pointer; transition: color 0.28s var(--p-ease), background 0.28s var(--p-ease), opacity 0.28s var(--p-ease); }
  .press__nav:hover { color: var(--p-ink); background: #F2F3F5; }
  .press__nav:focus-visible { outline: 2px solid var(--p-ink); outline-offset: 2px; }
  .press__nav[disabled] { opacity: 0.22; cursor: default; background: none; color: var(--p-ink-faint); }

  .press__fade { position: absolute; top: 0; bottom: 0; width: 44px; pointer-events: none; opacity: 0; transition: opacity 0.3s var(--p-ease); z-index: 1; }
  .press__fade--l { left: 44px; background: linear-gradient(90deg, var(--p-bg), transparent); }
  .press__fade--r { right: 44px; background: linear-gradient(270deg, var(--p-bg), transparent); }
  .press__rail-wrap.can-prev .press__fade--l { opacity: 1; }
  .press__rail-wrap.can-next .press__fade--r { opacity: 1; }

  @media (max-width: 1024px) { .press__cell { flex-basis: 33.333%; } }
  @media (max-width: 760px)  { .press__cell { flex-basis: 50%; } }
  @media (max-width: 520px) {
    .press { padding-left: 12px; padding-right: 12px; }
    .press__cell { flex-basis: 78%; }
    .press__nav { display: none; }
    .press__fade { display: none; }
    .press__rail { gap: 0; }
    .press__item { padding: 22px 16px 20px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .press__rail { scroll-behavior: auto; }
    .press *, .press *::before, .press *::after { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
  }
`;
