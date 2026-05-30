"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────────────────

const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Speed without compromise",
    desc: "We move fast because slow costs clients money. But speed never means sloppy — every pixel, every line of code is intentional.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Radical transparency",
    desc: "No hidden fees, no scope creep surprises, no ghosting. You know exactly what's happening at every stage.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Results over aesthetics",
    desc: "Beautiful work that doesn't convert is just expensive art. Everything we build is measured against your actual business outcomes.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Clients as partners",
    desc: "We don't do transactions. Every client is a long-term relationship — we celebrate your wins like they're our own.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "No fluff, ever",
    desc: "We cut jargon, unnecessary meetings, and pointless deliverables. Only what moves the needle makes it into the project.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Obsessed with craft",
    desc: "We care about the details nobody notices — until they're missing. That obsession is what separates good work from great work.",
  },
];

const services = [
  { label: "SEO & Search", color: "#E8630A" },
  { label: "Web Design & Dev", color: "#5E6AD2" },
  { label: "App Development", color: "#1DA8A0" },
  { label: "UI / UX Design", color: "#E84393" },
  { label: "Brand & Graphic Design", color: "#F4935A" },
  { label: "Digital Marketing", color: "#28C840" },
];

const milestones = [
  { year: "2022", title: "First client", desc: "NDD Studio started as a one-person freelance operation in Godhra. First project: a local restaurant website." },
  { year: "2023", title: "First SEO win", desc: "Took a client's e-commerce store from page 5 to #2 on Google in 90 days. The word spread fast." },
  { year: "2024", title: "Studio expanded", desc: "Grew to a full team. Launched our first SaaS product and a mobile app that crossed 10k downloads." },
  { year: "2025", title: "50+ projects delivered", desc: "Hit 50 projects, expanded services across India. 98% client satisfaction, zero missed deadlines." },
  { year: "2026", title: "Now", desc: "Building nddstudio.in. Focused on results-first digital work for ambitious businesses across India and beyond." },
];

const techStack = [
  { name: "Next.js",    category: "Web" },
  { name: "React",      category: "Web" },
  { name: "TypeScript", category: "Dev" },
  { name: "Tailwind",   category: "Design" },
  { name: "GSAP",       category: "Motion" },
  { name: "Figma",      category: "Design" },
  { name: "React Native", category: "Mobile" },
  { name: "Node.js",    category: "Backend" },
  { name: "Supabase",   category: "Backend" },
  { name: "Vercel",     category: "Deploy" },
  { name: "Framer",     category: "Design" },
  { name: "Webflow",    category: "Web" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function AboutClient() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance
      const heroTl = gsap.timeline({ delay: 0.15 });
      heroTl
        .from(".about-eyebrow",  { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
        .from(".about-h1-line1", { opacity: 0, y: 70, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .from(".about-h1-line2", { opacity: 0, y: 70, duration: 0.9, ease: "power3.out" }, "-=0.65")
        .from(".about-hero-sub", { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".about-hero-cta", { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .from(".about-hero-stat", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.35");

      // Glow parallax
      gsap.to(".about-glow", {
        y: -100,
        ease: "none",
        scrollTrigger: { trigger: ".about-hero", start: "top top", end: "bottom top", scrub: 1.5 },
      });

      // ── Founder section
      gsap.from(".founder-img-wrap", {
        opacity: 0, x: -50, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".founder-section", start: "top 80%", once: true },
      });
      gsap.from(".founder-text-block", {
        opacity: 0, x: 50, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".founder-section", start: "top 80%", once: true },
      });

      // ── Mission line draw
      gsap.from(".mission-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mission-section", start: "top 78%", once: true },
      });
      gsap.from(".mission-word", {
        opacity: 0, y: 40,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mission-section", start: "top 78%", once: true },
      });

      // ── Values stagger
      gsap.from(".value-card", {
        opacity: 0, y: 40, scale: 0.96,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".values-grid", start: "top 82%", once: true },
      });

      // ── Timeline items
      gsap.from(".milestone-item", {
        opacity: 0, x: -30,
        stagger: 0.12,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".timeline-section", start: "top 80%", once: true },
      });
      gsap.from(".timeline-line-fill", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: ".timeline-section", start: "top 80%", once: true },
      });

      // ── Tech stack chips
      gsap.from(".tech-chip", {
        opacity: 0, scale: 0.85,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".tech-section", start: "top 84%", once: true },
      });

      // ── Services marquee — horizontal infinite scroll
      const marquee = document.querySelector(".marquee-track") as HTMLElement;
      if (marquee) {
        const totalWidth = marquee.scrollWidth / 2;
        gsap.to(marquee, {
          x: `-=${totalWidth}`,
          duration: 20,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
          },
        });
      }

      // ── CTA bottom
      gsap.from(".about-cta-block", {
        opacity: 0, y: 50, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".about-cta-block", start: "top 85%", once: true },
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Cursor />
      <div ref={pageRef}>
        <Navbar />
        <main>

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <section
            className="about-hero relative min-h-[70vh] flex items-center overflow-hidden pt-16"
            style={{ background: "var(--bg-primary)" }}
          >
            {/* Glow */}
            <div
              className="about-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 700, height: 400, background: "radial-gradient(ellipse, var(--orange-glow) 0%, transparent 70%)" }}
            />
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/3 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
              <div className="absolute left-2/3 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "var(--border)" }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
              <div
                className="about-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10"
                style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--orange)" }} />
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase" style={{ color: "var(--orange-light)" }}>
                  About NDD.Studio
                </span>
              </div>

              <h1 className="font-syne font-extrabold leading-[0.92] tracking-tight mb-6">
                <span className="about-h1-line1 block text-[clamp(48px,8vw,96px)]" style={{ color: "var(--fg-primary)" }}>
                  We&apos;re the studio
                </span>
                <span className="about-h1-line2 block text-[clamp(48px,8vw,96px)]" style={{ color: "var(--orange)" }}>
                  next door.
                </span>
              </h1>

              <p className="about-hero-sub text-[15px] lg:text-[18px] font-light leading-relaxed max-w-xl mb-10" style={{ color: "var(--fg-muted)" }}>
                A lean, obsessive digital studio from Godhra, Gujarat. We don&apos;t do fluff — just sharp
                digital work that grows your business, delivered on time, every time.
              </p>

              <div className="about-hero-cta flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="text-white text-[13px] font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
                  style={{ background: "var(--orange)" }}
                >
                  Work with us →
                </Link>
                <Link
                  href="/#work"
                  className="text-[13px] font-light px-6 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  style={{ border: "1.5px solid var(--border-strong)", color: "var(--fg-primary)" }}
                >
                  See our work
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-10 mt-16">
                {[
                  { n: "2022", label: "Founded" },
                  { n: "50+",  label: "Projects shipped" },
                  { n: "100%", label: "Remote-friendly" },
                  { n: "GJ",   label: "Godhra, Gujarat" },
                ].map((s) => (
                  <div key={s.label} className="about-hero-stat">
                    <div className="font-syne font-extrabold text-[28px] leading-none" style={{ color: "var(--orange)" }}>
                      {s.n}
                    </div>
                    <div className="text-[10px] mt-1 tracking-wide font-light" style={{ color: "var(--fg-faint)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SERVICES MARQUEE ─────────────────────────────────────────── */}
          <div
            className="py-4 overflow-hidden border-y"
            style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
          >
            <div className="marquee-track flex gap-0 whitespace-nowrap w-max">
              {[...services, ...services].map((svc, i) => (
                <div key={i} className="flex items-center gap-6 px-6">
                  <span className="text-[10px] font-medium tracking-[0.14em] uppercase" style={{ color: "var(--fg-faint)" }}>
                    {svc.label}
                  </span>
                  <div className="w-1 h-1 rounded-full" style={{ background: svc.color }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── FOUNDER ──────────────────────────────────────────────────── */}
          <section className="founder-section py-24 lg:py-32" style={{ background: "var(--bg-secondary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                {/* Avatar side */}
                <div className="founder-img-wrap flex-shrink-0">
                  <div className="relative">
                    {/* Big avatar placeholder */}
                    <div
                      className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
                      style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}
                    >
                      {/* Initials */}
                      <div
                        className="font-syne font-extrabold text-[72px] leading-none"
                        style={{ color: "var(--orange)", opacity: 0.15 }}
                      >
                        MB
                      </div>
                      {/* Orange bottom bar */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ background: "var(--orange)" }}
                      />
                    </div>
                    {/* Floating badge */}
                    <div
                      className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl text-center"
                      style={{ background: "var(--orange)", boxShadow: "0 8px 24px rgba(232,99,10,0.35)" }}
                    >
                      <div className="font-syne font-extrabold text-white text-[13px]">Founder</div>
                      <div className="text-white/70 text-[10px] font-light">NDD.Studio</div>
                    </div>
                  </div>
                </div>

                {/* Text side */}
                <div className="founder-text-block flex-1">
                  <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: "var(--orange)" }}>
                    The person behind it
                  </p>
                  <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,48px)] leading-[1.05] tracking-tight mb-6" style={{ color: "var(--fg-primary)" }}>
                    Mustafa Bhikhapur
                  </h2>
                  <div className="space-y-4 text-[14px] font-light leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
                    <p>
                      I started NDD.Studio with a single belief: most digital agencies are either too expensive,
                      too slow, or too detached from what actually grows a business. I wanted to build
                      something different — a studio that moves like a startup, thinks like a strategist,
                      and executes like an engineer.
                    </p>
                    <p>
                      Based in Godhra, Gujarat, I work with businesses across India and beyond — from
                      local shops going digital for the first time to funded startups needing their
                      product built fast and built right.
                    </p>
                    <p>
                      Every project I take on is personal. Your deadline is my deadline.
                      Your growth is my benchmark. That&apos;s not marketing — that&apos;s just how I work.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-8">
                    <a
                      href="mailto:hello@nddstudio.in"
                      className="flex items-center gap-2 text-[12px] font-medium px-4 py-2.5 rounded-lg transition-all hover:scale-[1.03]"
                      style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                      hello@nddstudio.in
                    </a>
                    <a
                      href="tel:+919106579181"
                      className="flex items-center gap-2 text-[12px] font-medium px-4 py-2.5 rounded-lg transition-all hover:scale-[1.03]"
                      style={{ border: "1px solid var(--border)", color: "var(--fg-secondary)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.72 19.79 19.79 0 0 1 1.62 4.18 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      +91 91065 79181
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── MISSION ──────────────────────────────────────────────────── */}
          <section className="mission-section py-24 lg:py-32 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-8" style={{ color: "var(--orange)" }}>
                Our mission
              </p>
              <div
                className="mission-line h-px w-full mb-10"
                style={{ background: "linear-gradient(to right, var(--orange), transparent)" }}
              />
              <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-5xl">
                {[
                  "To", "make", "professional", "digital", "work", "accessible", "to", "every",
                  "business", "—", "not", "just", "the", "ones", "with", "big", "budgets.",
                  "Great", "websites,", "apps,", "and", "SEO", "shouldn't", "be", "a",
                  "luxury.", "They're", "a", "necessity.", "We", "build", "them", "right.",
                ].map((word, i) => (
                  <span
                    key={i}
                    className="mission-word font-syne font-extrabold text-[clamp(20px,3.5vw,42px)] leading-tight tracking-tight"
                    style={{ color: i < 8 ? "var(--fg-primary)" : i < 16 ? "var(--fg-secondary)" : "var(--fg-muted)" }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── VALUES ───────────────────────────────────────────────────── */}
          <section className="py-24 lg:py-32" style={{ background: "var(--bg-secondary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
                What we stand for
              </p>
              <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,48px)] tracking-tight leading-[1] mb-14" style={{ color: "var(--fg-primary)" }}>
                The six things we<br />
                <span style={{ color: "var(--fg-muted)" }}>never compromise on.</span>
              </h2>

              <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="value-card rounded-xl p-6 group transition-all duration-300 cursor-default"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--orange-border)";
                      el.style.background = "var(--bg-tertiary)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border)";
                      el.style.background = "var(--bg-card)";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}
                    >
                      {v.icon}
                    </div>
                    <h3 className="font-syne font-extrabold text-[15px] tracking-tight mb-2" style={{ color: "var(--fg-primary)" }}>
                      {v.title}
                    </h3>
                    <p className="text-[12px] font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TIMELINE ─────────────────────────────────────────────────── */}
          <section className="timeline-section py-24 lg:py-32" style={{ background: "var(--bg-primary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
                Our story
              </p>
              <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,48px)] tracking-tight leading-[1] mb-14" style={{ color: "var(--fg-primary)" }}>
                From one project<br />
                <span style={{ color: "var(--fg-muted)" }}>to a full studio.</span>
              </h2>

              <div className="relative flex flex-col gap-0 max-w-3xl">
                {/* Vertical line */}
                <div
                  className="timeline-line-fill absolute left-[19px] top-2 bottom-2 w-px"
                  style={{ background: "linear-gradient(to bottom, var(--orange), transparent)" }}
                />

                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className="milestone-item flex gap-6 pb-10 last:pb-0 relative"
                  >
                    {/* Dot */}
                    <div className="flex-shrink-0 mt-1 relative z-10">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-extrabold text-[10px]"
                        style={{
                          background: i === milestones.length - 1 ? "var(--orange)" : "var(--bg-tertiary)",
                          border: `2px solid ${i === milestones.length - 1 ? "var(--orange)" : "var(--border)"}`,
                          color: i === milestones.length - 1 ? "white" : "var(--fg-faint)",
                        }}
                      >
                        {m.year.slice(2)}
                      </div>
                    </div>

                    <div className="flex-1 pt-1.5">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="font-syne font-extrabold text-[16px] tracking-tight" style={{ color: "var(--fg-primary)" }}>
                          {m.title}
                        </span>
                        <span className="text-[9px] font-medium tracking-[0.1em]" style={{ color: "var(--orange)" }}>
                          {m.year}
                        </span>
                      </div>
                      <p className="text-[12px] font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TECH STACK ───────────────────────────────────────────────── */}
          <section className="tech-section py-24 lg:py-32" style={{ background: "var(--bg-secondary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
                Tools of the trade
              </p>
              <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,48px)] tracking-tight leading-[1] mb-12" style={{ color: "var(--fg-primary)" }}>
                What we build with.
              </h2>

              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="tech-chip flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-default"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--orange-border)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--orange)" }} />
                    <span className="font-syne font-bold text-[13px] tracking-tight" style={{ color: "var(--fg-primary)" }}>
                      {tech.name}
                    </span>
                    <span
                      className="text-[9px] font-medium tracking-[0.08em] px-1.5 py-0.5 rounded-md"
                      style={{ background: "var(--bg-tertiary)", color: "var(--fg-faint)" }}
                    >
                      {tech.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── WHY NDD ──────────────────────────────────────────────────── */}
          <section className="py-24 lg:py-32" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
                Why us
              </p>
              <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,48px)] tracking-tight leading-[1] mb-14" style={{ color: "var(--fg-primary)" }}>
                Why clients choose<br />
                <span style={{ color: "var(--orange)" }}>NDD.Studio.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
                {[
                  {
                    title: "We're lean by design",
                    desc: "No bloated team, no unnecessary layers. You work directly with the person doing the work. Faster decisions, faster output.",
                    icon: "⚡",
                  },
                  {
                    title: "Fixed pricing, always",
                    desc: "We quote upfront. No hourly billing surprises, no change order games. What we say is what you pay.",
                    icon: "🔒",
                  },
                  {
                    title: "Results you can measure",
                    desc: "We track rankings, conversion rates, app downloads, load times. Everything is tied to a number that actually matters to your business.",
                    icon: "📈",
                  },
                  {
                    title: "Long-term thinking",
                    desc: "We build things that last. Scalable code, clean architecture, SEO foundations — not quick hacks that break in six months.",
                    icon: "🌱",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-8 group transition-colors duration-200"
                    style={{ background: "var(--bg-secondary)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)")}
                  >
                    <div className="text-2xl mb-4">{item.icon}</div>
                    <h3 className="font-syne font-extrabold text-[16px] tracking-tight mb-2" style={{ color: "var(--fg-primary)" }}>
                      {item.title}
                    </h3>
                    <p className="text-[12px] font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <section className="py-24" style={{ background: "var(--orange)" }}>
            <div className="about-cta-block max-w-7xl mx-auto px-6 lg:px-8 text-center">
              <div className="flex justify-center mb-6">
                <Logo size={52} variant="on-orange" />
              </div>
              <h2 className="font-syne font-extrabold text-[clamp(32px,5vw,56px)] leading-[1] tracking-tight text-white mb-4">
                Let&apos;s build something<br />you&apos;re proud of.
              </h2>
              <p className="text-white/70 text-[14px] font-light max-w-md mx-auto mb-8 leading-relaxed">
                No fluff, no lengthy proposals. Just a quick conversation about what you need —
                and we&apos;ll tell you exactly how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/#contact"
                  className="bg-white font-bold text-[13px] px-7 py-3.5 rounded-lg transition-all duration-200 hover:bg-white/90 hover:scale-[1.03]"
                  style={{ color: "var(--orange)" }}
                >
                  Start a project →
                </Link>
                <Link
                  href="/"
                  className="border border-white/40 text-white font-light text-[13px] px-7 py-3.5 rounded-lg hover:border-white/80 hover:scale-[1.02] transition-all duration-200"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
