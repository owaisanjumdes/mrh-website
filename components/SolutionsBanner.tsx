"use client";

import { useEffect, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// Portrait solution banners (pb1–pb6), shown as a swipeable gallery. No autoplay
// and no looping — the images move on swipe/drag, the prev/next arrows, or the
// mouse wheel (wheel control activates only once the carousel fills the viewport).
const BANNERS = [
  "/np1.jpeg",
  "/np2.jpeg",
  "/np3.jpeg",
  "/np4.jpeg",
  "/np5.jpeg",
  "/np6.jpeg",
];

export default function SolutionsBanner() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Wheel-to-scroll the carousel only once it fully fills the viewport; until
  // then the wheel scrolls the page as usual.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const sw = swiperRef.current;
        if (!sw?.mousewheel) return;
        const fills =
          e.intersectionRatio >= 0.98 ||
          e.intersectionRect.height >= window.innerHeight * 0.9;
        if (fills) sw.mousewheel.enable();
        else sw.mousewheel.disable();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 0.9, 0.98, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="sb" ref={rootRef}>
      <style>{`
        .sb { width: 100%; }
        /* Full-bleed: the centered image is large and the neighbours run off and
           get clipped at the left/right screen edges. */
        .sb-inner { position: relative; width: 100%; margin: 0 auto; }
        .sb-swiper { padding: 8px 0 12px !important; }
        .sb-swiper .swiper-slide {
          width: clamp(280px, 40vw, 520px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
        }
        .sb-slide { position: relative; width: 100%; aspect-ratio: 4 / 5; }
        .sb-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
        /* Prev / next arrows on either end */
        .sb-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 5;
          width: clamp(38px, 3.4vw, 48px); height: clamp(38px, 3.4vw, 48px);
          border: none; border-radius: 50%; background: #ffffff; color: #333336;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
          transition: background 200ms ease, opacity 200ms ease, transform 150ms ease;
        }
        .sb-arrow:hover { background: #f0f0f2; }
        .sb-arrow:active { transform: translateY(-50%) scale(0.92); }
        .sb-arrow--prev { left: clamp(2px, 1vw, 14px); }
        .sb-arrow--next { right: clamp(2px, 1vw, 14px); }
        .sb-arrow svg { width: 44%; height: 44%; }
        .sb-arrow.swiper-button-disabled { opacity: 0.3; cursor: default; }
      `}</style>

      <div className="sb-inner">
        <button ref={prevRef} type="button" className="sb-arrow sb-arrow--prev" aria-label="Previous">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button ref={nextRef} type="button" className="sb-arrow sb-arrow--next" aria-label="Next">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Mousewheel]}
          onSwiper={(s) => {
            swiperRef.current = s;
            // Off until the carousel fully fills the viewport (observer enables it).
            s.mousewheel?.disable();
          }}
          onBeforeInit={(s) => {
            const nav = s.params.navigation;
            if (nav && typeof nav !== "boolean") {
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
            }
          }}
          navigation={{ prevEl: null, nextEl: null }}
          mousewheel={{ forceToAxis: false, releaseOnEdges: true }}
          grabCursor
          slidesPerView="auto"
          slidesOffsetBefore={24}
          slidesOffsetAfter={24}
          speed={650}
          spaceBetween={24}
          className="sb-swiper"
        >
          {BANNERS.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="sb-slide">
                <img src={src} alt={`MRH solution ${i + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
