"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      tl.from(".cta-heading", { opacity: 0, y: 50, duration: 0.8, ease: "power3.out" })
        .from(".cta-sub", { opacity: 0, y: 24, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .from(".cta-btns", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".cta-contact-item", { opacity: 0, y: 12, stagger: 0.1, duration: 0.5, ease: "power2.out" }, "-=0.2");

      // Watermark slow drift
      gsap.to(".cta-watermark", {
        x: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "var(--orange)" }}>
      <div
        className="cta-watermark absolute right-[-40px] top-1/2 -translate-y-1/2 font-syne font-extrabold leading-none pointer-events-none select-none"
        style={{ fontSize: "200px", color: "rgba(255,255,255,0.06)" }}
        aria-hidden="true"
      >
        NDD
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="cta-heading font-syne font-extrabold text-[clamp(36px,6vw,64px)] leading-[1] tracking-tight text-white mb-4">
          Ready to build<br />something great?
        </h2>
        <p className="cta-sub text-[14px] lg:text-[16px] text-white/70 font-light leading-relaxed max-w-md mx-auto mb-10">
          Drop us a message and we&apos;ll get back within 24 hours with a free consultation — no strings attached.
        </p>

        <div className="cta-btns flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="mailto:hello@nddstudio.in"
            className="bg-white font-bold text-[14px] px-7 py-3.5 rounded-lg transition-all duration-200 hover:bg-white/90 hover:scale-[1.03] active:scale-[0.97]"
            style={{ color: "var(--orange)" }}
          >
            Start a project →
          </a>
          <a
            href="tel:+919106579181"
            className="border border-white/40 text-white font-light text-[14px] px-7 py-3.5 rounded-lg hover:border-white/80 hover:scale-[1.02] transition-all duration-200"
          >
            +91 91065 79181
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            { label: "Email",    value: "hello@nddstudio.in",    href: "mailto:hello@nddstudio.in" },
            { label: "Phone",    value: "+91 91065 79181",        href: "tel:+919106579181" },
            { label: "Location", value: "Godhra, Gujarat, India", href: "#" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="cta-contact-item text-center hover:opacity-80 transition-opacity">
              <div className="text-[8px] font-medium tracking-[0.14em] uppercase text-white/50 mb-0.5">{item.label}</div>
              <div className="text-[13px] font-light text-white">{item.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
