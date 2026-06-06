"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  target: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 90, suffix: "%", label: "Of your day spent indoors" },
  { target: 5, suffix: "×", label: "Above safe limit in a sealed room" },
  { target: 480, suffix: "M+", label: "Indians breathing unsafe air daily" },
];

const DURATION_MS = 1800;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CostStats() {
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));
  const cardRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const startTs = performance.now();
        const step = (now: number) => {
          const elapsed = now - startTs;
          const t = Math.min(elapsed / DURATION_MS, 1);
          const eased = easeOutCubic(t);
          setCounts(STATS.map((s) => Math.round(s.target * eased)));
          if (t < 1) {
            rafRef.current = requestAnimationFrame(step);
          } else {
            setCounts(STATS.map((s) => s.target));
          }
        };
        rafRef.current = requestAnimationFrame(step);
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        backgroundColor: "#1c1c1e",
        backgroundImage:
          "radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1.2px)",
        backgroundSize: "22px 22px",
        backgroundPosition: "0 0",
        borderRadius: "clamp(28px, 3.4vw, 56px)",
        width: "100%",
        paddingTop: "clamp(48px, 7vw, 120px)",
        paddingBottom: "clamp(56px, 8vw, 140px)",
        paddingLeft: "clamp(24px, 4vw, 72px)",
        paddingRight: "clamp(24px, 4vw, 72px)",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{
          columnGap: "clamp(24px, 3vw, 56px)",
          rowGap: "clamp(48px, 6vw, 96px)",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.18)",
              paddingTop: "clamp(20px, 2vw, 36px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(24px, 3vw, 48px)",
              minWidth: 0,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(48px, 6vw, 124px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "#ffffff",
                whiteSpace: "nowrap",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {counts[i]}
              {s.suffix}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(12px, 0.95vw, 15px)",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  textTransform: "lowercase",
                  lineHeight: 1.4,
                  color: "rgba(255, 255, 255, 0.62)",
                  maxWidth: "32ch",
                }}
              >
                {s.label}
              </p>
              <span
                aria-hidden
                style={{
                  fontSize: "clamp(12px, 0.95vw, 15px)",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.3)",
                  flexShrink: 0,
                }}
              >
                //
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
