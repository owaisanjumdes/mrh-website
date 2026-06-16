"use client";

import { useInView } from "@/lib/useInView";

// "Compare iPhone performance" CTA — Figma node 707:4524.
// Black section with a glass pill (label + blue "+") centered at the bottom.
// Copy kept verbatim from the Figma design.

export default function ComparePerformance() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`cp ${inView ? "is-in" : ""}`}
      aria-label="Compare iPhone performance"
    >
      <style>{`
        .cp {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 32px clamp(16px, 4vw, 44px) clamp(64px, 8vw, 100px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .cp-cta {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 3vw, 48px);
          height: 56px;
          padding: 0 10px 0 24px;
          border-radius: 28px;
          background: rgba(42, 42, 45, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          text-decoration: none;
          transition: background 200ms ease;
        }
        .cp-cta:hover { background: rgba(60, 60, 64, 0.82); }
        .cp-cta-label {
          color: #f5f5f7;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.24;
          letter-spacing: -0.022em;
          white-space: nowrap;
        }
        .cp-cta-icon {
          flex: none;
          width: 36px;
          height: 36px;
          border-radius: 50px;
          background: #0071e3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: background 200ms ease;
        }
        .cp-cta:hover .cp-cta-icon { background: #0077ed; }
        .cp-cta-icon svg { width: 16px; height: 16px; }
      `}</style>

      <a className="cp-cta reveal-bubble" href="#" data-reveal>
        <span className="cp-cta-label">Compare iPhone performance</span>
        <span className="cp-cta-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </a>
    </section>
  );
}
