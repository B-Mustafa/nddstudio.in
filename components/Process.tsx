"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discovery",      desc: "We learn your business, goals, and audience. One focused call — no fluff, no wasted time." },
  { num: "02", title: "Strategy",       desc: "A clear plan with timeline, deliverables, and fixed pricing. No scope creep, no surprises." },
  { num: "03", title: "Build",          desc: "We execute fast and keep you in the loop. You see real progress, not just promises." },
  { num: "04", title: "Launch & Grow",  desc: "We go live, measure results, and optimize. Your growth is our benchmark — always." },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".process-header", start: "top 85%", once: true },
      });

      // Steps slide in from bottom with stagger
      gsap.from(".process-step", {
        opacity: 0, y: 60, duration: 0.75,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-grid", start: "top 82%", once: true },
      });

      // Orange top bar draws in left-to-right
      gsap.from(".step-bar", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".process-grid", start: "top 82%", once: true },
      });

      // Step number counts up
      document.querySelectorAll(".step-num").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, scale: 0.5, duration: 0.6, delay: 0.3 + i * 0.15,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".process-grid", start: "top 82%", once: true },
        });
      });

      gsap.from(".process-footer", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".process-footer", start: "top 90%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-24 lg:py-32" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="process-header mb-16 max-w-xl">
          <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
            How it works
          </p>
          <h2 className="font-syne font-extrabold text-[clamp(32px,5vw,52px)] leading-[1] tracking-tight" style={{ color: "var(--fg-primary)" }}>
            Simple.<br />Transparent.<br />
            <span style={{ color: "var(--fg-muted)" }}>Done.</span>
          </h2>
        </div>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step) => (
            <div key={step.num} className="process-step group cursor-default"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget.querySelector(".step-num-text"), {
                  color: "var(--orange)", opacity: 0.35, duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget.querySelector(".step-num-text"), {
                  color: "var(--orange)", opacity: 0.12, duration: 0.3,
                });
              }}
            >
              <div className="step-bar h-0.5 mb-6 w-full" style={{ background: "var(--orange)" }} />
              <div className="step-num">
                <div
                  className="step-num-text font-syne font-extrabold text-[56px] leading-none mb-4"
                  style={{ color: "var(--orange)", opacity: 0.12 }}
                >
                  {step.num}
                </div>
              </div>
              <h3 className="font-syne font-extrabold text-[17px] mb-3 tracking-tight" style={{ color: "var(--fg-primary)" }}>
                {step.title}
              </h3>
              <p className="text-[12px] leading-relaxed font-light" style={{ color: "var(--fg-muted)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="process-footer mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-[13px] font-light max-w-md" style={{ color: "var(--fg-muted)" }}>
            Most projects go from kick-off to launch in{" "}
            <span style={{ color: "var(--fg-primary)" }}>2–6 weeks</span>. We move fast without cutting corners.
          </p>
          <a
            href="#contact"
            className="flex-shrink-0 text-[12px] font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            style={{ border: "1px solid var(--orange-border)", color: "var(--orange)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--orange-border)")}
          >
            Start the process →
          </a>
        </div>
      </div>
    </section>
  );
}
