"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const FADE_OUT_MS = 380; // black-in duration
const FADE_IN_MS = 520; // reveal duration
const HOLD_MS = 80; // brief hold on full black before navigating

type Phase = "idle" | "fade-out" | "fade-in";

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingPathRef = useRef<string | null>(null);
  const lastPathRef = useRef<string>(pathname);

  // Global click interceptor: catch internal anchor navigations and run the
  // fade-out → router.push → fade-in sequence.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return; // only left-click
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      let node = e.target as HTMLElement | null;
      while (node && node.tagName !== "A") node = node.parentElement;
      if (!node) return;

      const anchor = node as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // Skip hash-only, mailto/tel, external links, downloads, and explicit targets.
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return; // external
        const dest = url.pathname + url.search + url.hash;
        const current =
          window.location.pathname + window.location.search + window.location.hash;
        if (dest === current) return; // same page, do nothing
        e.preventDefault();
        pendingPathRef.current = url.pathname + url.search;
        setPhase("fade-out");
      } catch {
        // malformed href — let the browser handle it
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // When the fade-out finishes, push the route. (We pre-set the target above.)
  useEffect(() => {
    if (phase !== "fade-out") return;
    const t = window.setTimeout(() => {
      const dest = pendingPathRef.current;
      if (dest) {
        pendingPathRef.current = null;
        router.push(dest);
      } else {
        setPhase("fade-in");
      }
    }, FADE_OUT_MS + HOLD_MS);
    return () => window.clearTimeout(t);
  }, [phase, router]);

  // When pathname actually changes, start the reveal.
  useEffect(() => {
    if (pathname !== lastPathRef.current) {
      lastPathRef.current = pathname;
      window.scrollTo(0, 0);
      setPhase("fade-in");
      const t = window.setTimeout(() => setPhase("idle"), FADE_IN_MS);
      return () => window.clearTimeout(t);
    }
  }, [pathname]);

  const opacity = phase === "fade-out" ? 1 : 0;
  const transitionDuration =
    phase === "fade-out" ? `${FADE_OUT_MS}ms` : `${FADE_IN_MS}ms`;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        opacity,
        pointerEvents: phase === "fade-out" ? "auto" : "none",
        zIndex: 9999,
        transition: `opacity ${transitionDuration} cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "opacity",
      }}
    />
  );
}
