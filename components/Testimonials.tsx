"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

// MRH testimonials. Avatars use randomuser.me portraits (reliable placeholder
// faces) — swap for real customer photos when available.
const testimonials = [
  {
    text: "Within a week of installing PureAir in our classrooms, the AQI dropped from 180 to under 40. The kids are visibly less congested.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Dr. Anjali Mehta",
    role: "Principal, Delhi Public School",
  },
  {
    text: "We deployed thirty units across the floor and the difference is measurable. The live AQI display keeps everyone honest.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Rohit Sharma",
    role: "Facilities Head, Corporate Park",
  },
  {
    text: "Quiet enough for consultation rooms, powerful enough for the waiting hall. A filter swap is a phone call, not an import order.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Dr. Kavya Reddy",
    role: "Medical Director, City Hospital",
  },
  {
    text: "The German filtration is the real deal. Our particulate readings stayed in the green through the entire winter season.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Arjun Nair",
    role: "Plant Manager, Manufacturing",
  },
  {
    text: "Installation was painless and the steel build feels made to last. No plastic rattle, no early replacements.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Neha Kapoor",
    role: "Operations Lead, Co-working",
  },
  {
    text: "Staff productivity noticeably improved once the afternoon haze in the office was gone. Worth every rupee.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Priya Iyer",
    role: "HR Director, Tech Firm",
  },
  {
    text: "Local service made the decision easy. Filters and support are always within reach, never weeks away.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Vikram Singh",
    role: "Admin Head, University",
  },
  {
    text: "Parents ask about the air now, and we point at a number on the panel. That transparency builds trust.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sunita Rao",
    role: "Founder, Pre-School Chain",
  },
  {
    text: "From AQI 200 lobbies to consistently under 50. Guests notice, and so do our reviews.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Imran Khan",
    role: "GM, Hospitality Group",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section
      className="bg-white relative"
      style={{ padding: "clamp(72px, 10vh, 140px) 0" }}
    >
      <div
        className="z-10 mx-auto"
        style={{ maxWidth: "1340px", padding: "0 clamp(24px, 5vw, 64px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mx-auto"
          style={{ maxWidth: "560px" }}
        >
          <h2
            style={{
              fontFamily:
                "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--ink)",
              margin: 0,
              textAlign: "center",
            }}
          >
            What our Users say
          </h2>
          <p
            style={{
              marginTop: "clamp(12px, 1.5vw, 18px)",
              textAlign: "center",
              color: "var(--ink-3)",
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: 1.5,
            }}
          >
            Measured AQI drops, quieter rooms, and service that stays local — in
            their words.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
