import Link from "next/link";
import { Mail, Phone } from "lucide-react";

// Footer — contact-details layout: a heading, a row of contact cards, link
// columns, social icons, then a legal/copyright bar. Themed via CSS variables;
// pass `light` for the light surface (home / validation), default is dark
// (product / technology / about pages).

const CONTACTS = [
  {
    title: "General Inquiries",
    desc: "Email us, we'll get back to you as soon as possible.",
    icon: "mail" as const,
    value: "info@mrhtech.in",
    href: "mailto:info@mrhtech.in",
  },
  {
    title: "Sales Support",
    desc: "Speak with our experts for a free consultation.",
    icon: "phone" as const,
    value: "+91 9996-999-260",
    href: "tel:+919996999260",
  },
  {
    title: "WhatsApp Support",
    desc: "Message us anytime, we usually reply within minutes.",
    icon: "whatsapp" as const,
    value: "Chat on WhatsApp",
    href: "https://wa.me/919996999260",
  },
];

const COLUMNS = [
  {
    head: "Products",
    links: [
      { label: "All Products", href: "/products" },
      { label: "PureAir", href: "/products/pureair" },
      { label: "AirFINEry", href: "/products/airfinery" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "Our Technology", href: "/technology" },
      { label: "IIT Delhi Validation", href: "/validation" },
      { label: "Projects", href: "/projects" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    head: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "#",
    path: "M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2V14h2.3v7h3z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23 12s0-3.5-.4-5.2c-.3-1-.9-1.7-1.9-2C19 4.5 12 4.5 12 4.5s-7 0-8.7.3c-1 .3-1.6 1-1.9 2C1 8.5 1 12 1 12s0 3.5.4 5.2c.3 1 .9 1.7 1.9 2 1.7.3 8.7.3 8.7.3s7 0 8.7-.3c1-.3 1.6-1 1.9-2 .4-1.7.4-5.2.4-5.2zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM20 8.2c-.1-1.5-.4-2.8-1.5-3.9C17.4 3.2 16.1 2.9 14.6 2.8 13.1 2.7 8.9 2.7 7.4 2.8 5.9 2.9 4.6 3.2 3.5 4.3 2.4 5.4 2.1 6.7 2 8.2c-.1 1.5-.1 5.7 0 7.2.1 1.5.4 2.8 1.5 3.9 1.1 1.1 2.4 1.4 3.9 1.5 1.5.1 5.7.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5 1.1-1.1 1.4-2.4 1.5-3.9.1-1.5.1-5.7 0-7.2zm-2 8.8a3 3 0 0 1-1.7 1.7c-1.2.5-3.9.4-5.2.4s-4.1.1-5.2-.4A3 3 0 0 1 4.2 17c-.5-1.2-.4-3.9-.4-5.2s-.1-4.1.4-5.2A3 3 0 0 1 5.9 4.9c1.2-.5 3.9-.4 5.2-.4s4.1-.1 5.2.4A3 3 0 0 1 18 6.6c.5 1.2.4 3.9.4 5.2s.1 4.1-.4 5.2z",
  },
  {
    label: "X",
    href: "#",
    path: "M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21H2.5l7-8L2.6 3h6.1l4.3 5.6L17.5 3zm-1 16h1.6L7.6 4.7H5.9L16.5 19z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M6.9 8.3H3.8V21h3.1V8.3zM5.3 3.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM21 13.9c0-3-1.6-4.4-3.8-4.4-1.7 0-2.5.9-3 1.6V8.3H11V21h3.1v-6.7c0-.4 0-.7.1-1 .3-.6.8-1.3 1.8-1.3 1.3 0 1.8 1 1.8 2.4V21H21v-7.1z",
  },
];

const WHATSAPP_PATH =
  "M12 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.8 4.9-1.3A9.9 9.9 0 1 0 12 2zm0 1.8a8.1 8.1 0 0 1 6.9 12.4l-.2.3.8 2.9-3-.8-.3.2A8.1 8.1 0 1 1 12 3.8zm-2.8 3.6c-.2 0-.5 0-.7.4-.2.4-.9.9-.9 2.2s.9 2.6 1 2.8c.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.1-.7.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.8-2.4-1.9-.2-.3 0-.4.1-.6l.5-.6c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4z";

function CardIcon({ kind }: { kind: "mail" | "phone" | "whatsapp" }) {
  if (kind === "mail") return <Mail size={18} strokeWidth={1.9} aria-hidden />;
  if (kind === "phone") return <Phone size={18} strokeWidth={1.9} aria-hidden />;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} aria-hidden>
      <path d={WHATSAPP_PATH} />
    </svg>
  );
}

export default function SiteFooter({ light = false }: { light?: boolean } = {}) {
  return (
    <footer className={`ft ${light ? "ft--light" : ""}`}>
      <style>{`
        .ft {
          /* dark theme (default) */
          --ft-bg: #000000;
          --ft-fg: #ffffff;
          --ft-heading: #ffffff;
          --ft-desc: rgba(255,255,255,0.62);
          --ft-link: rgba(255,255,255,0.68);
          --ft-colhead: rgba(255,255,255,0.5);
          --ft-copy: rgba(255,255,255,0.5);
          --ft-social: rgba(255,255,255,0.7);
          --ft-divider: rgba(255,255,255,0.14);
          --ft-topline: rgba(255,255,255,0.1);
          --ft-card-bg: #161618;
          --ft-card-border: rgba(255,255,255,0.09);
          --ft-card-shadow: none;
          --ft-card-shadow-hover: 0 20px 44px -22px rgba(0,0,0,0.7);
          --ft-pill-bg: rgba(255,255,255,0.03);
          --ft-pill-border: rgba(255,255,255,0.2);
          --ft-pill-hover: rgba(255,255,255,0.07);
          --ft-accent: #30d158;
          background: var(--ft-bg);
          color: var(--ft-fg);
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          border-top: 1px solid var(--ft-topline);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          padding: clamp(48px, 7vh, 88px) 0 clamp(28px, 3.4vw, 40px);
        }
        .ft--light {
          --ft-bg: #ffffff;
          --ft-fg: #1d1d1f;
          --ft-heading: #1d1d1f;
          --ft-desc: #6e6e73;
          --ft-link: #515154;
          --ft-colhead: #86868b;
          --ft-copy: #86868b;
          --ft-social: #6e6e73;
          --ft-divider: rgba(0,0,0,0.1);
          --ft-topline: rgba(0,0,0,0.08);
          --ft-card-bg: #f2f2f4;
          --ft-card-border: rgba(0,0,0,0.05);
          --ft-card-shadow: none;
          --ft-card-shadow-hover: 0 12px 30px -18px rgba(0,0,0,0.16);
          --ft-pill-bg: #ffffff;
          --ft-pill-border: rgba(0,0,0,0.12);
          --ft-pill-hover: #f2faf5;
          --ft-accent: #1a8f3c;
        }
        .ft-inner { max-width: 1340px; margin: 0 auto; padding: 0 clamp(24px, 5vw, 64px); }
        .ft-logo { height: clamp(24px, 2.2vw, 32px); width: auto; display: block; margin-bottom: clamp(22px, 2.6vw, 34px); }
        .ft--light .ft-logo-mh { filter: none; }
        .ft-heading { margin: 0 0 clamp(22px, 3vw, 34px); font-size: clamp(20px, 2.1vw, 27px); font-weight: 600; letter-spacing: -0.02em; color: var(--ft-heading); }

        /* contact cards */
        .ft-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 1.5vw, 20px); margin-bottom: clamp(40px, 5vw, 68px); }
        .ft-card { display: flex; flex-direction: column; background: var(--ft-card-bg); border: 1px solid var(--ft-card-border); border-radius: 18px; padding: clamp(20px, 2vw, 28px); min-height: clamp(150px, 15vw, 178px); box-shadow: var(--ft-card-shadow); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .ft-card:hover { transform: translateY(-3px); box-shadow: var(--ft-card-shadow-hover); }
        .ft-card-title { margin: 0 0 7px; font-size: clamp(16px, 1.4vw, 18px); font-weight: 600; letter-spacing: -0.01em; color: var(--ft-heading); }
        .ft-card-desc { margin: 0 0 clamp(18px, 2vw, 24px); font-size: 14px; line-height: 1.45; color: var(--ft-desc); max-width: 30ch; }
        .ft-card-action { margin-top: auto; align-self: flex-start; display: inline-flex; align-items: center; gap: 10px; padding: 11px 16px; border: 1px solid var(--ft-pill-border); border-radius: 12px; background: var(--ft-pill-bg); color: var(--ft-fg); font-size: 14px; font-weight: 500; text-decoration: none; transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease; }
        .ft-card-action:hover { border-color: var(--ft-accent); background: var(--ft-pill-hover); }
        .ft-card-action svg { color: var(--ft-accent); flex: none; display: block; }

        /* link columns */
        .ft-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(24px, 3vw, 40px); }
        .ft-colhead { margin: 0 0 clamp(16px, 1.8vw, 22px); font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ft-colhead); }
        .ft-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: clamp(11px, 1.2vw, 15px); }
        .ft-link { color: var(--ft-link); text-decoration: none; font-size: clamp(14px, 1.05vw, 15px); transition: color 0.18s ease; }
        .ft-link:hover { color: var(--ft-accent); }

        /* social */
        .ft-social-row { display: flex; align-items: center; gap: clamp(18px, 2.2vw, 28px); margin-top: clamp(42px, 5vw, 68px); }
        .ft-social { color: var(--ft-social); transition: color 0.18s ease, transform 0.18s ease; }
        .ft-social:hover { color: var(--ft-accent); transform: translateY(-2px); }
        .ft-social svg { width: 22px; height: 22px; display: block; }

        .ft-divider { height: 1px; background: var(--ft-divider); margin: clamp(34px, 4vw, 52px) 0 clamp(20px, 2.4vw, 28px); }
        .ft-bottom { display: flex; flex-wrap: wrap; gap: 14px 32px; justify-content: space-between; align-items: center; }
        .ft-copy { margin: 0; font-size: 13px; line-height: 1.5; color: var(--ft-copy); max-width: 60ch; }
        .ft-legal { display: flex; flex-wrap: wrap; gap: 12px 28px; }
        .ft-legal .ft-link { font-size: 13px; }

        @media (max-width: 900px) {
          .ft-cards { grid-template-columns: 1fr 1fr; }
          .ft-cols { grid-template-columns: 1fr 1fr; gap: clamp(24px, 5vw, 40px); }
        }
        @media (max-width: 560px) {
          .ft-cards { grid-template-columns: 1fr; }
          .ft-cols { grid-template-columns: 1fr; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="ft-inner">
        <img
          loading="lazy"
          src={light ? "/mrh-blacklogo.png" : "/mrh-logo.png"}
          alt="MRH"
          className="ft-logo"
        />
        <h2 className="ft-heading">Contact Details for MRH</h2>

        <div className="ft-cards">
          {CONTACTS.map((c) => (
            <div className="ft-card" key={c.title}>
              <h3 className="ft-card-title">{c.title}</h3>
              <p className="ft-card-desc">{c.desc}</p>
              <a
                className="ft-card-action"
                href={c.href}
                {...(c.icon === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <CardIcon kind={c.icon} />
                {c.value}
              </a>
            </div>
          ))}
        </div>

        <div className="ft-cols">
          {COLUMNS.map((col) => (
            <div className="ft-col" key={col.head}>
              <p className="ft-colhead">{col.head}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="ft-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ft-social-row">
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} className="ft-social" aria-label={s.label}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>

        <div className="ft-divider" />

        <div className="ft-bottom">
          <p className="ft-copy">Copyright 2026 MRH. All rights reserved.</p>
          <div className="ft-legal">
            {LEGAL.map((l) => (
              <Link key={l.label} href={l.href} className="ft-link">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
