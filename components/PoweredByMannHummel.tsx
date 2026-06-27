"use client";

// "Powered By MANN+HUMMEL" — dark-mode adaptation of the home page stats
// section, for the Technology page. Blue-gradient eyebrow to match the other
// Technology-page eyebrows. Self-contained: layout values are identical to the
// home page; only the section background and heading colors are dark-mode.
import { useEffect, useRef, useState } from "react";
import { Flag, Globe, Award, GraduationCap } from "lucide-react";

export default function PoweredByMannHummel() {
  return (
    <section className="pm" aria-label="Powered By MANN+HUMMEL">
      <style>{`
        .pm {
          --gutter: clamp(20px, 6vw, 88px);
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 11vh, 150px) 0;
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          text-align: center;
        }
        .pm-wrap { max-width: 1260px; margin: 0 auto; padding: 0 var(--gutter); }
        .pm-eyebrow {
          margin: 0 auto clamp(10px, 1.4vw, 16px);
          width: fit-content;
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600;
          letter-spacing: 0.01em;
          background: linear-gradient(90deg, rgb(116,198,251) 0%, rgb(96,209,241) 45%, rgb(41,151,255) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .pm-title {
          margin: 0 auto;
          max-width: none;
          white-space: nowrap;
          color: #f5f5f7;
          font-size: clamp(32px, 5.2vw, 76px);
          font-weight: 600;
          line-height: 1.07;
          letter-spacing: -0.02em;
        }
        .pm-sub {
          margin: clamp(18px, 2vw, 28px) auto 0;
          max-width: 52ch;
          color: #86868b;
          font-size: clamp(15px, 1.4vw, 19px);
          font-weight: 500;
          line-height: 1.45;
        }
        .pm-stats-row { display: grid; grid-template-columns: 1fr; gap: clamp(36px, 5vw, 64px); margin-top: clamp(40px, 5vw, 72px); text-align: left; }
        .pm-stats-media { border-radius: 20px; overflow: hidden; }
        .pm-stats-img { display: block; width: 100%; height: auto; border-radius: 20px; }
        .pm-ub { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left; }
        .pm-ub-col { display: flex; flex-direction: column; gap: 20px; }
        .pm-ub-card { position: relative; border-radius: 28px; overflow: hidden; background: #20CA9D; }
        .pm-ub-tall { height: clamp(330px, 41vw, 401px); }
        .pm-ub-short { height: clamp(196px, 25vw, 241px); display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: clamp(12px, 1.4vw, 18px); padding: clamp(24px, 3vw, 40px); }
        .pm-ub-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        /* frosted bottom: blurs only the lower part of the photo (masked fade),
           matching the original Apple stat-card look behind the text */
        .pm-ub-blur { position: absolute; inset: 0; z-index: 1; pointer-events: none; backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); -webkit-mask-image: linear-gradient(to top, #000 0%, #000 12%, rgba(0,0,0,0) 46%); mask-image: linear-gradient(to top, #000 0%, #000 12%, rgba(0,0,0,0) 46%); }
        .pm-ub-scrim { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 100%); }
        .pm-ub-inner { position: relative; z-index: 2; height: 100%; padding: clamp(28px, 3.4vw, 40px); display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; gap: clamp(12px, 1.4vw, 18px); }
        /* same box for every icon, sized to sit just under the number */
        .pm-ub-ic { width: clamp(32px, 3.4vw, 44px); height: clamp(32px, 3.4vw, 44px); flex: none; stroke: #ffffff; }
        .pm-ub-tall .pm-ub-ic { margin-top: auto; }
        .pm-ub-text { display: flex; flex-direction: column; }
        .pm-ub-num { margin: 0; font-weight: 600; line-height: 1; letter-spacing: -0.02em; font-size: clamp(38px, 4.8vw, 64px); color: #ffffff; }
        .pm-ub-label { margin: clamp(6px, 0.8vw, 10px) 0 0; font-weight: 500; font-size: clamp(15px, 1.4vw, 18px); color: rgba(245, 245, 247, 0.8); }

        @media (max-width: 860px) {
          .pm-title { white-space: normal; }
          .pm-stats-row { grid-template-columns: 1fr; }
          .pm-ub { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="pm-wrap">
        <p className="pm-eyebrow" data-reveal>Core technology</p>
        <h2 className="pm-title" data-reveal style={{ ["--ri" as string]: 1 }}>
          German filtration science,<br />in every unit.
        </h2>
        <p className="pm-sub" data-reveal style={{ ["--ri" as string]: 2 }}>MANN+HUMMEL media, engineered for India&rsquo;s air.</p>
        <div className="pm-stats-row">
          <div className="pm-stats-media" data-reveal><img className="pm-stats-img" src="/mhh.jpg" alt="" /></div>
          <div className="pm-ub">
            <div className="pm-ub-col">
              <article className="pm-ub-card pm-ub-tall" data-reveal style={{ ["--ri" as string]: 0 }}>
                <img className="pm-ub-photo" src="/h1.jpg" alt="" aria-hidden />
                <div className="pm-ub-blur" aria-hidden />
                <div className="pm-ub-scrim" aria-hidden />
                <div className="pm-ub-inner">
                  <Flag className="pm-ub-ic" strokeWidth={1.8} aria-hidden />
                  <div className="pm-ub-text">
                    <p className="pm-ub-num"><Counter to={1941} group={false} /></p>
                    <p className="pm-ub-label">Founded</p>
                  </div>
                </div>
              </article>
              <article className="pm-ub-card pm-ub-short" data-reveal style={{ background: "#20CA9D", ["--ri" as string]: 1 }}>
                <Globe className="pm-ub-ic" strokeWidth={1.8} aria-hidden />
                <div className="pm-ub-text">
                  <p className="pm-ub-num"><Counter to={80} suffix="+" /></p>
                  <p className="pm-ub-label">Countries</p>
                </div>
              </article>
            </div>
            <div className="pm-ub-col">
              <article className="pm-ub-card pm-ub-short" data-reveal style={{ background: "#0C6553", ["--ri" as string]: 2 }}>
                <Award className="pm-ub-ic" strokeWidth={1.8} aria-hidden />
                <div className="pm-ub-text">
                  <p className="pm-ub-num"><Counter to={4700} suffix="+" /></p>
                  <p className="pm-ub-label">Patents</p>
                </div>
              </article>
              <article className="pm-ub-card pm-ub-tall" data-reveal style={{ ["--ri" as string]: 3 }}>
                <img className="pm-ub-photo" src="/h2.jpg" alt="" aria-hidden />
                <div className="pm-ub-blur" aria-hidden />
                <div className="pm-ub-scrim" aria-hidden />
                <div className="pm-ub-inner">
                  <GraduationCap className="pm-ub-ic" strokeWidth={1.8} aria-hidden />
                  <div className="pm-ub-text">
                    <p className="pm-ub-num"><Counter to={60} suffix="+" /></p>
                    <p className="pm-ub-label">University partnerships</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({
  to,
  suffix = "",
  group = true,
  duration = 1500,
}: {
  to: number;
  suffix?: string;
  group?: boolean;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          let startTime = 0;
          const tick = (now: number) => {
            if (!startTime) startTime = now;
            const p = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {group ? val.toLocaleString("en-US") : String(val)}
      {suffix}
    </span>
  );
}
