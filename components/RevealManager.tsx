"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Observes every [data-reveal] element individually and adds `is-revealed` when
// it scrolls into view, so each heading/image/button/component animates exactly
// when the user reaches it — not when its section's top edge first peeks in.
// Re-scans on route change and watches for dynamically added elements.
export default function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );

    const observeAll = () =>
      document
        .querySelectorAll("[data-reveal]:not(.is-revealed)")
        .forEach((el) => io.observe(el));

    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
