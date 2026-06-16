import Link from "next/link";

// Footer — Figma node 665:2907. Black, newsletter + link columns, divider,
// copyright/legal row, and an oversized "MRH by OK Play" wordmark.

const EXPLORE = [
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "Impact", href: "/impact" },
  { label: "Case Studies", href: "/case-studies" },
];

const PRODUCTS = [
  { label: "PureAir", href: "/products" },
  { label: "AirFINEry", href: "/products" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookies Settings", href: "/cookies" },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "#",
    path: "M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2V14h2.3v7h3z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM20 8.2c-.1-1.5-.4-2.8-1.5-3.9C17.4 3.2 16.1 2.9 14.6 2.8 13.1 2.7 8.9 2.7 7.4 2.8 5.9 2.9 4.6 3.2 3.5 4.3 2.4 5.4 2.1 6.7 2 8.2c-.1 1.5-.1 5.7 0 7.2.1 1.5.4 2.8 1.5 3.9 1.1 1.1 2.4 1.4 3.9 1.5 1.5.1 5.7.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5 1.1-1.1 1.4-2.4 1.5-3.9.1-1.5.1-5.7 0-7.2zm-2 8.8a3 3 0 0 1-1.7 1.7c-1.2.5-3.9.4-5.2.4s-4.1.1-5.2-.4A3 3 0 0 1 4.2 17c-.5-1.2-.4-3.9-.4-5.2s-.1-4.1.4-5.2A3 3 0 0 1 5.9 4.9c1.2-.5 3.9-.4 5.2-.4s4.1-.1 5.2.4A3 3 0 0 1 18 6.6c.5 1.2.4 3.9.4 5.2s.1 4.1-.4 5.2z",
  },
  {
    label: "Twitter",
    href: "#",
    path: "M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21H2.5l7-8L2.6 3h6.1l4.3 5.6L17.5 3zm-1 16h1.6L7.6 4.7H5.9L16.5 19z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.9 8.3H3.8V21h3.1V8.3zM5.3 3.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM21 13.9c0-3-1.6-4.4-3.8-4.4-1.7 0-2.5.9-3 1.6V8.3H11V21h3.1v-6.7c0-.4 0-.7.1-1 .3-.6.8-1.3 1.8-1.3 1.3 0 1.8 1 1.8 2.4V21H21v-7.1z",
  },
];

export default function SiteFooter() {
  return (
    <footer className="ft">
      <style>{`
        .ft {
          background: #000000;
          color: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          padding-top: clamp(56px, 8vh, 104px);
          overflow: hidden;
        }
        .ft-inner {
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 64px);
        }
        .ft-top {
          display: grid;
          grid-template-columns: 1.7fr 1fr 1fr 1.2fr;
          gap: clamp(32px, 4vw, 64px);
          align-items: start;
        }
        .ft-brand-logo { height: clamp(26px, 2.4vw, 34px); width: auto; display: block; margin-bottom: clamp(18px, 2vw, 26px); }
        .ft-news-text { margin: 0 0 clamp(16px, 2vw, 22px); font-size: clamp(14px, 1.05vw, 16px); line-height: 1.5; color: rgba(255,255,255,0.7); max-width: 460px; }
        .ft-form { display: flex; gap: 10px; max-width: 460px; }
        .ft-input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 8px;
          padding: 12px 14px;
          color: #ffffff;
          font: inherit;
          font-size: 15px;
        }
        .ft-input::placeholder { color: rgba(255,255,255,0.45); }
        .ft-input:focus { outline: none; border-color: rgba(255,255,255,0.5); }
        .ft-submit {
          flex: none;
          background: #148042;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 12px 22px;
          font: inherit;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background 200ms ease;
        }
        .ft-submit:hover { background: #0f6a36; }
        .ft-fine { margin: clamp(14px, 1.6vw, 18px) 0 0; font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.4); max-width: 460px; }
        .ft-col-h { margin: 0 0 clamp(16px, 1.8vw, 22px); font-size: clamp(14px, 1.05vw, 16px); font-weight: 600; color: #ffffff; }
        .ft-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: clamp(10px, 1.2vw, 14px); }
        .ft-link { color: rgba(255,255,255,0.6); text-decoration: none; font-size: clamp(14px, 1.05vw, 15px); transition: color 180ms ease; }
        .ft-link:hover { color: #ffffff; }
        .ft-social { display: inline-flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.6); text-decoration: none; transition: color 180ms ease; }
        .ft-social:hover { color: #ffffff; }
        .ft-social svg { width: 22px; height: 22px; flex: none; }
        .ft-divider { height: 1px; background: rgba(255,255,255,0.15); margin: clamp(40px, 5vw, 72px) 0 clamp(20px, 2.4vw, 32px); }
        .ft-bottom { display: flex; flex-wrap: wrap; gap: 16px 32px; justify-content: space-between; align-items: center; }
        .ft-copy { margin: 0; font-size: 13px; color: rgba(255,255,255,0.5); }
        .ft-legal { display: flex; flex-wrap: wrap; gap: 12px 28px; }
        .ft-wordmark {
          margin: clamp(32px, 4vw, 56px) 0 0;
          font-size: clamp(40px, 11vw, 150px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1;
          white-space: nowrap;
          color: #ffffff;
        }
        @media (max-width: 900px) {
          .ft-top { grid-template-columns: 1fr 1fr; gap: clamp(28px, 6vw, 48px); }
          .ft-news { grid-column: 1 / -1; }
        }
        @media (max-width: 540px) {
          .ft-top { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ft-inner">
        <div className="ft-top">
          {/* Newsletter */}
          <div className="ft-news">
            <img src="/MRH Logo.png" alt="MRH" className="ft-brand-logo" />
            <p className="ft-news-text">
              Join our newsletter to stay up to date on features and releases.
            </p>
            <div className="ft-form">
              <input
                className="ft-input"
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button type="button" className="ft-submit">
                Subscribe
              </button>
            </div>
            <p className="ft-fine">
              By subscribing you agree to our Privacy Policy and provide consent
              to receive updates from our company.
            </p>
          </div>

          {/* Explore */}
          <div className="ft-col">
            <p className="ft-col-h">Explore</p>
            <ul>
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="ft-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="ft-col">
            <p className="ft-col-h">Products</p>
            <ul>
              {PRODUCTS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="ft-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="ft-col">
            <p className="ft-col-h">Follow Us</p>
            <ul>
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="ft-social" aria-label={s.label}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={s.path} />
                    </svg>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ft-divider" />

        <div className="ft-bottom">
          <p className="ft-copy">Copyright MRH. All rights reserved. 2026</p>
          <div className="ft-legal">
            {LEGAL.map((l) => (
              <Link key={l.label} href={l.href} className="ft-link">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="ft-wordmark">MRH by OK Play®</p>
      </div>
    </footer>
  );
}
