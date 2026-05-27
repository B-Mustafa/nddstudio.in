"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "They rebuilt our site in 3 weeks and our conversions went up 40%. Incredibly responsive team that actually delivers.",
    name: "Priya Mehta",
    role: "Founder, StyleNest",
    initials: "PM",
  },
  {
    quote: "Our app went from idea to App Store in 6 weeks. Clean code, great UI — they understand product and move fast.",
    name: "Rohan Shah",
    role: "CEO, LogiTrack",
    initials: "RS",
  },
  {
    quote: "SEO results in 60 days — went from page 4 to top 3. Couldn't believe how fast it worked. Highly recommend.",
    name: "Ananya Joshi",
    role: "Marketing Head, GreenLeaf",
    initials: "AJ",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testi-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".testi-header", start: "top 85%", once: true },
      });

      gsap.from(".testi-card", {
        opacity: 0, y: 50, scale: 0.97, duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testi-grid", start: "top 82%", once: true },
      });

      // Quote mark swoops in
      gsap.from(".quote-mark", {
        opacity: 0, x: -20, duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".testi-grid", start: "top 82%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-tertiary)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="testi-header mb-14">
          <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
            Client love
          </p>
          <h2 className="font-syne font-extrabold text-[clamp(32px,5vw,52px)] leading-[1] tracking-tight" style={{ color: "var(--fg-primary)" }}>
            Don&apos;t take our<br />
            <span style={{ color: "var(--fg-muted)" }}>word for it.</span>
          </h2>
        </div>

        <div className="testi-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testi-card rounded-xl p-6 flex flex-col justify-between"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", transition: "border-color 0.3s, transform 0.3s" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-md)";
                gsap.to(e.currentTarget, { y: -4, duration: 0.3, ease: "power2.out" });
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: "elastic.out(1, 0.6)" });
              }}
            >
              <div>
                <div className="quote-mark font-syne font-extrabold text-[40px] leading-none mb-4" style={{ color: "var(--orange)" }}>
                  &ldquo;
                </div>
                <p className="text-[12px] leading-relaxed font-light mb-6" style={{ color: "var(--fg-secondary)" }}>
                  {t.quote}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: "var(--orange-bg)", border: "1.5px solid var(--orange)", color: "var(--orange)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[13px] font-medium" style={{ color: "var(--fg-primary)" }}>{t.name}</div>
                  <div className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
