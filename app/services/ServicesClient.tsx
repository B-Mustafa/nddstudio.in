"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: "seo",
    number: "01",
    title: "SEO",
    tagline: "Be found. Stay found.",
    color: "#E8630A",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    summary: "Rank higher, get found faster. We handle everything from on-page optimisation to technical audits and local SEO — so your ideal customers find you, not your competitors.",
    deliverables: [
      "Full technical SEO audit",
      "On-page optimisation",
      "Keyword research & strategy",
      "Local SEO & Google Business",
      "Backlink building",
      "Core Web Vitals fixes",
      "Monthly ranking reports",
    ],
    process: [
      { step: "Audit", desc: "We analyse your current rankings, site structure, and competitors." },
      { step: "Strategy", desc: "Build a keyword map and content plan targeted at your actual customers." },
      { step: "Optimise", desc: "Fix technical issues, rewrite meta, restructure pages for search intent." },
      { step: "Build", desc: "Create content and earn backlinks that grow domain authority." },
      { step: "Report", desc: "Monthly reports showing ranking movement, traffic, and conversions." },
    ],
    results: ["Page 4 → #2 in 60 days", "3× organic traffic", "40% more leads from search"],
    timeline: "Results visible in 30–90 days",
    startingAt: "₹15,000/mo",
  },
  {
    id: "web",
    number: "02",
    title: "Website Design & Dev",
    tagline: "Fast, beautiful, built to convert.",
    color: "#5E6AD2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    summary: "Websites built in Next.js or Webflow that load in under 2 seconds, look incredible on every device, and are designed with one goal — turning visitors into customers.",
    deliverables: [
      "UI/UX design in Figma",
      "Next.js or Webflow development",
      "Mobile-first, responsive layout",
      "CMS integration",
      "SEO-ready structure",
      "Performance optimisation (98+ Lighthouse)",
      "3 months post-launch support",
    ],
    process: [
      { step: "Discovery", desc: "Understand your goals, audience, and what success looks like." },
      { step: "Design", desc: "Wireframes → high-fidelity Figma mockups. You approve before we build." },
      { step: "Build", desc: "Clean, scalable code. Daily updates so you always know where we're at." },
      { step: "Test", desc: "Cross-device testing, performance audits, accessibility checks." },
      { step: "Launch", desc: "Go live + handover walkthrough so you can manage your own site." },
    ],
    results: ["40% more conversions post-redesign", "98 Lighthouse score", "Launched in 3 weeks"],
    timeline: "2–5 weeks from kickoff",
    startingAt: "₹30,000",
  },
  {
    id: "apps",
    number: "03",
    title: "App Development",
    tagline: "From idea to App Store, fast.",
    color: "#1DA8A0",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
      </svg>
    ),
    summary: "iOS, Android, and cross-platform apps that users actually want to keep. We handle product thinking, design, development, and App Store submission — end to end.",
    deliverables: [
      "Product scoping & wireframes",
      "React Native or Flutter development",
      "iOS & Android builds",
      "Backend API development",
      "App Store & Play Store submission",
      "Push notifications & analytics",
      "Post-launch maintenance",
    ],
    process: [
      { step: "Scope", desc: "Define the MVP — what's essential for launch vs. what can wait." },
      { step: "Design", desc: "Full UI/UX in Figma. Native patterns for iOS and Android." },
      { step: "Build", desc: "Sprint-based development with weekly demos you can actually interact with." },
      { step: "Test", desc: "Beta testing, crash reporting, performance profiling on real devices." },
      { step: "Ship", desc: "App Store and Play Store submission, then v1 is live." },
    ],
    results: ["10k+ downloads in 90 days", "4.7★ App Store rating", "Shipped in 6 weeks"],
    timeline: "4–10 weeks from kickoff",
    startingAt: "₹80,000",
  },
  {
    id: "design",
    number: "04",
    title: "UI / UX Design",
    tagline: "Interfaces people actually enjoy.",
    color: "#E84393",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    summary: "Clean, intentional design that guides users where you need them. From user research to polished Figma files ready for any developer — we make complex products feel simple.",
    deliverables: [
      "User research & personas",
      "Information architecture",
      "Wireframes & prototypes",
      "High-fidelity Figma designs",
      "Design system & component library",
      "Interaction specs for developers",
      "Usability testing",
    ],
    process: [
      { step: "Research", desc: "User interviews, competitor audits, and heatmap analysis." },
      { step: "Architecture", desc: "Sitemap, user flows, and information hierarchy." },
      { step: "Wireframe", desc: "Low-fidelity layouts to test structure before any styling." },
      { step: "Design", desc: "High-fidelity screens with your brand applied at every pixel." },
      { step: "Handoff", desc: "Developer-ready Figma with specs, assets, and a design system." },
    ],
    results: ["30% lower bounce rate", "2× time on site", "User testing scored 9.1/10"],
    timeline: "1–3 weeks per project",
    startingAt: "₹20,000",
  },
  {
    id: "brand",
    number: "05",
    title: "Brand & Graphic Design",
    tagline: "Look the part. Everywhere.",
    color: "#F4935A",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    summary: "Your brand is your first impression. We build identities that look sharp on a business card, a website, a billboard, and an Instagram story — consistent and unmistakeable everywhere.",
    deliverables: [
      "Logo design (3 concepts)",
      "Brand guidelines document",
      "Color system & typography",
      "Business card & stationery",
      "Social media templates",
      "Presentation template",
      "All files in every format",
    ],
    process: [
      { step: "Brief", desc: "Understand your brand positioning, audience, and competitors." },
      { step: "Concepts", desc: "Three distinct logo directions — we present rationale, not just visuals." },
      { step: "Refine", desc: "Two rounds of revisions on your chosen direction." },
      { step: "System", desc: "Build the full identity — colors, typography, usage rules." },
      { step: "Deliver", desc: "Every file format you'll ever need, organised and ready to use." },
    ],
    results: ["Used by 50+ businesses", "Brand kit in 5 days", "Zero revision disputes"],
    timeline: "5–10 business days",
    startingAt: "₹12,000",
  },
  {
    id: "marketing",
    number: "06",
    title: "Digital Marketing",
    tagline: "Growth that compounds.",
    color: "#28C840",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    summary: "Google Ads, Meta campaigns, and content strategy that generates real leads — not just impressions. Every rupee tracked, every campaign optimised for cost-per-acquisition.",
    deliverables: [
      "Google Ads setup & management",
      "Meta (Facebook/Instagram) ads",
      "Campaign strategy & creative",
      "A/B testing & optimisation",
      "Conversion tracking setup",
      "Monthly performance reports",
      "Competitor ad intelligence",
    ],
    process: [
      { step: "Audit", desc: "Review current spend, tracking, and what's actually working." },
      { step: "Strategy", desc: "Define target audience, funnel, and budget allocation." },
      { step: "Launch", desc: "Build campaigns, creatives, and tracking from scratch." },
      { step: "Optimise", desc: "Weekly bid adjustments, creative testing, audience refinement." },
      { step: "Report", desc: "Monthly report with spend, CPA, ROAS, and recommendations." },
    ],
    results: ["3.2× ROAS on Meta", "CPA down 55%", "₹2L budget → ₹6.5L revenue"],
    timeline: "Campaigns live in 5–7 days",
    startingAt: "₹20,000/mo",
  },
];

const faqs = [
  {
    q: "Do you work with small businesses and startups?",
    a: "Yes — most of our clients are small businesses, local brands, and early-stage startups. We've built pricing to match. You don't need a big budget to get professional digital work.",
  },
  {
    q: "What's your typical timeline?",
    a: "It varies by service. A brand identity takes 5–10 days. A website takes 2–5 weeks. An app takes 4–10 weeks. We always give you a fixed deadline before starting and we hit it.",
  },
  {
    q: "Do you offer packages or bundles?",
    a: "Yes. Most clients bundle 2–3 services (e.g. Brand + Website, or Website + SEO). Bundled projects get a 10–15% discount. Just mention it in your enquiry.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A 30-minute discovery call, answers to a short brief, and the first payment. That's it. No lengthy onboarding, no 40-page questionnaires.",
  },
  {
    q: "Do you work with clients outside Gujarat?",
    a: "Absolutely — we work 100% remotely. Clients across India, and internationally. Time zones haven't been an issue.",
  },
  {
    q: "What happens after the project is delivered?",
    a: "Every project includes post-launch support (duration varies by service). After that, we offer retainer packages for ongoing SEO, marketing, or maintenance.",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function ServicesClient() {
  const pageRef    = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(services[0].id);
  const [openFaq, setOpenFaq]             = useState<number | null>(null);

  const activeData = services.find((s) => s.id === activeService)!;

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".srv-eyebrow",  { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
        .from(".srv-h1-1",     { opacity: 0, y: 70, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .from(".srv-h1-2",     { opacity: 0, y: 70, duration: 0.9, ease: "power3.out" }, "-=0.65")
        .from(".srv-hero-sub", { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".srv-hero-cta", { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" }, "-=0.4");

      // Glow parallax
      gsap.to(".srv-glow", {
        y: -80, ease: "none",
        scrollTrigger: { trigger: ".srv-hero", start: "top top", end: "bottom top", scrub: 1.5 },
      });

      // ── Service cards grid
      gsap.set(".srv-card", { opacity: 0, y: 48 });
      ScrollTrigger.create({
        trigger: ".srv-cards-grid",
        start: "top bottom",
        once: true,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(".srv-card", {
            opacity: 1, y: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: "power3.out",
          });
        },
      });

      // ── Deep dive section
      gsap.from(".deepdive-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".deepdive-header", start: "top 85%", once: true },
      });

      // ── Detail panel slide in
      gsap.from(".detail-panel", {
        opacity: 0, x: 40, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".detail-panel", start: "top 85%", once: true },
      });

      // ── Process steps
      gsap.set(".process-step-item", { opacity: 0, x: -24 });
      ScrollTrigger.create({
        trigger: ".process-steps",
        start: "top bottom",
        once: true,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(".process-step-item", {
            opacity: 1, x: 0,
            stagger: 0.1,
            duration: 0.55,
            ease: "power3.out",
          });
        },
      });

      // ── FAQ items
      gsap.set(".faq-item", { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: ".faq-list",
        start: "top bottom",
        once: true,
        invalidateOnRefresh: true,
        onEnter: () => {
          gsap.to(".faq-item", {
            opacity: 1, y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });

      // ── CTA section
      gsap.from(".srv-cta-block", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".srv-cta-block", start: "top 88%", once: true },
      });

      // Refresh after Lenis syncs
      setTimeout(() => ScrollTrigger.refresh(), 300);

    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animate detail panel on service switch
  const panelRef = useRef<HTMLDivElement>(null);
  const handleServiceSwitch = (id: string) => {
    if (id === activeService) return;
    gsap.to(panelRef.current, {
      opacity: 0, y: 12, duration: 0.18, ease: "power2.in",
      onComplete: () => {
        setActiveService(id);
        gsap.to(panelRef.current, { opacity: 1, y: 0, duration: 0.32, ease: "power3.out" });
      },
    });
  };

  // FAQ toggle animation
  const toggleFaq = (i: number) => {
    const isOpen = openFaq === i;
    setOpenFaq(isOpen ? null : i);
  };

  return (
    <>
      <Cursor />
      <div ref={pageRef}>
        <Navbar />
        <main>

          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <section
            className="srv-hero relative min-h-[65vh] flex items-center overflow-hidden pt-16"
            style={{ background: "var(--bg-primary)" }}
          >
            <div
              className="srv-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 800, height: 400, background: "radial-gradient(ellipse, var(--orange-glow) 0%, transparent 70%)" }}
            />
            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/4 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
              <div className="absolute left-3/4 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "var(--border)" }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
              <div
                className="srv-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10"
                style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--orange)" }} />
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase" style={{ color: "var(--orange-light)" }}>
                  What we do
                </span>
              </div>

              <h1 className="font-syne font-extrabold leading-[0.92] tracking-tight mb-6">
                <span className="srv-h1-1 block text-[clamp(44px,8vw,96px)]" style={{ color: "var(--fg-primary)" }}>
                  Six services.
                </span>
                <span className="srv-h1-2 block text-[clamp(44px,8vw,96px)]" style={{ color: "var(--orange)" }}>
                  One studio.
                </span>
              </h1>

              <p className="srv-hero-sub text-[15px] lg:text-[18px] font-light leading-relaxed max-w-xl mb-10" style={{ color: "var(--fg-muted)" }}>
                Every digital service your business needs — under one roof, with one point of contact,
                and zero subcontracting. What you see is exactly what you get.
              </p>

              <div className="srv-hero-cta flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="text-white text-[13px] font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
                  style={{ background: "var(--orange)" }}
                >
                  Get a free quote →
                </Link>
                <a
                  href="#services-detail"
                  className="text-[13px] font-light px-6 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  style={{ border: "1.5px solid var(--border-strong)", color: "var(--fg-primary)" }}
                >
                  Explore services ↓
                </a>
              </div>
            </div>
          </section>

          {/* ── SERVICES OVERVIEW GRID ────────────────────────────────────── */}
          <section className="py-24 lg:py-28" style={{ background: "var(--bg-secondary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="srv-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => {
                      handleServiceSwitch(svc.id);
                      document.getElementById("services-detail")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="srv-card text-left rounded-xl p-6 group transition-all duration-300"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = `${svc.color}40`;
                      el.style.background = "var(--bg-tertiary)";
                      gsap.to(el.querySelector(".svc-num"), { color: svc.color, duration: 0.2 });
                      gsap.to(el.querySelector(".svc-icon-wrap"), { color: svc.color, duration: 0.2 });
                      gsap.to(el.querySelector(".svc-arrow"), { x: 4, y: -4, opacity: 1, duration: 0.25, ease: "power2.out" });
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--border)";
                      el.style.background = "var(--bg-card)";
                      gsap.to(el.querySelector(".svc-num"), { color: "var(--fg-faintest)", duration: 0.2 });
                      gsap.to(el.querySelector(".svc-icon-wrap"), { color: "var(--fg-muted)", duration: 0.2 });
                      gsap.to(el.querySelector(".svc-arrow"), { x: 0, y: 0, opacity: 0.4, duration: 0.2 });
                    }}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-5">
                      <span
                        className="svc-num font-syne font-extrabold text-[40px] leading-none"
                        style={{ color: "var(--fg-faintest, rgba(255,255,255,0.06))" }}
                      >
                        {svc.number}
                      </span>
                      <svg
                        className="svc-arrow mt-1"
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        style={{ color: "var(--fg-muted)", opacity: 0.4 }}
                      >
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>

                    {/* Icon */}
                    <div className="svc-icon-wrap mb-4" style={{ color: "var(--fg-muted)" }}>
                      {svc.icon}
                    </div>

                    {/* Title & tagline */}
                    <h3 className="font-syne font-extrabold text-[17px] tracking-tight mb-1.5" style={{ color: "var(--fg-primary)" }}>
                      {svc.title}
                    </h3>
                    <p className="text-[11px] font-light leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                      {svc.tagline}
                    </p>

                    {/* Summary */}
                    <p className="text-[11px] font-light leading-relaxed mb-5" style={{ color: "var(--fg-muted)" }}>
                      {svc.summary.split(" ").slice(0, 18).join(" ")}…
                    </p>

                    {/* Starting at */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium tracking-wide" style={{ color: "var(--fg-faint)" }}>
                        From
                      </span>
                      <span className="font-syne font-extrabold text-[13px]" style={{ color: svc.color }}>
                        {svc.startingAt}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── SERVICE DETAIL (tabbed) ───────────────────────────────────── */}
          <section id="services-detail" className="py-24 lg:py-32" style={{ background: "var(--bg-primary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="deepdive-header mb-12">
                <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
                  Service deep dive
                </p>
                <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,48px)] tracking-tight leading-[1]" style={{ color: "var(--fg-primary)" }}>
                  Everything you need to know<br />
                  <span style={{ color: "var(--fg-muted)" }}>before you decide.</span>
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">

                {/* Left: service tabs */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible flex-shrink-0 lg:w-52 pb-2 lg:pb-0">
                  {services.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => handleServiceSwitch(svc.id)}
                      className="flex-shrink-0 text-left px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap lg:whitespace-normal"
                      style={{
                        background: activeService === svc.id ? `${svc.color}15` : "transparent",
                        border: `1px solid ${activeService === svc.id ? `${svc.color}35` : "var(--border)"}`,
                      }}
                      onMouseEnter={(e) => {
                        if (activeService !== svc.id)
                          (e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)";
                      }}
                      onMouseLeave={(e) => {
                        if (activeService !== svc.id)
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      <div
                        className="font-syne font-extrabold text-[13px] tracking-tight"
                        style={{ color: activeService === svc.id ? svc.color : "var(--fg-secondary)" }}
                      >
                        {svc.title}
                      </div>
                      <div className="text-[10px] font-light mt-0.5" style={{ color: "var(--fg-faint)" }}>
                        {svc.number}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right: detail panel */}
                <div ref={panelRef} className="detail-panel flex-1 min-w-0">
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
                  >
                    {/* Header */}
                    <div
                      className="px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      style={{ borderBottom: "1px solid var(--border)", background: `${activeData.color}0d` }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${activeData.color}20`, border: `1px solid ${activeData.color}35`, color: activeData.color }}
                        >
                          {activeData.icon}
                        </div>
                        <div>
                          <div className="font-syne font-extrabold text-[20px] tracking-tight" style={{ color: "var(--fg-primary)" }}>
                            {activeData.title}
                          </div>
                          <div className="text-[12px] font-light" style={{ color: activeData.color }}>
                            {activeData.tagline}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-[9px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--fg-faint)" }}>Starting at</div>
                          <div className="font-syne font-extrabold text-[18px]" style={{ color: activeData.color }}>
                            {activeData.startingAt}
                          </div>
                        </div>
                        <Link
                          href="/#contact"
                          className="text-white text-[12px] font-medium px-4 py-2.5 rounded-lg whitespace-nowrap transition-all hover:scale-[1.03]"
                          style={{ background: activeData.color }}
                        >
                          Get a quote
                        </Link>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-7 grid grid-cols-1 lg:grid-cols-2 gap-8">

                      {/* Summary + deliverables */}
                      <div>
                        <p className="text-[13px] font-light leading-relaxed mb-6" style={{ color: "var(--fg-secondary)" }}>
                          {activeData.summary}
                        </p>

                        <div className="mb-6">
                          <div className="text-[9px] font-medium tracking-[0.14em] uppercase mb-3" style={{ color: "var(--fg-faint)" }}>
                            What's included
                          </div>
                          <ul className="flex flex-col gap-2">
                            {activeData.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-2.5 text-[12px] font-light" style={{ color: "var(--fg-secondary)" }}>
                                <svg
                                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                  className="flex-shrink-0 mt-0.5"
                                  style={{ color: activeData.color }}
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Timeline + results */}
                        <div
                          className="rounded-xl p-4 flex flex-col gap-3"
                          style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}
                        >
                          <div className="flex items-center gap-2">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: activeData.color }}>
                              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span className="text-[11px] font-medium" style={{ color: "var(--fg-primary)" }}>
                              {activeData.timeline}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {activeData.results.map((r) => (
                              <div key={r} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: activeData.color }} />
                                <span className="text-[11px] font-light" style={{ color: "var(--fg-muted)" }}>{r}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Process steps */}
                      <div>
                        <div className="text-[9px] font-medium tracking-[0.14em] uppercase mb-4" style={{ color: "var(--fg-faint)" }}>
                          Our process
                        </div>
                        <div className="process-steps flex flex-col gap-0">
                          {activeData.process.map((p, i) => (
                            <div key={p.step} className="process-step-item flex gap-4 pb-5 last:pb-0 relative">
                              {/* Connector line */}
                              {i < activeData.process.length - 1 && (
                                <div
                                  className="absolute left-[15px] top-8 bottom-0 w-px"
                                  style={{ background: `${activeData.color}25` }}
                                />
                              )}
                              {/* Step dot */}
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center font-syne font-extrabold text-[10px] flex-shrink-0 relative z-10"
                                style={{
                                  background: `${activeData.color}15`,
                                  border: `1.5px solid ${activeData.color}35`,
                                  color: activeData.color,
                                }}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </div>
                              <div className="pt-1">
                                <div className="font-syne font-extrabold text-[13px] tracking-tight mb-0.5" style={{ color: "var(--fg-primary)" }}>
                                  {p.step}
                                </div>
                                <div className="text-[11px] font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                                  {p.desc}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div
                          className="mt-6 p-4 rounded-xl flex items-center justify-between gap-4"
                          style={{ background: `${activeData.color}10`, border: `1px solid ${activeData.color}25` }}
                        >
                          <p className="text-[11px] font-light" style={{ color: "var(--fg-muted)" }}>
                            Ready to get started with{" "}
                            <span style={{ color: "var(--fg-primary)" }}>{activeData.title}</span>?
                          </p>
                          <Link
                            href="/#contact"
                            className="flex-shrink-0 text-white text-[11px] font-medium px-4 py-2 rounded-lg transition-all hover:scale-[1.03]"
                            style={{ background: activeData.color }}
                          >
                            Let&apos;s talk
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── BUNDLES ───────────────────────────────────────────────────── */}
          <section className="py-24 lg:py-28" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
                    Popular combos
                  </p>
                  <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,44px)] tracking-tight leading-[1]" style={{ color: "var(--fg-primary)" }}>
                    Most clients bundle.<br />
                    <span style={{ color: "var(--fg-muted)" }}>You save 10–15%.</span>
                  </h2>
                </div>
                <p className="text-[12px] font-light max-w-xs text-right hidden sm:block" style={{ color: "var(--fg-faint)" }}>
                  Mix and match services. We'll quote you the bundled rate on the discovery call.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "Launch kit",
                    services: ["Brand & Graphic Design", "Website Design & Dev"],
                    desc: "Everything a new business needs to look professional and get online — fast.",
                    save: "Save ₹5,000",
                    color: "#E8630A",
                    popular: true,
                  },
                  {
                    name: "Growth bundle",
                    services: ["Website Design & Dev", "SEO"],
                    desc: "A high-performance website + SEO that compounds. Best for businesses ready to scale organic traffic.",
                    save: "Save ₹7,000",
                    color: "#5E6AD2",
                    popular: false,
                  },
                  {
                    name: "Full digital",
                    services: ["Website", "SEO", "Digital Marketing"],
                    desc: "The complete digital stack. Covers search, paid, and owned — your entire online presence managed.",
                    save: "Save ₹12,000",
                    color: "#1DA8A0",
                    popular: false,
                  },
                ].map((bundle) => (
                  <div
                    key={bundle.name}
                    className="rounded-xl p-6 relative transition-all duration-300"
                    style={{
                      background: bundle.popular ? `${bundle.color}10` : "var(--bg-card)",
                      border: `1px solid ${bundle.popular ? `${bundle.color}35` : "var(--border)"}`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {bundle.popular && (
                      <div
                        className="absolute -top-3 left-6 text-white text-[9px] font-medium px-3 py-1 rounded-full tracking-[0.1em] uppercase"
                        style={{ background: bundle.color }}
                      >
                        Most popular
                      </div>
                    )}
                    <div className="font-syne font-extrabold text-[17px] mb-2 tracking-tight" style={{ color: "var(--fg-primary)" }}>
                      {bundle.name}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {bundle.services.map((s) => (
                        <span
                          key={s}
                          className="text-[9px] font-medium px-2 py-0.5 rounded-md tracking-[0.06em]"
                          style={{ background: `${bundle.color}15`, color: bundle.color, border: `1px solid ${bundle.color}25` }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-[12px] font-light leading-relaxed mb-5" style={{ color: "var(--fg-muted)" }}>
                      {bundle.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium" style={{ color: bundle.color }}>
                        {bundle.save}
                      </span>
                      <Link
                        href="/#contact"
                        className="text-[11px] font-medium px-4 py-2 rounded-lg transition-all hover:scale-[1.03]"
                        style={{ border: `1px solid ${bundle.color}35`, color: bundle.color }}
                      >
                        Enquire →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────────── */}
          <section className="py-24 lg:py-32" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
                FAQ
              </p>
              <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,44px)] tracking-tight leading-[1] mb-12" style={{ color: "var(--fg-primary)" }}>
                Questions people<br />
                <span style={{ color: "var(--fg-muted)" }}>actually ask.</span>
              </h2>

              <div className="faq-list flex flex-col gap-0">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="faq-item"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <button
                      className="w-full flex items-start justify-between gap-6 py-5 text-left"
                      onClick={() => toggleFaq(i)}
                    >
                      <span className="font-syne font-bold text-[14px] tracking-tight leading-snug" style={{ color: "var(--fg-primary)" }}>
                        {faq.q}
                      </span>
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                        style={{
                          background: openFaq === i ? "var(--orange)" : "var(--bg-tertiary)",
                          border: `1px solid ${openFaq === i ? "var(--orange)" : "var(--border)"}`,
                          transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: openFaq === i ? "200px" : "0" }}
                    >
                      <p
                        className="text-[13px] font-light leading-relaxed pb-5"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────────────────────────── */}
          <section className="py-24" style={{ background: "var(--orange)" }}>
            <div className="srv-cta-block max-w-7xl mx-auto px-6 lg:px-8 text-center relative overflow-hidden">
              <div
                className="absolute right-[-40px] top-1/2 -translate-y-1/2 font-syne font-extrabold pointer-events-none select-none"
                style={{ fontSize: "200px", color: "rgba(255,255,255,0.05)", lineHeight: 1 }}
                aria-hidden
              >
                NDD
              </div>
              <div className="relative">
                <h2 className="font-syne font-extrabold text-[clamp(32px,5vw,60px)] leading-[1] tracking-tight text-white mb-4">
                  Not sure which service<br />you need?
                </h2>
                <p className="text-white/70 text-[14px] font-light max-w-md mx-auto mb-8 leading-relaxed">
                  Tell us about your business and goals. We'll tell you exactly what to focus on — no sales pitch, just honest advice.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/#contact"
                    className="bg-white font-bold text-[13px] px-7 py-3.5 rounded-lg transition-all hover:bg-white/90 hover:scale-[1.03]"
                    style={{ color: "var(--orange)" }}
                  >
                    Talk to us — it&apos;s free →
                  </Link>
                  <Link
                    href="/about"
                    className="border border-white/40 text-white font-light text-[13px] px-7 py-3.5 rounded-lg hover:border-white/80 hover:scale-[1.02] transition-all"
                  >
                    Learn about us first
                  </Link>
                </div>
                <p className="text-white/40 text-[11px] mt-5">
                  Free 30-minute call · No commitment · Response within 24 hours
                </p>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
