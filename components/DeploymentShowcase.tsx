"use client";

import { useEffect, useRef } from "react";

const BODY =
  "From hospital corridors to classrooms and offices, PureAir clears the air where people actually spend their day — installed and serviced on the ground in India.";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function DeploymentShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const fullRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const full = fullRef.current;
    const text = textRef.current;
    if (!section || !card || !full || !text) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      card.style.width = "100vw";
      card.style.height = "92vh";
      card.style.borderRadius = "0px";
      full.style.transform = "translateX(-50%) scale(1.1)";
      text.style.color = "#ffffff";
      return;
    }

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      // Track the card rising into the viewport centre: 0 when its centre is at
      // the bottom of the screen (just appearing), 1 when it reaches the centre
      // (landed). So the grow is fully visible and finishes exactly on landing.
      const p = Math.max(0, Math.min(1, 1 - (2 * rect.top) / vh));

      // Starting width matches the two product cards above it.
      const gutter = Math.max(20, Math.min(0.05 * vw, 80));
      const startW = Math.min(1500, vw - 2 * gutter);

      // Card grows from that width to fullscreen.
      card.style.width = `${lerp(startW, vw, p)}px`;
      card.style.height = `${lerp(vh * 0.82, vh, p)}px`;
      card.style.borderRadius = `${lerp(28, 0, p)}px`;

      // Foreground product grows (anchored to the card bottom).
      full.style.transform = `translateX(-50%) scale(${lerp(0.82, 1.12, p)})`;

      // Text fades from grey to white.
      const v = Math.round(lerp(150, 255, p));
      text.style.color = `rgb(${v}, ${v}, ${v})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="ds">
      <style>{`
        .ds {
          position: relative;
          height: 150vh;
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
        }
        .ds-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .ds-card {
          position: relative;
          width: min(1500px, calc(100vw - 2 * clamp(20px, 5vw, 80px)));
          height: 82vh;
          border-radius: 28px;
          overflow: hidden;
          background: #0b0e12;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          will-change: width, height;
        }
        /* Hallway image stays at full-viewport size and centred, so it does not
           scale — the growing card simply reveals more of it. */
        .ds-hallway {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          opacity: 0.45;
          pointer-events: none;
        }
        .ds-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0) 64%);
          pointer-events: none;
        }
        /* Product sticks to the bottom of the card and scales from there. */
        .ds-full {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%) scale(0.82);
          transform-origin: bottom center;
          width: min(680px, 50vw);
          height: auto;
          pointer-events: none;
          will-change: transform;
          filter: drop-shadow(0 28px 56px rgba(0, 0, 0, 0.6));
        }
        .ds-text {
          position: absolute;
          z-index: 2;
          top: clamp(28px, 6vh, 80px);
          left: clamp(24px, 4vw, 80px);
          margin: 0;
          max-width: min(560px, 64%);
          font-size: clamp(20px, 2vw, 32px);
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: rgb(150, 150, 150);
        }
        @media (prefers-reduced-motion: reduce) {
          .ds { height: auto; }
          .ds-sticky {
            position: relative;
            height: auto;
            padding: clamp(40px, 6vh, 88px) clamp(20px, 5vw, 64px);
          }
        }
      `}</style>

      <div className="ds-sticky">
        <div ref={cardRef} className="ds-card">
          <img loading="lazy"
            className="ds-hallway"
            src="/MRH-HALLWAY (1).png"
            alt=""
            aria-hidden
          />
          <div className="ds-scrim" aria-hidden />
          <img loading="lazy"
            ref={fullRef}
            className="ds-full"
            src="/MRH-FULL.png"
            alt="PureAir deployed in a hospital corridor"
          />
          <p ref={textRef} className="ds-text">
            {BODY}
          </p>
        </div>
      </div>
    </section>
  );
}
