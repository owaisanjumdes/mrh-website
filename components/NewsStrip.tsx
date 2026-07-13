"use client";

// "In the news" press strip — the tile-card design (publication wordmark, date
// and headline, with a hover go-arrow), running as a seamless infinite marquee
// of the top 20 placements. Each publication is shown in its own brand colour.
// The scroll only runs while the strip is on screen and pauses on hover so a
// tile can be read and clicked. A "View all coverages" link opens the full
// 216-placement archive at /press.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Item = {
  name: string;
  brand: string;
  date: string;
  title: string;
  href?: string; // absent = print clipping with no public link
};

const PR_TITLE = "Revolutionary technology to combat the menace of air pollution";

const ITEMS: Item[] = [
  { name: "MANN+HUMMEL", brand: "#1a8f3c", date: "21 May 2026", title: "Global Technology & Innovation Center opens in Karnataka", href: "https://www.mann-hummel.com/en/filtration-company/news-press/2026/mann-hummel-launches-global-technology-and-innovation-center-in-karnataka.html" },
  { name: "Business Standard", brand: "#B01F24", date: "16 Feb 2024", title: PR_TITLE, href: "https://www.business-standard.com/content/press-releases-ani/mann-hummel-and-ok-play-india-introduce-revolutionary-technology-to-combat-the-menace-of-air-pollution-124021700009_1.html" },
  { name: "ThePrint", brand: "#E1261C", date: "16 Feb 2024", title: PR_TITLE, href: "https://theprint.in/ani-press-releases/mannhummel-and-ok-play-india-introduce-revolutionary-technology-to-combat-the-menace-of-air-pollution/1969079/" },
  { name: "ANI", brand: "#1A4E8F", date: "16 Feb 2024", title: PR_TITLE, href: "https://www.aninews.in/news/business/business/mannhummel-and-ok-play-india-introduce-revolutionary-technology-to-combat-the-menace-of-air-pollution20240216175452/" },
  { name: "Business Wire India", brand: "#012169", date: "20 Feb 2024", title: "Hindware teams up with OK Play and MANN+HUMMEL on air pollution", href: "https://www.businesswireindia.com/hindware-teams-up-with-ok-play-and-mannhummel-to-address-rising-air-pollution-88798.html" },
  { name: "Lokmat Times", brand: "#D8232A", date: "16 Feb 2024", title: PR_TITLE, href: "https://www.lokmattimes.com/business/mannhummel-and-ok-play-india-introduce-revolutionary-technology-to-combat-the-menace-of-air/" },
  { name: "The Hans India", brand: "#00629B", date: "16 Feb 2024", title: PR_TITLE, href: "https://www.thehansindia.com/newsvoir?c_article_id=27415&c_author_id=21569&type=old&originurl=https%3a%2f%2fwww.thehansindia.com%2fnewsvoir" },
  { name: "LatestLY", brand: "#F5333F", date: "16 Feb 2024", title: PR_TITLE, href: "https://www.latestly.com/agency-news/business-news-mannhummel-and-ok-play-india-introduce-revolutionary-technology-to-combat-the-menace-of-air-pollution-5764444.html" },
  { name: "DailyHunt", brand: "#D31027", date: "16 Feb 2024", title: PR_TITLE, href: "https://m.dailyhunt.in/news/india/english/newsvoir-epaper-newsvoir/mann+hummel+and+ok+play+india+introduce+revolutionary+technology+to+combat+the+menace+of+air+pollution-newsid-n583734434?listname=newspaperLanding&topic=business&index=6&topicIndex=0&mode=pwa" },
  { name: "Gujarat Samachar", brand: "#E4002B", date: "16 Feb 2024", title: PR_TITLE, href: "https://www.gujaratsamachar.news/news/mannhummel-and-ok-play-india-introduce-revolutionary-technology-to-combat-the-menace-of-air-pollution20240216175445/" },
  { name: "Web India 123", brand: "#C1272D", date: "16 Feb 2024", title: PR_TITLE, href: "https://news.webindia123.com/news/newsvoir.asp?c_article_id=27415&c_author_id=21569&type=old&originurl=https%3a%2f%2fnews.webindia123.com%2fnews%2fnewsvoir.asp" },
  { name: "Fashion Value Chain", brand: "#D6008B", date: "16 Feb 2024", title: PR_TITLE, href: "https://fashionvaluechain.com/mannhummel-and-ok-play-india-introduce-revolutionary-technology-to-combat-the-menace-of-air-pollution/" },
  { name: "Punjab News Express", brand: "#1B75BC", date: "16 Feb 2024", title: PR_TITLE, href: "https://www.punjabnewsexpress.com/press-releases/?c_article_id=27415&c_author_id=21569&type=old&originurl=https%3a%2f%2fwww.punjabnewsexpress.com%2fpress-releases%2f" },
  { name: "The Covai Post", brand: "#007A3D", date: "16 Feb 2024", title: PR_TITLE, href: "https://www.covaipost.com/news-cache/?c_article_id=27415&c_author_id=21569&type=old&originurl=https%3a%2f%2fwww.covaipost.com%2fnews-cache%2f" },
  { name: "Dainik Jagran", brand: "#D6242C", date: "16 Feb 2024", title: "Pradushan kam karne ke liye" },
  { name: "Dainik Bhaskar", brand: "#E8202A", date: "18 Feb 2024", title: "Introduced revolutionary technology" },
  { name: "The Statesman", brand: "#1A1A1A", date: "18 Feb 2024", title: "Awareness on air pollution" },
  { name: "Punjab Kesari", brand: "#C81E2D", date: "18 Feb 2024", title: "Introduced revolutionary technology" },
  { name: "The Pioneer", brand: "#12305B", date: "18 Feb 2024", title: "Awareness on air pollution" },
  { name: "Deshbandhu", brand: "#B8232F", date: "17 Feb 2024", title: "Symposium on revolutionary technology" },
];

const GO_ICON = (
  <svg viewBox="0 0 16 16" width="11" height="11">
    <path d="M4 12L12 4M12 4H5.5M12 4v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Card({ item }: { item: Item }) {
  return (
    <>
      <span className="press__logo">
        <span className="press__wordmark" style={{ ["--brand" as string]: item.brand }}>
          {item.name}
        </span>
      </span>
      <span className="press__meta">
        <span className="press__date">{item.date}</span>
        <span className="press__title">{item.title}</span>
      </span>
    </>
  );
}

export default function NewsStrip() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only run the marquee while the strip is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const row = [...ITEMS, ...ITEMS];

  return (
    <section className="press" id="in-the-news" aria-labelledby="press-heading">
      <style>{PRESS_CSS}</style>

      <div className="press__inner">
        <header className="press__head">
          <h2 className="press__heading" id="press-heading">
            Featured in the News
          </h2>
        </header>
      </div>

      <div className="press__marquee" ref={ref}>
        <ul className={`press__track${inView ? "" : " is-stopped"}`} role="list">
          {row.map((item, i) => {
            const hidden = i >= ITEMS.length;
            const key = `${item.name}-${i}`;
            return (
              <li className="press__cell" key={key} aria-hidden={hidden}>
                {item.href ? (
                  <a className="press__item" href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>
                    <Card item={item} />
                    <span className="press__go" aria-hidden="true">{GO_ICON}</span>
                  </a>
                ) : (
                  <span className="press__item press__item--static">
                    <Card item={item} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="press__inner press__all">
        <Link className="press__viewall" href="/press">
          View all coverages
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path d="M4 12L12 4M12 4H5.5M12 4v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
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
    --p-rule:      #F1F2F4;
    --p-font: var(--font-sans), -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    --p-ease: cubic-bezier(0.32, 0.72, 0, 1);
    position: relative;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: clamp(44px, 6vw, 96px) 0;
    background: var(--p-bg);
    color: var(--p-ink);
    font-family: var(--p-font);
    -webkit-font-smoothing: antialiased;
    border-top: 1px solid var(--p-rule);
    border-bottom: 1px solid var(--p-rule);
  }
  .press *, .press *::before, .press *::after { box-sizing: border-box; }
  .press__inner { max-width: 1200px; margin-inline: auto; padding: 0 24px; }

  .press__head { text-align: center; margin-bottom: clamp(30px, 3.4vw, 46px); }
  .press__eyebrow { margin: 0 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--p-ink-faint); }
  .press__heading { margin: 0; font-size: clamp(21px, 2.2vw, 28px); font-weight: 600; letter-spacing: -0.022em; line-height: 1.25; color: var(--p-ink); }

  /* ── Infinite marquee of tile cards ───────────────────────────────────── */
  .press__marquee {
    position: relative;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  }
  .press__track { display: flex; width: max-content; margin: 0; padding: 0; list-style: none; animation: pressMarquee 17.5s linear infinite; will-change: transform; }
  @keyframes pressMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .press__track.is-stopped { animation-play-state: paused; }
  .press__marquee:hover .press__track { animation-play-state: paused; }

  .press__cell { flex: 0 0 clamp(258px, 25vw, 320px); }

  .press__item { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 0; height: 100%; padding: 30px 26px 28px; text-decoration: none; color: inherit; transition: background 0.35s var(--p-ease); }
  a.press__item:hover { background: #FAFBFC; }
  a.press__item:focus-visible { outline: 2px solid var(--p-ink); outline-offset: -2px; }
  .press__item--static { cursor: default; }

  .press__logo { display: flex; align-items: center; justify-content: center; height: 34px; margin-bottom: 18px; }
  .press__wordmark {
    font-size: clamp(18px, 1.9vw, 22px);
    font-weight: 700;
    letter-spacing: -0.02em;
    white-space: nowrap;
    color: var(--brand, var(--p-ink));
    transition: transform 0.4s var(--p-ease), filter 0.4s var(--p-ease);
  }
  a.press__item:hover .press__wordmark { transform: scale(1.04); }

  .press__meta { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
  .press__date { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--p-ink-faint); }
  .press__title { font-size: 13px; line-height: 1.45; font-weight: 450; letter-spacing: -0.006em; color: var(--p-ink-soft); max-width: 24ch; transition: color 0.3s var(--p-ease); }
  a.press__item:hover .press__title { color: var(--p-ink); }

  .press__go { position: absolute; top: 14px; right: 14px; display: grid; place-items: center; width: 20px; height: 20px; color: var(--p-ink-faint); opacity: 0; transform: translate(-3px, 3px); transition: opacity 0.32s var(--p-ease), transform 0.32s var(--p-ease); }
  a.press__item:hover .press__go { opacity: 1; transform: translate(0, 0); }

  /* ── View all ─────────────────────────────────────────────────────────── */
  .press__all { text-align: center; margin-top: clamp(28px, 3vw, 44px); }
  .press__viewall {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
    color: var(--p-ink); text-decoration: none;
    padding-bottom: 2px; border-bottom: 1px solid currentColor;
    transition: gap 0.3s var(--p-ease), opacity 0.3s var(--p-ease);
  }
  .press__viewall:hover { gap: 11px; opacity: 0.7; }
  .press__viewall svg { transition: transform 0.3s var(--p-ease); }
  .press__viewall:hover svg { transform: translate(2px, -2px); }

  @media (max-width: 520px) {
    .press__cell { flex-basis: 74vw; }
  }
  @media (prefers-reduced-motion: reduce) { .press__track { animation: none; } }
`;
