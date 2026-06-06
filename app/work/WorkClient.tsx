"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  type: string;
  year: string;
  color: string;
  summary: string;
  scope: string[];
  stats: { label: string; value: string }[];
  tags: string[];
  category: "Web" | "SEO" | "App" | "Brand";
  url: string;
  location: string;
};

const projects: Project[] = [
  {
    id: "godhrajamaat",
    title: "Godhra Jamaat",
    type: "Community organisation",
    year: "2024",
    color: "#E8630A",
    url: "https://godhrajamaat.org",
    location: "Godhra, Gujarat",
    summary:
      "A full digital presence for Godhra's prominent community organisation — clean, fast, and accessible to every age group. Built to inform, engage, and serve thousands of community members.",
    scope: ["Website design", "Next.js build", "CMS setup", "Mobile-first"],
    stats: [
      { label: "Load time", value: "1.4s" },
      { label: "Lighthouse", value: "96" },
      { label: "Launch", value: "14d" },
    ],
    tags: ["Next.js", "Web Design", "Community"],
    category: "Web",
  },
  {
    id: "bintelsoor",
    title: "Bintelsoor",
    type: "Kids fashion e-commerce",
    year: "2025",
    color: "#E84393",
    url: "https://bintelsoor.com",
    location: "Kuwait",
    summary:
      "A Shopify e-commerce store for a Kuwait-based kids clothing brand — built with clean product discovery, mobile-optimised checkout, and SEO foundations across every collection page.",
    scope: ["Shopify setup", "UI design", "Product SEO", "Mobile UX"],
    stats: [
      { label: "Products", value: "200+" },
      { label: "Countries", value: "3" },
      { label: "Launch", value: "18d" },
    ],
    tags: ["Shopify", "E-commerce", "SEO"],
    category: "Web",
  },
  {
    id: "ibestfze",
    title: "I Best FZE",
    type: "B2B warehouse solutions",
    year: "2025",
    color: "#5E6AD2",
    url: "https://ibestfze.com",
    location: "UAE",
    summary:
      "A Shopify B2B storefront for a UAE-based warehouse shelving and racking company. Heavy-duty product catalogue, custom quote flow, and professional brand presentation for industrial buyers.",
    scope: ["Shopify build", "Product catalogue", "B2B UX", "Brand design"],
    stats: [
      { label: "SKUs", value: "150+" },
      { label: "Lighthouse", value: "94" },
      { label: "Market", value: "UAE" },
    ],
    tags: ["Shopify", "B2B", "Web Design"],
    category: "Web",
  },
  {
    id: "saifee",
    title: "Saifee Homeopathy",
    type: "Patient health tracker",
    year: "2024",
    color: "#1DA8A0",
    url: "https://saifeehomeopathy-tracker.vercel.app",
    location: "India",
    summary:
      "A web-based patient health tracker for a homeopathy clinic — doctors log consultations, patients track symptoms and prescriptions over time. Clean, distraction-free medical UI.",
    scope: ["UX design", "React app", "Data tracking", "Doctor dashboard"],
    stats: [
      { label: "Modules", value: "6" },
      { label: "Users", value: "Active" },
      { label: "Build", value: "4w" },
    ],
    tags: ["React", "Health Tech", "Dashboard"],
    category: "App",
  },
  {
    id: "bareeq",
    title: "Digital Bareeq",
    type: "Digital marketing agency",
    year: "2024",
    color: "#F4935A",
    url: "https://bareeq.vercel.app",
    location: "International",
    summary:
      "A high-conversion agency website for Digital Bareeq — built to showcase ROI-focused marketing services. Fast, sharp, and designed to convert cold traffic into enquiries.",
    scope: ["Website design", "Next.js build", "Copywriting", "Conversion UX"],
    stats: [
      { label: "Lighthouse", value: "97" },
      { label: "Launch", value: "12d" },
      { label: "Stack", value: "Next.js" },
    ],
    tags: ["Next.js", "Agency", "Web Design"],
    category: "Web",
  },
];

const filters = ["All", "Web", "App", "Brand"] as const;

export default function WorkClient() {
  const pageRef   = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const iframeRef  = useRef<HTMLIFrameElement>(null);

  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [featuredId, setFeaturedId]     = useState(projects[0].id);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [iframeKey, setIframeKey]       = useState(0);

  const visibleProjects = useMemo(
    () => projects.filter(p => activeFilter === "All" || p.category === activeFilter),
    [activeFilter]
  );
  const featured = projects.find(p => p.id === featuredId) ?? projects[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".work-eyebrow", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
        .from(".work-h1-1",    { opacity: 0, y: 70, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .from(".work-h1-2",    { opacity: 0, y: 70, duration: 0.9, ease: "power3.out" }, "-=0.65")
        .from(".work-hero-sub", { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".work-hero-stat", { opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: "power3.out" }, "-=0.4");

      gsap.to(".work-glow", {
        y: -90, ease: "none",
        scrollTrigger: { trigger: ".work-hero", start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.from(".featured-panel", {
        opacity: 0, y: 44, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".featured-panel", start: "top 82%", once: true },
      });
      gsap.set(".case-card", { opacity: 0, y: 36 });
      ScrollTrigger.create({
        trigger: ".case-grid", start: "top bottom", once: true, invalidateOnRefresh: true,
        onEnter: () => gsap.to(".case-card", { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }),
      });
      gsap.from(".work-process-item", {
        opacity: 0, x: -24, stagger: 0.1, duration: 0.55, ease: "power3.out",
        scrollTrigger: { trigger: ".work-process", start: "top 82%", once: true },
      });
      gsap.from(".work-cta-block", {
        opacity: 0, y: 42, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".work-cta-block", start: "top 88%", once: true },
      });
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!visibleProjects.some(p => p.id === featuredId)) {
      setFeaturedId(visibleProjects[0]?.id ?? projects[0].id);
    }
  }, [featuredId, visibleProjects]);

  const switchProject = (p: Project) => {
    if (p.id === featuredId) return;
    gsap.to(".featured-panel", {
      opacity: 0, y: 14, duration: 0.18, ease: "power2.in",
      onComplete: () => {
        setFeaturedId(p.id);
        setIframeLoading(true);
        setIframeKey(k => k + 1);
        gsap.to(".featured-panel", { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" });
      },
    });
  };

  return (
    <>
      <Cursor />
      <div ref={pageRef}>
        <Navbar />
        <main>

          {/* ── HERO */}
          <section className="work-hero relative min-h-[68vh] flex items-center overflow-hidden pt-16"
            style={{ background: "var(--bg-primary)" }}>
            <div className="work-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 760, height: 420, background: "radial-gradient(ellipse, var(--orange-glow) 0%, transparent 70%)" }}/>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/4 top-0 bottom-0 w-px"  style={{ background: "var(--border)" }}/>
              <div className="absolute left-1/2 top-0 bottom-0 w-px"  style={{ background: "var(--border)" }}/>
              <div className="absolute left-3/4 top-0 bottom-0 w-px"  style={{ background: "var(--border)" }}/>
              <div className="absolute top-1/2 left-0 right-0 h-px"   style={{ background: "var(--border)" }}/>
            </div>
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
              <div className="work-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10"
                style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--orange)" }}/>
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase" style={{ color: "var(--orange-light)" }}>Selected work</span>
              </div>
              <h1 className="font-syne font-extrabold leading-[0.92] tracking-tight mb-6">
                <span className="work-h1-1 block text-[clamp(46px,8vw,100px)]" style={{ color: "var(--fg-primary)" }}>Proof over</span>
                <span className="work-h1-2 block text-[clamp(46px,8vw,100px)]" style={{ color: "var(--orange)" }}>promises.</span>
              </h1>
              <p className="work-hero-sub text-[15px] lg:text-[18px] font-light leading-relaxed max-w-xl mb-12" style={{ color: "var(--fg-muted)" }}>
                Real websites, real apps, real results — built for businesses across India, Kuwait, UAE, and beyond. Click any project to preview it live.
              </p>
              <div className="flex flex-wrap gap-10">
                {[
                  { value: "5+",  label: "Live projects" },
                  { value: "3",   label: "Countries served" },
                  { value: "97",  label: "Top Lighthouse score" },
                  { value: "0",   label: "Missed deadlines" },
                ].map(stat => (
                  <div key={stat.label} className="work-hero-stat">
                    <div className="font-syne font-extrabold text-[30px] leading-none" style={{ color: "var(--orange)" }}>{stat.value}</div>
                    <div className="text-[10px] mt-1 tracking-wide font-light" style={{ color: "var(--fg-faint)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CASE STUDIES + LIVE PREVIEW */}
          <section className="py-20 lg:py-28" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>Case studies</p>
                  <h2 className="font-syne font-extrabold text-[clamp(30px,4.6vw,54px)] leading-[1] tracking-tight" style={{ color: "var(--fg-primary)" }}>
                    Work that had a job<br/><span style={{ color: "var(--fg-muted)" }}>and did it well.</span>
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map(filter => (
                    <button key={filter} onClick={() => setActiveFilter(filter)}
                      className="text-[11px] font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.03]"
                      style={{ background: activeFilter === filter ? "var(--orange)" : "var(--bg-card)", border: `1px solid ${activeFilter === filter ? "var(--orange)" : "var(--border)"}`, color: activeFilter === filter ? "white" : "var(--fg-muted)" }}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured: detail left + live iframe right */}
              <div className="featured-panel grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] overflow-hidden rounded-2xl mb-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>

                {/* Left: project info */}
                <div className="p-6 lg:p-8 flex flex-col min-h-[460px]">
                  <div className="flex items-start justify-between gap-5 mb-6">
                    <div>
                      <div className="text-[10px] font-medium tracking-[0.14em] uppercase mb-3" style={{ color: featured.color }}>
                        Featured · {featured.location}
                      </div>
                      <h3 className="font-syne font-extrabold text-[clamp(26px,3.5vw,44px)] leading-[1] tracking-tight" style={{ color: "var(--fg-primary)" }}>
                        {featured.title}
                      </h3>
                      <p className="text-[13px] font-light mt-2" style={{ color: "var(--fg-faint)" }}>
                        {featured.type} / {featured.year}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium px-3 py-1 rounded-full tracking-[0.1em] uppercase flex-shrink-0"
                      style={{ background: `${featured.color}15`, border: `1px solid ${featured.color}30`, color: featured.color }}>
                      {featured.category}
                    </span>
                  </div>

                  <p className="text-[14px] font-light leading-relaxed mb-7" style={{ color: "var(--fg-secondary)" }}>
                    {featured.summary}
                  </p>

                  <div className="grid grid-cols-3 gap-px mb-7" style={{ background: "var(--border)" }}>
                    {featured.stats.map(stat => (
                      <div key={stat.label} className="p-4" style={{ background: "var(--bg-tertiary)" }}>
                        <div className="font-syne font-extrabold text-[20px] leading-none mb-1" style={{ color: featured.color }}>{stat.value}</div>
                        <div className="text-[9px] font-medium tracking-[0.08em] uppercase" style={{ color: "var(--fg-faint)" }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="text-[9px] font-medium tracking-[0.14em] uppercase mb-3" style={{ color: "var(--fg-faint)" }}>Scope</div>
                    <div className="flex flex-wrap gap-2">
                      {featured.scope.map(item => (
                        <span key={item} className="text-[11px] font-medium px-3 py-1.5 rounded-lg"
                          style={{ background: `${featured.color}10`, border: `1px solid ${featured.color}24`, color: featured.color }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <a href={featured.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[12px] font-medium px-4 py-2.5 rounded-lg transition-all hover:scale-[1.03]"
                      style={{ background: `${featured.color}15`, border: `1px solid ${featured.color}30`, color: featured.color }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Visit live site
                    </a>
                    <span className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>{featured.url.replace("https://", "")}</span>
                  </div>
                </div>

                {/* Right: live iframe browser */}
                <div ref={previewRef} className="relative min-h-[460px] flex flex-col"
                  style={{ background: "var(--bg-primary)", borderLeft: "1px solid var(--border)" }}>

                  {/* Browser chrome */}
                  <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
                    style={{ background: "var(--bg-tertiary)", borderBottom: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }}/>
                      <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }}/>
                      <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }}/>
                    </div>
                    <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        style={{ color: "var(--fg-faint)", flexShrink: 0 }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      <span className="text-[11px] font-light truncate" style={{ color: "var(--fg-muted)" }}>
                        {featured.url.replace("https://", "")}
                      </span>
                      <span className="ml-auto flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(40,200,64,0.12)", color: "#28C840", border: "1px solid rgba(40,200,64,0.25)" }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#28C840" }}/>
                        LIVE
                      </span>
                    </div>
                    <a href={featured.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] font-medium px-2.5 py-1.5 rounded-md transition-all hover:scale-[1.05] flex-shrink-0"
                      style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Open
                    </a>
                  </div>

                  {/* iframe */}
                  <div className="relative flex-1" style={{ minHeight: 400 }}>
                    {iframeLoading && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
                        style={{ background: "var(--bg-card)" }}>
                        <div className="w-8 h-8 rounded-full border-2 animate-spin"
                          style={{ borderColor: "var(--border)", borderTopColor: featured.color }}/>
                        <span className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>Loading {featured.title}…</span>
                      </div>
                    )}
                    <iframe
                      ref={iframeRef}
                      key={iframeKey}
                      src={featured.url}
                      title={`${featured.title} live preview`}
                      className="w-full h-full"
                      style={{ minHeight: 400, border: "none", display: "block" }}
                      onLoad={() => setIframeLoading(false)}
                      onError={() => setIframeLoading(false)}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                    {/* X-Frame fallback */}
                    <div className="absolute inset-0 z-20 hidden flex-col items-center justify-center gap-4 text-center px-8"
                      id={`blocked-${featured.id}`} style={{ background: "var(--bg-card)" }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
                        style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                          style={{ color: featured.color }}>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-syne font-extrabold text-[15px] mb-1" style={{ color: "var(--fg-primary)" }}>{featured.title}</p>
                        <p className="text-[11px] font-light mb-4" style={{ color: "var(--fg-muted)" }}>
                          This site doesn&apos;t allow embedding. Open it directly to explore.
                        </p>
                        <a href={featured.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[12px] font-medium px-5 py-2.5 rounded-lg text-white transition-all hover:scale-[1.03]"
                          style={{ background: featured.color }}>
                          Visit {featured.title} →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project cards */}
              <div className="case-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {visibleProjects.map(project => {
                  const isActive = featuredId === project.id;
                  return (
                    <button key={project.id} onClick={() => switchProject(project)}
                      className="case-card text-left rounded-xl p-4 transition-all duration-300"
                      style={{ background: isActive ? "var(--bg-tertiary)" : "var(--bg-card)", border: `1px solid ${isActive ? `${project.color}45` : "var(--border)"}` }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.transform = "translateY(-3px)"; el.style.borderColor = `${project.color}45`; }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.borderColor = isActive ? `${project.color}45` : "var(--border)"; }}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-syne font-extrabold text-[11px]"
                          style={{ background: `${project.color}14`, border: `1px solid ${project.color}30`, color: project.color }}>
                          {project.title.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[9px] font-light" style={{ color: "var(--fg-faint)" }}>{project.year}</span>
                      </div>
                      <h3 className="font-syne font-extrabold text-[13px] tracking-tight mb-0.5" style={{ color: "var(--fg-primary)" }}>{project.title}</h3>
                      <p className="text-[9px] font-medium tracking-[0.08em] uppercase mb-2" style={{ color: project.color }}>{project.type}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[8px] font-medium px-1.5 py-0.5 rounded-md"
                            style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--fg-faint)" }}>{tag}</span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── PROCESS */}
          <section className="work-process py-24 lg:py-28" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>How we shape the work</p>
              <h2 className="font-syne font-extrabold text-[clamp(28px,4vw,48px)] tracking-tight leading-[1] mb-14" style={{ color: "var(--fg-primary)" }}>
                Every project moves through<br/><span style={{ color: "var(--fg-muted)" }}>a practical, measurable path.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: "var(--border)" }}>
                {[
                  { n: "01", title: "Define",   desc: "We lock the goal, audience, scope, timeline, and what success needs to prove." },
                  { n: "02", title: "Design",   desc: "We create the system: flows, pages, components, copy structure, and visual direction." },
                  { n: "03", title: "Build",    desc: "We develop, test, optimise, and keep the project moving with clear updates." },
                  { n: "04", title: "Improve",  desc: "We launch with analytics, learn from the numbers, and sharpen what matters." },
                ].map(item => (
                  <div key={item.n} className="work-process-item p-6 lg:p-7" style={{ background: "var(--bg-secondary)" }}>
                    <div className="font-syne font-extrabold text-[12px] mb-8" style={{ color: "var(--orange)" }}>{item.n}</div>
                    <h3 className="font-syne font-extrabold text-[17px] tracking-tight mb-2" style={{ color: "var(--fg-primary)" }}>{item.title}</h3>
                    <p className="text-[12px] font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA */}
          <section className="py-24" style={{ background: "var(--orange)" }}>
            <div className="work-cta-block max-w-7xl mx-auto px-6 lg:px-8 text-center">
              <h2 className="font-syne font-extrabold text-[clamp(32px,5vw,60px)] leading-[1] tracking-tight text-white mb-4">
                Your project should be<br/>the next case study.
              </h2>
              <p className="text-white/70 text-[14px] font-light max-w-md mx-auto mb-8 leading-relaxed">
                Bring the goal. We&apos;ll bring the strategy, design, code, and execution to make it real.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="bg-white font-bold text-[13px] px-7 py-3.5 rounded-lg transition-all hover:bg-white/90 hover:scale-[1.03]"
                  style={{ color: "var(--orange)" }}>Start a project</Link>
                <Link href="/services" className="border border-white/40 text-white font-light text-[13px] px-7 py-3.5 rounded-lg hover:border-white/80 hover:scale-[1.02] transition-all">
                  View services
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
