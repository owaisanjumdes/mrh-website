"use client";

import { useEffect, useRef, useState } from "react";
import { Wind, ShieldCheck, Layers, Factory, Recycle, Activity, type LucideIcon } from "lucide-react";

// Impact — "Our values lead the way." Figma node 794:12152. Light-gray section with
// a left-aligned heading and a horizontal carousel of white value cards (icon +
// title + description + "Learn more" link), scrolled with prev/next arrows.

type Value = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const VALUES: Value[] = [
  {
    icon: Wind,
    title: "Clean Air for All",
    desc: "Clean air shouldn’t be a privilege. We engineer it for classrooms, clinics, offices, and homes alike.",
  },
  {
    icon: ShieldCheck,
    title: "Proven, Not Promised",
    desc: "Every performance claim is independently tested and validated by IIT Delhi, never just marketed.",
  },
  {
    icon: Layers,
    title: "German Filtration",
    desc: "Filter media engineered by MANN+HUMMEL, with 80 years of filtration science behind it.",
  },
  {
    icon: Factory,
    title: "Made in India",
    desc: "Designed for India’s air, and built, serviced, and supported locally.",
  },
  {
    icon: Recycle,
    title: "Built to Last",
    desc: "Long-life filters and a metal unibody mean less waste and a lower cost to run.",
  },
  {
    icon: Activity,
    title: "Always Accountable",
    desc: "Live AQI and self-diagnostics keep every unit honest, in real time.",
  },
];

export default function ImpactValues() {
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
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="iv" aria-label="Our values lead the way.">
      <style>{`
        .iv {
          --gutter: clamp(20px, 6vw, 126px);
          background: #f5f5f7;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 10vw, 144px) 0;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .iv-head {
          padding: 0 var(--gutter);
        }
        .iv-title {
          margin: 0;
          color: #1d1d1f;
          font-size: clamp(32px, 4.4vw, 48px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.003em;
        }

        .iv-scroller {
          margin-top: clamp(28px, 3vw, 44px);
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          overscroll-behavior-x: contain;
          scroll-padding-left: var(--gutter);
          padding: 10px var(--gutter) 8px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .iv-scroller::-webkit-scrollbar { display: none; }

        .iv-card {
          flex: none;
          width: clamp(300px, 82vw, 372px);
          min-height: clamp(264px, 32vw, 316px);
          scroll-snap-align: start;
          background: #ffffff;
          border-radius: 28px;
          padding: 28px 32px 36px;
          display: flex;
          flex-direction: column;
        }
        .iv-icon {
          display: block;
          align-self: flex-start;
          height: clamp(38px, 3.8vw, 44px);
          width: clamp(38px, 3.8vw, 44px);
          color: #1a8f3c;
        }
        .iv-card-title {
          margin: clamp(14px, 1.6vw, 18px) 0 0;
          color: #1d1d1f;
          font-size: clamp(24px, 2.2vw, 28px);
          font-weight: 600;
          line-height: 1.14;
          letter-spacing: 0.007em;
        }
        .iv-desc {
          margin: clamp(10px, 1.2vw, 14px) 0 0;
          max-width: 264px;
          color: #1d1d1f;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.235;
          letter-spacing: -0.022em;
        }
        .iv-more {
          margin-top: clamp(12px, 1.4vw, 16px);
          color: #0066cc;
          font-size: 17px;
          font-weight: 400;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }
        .iv-more:hover { text-decoration: underline; }
        .iv-more svg { width: 14px; height: 14px; }

        .iv-nav {
          margin: clamp(20px, 2.4vw, 24px) 0 0;
          padding: 0 var(--gutter);
          display: flex;
          justify-content: flex-end;
          gap: 18px;
        }
        .iv-arrow {
          width: 36px;
          height: 36px;
          border-radius: 36px;
          border: none;
          background: rgba(210, 210, 215, 0.64);
          color: #1d1d1f;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 200ms ease, background 200ms ease;
        }
        .iv-arrow:hover:not(:disabled) { background: rgba(190, 190, 196, 0.82); }
        .iv-arrow:disabled { opacity: 0.42; cursor: default; }
        .iv-arrow svg { width: 18px; height: 18px; }
      `}</style>

      <div className="iv-head" data-reveal>
        <h2 className="iv-title">Our values lead the way.</h2>
      </div>

      <div
        className="iv-scroller"
        ref={scrollerRef}
        onScroll={updateEdges}
        data-reveal
        style={{ ["--ri" as string]: 1 }}
      >
        {VALUES.map((v) => (
          <article className="iv-card" key={v.title}>
            <v.icon className="iv-icon" strokeWidth={1.6} aria-hidden />
            <h3 className="iv-card-title">{v.title}</h3>
            <p className="iv-desc">{v.desc}</p>
            <a className="iv-more" href="#">
              Learn more
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </article>
        ))}
      </div>

      <div className="iv-nav">
        <button
          type="button"
          className="iv-arrow"
          onClick={() => scrollByDir(-1)}
          disabled={atStart}
          aria-label="Previous value"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="iv-arrow"
          onClick={() => scrollByDir(1)}
          disabled={atEnd}
          aria-label="Next value"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
