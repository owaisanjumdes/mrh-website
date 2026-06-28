import { type ReactNode } from "react";

// "There's never been a better time to upgrade." — Figma node 756:9503.
// Heading swapped to "IoT Connected Monitoring". A dropdown switches between four
// bento panels (each: left = [tall, short], right = [short, tall]) plus a trade-in
// footer. Copy kept verbatim from the Figma design.

const GRAD = "linear-gradient(90deg, rgb(53,169,138) 0%, rgb(109,212,0) 100%)";

const Fn = ({ children }: { children: ReactNode }) => (
  <span className="ub-fn">{children}</span>
);
const Grad = ({ children }: { children: ReactNode }) => (
  <span className="ub-grad" style={{ backgroundImage: GRAD }}>
    {children}
  </span>
);
const Muted = ({ children }: { children: ReactNode }) => (
  <span className="ub-muted">{children}</span>
);

type Card =
  | { kind: "image"; photo: string; icon: string; text: ReactNode }
  | { kind: "battery"; icon: string; text: ReactNode }
  | { kind: "icon"; icon: string; text: ReactNode };

type Panel = {
  option: string;
  subtitle: ReactNode;
  leftTop: Card;
  leftBottom: Card;
  rightTop: Card;
  rightBottom: Card;
};

const sub = (model: string) => (
  <>
    Here’s what you get with the <b>{model}</b>
  </>
);

const PANELS: Panel[] = [
  {
    option: "MacBook Pro 13″ with M1",
    subtitle: sub("14‑inch MacBook Pro with M5."),
    leftTop: {
      kind: "image",
      photo: "/ub-photo-d.jpg",
      icon: "/ub-ic-ai74.png",
      text: <>Fly through demanding AI tasks up to 6x faster.<Fn>1</Fn></>,
    },
    leftBottom: {
      kind: "icon",
      icon: "/ub-ic-ports2.png",
      text: <>More ports and faster charging.</>,
    },
    rightTop: {
      kind: "icon",
      icon: "/ub-ic-gamepad.png",
      text: <>More detailed graphics and gaming with hardware-accelerated ray tracing.</>,
    },
    rightBottom: {
      kind: "image",
      photo: "/ub-photo-e.jpg",
      icon: "/ub-ic-display2.png",
      text: <>Liquid Retina XDR display with 1600 nits peak HDR brightness.<Fn>2</Fn></>,
    },
  },
  {
    option: "MacBook Pro (Intel)",
    subtitle: sub("14‑inch MacBook Pro with M5."),
    leftTop: {
      kind: "image",
      photo: "/ub-photo-a.jpg",
      icon: "/ub-ic-ai74.png",
      text: <>Fly through demanding AI tasks up to 86x faster.<Fn>3</Fn></>,
    },
    leftBottom: {
      kind: "icon",
      icon: "/ub-ic-display1.png",
      text: <>Liquid Retina XDR display with 1600 nits peak HDR brightness.<Fn>2</Fn></>,
    },
    rightTop: {
      kind: "icon",
      icon: "/ub-ic-chip.png",
      text: <>Built for AI, featuring Neural Accelerators in the GPU.</>,
    },
    rightBottom: {
      kind: "battery",
      icon: "/ub-ic-battery.png",
      text: (
        <>
          Up to <Grad>14 more hours</Grad> battery life.<Fn>4</Fn>{" "}
          <Muted>(Up to 24 hours total.)</Muted>
          <Fn>5</Fn>
        </>
      ),
    },
  },
  {
    option: "MacBook Pro 16″ with M1 Pro",
    subtitle: sub("new 16‑inch MacBook Pro with M5 Pro or M5 Max."),
    leftTop: {
      kind: "image",
      photo: "/ub-photo-c.jpg",
      icon: "/ub-ic-ai106.png",
      text: <>Fly through demanding AI tasks up to 7.8x faster.<Fn>8</Fn></>,
    },
    leftBottom: {
      kind: "icon",
      icon: "/ub-ic-gamepad.png",
      text: <>More detailed graphics and gaming with hardware-accelerated ray tracing.</>,
    },
    rightTop: {
      kind: "icon",
      icon: "/ub-ic-chip.png",
      text: <>Powerful Neural Accelerators for next-level, on-device AI.</>,
    },
    rightBottom: {
      kind: "battery",
      icon: "/ub-ic-battery.png",
      text: (
        <>
          Up to <Grad>3 more hours</Grad> battery life.<Fn>4</Fn>{" "}
          <Muted>(Up to 24 hours of video streaming.)</Muted>
          <Fn>7</Fn>
        </>
      ),
    },
  },
  {
    option: "MacBook Pro 16″ with M1 Max",
    subtitle: sub("new 16‑inch MacBook Pro with M5 Pro or M5 Max."),
    leftTop: {
      kind: "image",
      photo: "/ub-photo-b.jpg",
      icon: "/ub-ic-display2.png",
      text: <>Liquid Retina XDR display with 1600 nits peak HDR brightness.<Fn>2</Fn></>,
    },
    leftBottom: {
      kind: "icon",
      icon: "/ub-ic-ports1.png",
      text: <>HDMI, Thunderbolt 5, SDXC, MagSafe, Wi‑Fi 7,<Fn>6</Fn> and Bluetooth 6.</>,
    },
    rightTop: {
      kind: "icon",
      icon: "/ub-ic-chip.png",
      text: <>Built for AI, featuring Neural Accelerators in the GPU.</>,
    },
    rightBottom: {
      kind: "battery",
      icon: "/ub-ic-battery.png",
      text: (
        <>
          <Grad>Up to 13 more hours</Grad> battery life.<Fn>4</Fn>{" "}
          <Muted>(Up to 24 hours of video streaming.)</Muted>
          <Fn>7</Fn>
        </>
      ),
    },
  },
];

function CardView({ card }: { card: Card }) {
  if (card.kind === "icon") {
    return (
      <div className="ub-card ub-short">
        <img loading="lazy" className="ub-card-icon" src={card.icon} alt="" aria-hidden />
        <p className="ub-card-text ub-text-sm">{card.text}</p>
      </div>
    );
  }
  // image / battery — tall, icon top + heading bottom
  return (
    <div className={`ub-card ub-tall ${card.kind === "image" ? "ub-card--photo" : ""}`}>
      {card.kind === "image" ? (
        <img loading="lazy" className="ub-card-bg" src={card.photo} alt="" aria-hidden />
      ) : null}
      <div className="ub-card-inner">
        <img loading="lazy" className="ub-card-icon" src={card.icon} alt="" aria-hidden />
        <p className="ub-card-text ub-text-lg">{card.text}</p>
      </div>
    </div>
  );
}

export default function UpgradeBento() {
  const p = PANELS[0];

  return (
    <section className="ub" aria-label="IoT Connected Monitoring">
      <style>{`
        .ub {
          background: #000000;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(96px, 14vh, 144px) clamp(20px, 6vw, 88px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
        }
        .ub-inner { max-width: 980px; margin: 0 auto; }
        .ub-title {
          margin: 0;
          color: #f5f5f7;
          font-size: clamp(40px, 8vw, 80px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.015em;
          text-align: center;
        }

        .ub-select-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: clamp(32px, 5vw, 50px);
        }
        .ub-select-label {
          margin: 0;
          color: #86868b;
          font-size: clamp(17px, 1.6vw, 21px);
          font-weight: 600;
          line-height: 1.19;
          letter-spacing: 0.011em;
        }
        .ub-select {
          position: relative;
          margin-top: 20px;
          width: min(416px, 100%);
        }
        .ub-select select {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          height: 42px;
          padding: 0 44px 0 22px;
          border-radius: 210px;
          background: #000000;
          border: 0.8px solid #86868b;
          color: #f5f5f7;
          font-family: inherit;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          text-align-last: center;
          cursor: pointer;
        }
        .ub-select::after {
          content: "";
          position: absolute;
          right: 22px;
          top: 50%;
          width: 9px;
          height: 9px;
          border-right: 2px solid #f5f5f7;
          border-bottom: 2px solid #f5f5f7;
          transform: translateY(-65%) rotate(45deg);
          pointer-events: none;
        }

        .ub-subtitle {
          margin: clamp(48px, 6vw, 64px) 0 0;
          color: #86868b;
          font-size: clamp(21px, 2.4vw, 28px);
          font-weight: 600;
          line-height: 1.14;
          letter-spacing: 0.007em;
          text-align: center;
        }
        .ub-subtitle b { color: #f5f5f7; font-weight: 600; }

        .ub-grid {
          margin-top: clamp(28px, 3vw, 40px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .ub-col { display: flex; flex-direction: column; gap: 20px; }

        .ub-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: #1d1d1f;
        }
        .ub-tall { height: clamp(330px, 41vw, 401px); }
        .ub-short { height: clamp(196px, 25vw, 241px); }
        .ub-card-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .ub-card-inner {
          position: relative;
          z-index: 1;
          height: 100%;
          padding: clamp(28px, 3.4vw, 40px);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 24px;
        }
        .ub-card--photo .ub-card-inner { justify-content: flex-end; }
        .ub-short {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: clamp(24px, 3vw, 40px);
        }
        .ub-card-icon {
          display: block;
          height: clamp(56px, 7vw, 90px);
          width: auto;
          flex: none;
          object-fit: contain;
        }
        .ub-tall .ub-card-icon { align-self: flex-start; margin-top: auto; }
        .ub-card-text {
          margin: 0;
          color: #f5f5f7;
          font-weight: 600;
          letter-spacing: 0.007em;
        }
        .ub-text-lg { font-size: clamp(28px, 3.4vw, 40px); line-height: 1.1; }
        .ub-text-sm { font-size: clamp(20px, 2.4vw, 28px); line-height: 1.14; }
        .ub-grad {
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .ub-muted { color: #86868b; }
        .ub-fn {
          text-decoration: underline;
          text-decoration-thickness: from-font;
        }

        .ub-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-top: clamp(48px, 6vw, 80px);
          flex-wrap: wrap;
        }
        .ub-tradein { height: 32px; width: auto; display: block; }
        .ub-footer-div {
          width: 0.8px;
          height: 64px;
          background: #86868b;
        }
        .ub-footer-text { max-width: 576px; }
        .ub-footer-text p {
          margin: 0;
          color: #f5f5f7;
          font-size: 17px;
          line-height: 1.47;
          letter-spacing: -0.022em;
        }
        .ub-footer-link {
          display: inline-block;
          margin-top: 12px;
          color: #2997ff;
          font-size: 17px;
          text-decoration: none;
        }
        .ub-footer-link:hover { text-decoration: underline; }

        @media (max-width: 760px) {
          .ub-grid { grid-template-columns: 1fr; }
          .ub-footer { flex-direction: column; }
          .ub-footer-div { display: none; }
        }
      `}</style>

      <div className="ub-inner">
        <h2 className="ub-title" data-reveal>IoT Connected Monitoring</h2>

        <p className="ub-subtitle" data-reveal style={{ ["--ri" as string]: 1 }}>
          {p.subtitle}
        </p>

        <div className="ub-grid" data-reveal style={{ ["--ri" as string]: 3 }}>
          <div className="ub-col">
            <CardView card={p.leftTop} />
            <CardView card={p.leftBottom} />
          </div>
          <div className="ub-col">
            <CardView card={p.rightTop} />
            <CardView card={p.rightBottom} />
          </div>
        </div>

        <div className="ub-footer" data-reveal>
          <img loading="lazy" className="ub-tradein" src="/ub-tradein.jpg" alt="Apple Trade In" />
          <span className="ub-footer-div" aria-hidden />
          <div className="ub-footer-text">
            <p>
              Get credit toward a new MacBook Pro when you trade in an eligible
              device.<span className="ub-fn">9</span>
            </p>
            <a className="ub-footer-link" href="#">
              See what your device is worth ›
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
