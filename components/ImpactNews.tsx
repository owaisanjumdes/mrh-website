// Impact — "More from MRH" news grid. Figma node 794:12151. Two-column list of
// article links (thumbnail + eyebrow + title + date) with row dividers and a
// "Show more" button. Heading changed to "More from MRH" per request; article
// entries are placeholders to be replaced with MRH press items.

type Article = {
  img: string;
  label: string;
  title: string;
  date: string;
};

const ARTICLES: Article[] = [
  {
    img: "/impact-news-1.jpg",
    label: "UPDATE",
    title: "Apple accelerates progress with highest-ever recycled material in its products",
    date: "April 16, 2026",
  },
  {
    img: "/impact-news-2.jpg",
    label: "UPDATE",
    title: "Apple launches new project to protect and restore California redwood forest",
    date: "September 23, 2025",
  },
  {
    img: "/impact-news-3.jpg",
    label: "PRESS RELEASE",
    title: "The all-new Apple Ginza opens this Friday, September 26, in Tokyo",
    date: "September 23, 2025",
  },
  {
    img: "/impact-news-4.jpg",
    label: "PRESS RELEASE",
    title: "Apple Koregaon Park opens to customers this Thursday, September 4, in Pune",
    date: "September 2, 2025",
  },
  {
    img: "/impact-news-5.jpg",
    label: "UPDATE",
    title: "Apple expands U.S. supply chain with $500 million commitment",
    date: "July 15, 2025",
  },
  {
    img: "/impact-news-6.jpg",
    label: "UPDATE",
    title: "Apple surpasses 60 percent reduction in global greenhouse gas emissions",
    date: "April 16, 2025",
  },
];

export default function ImpactNews() {
  // group into rows of two for the dividers
  const rows: Article[][] = [];
  for (let i = 0; i < ARTICLES.length; i += 2) rows.push(ARTICLES.slice(i, i + 2));

  return (
    <section className="mfm" aria-label="More from MRH">
      <style>{`
        .mfm {
          --gutter: clamp(20px, 6vw, 126px);
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 10vw, 144px) var(--gutter);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .mfm-inner { max-width: 1260px; margin: 0 auto; }
        .mfm-title {
          margin: 0 0 clamp(28px, 3.4vw, 44px);
          color: #1d1d1f;
          font-size: clamp(32px, 4.4vw, 48px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.003em;
        }

        .mfm-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: clamp(32px, 5vw, 64px);
          row-gap: clamp(24px, 3vw, 32px);
          padding: 32px 0;
        }
        .mfm-row:first-of-type { padding-top: 0; }
        .mfm-row + .mfm-row { border-top: 1px solid #d2d2d7; }

        .mfm-item {
          display: flex;
          gap: 24px;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        .mfm-thumb {
          flex: none;
          width: 132px;
          height: 132px;
          border-radius: 16px;
          overflow: hidden;
        }
        .mfm-thumb img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .mfm-body { min-width: 0; }
        .mfm-eyebrow {
          margin: 0;
          color: #6e6e73;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.33;
          letter-spacing: -0.01em;
        }
        .mfm-headline {
          margin: 4px 0 0;
          color: #1d1d1f;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.235;
          letter-spacing: -0.022em;
        }
        .mfm-item:hover .mfm-headline { text-decoration: underline; }
        .mfm-date {
          margin: 8px 0 0;
          color: #6e6e73;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.43;
          letter-spacing: -0.016em;
        }

        .mfm-more-wrap {
          margin-top: clamp(28px, 3.4vw, 32px);
          display: flex;
          justify-content: center;
        }
        .mfm-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 4px;
          border: none;
          background: transparent;
          color: #1d1d1f;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.016em;
          cursor: pointer;
        }
        .mfm-more:hover { color: #06c; }
        .mfm-more svg { width: 16px; height: 16px; }

        @media (max-width: 720px) {
          .mfm-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="mfm-inner">
        <h2 className="mfm-title" data-reveal>More from MRH</h2>

        {rows.map((row, ri) => (
          <div className="mfm-row" key={ri} data-reveal style={{ ["--ri" as string]: ri }}>
            {row.map((a) => (
              <a className="mfm-item" href="#" key={a.title}>
                <div className="mfm-thumb">
                  <img loading="lazy" src={a.img} alt="" aria-hidden />
                </div>
                <div className="mfm-body">
                  <p className="mfm-eyebrow">{a.label}</p>
                  <p className="mfm-headline">{a.title}</p>
                  <p className="mfm-date">{a.date}</p>
                </div>
              </a>
            ))}
          </div>
        ))}

        <div className="mfm-more-wrap">
          <button type="button" className="mfm-more">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Show more
          </button>
        </div>
      </div>
    </section>
  );
}
