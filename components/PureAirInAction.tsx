"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";

// "PureAir in action" — dark section showing real PureAir deployments as an
// auto-advancing carousel (mirrors the "From classrooms to courtyards." carousel
// on the home page) with a segmented progress bar adapted to dark mode.

type Deployment = {
  image: string;
  label: string;
  pillDark?: boolean;
};

const DEPLOYMENTS: Deployment[] = [
  { image: "/pac.jpg", label: "Classroom" },
  { image: "/pao.jpg", label: "Office" },
  { image: "/gym.jpg", label: "Gym" },
  { image: "/cafe.jpg", label: "Cafe" },
  { image: "/hospital.jpg", label: "Hospital", pillDark: true },
  { image: "/hlf.jpg", label: "Hotel" },
];

export default function PureAirInAction({
  heading = "PureAir in Action",
  sub,
}: {
  heading?: string;
  sub?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const n = DEPLOYMENTS.length;
  const advance = () => setActive((i) => (i + 1) % n);

  // Center the active card in the viewport whenever it changes.
  useEffect(() => {
    const track = trackRef.current;
    const card = track?.children[active] as HTMLElement | undefined;
    if (track && card) {
      const left = card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2;
      track.scrollTo({ left, behavior: "smooth" });
    }
  }, [active]);

  // Only auto-advance while the carousel is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setPlaying(e.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`pia ${inView ? "is-in" : ""}`}
      aria-label={heading}
    >
      <style>{`
        .pia {
          /* mirror the "Take a closer look" frame so this section aligns with it:
             --frame = the big card's edge, --inset = the heading's left position */
          --edge: clamp(16px, 2.4vw, 44px);
          --frame: calc(var(--edge) + max(0px, (100vw - 2 * var(--edge) - 1720px) / 2));
          --inset: calc(var(--frame) + clamp(24px, 3vw, 56px));
          --cardw: min(1120px, 92vw);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(96px, 14vh, 200px) 0 clamp(64px, 8vh, 120px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .pia-head {
          padding: 0 var(--edge);
          text-align: center;
        }
        .pia-title {
          margin: 0 auto;
          max-width: 18ch;
          color: #f5f5f7;
          font-size: clamp(32px, 5.2vw, 76px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.02em;
          text-align: center;
        }
        .pia-sub {
          margin: clamp(18px, 2vw, 28px) auto 0;
          max-width: 52ch;
          text-align: center;
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 500;
          line-height: 1.45;
          color: #86868b;
        }

        .pia-carousel { margin-top: clamp(36px, 4vw, 60px); }
        .pia-track {
          display: flex;
          gap: clamp(16px, 1.6vw, 22px);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          /* center the active card, with neighbours bleeding off both edges */
          padding: 4px max(var(--edge), calc((100vw - var(--cardw)) / 2));
        }
        .pia-track::-webkit-scrollbar { display: none; }

        .pia-card {
          position: relative;
          scroll-snap-align: center;
          flex: none;
          width: var(--cardw);
          aspect-ratio: 16 / 9;
          border-radius: 28px;
          overflow: hidden;
          background: #1d1d1f;
        }
        .pia-card-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .pia-card-pill {
          position: absolute;
          left: 50%;
          bottom: clamp(20px, 2.4vw, 34px);
          transform: translateX(-50%);
          z-index: 2;
          padding: clamp(9px, 0.9vw, 13px) clamp(20px, 1.9vw, 30px);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.26);
          border: 1px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(34px) saturate(180%);
          -webkit-backdrop-filter: blur(34px) saturate(180%);
          color: #ffffff;
          font-size: clamp(14px, 1.4vw, 19px);
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .pia-card-pill--dark { color: #333336; }

        /* segmented progress bar — dark mode (light segments/fill on black) */
        .pia-cprog {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: clamp(28px, 3.4vw, 48px);
          padding: 0 var(--edge);
        }
        .pia-cseg {
          position: relative;
          height: 8px;
          width: 8px;
          padding: 0;
          border: none;
          border-radius: 980px;
          background: rgba(255, 255, 255, 0.24);
          cursor: pointer;
          overflow: hidden;
          transition: width 480ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms ease;
        }
        .pia-cseg.is-active { width: 52px; background: rgba(255, 255, 255, 0.18); }
        @keyframes piaCfill { from { width: 0%; } to { width: 100%; } }
        .pia-cfill {
          display: block;
          height: 100%;
          width: 0%;
          border-radius: 980px;
          background: #f5f5f7;
          animation: piaCfill 4500ms linear forwards;
        }
        @media (prefers-reduced-motion: reduce) { .pia-cfill { animation: none; width: 100%; } }
      `}</style>

      <div className="pia-head" data-reveal>
        <h2 className="pia-title">{heading}</h2>
        {sub ? <p className="pia-sub">{sub}</p> : null}
      </div>

      <div className="pia-carousel" ref={rootRef} data-reveal style={{ ["--ri" as string]: 1 }}>
        <div className="pia-track" ref={trackRef}>
          {DEPLOYMENTS.map((d, i) => (
            <article className="pia-card" key={i}>
              <img className="pia-card-img" src={d.image} alt={d.label} />
              <span className={`pia-card-pill ${d.pillDark ? "pia-card-pill--dark" : ""}`}>{d.label}</span>
            </article>
          ))}
        </div>

        <div className="pia-cprog">
          {DEPLOYMENTS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`pia-cseg ${i === active ? "is-active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
            >
              {i === active && (
                <span
                  key={active}
                  className="pia-cfill"
                  style={{ animationPlayState: playing ? "running" : "paused" }}
                  onAnimationEnd={advance}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
