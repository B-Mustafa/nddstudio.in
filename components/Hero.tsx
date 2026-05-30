"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance timeline
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".hero-badge", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
      })
      .from(".hero-line-1", {
        opacity: 0, y: 60, duration: 0.8, ease: "power3.out",
      }, "-=0.3")
      .from(".hero-line-2", {
        opacity: 0, y: 60, duration: 0.8, ease: "power3.out",
      }, "-=0.55")
      .from(".hero-sub", {
        opacity: 0, y: 24, duration: 0.7, ease: "power3.out",
      }, "-=0.5")
      .from(".hero-ctas", {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
      }, "-=0.45")
      .from(".hero-stat", {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: "power3.out",
      }, "-=0.4")
      .from(".hero-scroll", {
        opacity: 0, duration: 0.6, ease: "power2.out",
      }, "-=0.2");

      // Floating glow parallax on scroll
      gsap.to(".hero-glow", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Grid lines subtle fade on scroll
      gsap.to(".hero-grid-line", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Counter animation — gsap.to counts UP from 0 to target
      document.querySelectorAll(".hero-stat-num").forEach((el) => {
        const target = el.getAttribute("data-target");
        if (!target) return;
        const isPercent = target.includes("%");
        const isX       = target.includes("×");
        const isH       = target.includes("h");
        const isPlus    = target.includes("+");
        const num       = parseFloat(target.replace(/[^0-9.]/g, ""));

        // Immediately show 0 so there's no flash of the real number
        el.textContent = isPercent ? "0%" : isX ? "0×" : isH ? "0h" : isPlus ? "0+" : "0";

        const counter = { val: 0 };
        gsap.to(counter, {
          val: num,
          duration: 1.8,
          ease: "power2.out",
          delay: 1.2,
          onUpdate() {
            const v = Math.round(counter.val);
            el.textContent = isPercent ? `${v}%`
              : isX    ? `${v}×`
              : isH    ? `${v}h`
              : isPlus ? `${v}+`
              : `${v}`;
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="hero-glow hero-grid-line" style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 350, background: "radial-gradient(ellipse, var(--orange-glow) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none hero-grid-line">
        <div className="absolute left-1/4 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
        <div className="absolute left-3/4 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
        <div className="absolute top-1/3 left-0 right-0 h-px" style={{ background: "var(--border)" }} />
        <div className="absolute top-2/3 left-0 right-0 h-px" style={{ background: "var(--border)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10"
          style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--orange)" }} />
          <span className="text-[10px] font-medium tracking-[0.12em] uppercase" style={{ color: "var(--orange-light)" }}>
            NDD.Studio · Godhra, India
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-syne font-extrabold leading-[0.9] tracking-tightest mb-3">
          <span className="hero-line-1 block text-[clamp(56px,10vw,112px)]" style={{ color: "var(--fg-primary)" }}>
            Digital.
          </span>
          <span className="hero-line-2 block text-[clamp(56px,10vw,112px)]" style={{ color: "var(--orange)" }}>
            Done different.
          </span>
        </h1>

        {/* Sub */}
        <p className="hero-sub max-w-lg mx-auto text-[15px] lg:text-[17px] leading-relaxed font-light mb-10" style={{ color: "var(--fg-muted)" }}>
          SEO, websites, apps, and design — built to perform,
          delivered on time, obsessed with your growth.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#contact"
            className="text-white font-medium text-[14px] px-7 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97]"
            style={{ background: "var(--orange)" }}
          >
            Start a project →
          </a>
          <a
            href="#services"
            className="font-light text-[14px] px-7 py-3.5 rounded-lg transition-all duration-200 hover:scale-[1.02]"
            style={{ border: "1.5px solid var(--border-strong)", color: "var(--fg-primary)" }}
          >
            See our services
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 lg:gap-16 mt-20">
          {[
            { num: "50+",  label: "Projects delivered",  target: "50+"  },
            { num: "98%",  label: "Client satisfaction", target: "98%"  },
            { num: "3×",   label: "Avg. traffic growth", target: "3×"   },
            { num: "24h",  label: "Response time",       target: "24h"  },
          ].map((stat) => (
            <div key={stat.label} className="hero-stat text-center">
              <div
                className="hero-stat-num font-syne font-extrabold text-[34px] lg:text-[40px] leading-none"
                style={{ color: "var(--orange)" }}
                data-target={stat.target}
              >
                {stat.num}
              </div>
              <div className="text-[11px] mt-1.5 tracking-wide" style={{ color: "var(--fg-faint)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-faintest)" }}>Scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, var(--fg-faint), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
