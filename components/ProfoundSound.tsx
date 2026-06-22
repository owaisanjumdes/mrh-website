"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";

// "Introducing PureAir" — adapted from Figma node 755:5692. Centered chip +
// headline + price over a product shot that pushes in behind the text. On scroll
// into view: the text reveals first, then the image fades in behind it.
const PRODUCT_IMG = "/pwt.png";

export default function ProfoundSound({
  title = "PureAir",
  sub = "Available in Midnight and White. $299",
}: {
  title?: string;
  sub?: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`ps ${inView ? "is-in" : ""}`}
      aria-label={`Introducing ${title}`}
    >
      <style>{`
        .ps {
          position: relative;
          overflow: hidden;
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          min-height: clamp(620px, 92vh, 1000px);
          padding: clamp(80px, 12vh, 160px) clamp(20px, 6vw, 88px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        /* Product shot — behind the text, pushes in + fades after the text */
        .ps-img {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(460px, 64vw);
          height: auto;
          transform: translate(-50%, -50%) scale(1.12);
          opacity: 0;
          z-index: 0;
          pointer-events: none;
        }
        .ps.is-in .ps-img {
          animation: psPushIn 1500ms cubic-bezier(0.22, 1, 0.36, 1) 820ms forwards;
        }
        @keyframes psPushIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(1.14); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        .ps-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ps-chip {
          display: inline-block;
          margin-bottom: clamp(12px, 1.6vw, 22px);
          color: #f5f5f7;
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .ps-title {
          margin: 0;
          max-width: 980px;
          color: #f5f5f7;
          font-size: clamp(48px, 13vw, 132px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.015em;
        }
        .ps-sub {
          margin: clamp(20px, 2.4vw, 32px) 0 0;
          color: #c7c7cc;
          font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: 0.009em;
        }
        .ps-sub b { color: #f5f5f7; font-weight: 600; }

        /* Text reveals first, staggered */
        .ps-chip, .ps-title, .ps-sub { opacity: 0; transform: translateY(20px); }
        .ps.is-in .ps-chip  { animation: psUp 760ms cubic-bezier(0.16, 1, 0.3, 1) 0ms forwards; }
        .ps.is-in .ps-title { animation: psUp 760ms cubic-bezier(0.16, 1, 0.3, 1) 120ms forwards; }
        .ps.is-in .ps-sub   { animation: psUp 760ms cubic-bezier(0.16, 1, 0.3, 1) 240ms forwards; }
        @keyframes psUp { to { opacity: 1; transform: translateY(0); } }

        @media (prefers-reduced-motion: reduce) {
          .ps-img, .ps-chip, .ps-title, .ps-sub {
            animation: none !important;
            opacity: 1 !important;
            transform: translate(-50%, -50%) !important;
          }
          .ps-chip, .ps-title, .ps-sub { transform: none !important; }
        }
      `}</style>

      <img className="ps-img" src={PRODUCT_IMG} alt="" aria-hidden />

      <div className="ps-content">
        <span className="ps-chip">Introducing</span>
        <h2 className="ps-title">{title}</h2>
        <p className="ps-sub">{sub}</p>
      </div>
    </section>
  );
}
