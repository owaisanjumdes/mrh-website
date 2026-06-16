"use client";

import { useEffect, useRef, useState } from "react";

// Counts from 0 → end the first time it scrolls into view. Used for the big
// "30+ / 80+ Years" stats in the Two Legacies section.
export default function CountUp({
  end,
  duration = 1700,
}: {
  end: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setValue(end);
      return;
    }

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setValue(Math.round(eased * end));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span
      ref={ref}
      style={{
        display: "inline-block",
        minWidth: `${String(end).length}ch`,
        textAlign: "right",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value}
    </span>
  );
}
