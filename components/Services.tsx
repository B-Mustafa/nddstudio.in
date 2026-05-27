"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    title: "SEO",
    desc: "Rank higher, get found faster. On-page, technical, and local SEO that actually moves the needle.",
    tag: "Search",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    title: "Website Design & Dev",
    desc: "Fast, beautiful websites in Next.js or Webflow. Mobile-first, performance-obsessed, always on time.",
    tag: "Web",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>,
    title: "App Development",
    desc: "iOS, Android, cross-platform. From idea to App Store — apps your users actually keep.",
    tag: "Mobile",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    title: "UI / UX Design",
    desc: "Figma-to-production design with a clear user journey. Interfaces that look good and convert better.",
    tag: "Design",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
    title: "Brand & Graphic Design",
    desc: "Logos, brand kits, social assets, print collateral — sharp everywhere, every format.",
    tag: "Brand",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    title: "Digital Marketing",
    desc: "Google Ads, Meta campaigns, content strategy — tuned to your audience and budget.",
    tag: "Growth",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".services-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".services-header", start: "top 85%", once: true },
      });

      // Cards stagger in
      gsap.from(".service-card", {
        opacity: 0, y: 50, duration: 0.7,
        stagger: { amount: 0.6, from: "start" },
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 82%", once: true },
      });

      // Hover: each card icon bounces on mouse enter (handled in JSX)
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 lg:py-32" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="services-header mb-14">
          <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
            What we do
          </p>
          <h2 className="font-syne font-extrabold text-[clamp(32px,5vw,52px)] leading-[1] tracking-tight" style={{ color: "var(--fg-primary)" }}>
            Every service your<br />
            <span style={{ color: "var(--fg-muted)" }}>business needs.</span>
          </h2>
        </div>

        <div
          className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y"
          style={{ borderColor: "var(--border)", border: "1px solid var(--border)" }}
        >
          {services.map((svc) => (
            <div
              key={svc.title}
              className="service-card group p-7 lg:p-8 cursor-pointer"
              style={{ background: "var(--bg-card)", transition: "background 0.3s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)";
                const icon = e.currentTarget.querySelector(".svc-icon") as HTMLElement;
                if (icon) gsap.to(icon, { scale: 1.2, rotate: 8, duration: 0.3, ease: "back.out(2)" });
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                const icon = e.currentTarget.querySelector(".svc-icon") as HTMLElement;
                if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
              }}
            >
              <div className="svc-icon mb-5 w-fit" style={{ color: "var(--orange)" }}>
                {svc.icon}
              </div>
              <h3 className="font-syne font-extrabold text-[16px] mb-2.5 tracking-tight" style={{ color: "var(--fg-primary)" }}>
                {svc.title}
              </h3>
              <p className="text-[12px] leading-relaxed font-light mb-5" style={{ color: "var(--fg-muted)" }}>
                {svc.desc}
              </p>
              <span
                className="inline-block text-[9px] font-medium tracking-[0.12em] uppercase pb-px"
                style={{ color: "var(--orange)", borderBottom: "1px solid var(--orange-border)" }}
              >
                {svc.tag} →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
