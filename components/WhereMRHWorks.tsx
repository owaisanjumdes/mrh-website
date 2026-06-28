"use client";

import { useEffect, useRef, useState } from "react";

// "Where MRH Works — From classrooms to courtyards." 6-image carousel, lifted
// from the home page section and made self-contained (own scoped CSS) so it can
// stand alone as the Deployments page hero. Light surface (#f5f5f7).

type Card = { src: string; label: string; pillDark?: boolean };

const CARDS: Card[] = [
  { src: "/pac.jpg", label: "Classroom" },
  { src: "/pao.jpg", label: "Office" },
  { src: "/gym.jpg", label: "Gym" },
  { src: "/cafe.jpg", label: "Cafe" },
  { src: "/hospital.jpg", label: "Hospital", pillDark: true },
  { src: "/hlf.jpg", label: "Hotel" },
];

export default function WhereMRHWorks() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const n = CARDS.length;
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

  // Only auto-advance once the section is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="wmw">
      <style>{`
        .wmw {
          --gutter: clamp(20px, 6vw, 88px);
          --maxw: 1260px;
          --cardw: min(1120px, 92vw);
          background: #f5f5f7;
          color: #1d1d1f;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 11vh, 150px) 0;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          overflow-x: hidden;
        }
        .wmw-wrap { max-width: var(--maxw); margin: 0 auto; padding: 0 var(--gutter); }
        .wmw-eyebrow { margin: 0 0 clamp(10px, 1.4vw, 16px); text-align: center; font-size: clamp(17px, 2vw, 24px); font-weight: 600; letter-spacing: 0.01em; color: #1a8f3c; }
        .wmw-h2 { margin: 0 auto; max-width: 18ch; text-align: center; font-size: clamp(32px, 5.2vw, 76px); font-weight: 600; line-height: 1.07; letter-spacing: -0.02em; text-wrap: balance; }
        .wmw-sub { margin: clamp(18px, 2vw, 28px) auto 0; max-width: 52ch; text-align: center; font-size: clamp(15px, 1.4vw, 19px); font-weight: 500; line-height: 1.45; color: #6e6e73; }

        .wmw-carousel { margin-top: clamp(36px, 4vw, 60px); }
        .wmw-track { display: flex; gap: clamp(16px, 1.6vw, 22px); padding: 4px max(var(--gutter), calc((100vw - var(--cardw)) / 2)); overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
        .wmw-track::-webkit-scrollbar { display: none; }
        .wmw-card { position: relative; scroll-snap-align: center; flex: none; width: var(--cardw); aspect-ratio: 16 / 9; border-radius: 24px; overflow: hidden; display: flex; flex-direction: column; background: #000000; }
        .wmw-card-img { flex: 1; width: 100%; min-height: 0; object-fit: cover; }
        .wmw-pill { position: absolute; left: 50%; bottom: clamp(20px, 2.4vw, 34px); transform: translateX(-50%); z-index: 3; padding: clamp(9px, 0.9vw, 13px) clamp(20px, 1.9vw, 30px); border-radius: 999px; background: rgba(255, 255, 255, 0.26); border: 1px solid rgba(255, 255, 255, 0.4); backdrop-filter: blur(34px) saturate(180%); -webkit-backdrop-filter: blur(34px) saturate(180%); color: #ffffff; font-size: clamp(14px, 1.4vw, 19px); font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; }
        .wmw-pill--dark { color: #333336; }

        .wmw-prog { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: clamp(28px, 3.4vw, 48px); padding: 0 var(--gutter); }
        .wmw-seg { position: relative; height: 8px; width: 8px; padding: 0; border: none; border-radius: 980px; background: rgba(0, 0, 0, 0.18); cursor: pointer; overflow: hidden; transition: width 480ms cubic-bezier(0.22, 1, 0.36, 1), background 300ms ease; }
        .wmw-seg.is-active { width: 52px; background: rgba(0, 0, 0, 0.14); }
        @keyframes wmwFill { from { width: 0%; } to { width: 100%; } }
        .wmw-fill { display: block; height: 100%; width: 0%; border-radius: 980px; background: #1d1d1f; animation: wmwFill 4500ms linear forwards; }
        @media (prefers-reduced-motion: reduce) { .wmw-fill { animation: none; width: 100%; } }
      `}</style>

      <div className="wmw-wrap">
        <p className="wmw-eyebrow" data-reveal>Where MRH Works</p>
        <h2 className="wmw-h2" data-reveal style={{ ["--ri" as string]: 1 }}>From classrooms to courtyards.</h2>
        <p className="wmw-sub" data-reveal style={{ ["--ri" as string]: 2 }}>200+ spaces, and counting.</p>
      </div>

      <div className="wmw-carousel" ref={rootRef}>
        <div className="wmw-track" ref={trackRef}>
          {CARDS.map((c, i) => (
            <article className="wmw-card" key={i}>
              <img loading="lazy" className="wmw-card-img" src={c.src} alt={c.label} />
              <span className={`wmw-pill ${c.pillDark ? "wmw-pill--dark" : ""}`}>{c.label}</span>
            </article>
          ))}
        </div>

        <div className="wmw-prog">
          {CARDS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`wmw-seg ${i === active ? "is-active" : ""}`}
              aria-label={`Go to space ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
            >
              {i === active && (
                <span
                  key={active}
                  className="wmw-fill"
                  style={{ animationPlayState: inView ? "running" : "paused" }}
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
