"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// "Explore products" — PureAir (left) + AirFINEry (right) cards. The image fills
// each card; name/price/CTA + a blurred bottom scrim reveal on hover. Heading
// and cards rise/fade in when the section scrolls into view.

const PRODUCTS = [
  {
    name: "PureAir",
    price: "from ₹24,999",
    href: "/products",
    image: "/MRH-ENVIRONMENT_02.png",
  },
  {
    name: "AirFINEry",
    price: "from ₹39,999",
    href: "/products",
    image: "/AirFINEry visual.png",
  },
];

export default function ExploreProducts() {
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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`xp ${inView ? "xp-in" : ""}`}>
      <style>{`
        .xp {
          background: #000000;
          padding: clamp(56px, 8vh, 120px) clamp(20px, 5vw, 80px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .xp-inner { max-width: 1500px; margin: 0 auto; }
        .xp-heading {
          margin: 0 0 clamp(28px, 4vw, 56px);
          font-size: clamp(28px, 3.4vw, 44px);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: #ffffff;
        }
        .xp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 2.2vw, 32px);
        }
        .xp-card {
          position: relative;
          display: block;
          background: #cccccc;
          border-radius: clamp(16px, 2vw, 28px);
          aspect-ratio: 7 / 5;
          overflow: hidden;
          text-decoration: none;
        }
        .xp-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .xp-card:hover img { transform: scale(1.05); }

        /* Blurred black scrim behind the text — bottom of the card, on hover */
        .xp-scrim {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 42%;
          background: linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0) 100%);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          -webkit-mask-image: linear-gradient(to top, #000 0%, rgba(0,0,0,0) 80%);
          mask-image: linear-gradient(to top, #000 0%, rgba(0,0,0,0) 80%);
          opacity: 0;
          transition: opacity 400ms ease;
          pointer-events: none;
          z-index: 1;
        }
        .xp-card:hover .xp-scrim { opacity: 1; }

        .xp-foot {
          position: absolute;
          z-index: 2;
          left: clamp(20px, 3vw, 40px);
          right: clamp(20px, 3vw, 40px);
          bottom: clamp(18px, 2.4vw, 34px);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }
        .xp-info { display: flex; flex-direction: column; gap: 4px; }
        .xp-name {
          font-size: clamp(18px, 1.7vw, 26px);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #ffffff;
          opacity: 0;
          transition: opacity 450ms ease 80ms;
        }
        /* Price slides in from the right (slide-left) */
        .xp-price {
          font-size: clamp(14px, 1.1vw, 17px);
          color: rgba(255, 255, 255, 0.82);
          opacity: 0;
          transform: translateX(28px);
          transition: opacity 450ms ease 140ms,
            transform 550ms cubic-bezier(0.22, 1, 0.36, 1) 140ms;
        }
        .xp-cta {
          flex: none;
          background: #148042;
          color: #ffffff;
          border-radius: 9999px;
          padding: 0.7em 1.3em;
          font-size: clamp(14px, 1.05vw, 16px);
          font-weight: 500;
          opacity: 0;
          transition: opacity 450ms ease 200ms;
        }
        .xp-card:hover .xp-name { opacity: 1; }
        .xp-card:hover .xp-price { opacity: 1; transform: translateX(0); }
        .xp-card:hover .xp-cta { opacity: 1; }

        /* Touch devices have no hover — show the content. */
        @media (hover: none) {
          .xp-scrim, .xp-name, .xp-cta { opacity: 1; }
          .xp-price { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .xp-card img, .xp-scrim, .xp-name, .xp-price, .xp-cta {
            transition: none;
          }
        }
        /* Entrance — heading + cards rise/fade in when scrolled into view */
        .xp-heading {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .xp-card {
          opacity: 0;
          transform: translateY(44px);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .xp-grid > .xp-card:nth-child(1) { transition-delay: 120ms; }
        .xp-grid > .xp-card:nth-child(2) { transition-delay: 240ms; }
        .xp-in .xp-heading { opacity: 1; transform: translateY(0); }
        .xp-in .xp-card { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .xp-heading, .xp-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 820px) {
          .xp-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="xp-inner">
        <h2 className="xp-heading">Explore products</h2>
        <div className="xp-grid">
          {PRODUCTS.map((p) => (
            <Link key={p.name} href={p.href} className="xp-card">
              <img src={p.image} alt={p.name} />
              <div className="xp-scrim" aria-hidden />
              <div className="xp-foot">
                <div className="xp-info">
                  <span className="xp-name">{p.name}</span>
                  <span className="xp-price">{p.price}</span>
                </div>
                <span className="xp-cta">Pre-order now</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
