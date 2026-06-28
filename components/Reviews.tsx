"use client";

import { useState } from "react";

// Testimonials — Figma node 665:2888. AQI-monitor close-up on the left, a
// star-rated quote with prev/next nav on the right. Orange recolored to green.

type Review = { quote: string; name: string; role: string };

const REVIEWS: Review[] = [
  {
    quote:
      "Within a week of installing PureAir in our classrooms, the AQI dropped from 180 to under 40. The kids are noticeably less congested, and the afternoon slump is gone.",
    name: "Dr. Anjali Mehta",
    role: "Principal, Delhi Public School",
  },
  {
    quote:
      "We deployed thirty units across our floor and the difference is measurable. The live AQI display keeps everyone honest, and the German filters held up through a full Delhi winter without a hitch.",
    name: "Rohit Sharma",
    role: "Facilities Head, Corporate Park",
  },
  {
    quote:
      "Quiet enough for consultation rooms, powerful enough for the waiting hall. Service has been completely local — a filter swap is a phone call, not an import order.",
    name: "Dr. Kavya Reddy",
    role: "Medical Director, City Hospital",
  },
];

function Star() {
  return (
    <svg className="rv-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
    </svg>
  );
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const review = REVIEWS[index];
  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIndex((i) => (i + 1) % REVIEWS.length);

  return (
    <section className="rv-section" aria-label="Customer reviews">
      <style>{`
        .rv-section {
          position: relative;
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          overflow: hidden;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .rv-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          align-items: center;
        }
        /* Fixed height so the image never resizes when the review text changes. */
        .rv-media {
          position: relative;
          height: clamp(420px, 56vh, 640px);
        }
        .rv-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        /* Subtle blur at the beginning (left edge) of the photo. */
        .rv-media-fade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
          -webkit-mask-image: linear-gradient(to right, #000 0%, rgba(0,0,0,0) 18%);
          mask-image: linear-gradient(to right, #000 0%, rgba(0,0,0,0) 18%);
        }
        .rv-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(24px, 3vw, 39px);
          padding: clamp(40px, 5vw, 88px) clamp(20px, 8.85%, 127px)
            clamp(40px, 5vw, 88px) clamp(24px, 4vw, 72px);
        }
        .rv-stars { display: flex; gap: clamp(4px, 0.5vw, 7px); color: #148042; }
        .rv-star { width: clamp(18px, 1.7vw, 26px); height: auto; display: block; }
        /* All quotes share one grid cell, so the block always reserves the
           tallest quote's height — section height stays constant. */
        .rv-quotes { display: grid; max-width: 764px; }
        .rv-quote {
          grid-area: 1 / 1;
          margin: 0;
          font-size: clamp(20px, 2.3vw, 36px);
          line-height: 1.29;
          letter-spacing: -0.01em;
          color: rgba(17, 17, 17, 0.6);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 380ms ease, transform 380ms ease;
          pointer-events: none;
        }
        .rv-quote.is-active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .rv-author { display: flex; flex-direction: column; gap: 3px; }
        .rv-name { font-size: clamp(15px, 1.2vw, 18px); font-weight: 600; color: var(--ink); }
        .rv-role { font-size: clamp(13px, 1vw, 15px); color: var(--ink-3); }
        .rv-nav { display: flex; gap: 20px; }
        .rv-arrow-btn {
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
          display: inline-flex;
          transition: transform 200ms ease, opacity 200ms ease;
        }
        .rv-arrow { width: clamp(20px, 1.8vw, 26px); height: auto; display: block; }
        .rv-prev { color: #1b1b1b; }
        .rv-next { color: #148042; }
        .rv-prev:hover { transform: translateX(-3px); }
        .rv-next:hover { transform: translateX(3px); }
        @media (max-width: 860px) {
          .rv-grid { grid-template-columns: 1fr; }
          .rv-media { height: clamp(220px, 42vh, 360px); }
          .rv-media-fade {
            background: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 16%);
          }
        }
      `}</style>

      <div className="rv-grid">
        <div className="rv-media">
          <img loading="lazy" src="/CLOSEUP-AQI MONITOR.png" alt="PureAir live AQI monitor" />
          <div className="rv-media-fade" aria-hidden />
        </div>

        <div className="rv-content">
          <div className="rv-stars" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} />
            ))}
          </div>

          <div className="rv-quotes">
            {REVIEWS.map((r, i) => (
              <p
                key={i}
                className={`rv-quote ${i === index ? "is-active" : ""}`}
                aria-hidden={i !== index}
              >
                {r.quote}
              </p>
            ))}
          </div>

          <div className="rv-author">
            <span className="rv-name">{review.name}</span>
            <span className="rv-role">{review.role}</span>
          </div>

          <div className="rv-nav">
            <button
              type="button"
              className="rv-arrow-btn rv-prev"
              onClick={prev}
              aria-label="Previous review"
            >
              <svg className="rv-arrow" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M19 12H5M11 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="rv-arrow-btn rv-next"
              onClick={next}
              aria-label="Next review"
            >
              <svg className="rv-arrow" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
