import Link from "next/link";
import type { ReactNode } from "react";

const links: { href: string; label: string; hasDropdown?: boolean }[] = [
  { href: "/products", label: "Products", hasDropdown: true },
  { href: "/technology", label: "Technology" },
  { href: "/impact", label: "Impact" },
  { href: "/case-studies", label: "Case studies" },
];

const linkLabelStyle = {
  fontSize: "14px",
  fontWeight: 300,
  letterSpacing: "-0.07px",
  lineHeight: "18.2px",
} as const;

function ChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavLink({
  href,
  children,
  hasDropdown = false,
}: {
  href: string;
  children: ReactNode;
  hasDropdown?: boolean;
}) {
  return (
    <Link
      href={href}
      className="text-white inline-flex items-center gap-[6px] px-[12px] py-[8px]"
      style={linkLabelStyle}
    >
      <span>{children}</span>
      {hasDropdown ? <ChevronDown /> : null}
    </Link>
  );
}

export default function Nav() {
  return (
    <nav className="relative z-50 flex justify-center py-[24px] px-[24px]">
      <style>{`
        @keyframes mrhNavIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mrh-nav-in {
          opacity: 0;
          animation: mrhNavIn 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .mrh-nav-in { animation-duration: 1ms !important; }
        }
      `}</style>
      <div
        className="mrh-nav-in inline-flex items-center"
        style={{
          background: "#303030",
          border: "1px solid #505050",
          borderRadius: "16px",
          padding: "5px",
          boxShadow:
            "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo — orange squircle */}
        <Link
          href="/"
          aria-label="MRH home"
          className="flex items-center justify-center shrink-0"
          style={{
            background: "#ef5a3c",
            width: "36px",
            height: "36px",
            borderRadius: "12px",
            marginRight: "8px",
          }}
        >
          <span
            className="text-white"
            style={{
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            M
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} hasDropdown={l.hasDropdown}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* CTA — Contact us (white pill) */}
        <Link
          href="/contact"
          className="bg-white text-black inline-flex items-center shrink-0"
          style={{
            height: "36px",
            paddingLeft: "12px",
            paddingRight: "17.73px",
            borderRadius: "12px",
            marginLeft: "8px",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "-0.07px",
            lineHeight: "18.2px",
          }}
        >
          Contact us
        </Link>
      </div>
    </nav>
  );
}
