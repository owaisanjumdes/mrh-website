"use client";

import { useEffect, useRef, useState } from "react";

// "Leading the Way in Sustainable Air Purification" — Figma node 665:2844.
// Black bento: one wide image with an overlaid caption, then two images below
// with captions beneath them. On scroll-in, components fade up while the image
// cards fly forward from depth (3D parallax), staggered.

const HEADING = "Leading the Way in Sustainable Air Purification";

const TOP = {
  image: "/mrh-environment-02.png",
  title: "Premium Materials",
  body: "A sealed steel body, finished to last through years of daily commercial use. No plastic, no rattle, no early replacement.",
};

const BOTTOM = [
  {
    image: "/mrh-honeycomb-grill.png",
    title: "German Filtration",
    body: "Nano fiber–enhanced filters by MANN+HUMMEL, the same standard trusted in industry and healthcare across the world.",
  },
  {
    image: "/mrh-environment-01.png",
    title: "Made in India",
    body: "Manufactured, installed, and serviced locally. Filters and support are always within reach, never an import away.",
  },
];

export default function MaterialsBento() {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`mb-section ${inView ? "mb-in" : ""}`}>
      <style>{`
        .mb-section {
          background: #000000;
          color: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(64px, 10vh, 140px) clamp(20px, 4vw, 58px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .mb-inner { max-width: 1340px; margin: 0 auto; }
        .mb-heading {
          margin: 0 auto clamp(40px, 6vh, 80px);
          max-width: 760px;
          text-align: center;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .mb-grid { display: flex; flex-direction: column; gap: clamp(16px, 1.6vw, 23px); }
        .mb-card-top {
          position: relative;
          width: 100%;
          aspect-ratio: 1324 / 720;
          border-radius: 8px;
          overflow: hidden;
          background: #161616;
        }
        .mb-card-top img,
        .mb-imgbox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .mb-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%);
          pointer-events: none;
        }
        .mb-overlay {
          position: absolute;
          left: clamp(20px, 4%, 52px);
          right: clamp(20px, 4%, 52px);
          bottom: clamp(20px, 4%, 44px);
          max-width: 440px;
        }
        .mb-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 2.8vw, 40px);
        }
        .mb-card { display: flex; flex-direction: column; gap: clamp(14px, 1.6vw, 23px); }
        .mb-imgbox {
          width: 100%;
          aspect-ratio: 642 / 699;
          border-radius: 8px;
          overflow: hidden;
          background: #161616;
        }
        .mb-cap { display: flex; flex-direction: column; gap: clamp(8px, 1vw, 14px); }
        .mb-title {
          margin: 0;
          font-size: clamp(20px, 2.4vw, 32px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .mb-body {
          margin: 0;
          font-size: clamp(14px, 1.3vw, 18px);
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.5);
          max-width: 520px;
        }
        /* --- Entry: fade + 3D parallax, staggered, triggered when in view --- */
        .mb-heading {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 800ms ease, transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mb-card-top {
          opacity: 0;
          transform: perspective(1200px) translate3d(0, 70px, -180px) rotateX(9deg);
          transition: opacity 1000ms ease, transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: 120ms;
          will-change: opacity, transform;
        }
        .mb-imgbox {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 900ms ease, transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .mb-row > .mb-card:nth-child(1) .mb-imgbox { transition-delay: 200ms; }
        .mb-row > .mb-card:nth-child(2) .mb-imgbox { transition-delay: 300ms; }
        .mb-card > .mb-cap {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 800ms ease, transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mb-row > .mb-card:nth-child(1) > .mb-cap { transition-delay: 420ms; }
        .mb-row > .mb-card:nth-child(2) > .mb-cap { transition-delay: 520ms; }

        .mb-in .mb-heading { opacity: 1; transform: translateY(0); }
        .mb-in .mb-card-top {
          opacity: 1;
          transform: perspective(1200px) translate3d(0, 0, 0) rotateX(0deg);
        }
        .mb-in .mb-imgbox { opacity: 1; transform: translateY(0); }
        .mb-in .mb-card > .mb-cap { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .mb-heading,
          .mb-card-top,
          .mb-imgbox,
          .mb-card > .mb-cap {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 760px) {
          .mb-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="mb-inner">
        <h2 className="mb-heading">{HEADING}</h2>

        <div className="mb-grid">
          {/* Wide card — caption overlaid bottom-left */}
          <div className="mb-card-top">
            <img src={TOP.image} alt={TOP.title} />
            <div className="mb-scrim" aria-hidden />
            <div className="mb-overlay mb-cap">
              <h3 className="mb-title">{TOP.title}</h3>
              <p className="mb-body">{TOP.body}</p>
            </div>
          </div>

          {/* Two cards — caption below */}
          <div className="mb-row">
            {BOTTOM.map((c) => (
              <div className="mb-card" key={c.title}>
                <div className="mb-imgbox">
                  <img src={c.image} alt={c.title} />
                </div>
                <div className="mb-cap">
                  <h3 className="mb-title">{c.title}</h3>
                  <p className="mb-body">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
