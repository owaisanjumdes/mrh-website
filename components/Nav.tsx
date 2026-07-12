"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AnnouncementBar from "./AnnouncementBar";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const links: NavLink[] = [
  {
    href: "/products",
    label: "Products",
    children: [
      { href: "/products/pureair", label: "PureAir · Indoor" },
      { href: "/products/airfinery", label: "AirFINEry · Semi-Outdoor & Outdoor" },
    ],
  },
  { href: "/technology", label: "Our Technology" },
  { href: "/validation", label: "IIT Delhi Validation" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const SCROLL_THRESHOLD = 80;     // px scrolled before hide kicks in
const IDLE_REVEAL_MS = 900;      // ms of no scroll → reveal again

// Nav color themes, swapped via CSS variables so the existing hover/animation
// rules don't need to change.
const LIGHT_THEME = {
  "--nav-fg": "#0b0b0b",
  "--nav-cta-bg": "#1b1b1b",
  "--nav-cta-fg": "#ffffff",
  "--nav-square-bg": "#f1f1f1",
  "--nav-square-bg-hover": "#e6e6e6",
  "--nav-square-border": "rgba(11, 11, 11, 0.16)",
  "--nav-square-fg": "#0b0b0b",
} as React.CSSProperties;

const DARK_THEME = {
  "--nav-fg": "#ffffff",
  "--nav-cta-bg": "#ffffff",
  "--nav-cta-fg": "#0b0b0b",
  "--nav-square-bg": "#1c1c1c",
  "--nav-square-bg-hover": "#2a2a2a",
  "--nav-square-border": "#2e2e2e",
  "--nav-square-fg": "#ffffff",
} as React.CSSProperties;

function BrandMark() {
  // Only the MRH logo lives on the left; the MANN+HUMMEL mark is pinned to the
  // far right of the nav. Green logos read on both light and dark nav.
  return (
    <img loading="lazy" className="mrh-brand-logo mrh-nav-mrh" src="/mrhgreenlogo.png" alt="MRH" />
  );
}

// Routes whose hero uses a light (white) background — the nav shows a white bar
// with dark contents while the hero is on screen, then flips to its solid black
// bar (white contents) after scrolling past it.
const LIGHT_HERO_ROUTES = new Set<string>([]);
// Routes whose hero uses a dark background — the nav stays transparent over them
// while the hero is on screen (only the nav content shows over the video), then
// flips to the solid black bar after scrolling past it.
const DARK_HERO_ROUTES = new Set<string>(["/about", "/products/pureair"]);
// Full light-mode pages — the nav is a persistent white bar with dark contents the
// entire time (it never flips to the black bar).
const LIGHT_PAGE_ROUTES = new Set<string>(["/", "/validation", "/contact", "/projects"]);

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // The Products page keeps the original, larger nav content sizing.
  const isProducts = pathname === "/products";
  const brandFont = isProducts ? "clamp(22px, 2.35vw, 45px)" : "clamp(16px, 1.5vw, 24px)";
  const navFont = isProducts ? "clamp(14px, 1.12vw, 22px)" : "clamp(12px, 0.9vw, 16px)";
  const hasLightHero = LIGHT_HERO_ROUTES.has(pathname);
  const hasDarkHero = DARK_HERO_ROUTES.has(pathname);
  const isLightPage = LIGHT_PAGE_ROUTES.has(pathname);
  const hasHero = hasLightHero || hasDarkHero;

  const [hidden, setHidden] = useState(false);
  const [overHero, setOverHero] = useState(hasHero);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navOpen = menuOpen || mobileOpen;

  // The single dropdown menu (Products → PureAir / AirFINEry).
  const productLinks = links.find((l) => l.children)?.children ?? [];
  const lastYRef = useRef(0);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const goingDown = y > lastYRef.current + 1;
      const goingUp = y < lastYRef.current - 1;
      lastYRef.current = y;

      // Hide on scroll-down past threshold; reveal on scroll-up or near top.
      if (y > SCROLL_THRESHOLD && goingDown) {
        setHidden(true);
      } else if (goingUp || y <= SCROLL_THRESHOLD) {
        setHidden(false);
      }

      // Idle reveal — show the nav again once scrolling stops.
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        setHidden(false);
      }, IDLE_REVEAL_MS);

      // For routes with a hero, track whether it's still on screen so we can
      // switch between the hero treatment and the solid black bar.
      if (hasHero) {
        setOverHero(y < window.innerHeight * 0.85);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      cancelAnimationFrame(raf);
    };
  }, [hasHero]);

  // While over the light hero the nav is white with dark contents; over a dark
  // hero it's transparent; once scrolled past either, it's the solid black bar.
  const lightNav = isLightPage || (hasLightHero && overHero);
  const wrapperBg = isLightPage
    ? "#ffffff"
    : lightNav
    ? "#ffffff"
    : hasDarkHero && overHero
    ? "transparent"
    : "#000000";

  return (
    <>
      {isHome && <AnnouncementBar />}
      <div
        className={`mrh-mega-backdrop ${navOpen ? "is-open" : ""}`}
        aria-hidden
        onClick={() => {
          setMenuOpen(false);
          setMobileOpen(false);
        }}
      />
      <nav
        className={`sticky top-0 z-50 mrh-nav ${menuOpen ? "is-menu-open" : ""} ${isProducts ? "is-products" : ""}`}
        onMouseLeave={() => setMenuOpen(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // Horizontal padding matches the hero gutter so the logo aligns with the
          // hero text (and the CTA + menu shift left by the same amount).
          padding:
            "clamp(6px, 0.8%, 12px) clamp(20px, 8.85%, 127px)",
          color: "var(--nav-fg)",
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
          // Hamburger open → light bar to match its light panel; Products mega-menu
          // open → dark gray bar to match its panel; otherwise the page treatment.
          background: mobileOpen ? "#ffffff" : menuOpen ? "#1d1d1f" : wrapperBg,
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          // While a menu is open the background must snap (no transition) so the
          // bar matches the panel on the very first frame.
          transition: `transform 420ms cubic-bezier(0.65, 0, 0.35, 1), color 360ms ease${
            navOpen ? "" : ", background 360ms ease"
          }`,
          willChange: "transform, background",
          ...(mobileOpen || (lightNav && !navOpen) ? LIGHT_THEME : DARK_THEME),
        }}
      >
      <style>{`
        @keyframes mrhNavIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mrh-nav-row {
          opacity: 0;
          animation: mrhNavIn 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Brand logos: MRH pinned left, MANN+HUMMEL pinned right (mirrored). */
        .mrh-brand-logo {
          height: clamp(34px, 3.3vw, 48px);
          width: auto;
          object-fit: contain;
          flex: none;
          display: block;
        }
        .mrh-nav.is-products .mrh-brand-logo { height: clamp(44px, 4.3vw, 64px); }
        /* Pull each brand mark outward past the nav gutter so MRH sits nearer the
           left edge and MANN+HUMMEL nearer the right, without moving the links/CTA
           (which stay aligned to the gutter). */
        .mrh-nav-mh { margin-left: clamp(12px, 1.6vw, 26px); margin-right: clamp(-44px, -3vw, -14px); }
        /* The MRH mark fills only ~60% of its PNG canvas (vs ~75% for MANN+HUMMEL),
           so at equal CSS height it renders smaller. Give it a larger height to
           match the visible size, and nudge it down to optically center the mark. */
        .mrh-nav-mrh { transform: translateY(8%); margin-left: clamp(-44px, -3vw, -14px); height: clamp(43px, 4.2vw, 61px); }
        .mrh-nav.is-products .mrh-nav-mrh { height: clamp(56px, 5.5vw, 81px); }
        .mrh-nav-link {
          color: var(--nav-fg);
          text-decoration: none;
          opacity: 0.95;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: opacity 0.2s ease, color 360ms ease;
        }
        .mrh-nav-link:hover { opacity: 0.6; }

        /* Products mega-menu trigger */
        .mrh-nav-item { display: inline-flex; align-items: center; }
        .mrh-nav-link--dd { display: inline-flex; align-items: center; gap: 0.3em; }
        .mrh-nav-caret {
          width: 0.62em;
          height: 0.62em;
          transition: transform 260ms ease;
        }
        /* When the mega-menu is open, the whole nav dims to gray and the caret flips */
        .mrh-nav.is-menu-open .mrh-nav-link { color: #6e6e73; }
        .mrh-nav.is-menu-open .mrh-nav-link:hover { color: #f5f5f7; }
        .mrh-nav.is-menu-open .mrh-nav-caret { transform: rotate(180deg); }

        /* Full-width frosted panel that drops below the bar */
        .mrh-mega {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          padding: clamp(20px, 2.4vw, 40px) clamp(20px, 8.85%, 127px) clamp(28px, 3.4vw, 52px);
          background: #1d1d1f;
          /* Reveal by wiping open (top → down) while staying fully opaque, so the
             panel is always the exact same gray as the bar — never translucent. */
          clip-path: inset(0 0 100% 0);
          visibility: hidden;
          transition: clip-path 340ms cubic-bezier(0.16, 1, 0.3, 1), visibility 340ms;
        }
        .mrh-mega.is-open { clip-path: inset(0 0 0 0); visibility: visible; }
        .mrh-mega-label {
          margin: 0 0 14px;
          color: #86868b;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        .mrh-mega-links { display: flex; flex-direction: column; gap: 6px; }
        .mrh-mega-link {
          color: #f5f5f7;
          text-decoration: none;
          font-size: clamp(24px, 2.4vw, 40px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.18;
          width: fit-content;
          transition: color 200ms ease;
        }
        /* hovered item bright, the others dim — like Apple's menu */
        .mrh-mega-links:hover .mrh-mega-link { color: #6e6e73; }
        .mrh-mega-links .mrh-mega-link:hover { color: #f5f5f7; }

        /* Backdrop that blurs the page behind the open menu */
        .mrh-mega-backdrop {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(12px) saturate(110%);
          -webkit-backdrop-filter: blur(12px) saturate(110%);
          opacity: 0;
          visibility: hidden;
          transition: opacity 300ms ease, visibility 300ms;
        }
        .mrh-mega-backdrop.is-open { opacity: 1; visibility: visible; }

        /* Mobile stacked menu (light) */
        .mrh-mobile {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #ffffff;
          padding: 8px clamp(20px, 8.85%, 127px) 28px;
          display: flex;
          flex-direction: column;
          clip-path: inset(0 0 100% 0);
          visibility: hidden;
          transition: clip-path 320ms cubic-bezier(0.16, 1, 0.3, 1), visibility 320ms;
          z-index: 55;
        }
        .mrh-mobile.is-open { clip-path: inset(0 0 0 0); visibility: visible; }
        .mrh-mobile-group {
          display: flex;
          flex-direction: column;
          padding: 4px 0;
        }
        /* Links: light grey by default, no underline. On hover they darken to dark
           grey and an underline wipes in beneath the text. */
        .mrh-mobile-link {
          position: relative;
          width: fit-content;
          color: #86868b;
          text-decoration: none;
          font-size: 22px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 12px 0;
          transition: color 200ms ease;
        }
        .mrh-mobile-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 8px;
          width: 100%;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mrh-mobile-link:hover { color: #1d1d1f; }
        .mrh-mobile-link:hover::after { transform: scaleX(1); }
        .mrh-mobile-sublink {
          position: relative;
          width: fit-content;
          color: #86868b;
          text-decoration: none;
          font-size: 17px;
          padding: 7px 0 7px 16px;
          transition: color 200ms ease;
        }
        .mrh-mobile-sublink::after {
          content: "";
          position: absolute;
          left: 16px;
          bottom: 4px;
          width: calc(100% - 16px);
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mrh-mobile-sublink:hover { color: #1d1d1f; }
        .mrh-mobile-sublink:hover::after { transform: scaleX(1); }
        .mrh-mobile-quote {
          margin-top: 20px;
          background: #148042;
          color: #ffffff;
          text-decoration: none;
          text-align: center;
          padding: 15px;
          border-radius: 980px;
          font-size: 17px;
          font-weight: 600;
        }

        /* On phones/tablets the inline links collapse into the hamburger menu */
        @media (max-width: 820px) {
          .mrh-nav-center { display: none !important; }
        }
        @media (max-width: 480px) {
          .mrh-nav-cta { display: none; }
        }
        .mrh-nav-cta {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background: var(--nav-cta-bg);
          color: var(--nav-cta-fg);
          border: none;
          border-radius: 980px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.62em 1.05em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.45em;
          transition: color 420ms cubic-bezier(0.65, 0, 0.35, 1),
            background 360ms ease;
        }
        .mrh-nav-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #148042;
          transform: translateX(-101%);
          transition: transform 520ms cubic-bezier(0.65, 0, 0.35, 1);
          z-index: -1;
          will-change: transform;
        }
        .mrh-nav-cta:hover { color: #ffffff; }
        .mrh-nav-cta:hover::before { transform: translateX(0); }
        .mrh-nav-square {
          background: var(--nav-square-bg);
          color: var(--nav-square-fg);
          border: 1px solid var(--nav-square-border);
          border-radius: 7px;
          height: 2.55em;
          min-width: 2.55em;
          padding: 0 0.5em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s ease, color 0.2s ease,
            border-color 0.2s ease;
        }
        .mrh-nav-square:hover { background: var(--nav-square-bg-hover); }
        @media (prefers-reduced-motion: reduce) {
          .mrh-nav-row { animation-duration: 1ms !important; }
        }
      `}</style>

      {/* Brand (left) */}
      <Link
        href="/"
        aria-label="MRH home"
        className="mrh-nav-row mrh-nav-link"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.55em",
          fontSize: brandFont,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "var(--nav-fg)",
          opacity: 1,
        }}
      >
        <BrandMark />
      </Link>

      {/* Center links */}
      <div
        className="mrh-nav-row mrh-nav-center"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(18px, 2.3vw, 44px)",
          fontSize: navFont,
          fontWeight: 400,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {links.map((l) =>
          l.children ? (
            <div
              key={l.href}
              className="mrh-nav-item"
              onMouseEnter={() => setMenuOpen(true)}
            >
              <Link href={l.href} className="mrh-nav-link mrh-nav-link--dd">
                {l.label}
                <svg
                  className="mrh-nav-caret"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <Link
              key={l.href}
              href={l.href}
              className="mrh-nav-link"
              onMouseEnter={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          )
        )}
      </div>

      {/* Actions (right) */}
      <div
        className="mrh-nav-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px, 0.7vw, 14px)",
          fontSize: navFont,
        }}
      >
        <Link href="/contact" className="mrh-nav-cta">
          <span>Request Pricing</span>
        </Link>
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="mrh-nav-square"
          onClick={() => {
            setMenuOpen(false);
            setMobileOpen((o) => !o);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "1.05em", height: "1.05em" }}
          >
            {mobileOpen ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" />
            )}
          </svg>
        </button>
      </div>

      {/* MANN+HUMMEL logo — pinned to the far right, mirroring the MRH logo on the left */}
      <img
        loading="lazy"
        className="mrh-nav-row mrh-brand-logo mrh-nav-mh"
        src="/mhgreenlogo.png"
        alt="MANN+HUMMEL"
      />

      {/* Full-width mega-menu panel (Products) */}
      <div className={`mrh-mega ${menuOpen ? "is-open" : ""}`} role="menu">
        <p className="mrh-mega-label">Products</p>
        <div className="mrh-mega-links">
          {productLinks.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="mrh-mega-link"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile stacked menu (hamburger) */}
      <div className={`mrh-mobile ${mobileOpen ? "is-open" : ""}`}>
        {links.map((l) => (
          <div className="mrh-mobile-group" key={l.href}>
            <Link
              href={l.href}
              className="mrh-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
            {l.children?.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="mrh-mobile-sublink"
                onClick={() => setMobileOpen(false)}
              >
                {c.label}
              </Link>
            ))}
          </div>
        ))}
        <Link
          href="/contact"
          className="mrh-mobile-quote"
          onClick={() => setMobileOpen(false)}
        >
          Request Pricing
        </Link>
      </div>
      </nav>
    </>
  );
}
