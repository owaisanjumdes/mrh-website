"use client";

import { useEffect, useRef, useState } from "react";

// Continues the black section after "Leading the Way…". Internal cutaway image
// + bottom copy on PureAir's internals, fading in on scroll.
export default function InternalView() {
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
    <section ref={ref} className={`iv ${inView ? "iv-in" : ""}`}>
      <style>{`
        .iv {
          background: #000000;
          color: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(48px, 8vh, 120px) clamp(20px, 5vw, 80px) clamp(64px, 10vh, 140px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .iv-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .iv-img {
          width: min(1020px, 94%);
          height: auto;
          display: block;
        }
        .iv-text {
          max-width: 720px;
          text-align: center;
          margin-top: clamp(28px, 4.5vh, 64px);
        }
        .iv-heading {
          margin: 0 0 clamp(12px, 1.6vw, 20px);
          font-size: clamp(26px, 3.4vw, 44px);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: #ffffff;
        }
        .iv-body {
          margin: 0;
          font-size: clamp(15px, 1.35vw, 19px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
        }

        .iv-img, .iv-text {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .iv-text { transition-delay: 160ms; }
        .iv-in .iv-img, .iv-in .iv-text {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .iv-img, .iv-text {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="iv-inner">
        <img
          className="iv-img"
          src="/internal.png"
          alt="PureAir internal filtration components"
        />
        <div className="iv-text">
          <h2 className="iv-heading">Engineered inside out</h2>
          <p className="iv-body">
            Behind the sealed steel body sits a multi-stage stack — a washable
            pre-filter, an activated-carbon layer for gases and odour, and a
            MANN+HUMMEL HEPA H13 core — driven by a whisper-quiet brushless motor
            and read continuously by the onboard AQI controller.
          </p>
        </div>
      </div>
    </section>
  );
}
