"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fades its children up into view the first time they're scrolled into the
// viewport. Accepts a className so it can stand in for an existing element.
export default function FadeInOnView({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
