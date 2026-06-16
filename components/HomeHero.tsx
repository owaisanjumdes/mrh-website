import { Fragment } from "react";

// Home hero — text only, left-aligned (same gutter as the product page sections).
// The headline materializes letter by letter with a smoke-like fade: each glyph
// starts blurred, scaled-up and drifted, then resolves into the brand-green text.

const LINES = ["Engineering the next generation", "of Air Purification"];
const STEP_MS = 26; // per-letter stagger

export default function HomeHero() {
  let i = 0; // running letter index across both lines for a continuous stagger

  return (
    <section className="hh" aria-label="Engineering the next generation of Air Purification">
      <style>{`
        .hh {
          --gutter: clamp(20px, 6vw, 88px);
          min-height: 100svh;
          display: flex;
          align-items: center;
          background: #000000;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .hh-inner {
          width: 100%;
          max-width: 1680px;
          margin: 0 auto;
          padding: 0 var(--gutter);
        }
        .hh-title {
          margin: 0;
          text-align: left;
          font-size: clamp(36px, 5.6vw, 88px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.03em;
        }
        .hh-line { display: block; }
        .hh-word { display: inline-block; white-space: nowrap; }
        .hh-ch {
          display: inline-block;
          /* extra bottom room so the gradient box covers descenders (e.g. "g") */
          padding-bottom: 0.1em;
          background: linear-gradient(180deg, #4ade80 0%, #1bb35a 46%, #148042 100%);
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
        @media (prefers-reduced-motion: reduce) {
          .hh-ch { animation: none; opacity: 1; filter: none; transform: none; }
        }
      `}</style>

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
      </div>
    </section>
  );
}
