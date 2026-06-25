"use client";

import { useEffect, useRef } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

// Lightweight YouTube embed. Auto-activates (muted autoplay) once it scrolls into
// view, so the user never has to press play. Styled to the site's tokens:
// rounded 22px corners, no drop shadow, full container width.
export default function VideoEmbed({
  id,
  title = "Video",
}: {
  id: string;
  title?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          // Activate the lite embed: this swaps the poster for the real iframe,
          // which loads with autoplay=1 (muted, via params) so it starts on its own.
          const wrap = el.querySelector<HTMLElement>(".yt-lite");
          wrap?.click();
          io.disconnect();
        }
      },
      // Fire ~one screen early (extend the root's bottom edge down) so the iframe
      // has already loaded and is playing by the time the section is in view.
      { threshold: 0, rootMargin: "0px 0px 900px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="ve" ref={ref}>
      <style>{`
        .ve { width: 100%; }
        .ve .yt-lite {
          border-radius: 22px;
          box-shadow: none;
          overflow: hidden;
        }
      `}</style>
      <LiteYouTubeEmbed id={id} title={title} params="mute=1&playsinline=1" />
    </div>
  );
}
