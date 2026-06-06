"use client";

import { useEffect, useRef } from "react";

const COPY =
  "Welcome to the future of clean air. PureAir is built for the spaces you actually run — classrooms, offices, banks, the rooms where people spend their days. Commercial-grade filtration, engineered with MANN+HUMMEL and built by OK Play, working quietly in over 200 buildings across India. Not a promise on a box. A number you can watch drop, on a screen you can read from across the room.";

const DIM = "#c9c9c9";
const LIT = "#0a0a0a";

export default function ProductsIntroText() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const chars = charsRef.current;
    const total = chars.length;
    if (total === 0) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // The paragraph is sticky-pinned for the full height of the section.
      // Progress = how far we've scrolled through that pinned range.
      const scrollable = section.offsetHeight - vh;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      const p = Math.max(0, Math.min(1, raw));

      const revealed = Math.round(p * total);
      for (let i = 0; i < total; i++) {
        const el = chars[i];
        if (!el) continue;
        const next = i < revealed ? LIT : DIM;
        if (el.dataset.lit !== next) {
          el.style.color = next;
          el.dataset.lit = next;
        }
      }
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

  charsRef.current = [];

  const words = COPY.split(" ");

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        position: "relative",
        height: "300vh",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          paddingLeft: "clamp(16px, 2.5vw, 40px)",
          paddingRight: "clamp(16px, 2.5vw, 40px)",
        }}
      >
        <p
          style={{
            maxWidth: "1440px",
            width: "100%",
            margin: "0 auto",
            fontSize: "clamp(26px, 3.6vw, 56px)",
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: DIM,
            textAlign: "left",
            fontFamily:
              "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {words.map((word, wi) => (
            <span
              key={wi}
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                marginRight: wi < words.length - 1 ? "0.27em" : 0,
              }}
            >
              {Array.from(word).map((ch, ci) => (
                <span
                  key={ci}
                  ref={(el) => {
                    if (el) charsRef.current.push(el);
                  }}
                  style={{
                    color: DIM,
                    transition: "color 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
