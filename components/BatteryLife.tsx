"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useInView } from "@/lib/useInView";

// "Battery life. All-time high." — Figma node 707:4416.
// Black section: heading + paragraph top-left, a full-bleed image of a hand
// holding iPhone (Silo on Apple TV), and three orange stat columns at the bottom.
// Copy kept verbatim from the Figma design.

type Stat = { up: string; big: ReactNode; desc: ReactNode };

const DEFAULT_STATS: Stat[] = [
  {
    up: "Up to",
    big: "33 hours",
    desc: (
      <>
        video playback on iPhone 17 Pro<span className="bl-fn">11</span>
      </>
    ),
  },
  {
    up: "Up to",
    big: "39 hours",
    desc: (
      <>
        video playback on iPhone 17 Pro Max<span className="bl-fn">11</span>
      </>
    ),
  },
  {
    up: "Up to",
    big: (
      <>
        50% charge
        <br />
        in 20 minutes
      </>
    ),
    desc: (
      <>
        with high‑wattage power adapter<span className="bl-fn">12</span>
      </>
    ),
  },
];

export default function BatteryLife({
  title,
  text,
  stats,
  centerStats = false,
  link,
  media,
}: {
  title?: ReactNode;
  text?: ReactNode;
  stats?: Stat[];
  centerStats?: boolean;
  link?: { label: string; href: string };
  media?: ReactNode;
} = {}) {
  const { ref, inView } = useInView<HTMLElement>();
  const items = stats ?? DEFAULT_STATS;
  return (
    <section
      ref={ref}
      className={`bl ${inView ? "is-in" : ""}`}
      aria-label="Battery life. All-time high."
    >
      <style>{`
        .bl {
          --gutter: clamp(20px, 6vw, 88px);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(96px, 18vh, 240px) 0 clamp(64px, 8vh, 100px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .bl-wrap {
          max-width: 1260px;
          margin: 0 auto;
          padding: 0 var(--gutter);
        }
        .bl-copy { max-width: 525px; }
        .bl-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(34px, 4.4vw, 56px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.005em;
        }
        .bl-text {
          margin: clamp(14px, 1.4vw, 17px) 0 0;
          color: #86868b;
          font-size: clamp(17px, 1.5vw, 21px);
          font-weight: 600;
          line-height: 1.38;
          letter-spacing: 0.011em;
        }
        .bl-text b { color: #f5f5f7; font-weight: 600; }
        .bl-fn {
          text-decoration: underline;
          text-decoration-thickness: from-font;
          text-underline-position: from-font;
        }

        .bl-media {
          width: 100vw;
          margin: clamp(24px, 3vw, 40px) 0 0;
          height: clamp(380px, 50vw, 760px);
          overflow: hidden;
        }
        .bl-media img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .bl-stats {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(28px, 3vw, 34px);
          padding-left: clamp(0px, 8vw, 105px);
          margin-top: clamp(32px, 4vw, 60px);
        }
        .bl-stats--center {
          justify-content: center;
          padding-left: 0;
        }
        .bl-link-wrap { text-align: center; margin-top: clamp(36px, 5vw, 60px); }
        .bl-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #2997ff;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .bl-link:hover { color: #4aa8ff; }
        .bl-link span { display: inline-block; transition: transform 200ms ease; }
        .bl-link:hover span { transform: translateX(3px); }
        .bl-stat {
          width: 233px;
          max-width: 100%;
          color: #86868b;
        }
        .bl-stat-up {
          margin: 0;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.47;
          letter-spacing: -0.022em;
          color: #86868b;
        }
        .bl-stat-big {
          margin: 0;
          color: #ff791b;
          font-size: 28px;
          font-weight: 600;
          line-height: 1.143;
          letter-spacing: 0.007em;
        }
        .bl-stat-desc {
          margin: 0;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.47;
          letter-spacing: -0.022em;
          color: #86868b;
        }

        @media (max-width: 600px) {
          .bl-stat { width: 100%; }
        }
      `}</style>

      <div className="bl-wrap">
        <div className="bl-copy" data-reveal>
          <h2 className="bl-title">
            {title ?? (
              <>
                Battery life.
                <br />
                All-time high.
              </>
            )}
          </h2>
          <p className="bl-text">
            {text ?? (
              <>
                The new internal design creates significant additional room for
                battery capacity, giving iPhone 17 Pro Max the{" "}
                <b>best-ever iPhone battery life,</b>
                <b className="bl-fn">11</b> and up to 4 more hours per full charge
                compared to iPhone 15 Pro Max. From extended video playback to
                after-hours work, it’s always ready for overtime.
              </>
            )}
          </p>
        </div>
      </div>

      {media ? (
        <div className="bl-wrap">
          <div data-reveal style={{ ["--ri" as string]: 1 }}>{media}</div>
        </div>
      ) : (
        <div className="bl-media" data-reveal style={{ ["--ri" as string]: 1 }}>
          <img loading="lazy"
            src="/bl-silo.jpg"
            alt="A hand holding iPhone 17 Pro displaying the Apple TV series Silo"
          />
        </div>
      )}

      <div className="bl-wrap">
        <div className={`bl-stats ${centerStats ? "bl-stats--center" : ""}`}>
          {items.map((s, i) => (
            <div
              className="bl-stat"
              key={i}
              data-reveal
              style={{ ["--ri" as string]: i + 2 }}
            >
              <p className="bl-stat-up">{s.up}</p>
              <p className="bl-stat-big">{s.big}</p>
              <p className="bl-stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        {link ? (
          <div className="bl-link-wrap" data-reveal>
            <Link className="bl-link" href={link.href}>
              {link.label} <span aria-hidden>→</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
