"use client";

import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";

// Home hero — full-bleed background video filling one viewport (extends up behind
// the transparent nav). Headline left-aligned, materializing letter by letter with
// a smoke-like fade in an Apple-style white gradient.

const LINES = ["The Best Air You Will Ever Breathe."];
const STEP_MS = 42; // per-letter stagger

export default function HomeHero() {
  let i = 0; // running letter index across both lines for a continuous stagger

  // Seamless loop: the native `loop` attribute flashes one black frame at the
  // end→start seek. Instead we restart the clip a hair before the end so it never
  // reaches that final (black) frame, keeping the loop visually continuous.
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const restart = () => {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    const onTime = () => {
      if (v.duration && v.currentTime >= v.duration - 0.18) restart();
    };
    // `ended` is a fallback in case timeupdate doesn't fire close enough to the end
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", restart);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", restart);
    };
  }, []);

  // Scroll-driven parallax: --p goes 0 → 1 across the first viewport, driving the
  // hero's recede (the pinned hero stays put while the next section rises over it).
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      el.style.setProperty("--p", String(p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hh" aria-label="The Best Air You Will Ever Breathe.">
      <style>{`
        .hh {
          /* pull the hero up under the (transparent) sticky nav so the video
             fills the whole first viewport */
          --hh-nav: clamp(64px, 7vw, 130px);
          --gutter: clamp(20px, 6vw, 88px);
          /* 0 → 1 across the first viewport of scroll (set from JS) */
          --p: 0;
          /* pinned behind the rest of the page so the next section scrolls UP
             over a stationary hero (parallax reveal) */
          position: sticky;
          top: 0;
          z-index: 0;
          margin-top: calc(-1 * var(--hh-nav));
          height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          background: #000000;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .hh-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          /* gentle push-in as the next section rises over the hero */
          transform: scale(calc(1 + var(--p) * 0.08));
          /* fade the video up from black on every load */
          opacity: 0;
          animation: hhVideoIn 1500ms ease-out 120ms both;
        }
        @keyframes hhVideoIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .hh-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 22%, rgba(0,0,0,0.22) 100%);
          pointer-events: none;
        }
        .hh-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1680px;
          /* the whole block (headline, sub, CTAs, trust) auto-centers vertically
             in the hero */
          margin: auto 0;
          padding: 0 var(--gutter);
          /* headline recedes (drifts up + fades) as the next section comes up */
          transform: translateY(calc(var(--p) * -48px));
          opacity: calc(1 - var(--p) * 1.1);
          will-change: transform, opacity;
        }
        .hh-title {
          margin: 0;
          text-align: center;
          font-size: clamp(36px, 5.6vw, 88px);
          font-weight: 300;
          line-height: 1.12;
          letter-spacing: -0.03em;
        }
        .hh-line { display: block; }
        .hh-word { display: inline-block; white-space: nowrap; }
        .hh-ch {
          display: inline-block;
          /* extra bottom room so the gradient box covers descenders (e.g. "g") */
          padding-bottom: 0.1em;
          background: linear-gradient(180deg, #ffffff 0%, #e7e7ec 52%, #c3c3cb 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          animation: hhSmoke 950ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        /* smoke-like materialize: blurred + scaled-up + drifted → resolves */
        @keyframes hhSmoke {
          0%   { opacity: 0; filter: blur(14px); transform: translate(var(--tx, 0px), 16px) scale(1.22); }
          55%  { opacity: 1; }
          100% { opacity: 1; filter: blur(0); transform: translate(0, 0) scale(1); }
        }
        .hh-sub {
          margin: clamp(16px, 2vw, 26px) auto 0;
          max-width: 720px;
          text-align: center;
          color: #e7e7ec;
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 400;
          line-height: 1.35;
          letter-spacing: -0.01em;
          opacity: 0;
          animation: hhFadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) 900ms both;
        }
        .hh-cta-row {
          margin: clamp(24px, 3.4vw, 40px) auto 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(10px, 1.2vw, 16px);
          opacity: 0;
          animation: hhFadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) 1050ms both;
        }
        .hh-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 980px;
          padding: 0.85em 1.6em;
          font-size: clamp(15px, 1.2vw, 18px);
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: background 200ms ease, color 200ms ease, transform 200ms ease;
        }
        .hh-cta--primary { background: #148042; color: #ffffff; }
        .hh-cta--primary:hover { background: #0f6a36; transform: translateY(-1px); }
        .hh-cta--secondary { background: #ffffff; color: #1d1d1f; }
        .hh-cta--secondary:hover { background: #e9e9ec; transform: translateY(-1px); }
        .hh-trust {
          margin: clamp(14px, 2vw, 22px) auto 0;
          text-align: center;
          color: rgba(255, 255, 255, 0.62);
          font-size: clamp(12px, 1vw, 14px);
          font-weight: 500;
          letter-spacing: 0.01em;
          opacity: 0;
          animation: hhFadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) 1200ms both;
        }
        @keyframes hhFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hh-ch { animation: none; opacity: 1; filter: none; transform: none; }
          .hh-video { animation: none; opacity: 1; transform: none; }
          .hh-inner { transform: none; opacity: 1; }
          .hh-sub, .hh-cta-row, .hh-trust { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <video
        ref={videoRef}
        className="hh-video"
        src="/home-hero2.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="hh-scrim" aria-hidden />

      <div className="hh-inner">
        <h1 className="hh-title">
          {LINES.map((line, li) => (
            <span className="hh-line" key={li}>
              {line.split(" ").map((word, wi) => (
                <Fragment key={wi}>
                  {wi > 0 ? " " : null}
                  <span className="hh-word">
                    {Array.from(word).map((ch, ci) => {
                      const idx = i++;
                      // gentle, deterministic per-letter horizontal wisp
                      const tx = ((idx * 37) % 11) - 5;
                      return (
                        <span
                          className="hh-ch"
                          key={ci}
                          style={{
                            animationDelay: `${idx * STEP_MS}ms`,
                            ["--tx" as string]: `${tx}px`,
                          }}
                        >
                          {ch}
                        </span>
                      );
                    })}
                  </span>
                </Fragment>
              ))}
            </span>
          ))}
        </h1>

        <p className="hh-sub">
          German-engineered purification, built for India’s air.
        </p>

        <div className="hh-cta-row">
          <Link href="/contact" className="hh-cta hh-cta--primary">
            Get a free air assessment
          </Link>
          <Link href="/products" className="hh-cta hh-cta--secondary">
            Explore products
          </Link>
        </div>

        <p className="hh-trust">
          Powered by MANN+HUMMEL Germany · Made in India
        </p>
      </div>
    </section>
  );
}
