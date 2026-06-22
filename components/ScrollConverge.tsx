"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

// Scroll-converge headline — adapted from Skiper UI "ScrollAnimation_002"
// (CharacterV1) for this site: dark Apple canvas, Inter Tight, native scroll (no
// Lenis). Each letter starts fanned out + rotated by its distance from centre and
// assembles into the word as the pinned section is scrolled through.

function Char({
  char,
  distance,
  amp,
  progress,
}: {
  char: string;
  distance: number;
  amp: number;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 0.5], [distance * amp, 0]);
  const rotateX = useTransform(progress, [0, 0.5], [distance * amp, 0]);

  if (char === " ") return <span className="sc-ch sc-ch--space" />;
  return (
    <motion.span className="sc-ch" style={{ x, rotateX }}>
      {char}
    </motion.span>
  );
}

export default function ScrollConverge() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const amp = reduce ? 0 : 48;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const text = "Until now";
  const chars = [...text];
  const center = (chars.length - 1) / 2;

  return (
    <section ref={ref} className="sc" aria-label={text}>
      <style>{`
        .sc {
          position: relative;
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          height: 200vh;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .sc-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 clamp(20px, 6vw, 88px);
        }
        .sc-line {
          margin: 0;
          max-width: 18ch;
          text-align: center;
          font-size: clamp(30px, 6vw, 92px);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          perspective: 800px;
        }
        .sc-ch {
          display: inline-block;
          will-change: transform;
          /* Apple orange gradient per letter (stays consistent as letters move) */
          background: linear-gradient(180deg, #ffb15a 0%, #ff8a2a 48%, #ff6a12 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .sc-ch--space { width: 0.3em; }
      `}</style>

      <div className="sc-sticky">
        <h2 className="sc-line">
          {chars.map((c, i) => (
            <Char
              key={i}
              char={c}
              distance={i - center}
              amp={amp}
              progress={scrollYProgress}
            />
          ))}
        </h2>
      </div>
    </section>
  );
}
