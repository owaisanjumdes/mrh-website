"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";

// "PureAir in action" — adapted from Figma node 707:4045 (the "Pro results down
// to the pixel." horizontal photo gallery). Chunky #1d1d1f rounded cards showing
// real PureAir deployments, scrolled with prev/next arrows.

type Deployment = {
  image: string;
  title: string;
  description: string;
};

const DEPLOYMENTS: Deployment[] = [
  {
    image: "/MRH-ENVIRONMENT_01.png",
    title: "Offices & workspaces.",
    description:
      "Cleaner air at the desk — fewer sick days, sharper focus, quietly running all day.",
  },
  {
    image: "/MRH-BASEKETBALL COURT_REV.png",
    title: "Schools & sports arenas.",
    description:
      "Engineered to clear large, high-traffic indoor spaces where kids breathe hardest.",
  },
  {
    image: "/Environment.png",
    title: "Homes & living rooms.",
    description:
      "Continuous, whisper-quiet purification for the rooms families spend the most time in.",
  },
  {
    image: "/MRH-ENVIRONMENT_02.png",
    title: "Clinics & hospitality.",
    description:
      "Reliable, measurable AQI control for waiting rooms, lobbies, and wellness spaces.",
  },
];

export default function PureAirInAction({
  heading = "PureAir in action",
}: {
  heading?: string;
}) {
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
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`pia ${inView ? "is-in" : ""}`}
      aria-label="PureAir in action"
    >
      <style>{`
        .pia {
          /* mirror the "Take a closer look" frame so this section aligns with it:
             --frame = the big card's edge, --inset = the heading's left position */
          --edge: clamp(16px, 2.4vw, 44px);
          --frame: calc(var(--edge) + max(0px, (100vw - 2 * var(--edge) - 1720px) / 2));
          --inset: calc(var(--frame) + clamp(24px, 3vw, 56px));
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(96px, 14vh, 200px) 0 clamp(64px, 8vh, 120px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .pia-head {
          /* same left reference as the scroller's first card so they align */
          padding: 0 var(--edge) 0 var(--inset);
        }
        .pia-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(26px, 3vw, 32px);
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.004em;
        }

        .pia-scroller {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          overscroll-behavior-x: contain;
          /* snap respects the inset so the first card lines up with the heading
             instead of snapping flush to the screen edge */
          scroll-padding-left: var(--inset);
          padding: clamp(22px, 2.4vw, 32px) var(--edge) 8px var(--inset);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .pia-scroller::-webkit-scrollbar { display: none; }

        .pia-card {
          flex: none;
          width: clamp(300px, 62vw, 760px);
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
        }
        .pia-card-media {
          background: #1d1d1f;
          border-radius: 28px;
          overflow: hidden;
          height: clamp(520px, 70vh, 860px);
        }
        .pia-card-media img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .pia-caption {
          margin: 0;
          padding: 24px 15px 0;
          max-width: 590px;
          color: #86868b;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.235;
          letter-spacing: -0.022em;
        }
        .pia-caption b { color: #f5f5f7; font-weight: 600; }

        .pia-nav {
          margin: clamp(28px, 3vw, 48px) 0 0;
          padding: 0 var(--frame) 0 var(--inset);
          display: flex;
          justify-content: flex-end;
          gap: 18px;
        }
        .pia-arrow {
          width: 36px;
          height: 36px;
          border-radius: 36px;
          border: none;
          background: rgba(66, 66, 69, 0.72);
          color: #f5f5f7;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 200ms ease, background 200ms ease;
        }
        .pia-arrow:hover:not(:disabled) { background: rgba(86, 86, 89, 0.85); }
        .pia-arrow:disabled { opacity: 0.36; cursor: default; }
        .pia-arrow svg { width: 18px; height: 18px; }

        @media (max-width: 600px) {
          .pia-card { width: 84vw; }
        }
      `}</style>

      <div className="pia-head" data-reveal>
        <h2 className="pia-title">{heading}</h2>
      </div>

      <div
        className="pia-scroller"
        ref={scrollerRef}
        onScroll={updateEdges}
        data-reveal
        style={{ ["--ri" as string]: 1 }}
      >
        {DEPLOYMENTS.map((d) => (
          <article className="pia-card" key={d.title}>
            <div className="pia-card-media">
              <img src={d.image} alt={d.title} />
            </div>
            <p className="pia-caption">
              <b>{d.title}</b> {d.description}
            </p>
          </article>
        ))}
      </div>

      <div className="pia-nav" data-reveal style={{ ["--ri" as string]: 2 }}>
        <button
          type="button"
          className="pia-arrow"
          onClick={() => scrollByDir(-1)}
          disabled={atStart}
          aria-label="Previous deployment"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="pia-arrow"
          onClick={() => scrollByDir(1)}
          disabled={atEnd}
          aria-label="Next deployment"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
