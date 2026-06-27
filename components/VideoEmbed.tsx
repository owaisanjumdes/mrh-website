"use client";

import { useEffect, useRef } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

// YouTube embed that:
//  - auto-plays (muted) when it scrolls into view,
//  - pauses when it leaves the viewport,
//  - resumes from where it left off when scrolled back,
//  - starts from the beginning on a fresh mount (page reload / new navigation),
//    since the component remounts and loads a fresh iframe at 0.
// Control is via the YouTube iframe JS API (enablejsapi=1) over postMessage.
export default function VideoEmbed({
  id,
  title = "Video",
}: {
  id: string;
  title?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const activated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const command = (func: string) => {
      const iframe = el.querySelector("iframe");
      iframe?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "*"
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting;
        if (inView) {
          if (!activated.current) {
            // First time in view: activate the lite embed, which swaps in the
            // iframe and autoplays from the start.
            activated.current = true;
            el.querySelector<HTMLElement>(".yt-lite")?.click();
          } else {
            // Returning to view: resume from where it paused.
            command("playVideo");
          }
        } else if (activated.current) {
          command("pauseVideo");
        }
      },
      { threshold: 0.3 }
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
      <LiteYouTubeEmbed
        id={id}
        title={title}
        params="enablejsapi=1&mute=1&playsinline=1"
      />
    </div>
  );
}
