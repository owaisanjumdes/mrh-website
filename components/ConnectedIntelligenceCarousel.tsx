"use client";

// Stacked "creative effect" Swiper deck, adapted from Skiper UI's Carousel_005
// (Skiper 51). Credit: Skiper UI — https://skiper-ui.com
import { useEffect, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// The five "Connected Intelligence" cards, shown as a stacked (creative-effect)
// Swiper deck. Each slide is a full-bleed image with the card's label + body
// overlaid at the bottom.
const CARDS: { label: string; body: string; img: string; pos?: string }[] = [
  {
    label: "Every Unit Every Reading One Dashboard",
    body: "Monitor PM2.5, PM10, and AQI in real time for every unit, all from a centralized dashboard, accessible anytime, anywhere.",
    img: "/liveaqi.jpg",
  },
  {
    label: "Centralized Control",
    body: "Whether it's a single room or hundreds of locations, monitor every unit from one intelligent platform.",
    img: "/timings.jpg",
    pos: "center 28%",
  },
  {
    label: "Intelligent Control",
    body: "Adjust fan speed, modes and schedules for every unit remotely.",
    img: "/Icon.jpg",
    pos: "center 25%",
  },
  {
    label: "Intelligent Filter Health Monitoring",
    body: "Monitor filter life, eliminate manual inspections, and stay ahead of maintenance.",
    img: "/fhm.jpg",
  },
  {
    label: "Service on Wheels",
    body: "As filters approach the end of their service life, the system automatically alerts our team. We schedule maintenance proactively, before performance is affected.",
    img: "/sown.jpeg",
  },
];

export default function ConnectedIntelligenceCarousel() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Only autoplay while the section is on screen (pause when scrolled away).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const sw = swiperRef.current;
        if (!sw?.autoplay) return;
        if (e.isIntersecting) sw.autoplay.start();
        else sw.autoplay.stop();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="ci-carousel" ref={rootRef}>
      <style>{`
        .ci-carousel { width: 100%; }
        .ci-swiper { width: 100%; max-width: 1200px; margin: 0 auto; padding: 24px 20px 90px !important; }
        /* Smoother, springier easing for the slide motion */
        .ci-swiper .swiper-wrapper { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        .ci-swiper .swiper-slide {
          width: min(820px, 86vw);
          height: clamp(380px, 50vw, 500px);
          border-radius: 24px;
          overflow: hidden;
          transform: scale(0.84) translateY(14px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
          transition: transform 820ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 820ms ease;
        }
        /* Depth comes from scale + lift + shadow only (no opacity fade), so the
           side cards keep their full image/content instead of washing out. */
        .ci-swiper .swiper-slide-active {
          transform: scale(1) translateY(0);
          box-shadow: 0 26px 56px rgba(0, 0, 0, 0.22);
        }
        .ci-swiper .swiper-pagination-bullet { background: #1d1d1f !important; }
        .ci-swiper .swiper-pagination-bullet-active { background: #1d1d1f !important; }
        .ci-slide { position: relative; width: 100%; height: 100%; }
        .ci-slide img { width: 100%; height: 100%; object-fit: cover; }
        .ci-slide-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,0.32) 62%, rgba(0,0,0,0.74) 100%);
        }
        .ci-slide-text {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: clamp(22px, 3vw, 38px);
          color: #ffffff;
        }
        .ci-slide-label {
          margin: 0 0 10px; font-size: clamp(13px, 1.3vw, 15px);
          font-weight: 600; letter-spacing: -0.01em; color: #4ade80;
        }
        .ci-slide-body {
          margin: 0; font-size: clamp(18px, 1.9vw, 25px);
          font-weight: 600; line-height: 1.24; letter-spacing: -0.01em; max-width: 30ch;
        }
      `}</style>

      <Swiper
        modules={[Pagination, Autoplay]}
        onSwiper={(s) => {
          swiperRef.current = s;
          // Stay paused until the section scrolls into view (the observer starts it).
          s.autoplay?.stop();
        }}
        grabCursor
        slidesPerView="auto"
        centeredSlides
        rewind
        speed={800}
        spaceBetween={40}
        autoplay={{ delay: 1750, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="ci-swiper"
      >
        {CARDS.map((c, i) => (
          <SwiperSlide key={i}>
            <div className="ci-slide">
              <img
                src={c.img}
                alt={c.label}
                style={c.pos ? { objectPosition: c.pos } : undefined}
              />
              <div className="ci-slide-scrim" aria-hidden />
              <div className="ci-slide-text">
                <p className="ci-slide-label">{c.label}</p>
                <p className="ci-slide-body">{c.body}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
