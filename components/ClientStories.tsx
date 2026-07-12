"use client";

// "Our Valued Clients" — a fanned coverflow of vertical testimonial-story cards
// (Swiper coverflow effect). Autoplay is gated to when the section is on screen.
import { useEffect, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

// The recently added client stories.
const CLIENTS = [
  "Residential AF2",
  "Dharav",
  "OP Jindal University",
  "Residential AF3",
  "GD Goenka Vasant Kunj",
  "Unox",
  "Forest Essential",
  "Rukma Cafe",
  "Maxop",
  "Bal Bharti",
  "Everest 1",
  "Everest 2",
  "Residential AF",
  "GD Goenka Bareilly",
  "Ad Factor",
  "Birla Estate",
  "Residential PA",
  "Bajaj Alloys",
];
const IMAGES = CLIENTS.map((name) => ({
  src: `/${encodeURIComponent(name)}.jpeg`,
  alt: name,
}));

export default function ClientStories() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Only autoplay while the section is in view.
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="cs" ref={rootRef}>
      <style>{`
        .cs { width: 100%; }
        .cs-heading {
          margin: 0 0 clamp(28px, 4vw, 52px);
          text-align: center;
          font-size: clamp(24px, 3.2vw, 40px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #1d1d1f;
        }
        .cs-swiper { width: 100%; padding: 20px 0 30px !important; overflow: hidden; }
        .cs-swiper .swiper-wrapper { align-items: center; }
        .cs-slide { width: clamp(178px, 19vw, 236px); }
        .cs-card {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 16;
          border-radius: 20px;
          overflow: hidden;
          background: transparent;
        }
        .cs-card img { width: 100%; height: 100%; object-fit: cover; display: block; }

        @media (max-width: 560px) {
          .cs-slide { width: 46vw; }
        }
      `}</style>

      <h2 className="cs-heading">Our Valued Clients</h2>

      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        speed={700}
        coverflowEffect={{ rotate: 7, stretch: -40, depth: 190, modifier: 1.1, scale: 0.82, slideShadows: false }}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        onSwiper={(s) => {
          swiperRef.current = s;
          // Stay paused until the section scrolls into view.
          s.autoplay?.stop();
        }}
        className="cs-swiper"
      >
        {IMAGES.map((img) => (
          <SwiperSlide key={img.src} className="cs-slide">
            <div className="cs-card">
              <img loading="lazy" src={img.src} alt={img.alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
