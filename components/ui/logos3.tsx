"use client";

// Trust strip — adapted from the shadcnblocks "Logos3" auto-scroll block for this
// site's black, Apple-style canvas. The source rendered light brand wordmarks on a
// `bg-background` surface; here we render certification / standards badges (lucide
// icon + label) that read clearly on #000 and need no external assets. The edge
// gradients fade from black (the page background) rather than the undefined shadcn
// `background` token.
//
// Requires the Embla Auto Scroll plugin:  npm install embla-carousel-auto-scroll

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Award,
  BadgeCheck,
  Factory,
  Gauge,
  Leaf,
  MapPin,
  ShieldCheck,
  Wind,
  type LucideIcon,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface TrustBadge {
  id: string;
  label: string;
  Icon: LucideIcon;
}

interface Logos3Props {
  heading?: string;
  badges?: TrustBadge[];
  className?: string;
}

// Default trust signals for a German-engineered, India-proven filtration brand.
// Icon components live here (not in props) so a server component can render the
// strip by passing only the `heading` string across the RSC boundary.
const DEFAULT_BADGES: TrustBadge[] = [
  { id: "ce", label: "CE Certified", Icon: ShieldCheck },
  { id: "iso", label: "ISO 9001:2015", Icon: Award },
  { id: "tuv", label: "TÜV Rheinland Tested", Icon: BadgeCheck },
  { id: "hepa", label: "HEPA H14 Media", Icon: Wind },
  { id: "rohs", label: "RoHS Compliant", Icon: Leaf },
  { id: "germany", label: "Engineered in Germany", Icon: Factory },
  { id: "india", label: "Proven across India", Icon: MapPin },
  { id: "aqi", label: "Real-time AQI Verified", Icon: Gauge },
];

const Logos3 = ({
  heading = "Trusted by these companies",
  badges = DEFAULT_BADGES,
  className,
}: Logos3Props) => {
  return (
    <section
      className={className}
      style={{
        background: "#000000",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        padding: "clamp(64px, 12vh, 132px) clamp(20px, 6vw, 88px)",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Heading matched to the page's section headings: Inter Tight,
            tight tracking, white-on-black. */}
        <h2
          className="text-balance"
          style={{
            color: "#f5f5f7",
            fontSize: "clamp(28px, 4.6vw, 56px)",
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
          }}
        >
          {heading}
        </h2>
      </div>

      <div className="pt-10 md:pt-14 lg:pt-16">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          >
            <CarouselContent className="ml-0">
              {badges.map(({ id, label, Icon }) => (
                <CarouselItem
                  key={id}
                  className="flex basis-auto justify-center pl-0"
                >
                  <div className="mx-3 flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 sm:mx-4">
                    <Icon
                      className="h-5 w-5 shrink-0 text-white/70"
                      aria-hidden
                      strokeWidth={1.6}
                    />
                    <span className="whitespace-nowrap text-sm font-medium tracking-tight text-white/80 sm:text-[15px]">
                      {label}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Edge fades into the black page background. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-black to-transparent sm:w-16"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-black to-transparent sm:w-16"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
