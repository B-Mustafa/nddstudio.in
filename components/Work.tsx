"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "StyleNest",
    category: "E-commerce · Web Design",
    desc: "A full fashion e-commerce store with product filters, cart, and lightning-fast checkout. Built in Next.js with a 98 Lighthouse score.",
    tags: ["Next.js", "SEO", "UI/UX"],
    url: "https://vercel.com",
    color: "#E8630A",
    year: "2025",
  },
  {
    id: 2,
    title: "LogiTrack",
    category: "SaaS · App Development",
    desc: "End-to-end logistics tracking platform. Real-time shipment updates, driver dashboard, and client portal — shipped in 6 weeks.",
    tags: ["React", "Mobile", "Dashboard"],
    url: "https://linear.app",
    color: "#5E6AD2",
    year: "2025",
  },
  {
    id: 3,
    title: "GreenLeaf",
    category: "SEO · Brand Identity",
    desc: "Full brand overhaul + SEO strategy that took an organic food brand from page 4 to top 3 in 60 days.",
    tags: ["SEO", "Branding", "Content"],
    url: "https://stripe.com",
    color: "#1DA8A0",
    year: "2024",
  },
  {
    id: 4,
    title: "PulseHealth",
    category: "Web App · UI Design",
    desc: "Patient management portal with appointment booking, reports viewer, and doctor dashboard. HIPAA-compliant architecture.",
    tags: ["Web App", "UI/UX", "Next.js"],
    url: "https://notion.so",
    color: "#E84393",
    year: "2024",
  },
];

export default function Work() {
  const sectionRef  = useRef<HTMLElement>(null);
  const previewRef  = useRef<HTMLDivElement>(null);
  const iframeRef   = useRef<HTMLIFrameElement>(null);

  const [active, setActive]       = useState(projects[0].id);
  const [loading, setLoading]     = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const activeProject = projects.find((p) => p.id === active)!;

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".work-header", start: "top 85%", once: true },
      });
      gsap.from(".work-card", {
        opacity: 0, x: -32, duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".work-list", start: "top 82%", once: true },
      });
      gsap.from(".work-preview-wrap", {
        opacity: 0, x: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".work-preview-wrap", start: "top 82%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Switch project with animated transition
  const handleSelect = (id: number) => {
    if (id === active) return;
    gsap.to(previewRef.current, {
      opacity: 0, scale: 0.98, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setActive(id);
        setLoading(true);
        setIframeKey((k) => k + 1);
        gsap.to(previewRef.current, {
          opacity: 1, scale: 1, duration: 0.35, ease: "power3.out",
        });
      },
    });
  };

  return (
    <section ref={sectionRef} id="work" className="py-24 lg:py-32" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="work-header flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
              Our work
            </p>
            <h2 className="font-syne font-extrabold text-[clamp(32px,5vw,52px)] leading-[1] tracking-tight" style={{ color: "var(--fg-primary)" }}>
              Built by us.<br />
              <span style={{ color: "var(--fg-muted)" }}>Live right now.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="self-start sm:self-end text-[12px] font-medium px-5 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 hover:scale-[1.03]"
            style={{ border: "1px solid var(--orange-border)", color: "var(--orange)" }}
          >
            Start your project →
          </a>
        </div>

        {/* Project list + live preview */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Left: project cards */}
          <div className="work-list flex flex-col gap-2 lg:w-[340px] flex-shrink-0">
            {projects.map((project) => {
              const isActive = active === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => handleSelect(project.id)}
                  className="work-card text-left rounded-xl p-5 transition-all duration-300"
                  style={{
                    background: isActive ? "var(--bg-tertiary)" : "var(--bg-card)",
                    border: isActive ? `1px solid ${project.color}40` : "1px solid var(--border)",
                    transform: isActive ? "translateX(4px)" : "translateX(0)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) gsap.to(e.currentTarget, { x: 4, duration: 0.2, ease: "power2.out" });
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) gsap.to(e.currentTarget, { x: 0, duration: 0.25, ease: "power2.out" });
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5"
                        style={{
                          background: project.color,
                          boxShadow: isActive ? `0 0 8px ${project.color}80` : "none",
                        }}
                      />
                      <h3
                        className="font-syne font-extrabold text-[15px] tracking-tight"
                        style={{ color: isActive ? "var(--fg-primary)" : "var(--fg-secondary)" }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-light flex-shrink-0 mt-0.5" style={{ color: "var(--fg-faint)" }}>
                      {project.year}
                    </span>
                  </div>

                  <p className="text-[10px] font-medium tracking-wide mb-2" style={{ color: project.color, opacity: 0.8 }}>
                    {project.category}
                  </p>

                  <p className="text-[11px] font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-medium tracking-[0.08em] px-2 py-0.5 rounded-md"
                        style={{
                          background: isActive ? `${project.color}18` : "var(--bg-tertiary)",
                          color: isActive ? project.color : "var(--fg-faint)",
                          border: `1px solid ${isActive ? `${project.color}30` : "var(--border)"}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: live preview panel */}
          <div
            ref={previewRef}
            className="work-preview-wrap flex-1 min-h-[500px] lg:min-h-[620px] flex flex-col rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
          >
            {/* Browser chrome bar */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: "var(--bg-tertiary)", borderBottom: "1px solid var(--border)" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
              </div>

              {/* URL bar */}
              <div
                className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: "var(--fg-faint)", flexShrink: 0 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[11px] font-light truncate" style={{ color: "var(--fg-muted)" }}>
                  {activeProject.url.replace("https://", "")}
                </span>
                <span
                  className="ml-auto flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "rgba(40,200,64,0.12)", color: "#28C840", border: "1px solid rgba(40,200,64,0.25)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#28C840" }} />
                  LIVE
                </span>
              </div>

              {/* Open in new tab */}
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] font-medium px-2.5 py-1.5 rounded-md transition-all duration-200 hover:scale-[1.05] flex-shrink-0"
                style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Open
              </a>
            </div>

            {/* Iframe */}
            <div className="relative flex-1">
              {/* Loading spinner */}
              {loading && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
                  style={{ background: "var(--bg-card)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 animate-spin"
                    style={{ borderColor: "var(--border)", borderTopColor: activeProject.color }}
                  />
                  <span className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>
                    Loading {activeProject.title}…
                  </span>
                </div>
              )}

              <iframe
                ref={iframeRef}
                key={iframeKey}
                src={activeProject.url}
                title={`${activeProject.title} live preview`}
                className="w-full h-full"
                style={{ minHeight: "inherit", border: "none", display: "block" }}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />

              {/* X-Frame-Options fallback */}
              <div
                className="absolute inset-0 z-20 flex-col items-center justify-center gap-4 text-center px-8"
                style={{ background: "var(--bg-card)", display: "none" }}
                id={`blocked-${activeProject.id}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
                  style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: activeProject.color }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-syne font-extrabold text-[15px] mb-1" style={{ color: "var(--fg-primary)" }}>
                    {activeProject.title}
                  </p>
                  <p className="text-[11px] font-light mb-4" style={{ color: "var(--fg-muted)" }}>
                    This site doesn&apos;t allow embedding. Open it directly to explore.
                  </p>
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[12px] font-medium px-5 py-2.5 rounded-lg text-white transition-all hover:scale-[1.03]"
                    style={{ background: activeProject.color }}
                  >
                    Open {activeProject.title}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: "var(--orange)" }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className="text-[12px] font-light" style={{ color: "var(--fg-muted)" }}>
              Every project is built from scratch. No templates. No shortcuts.{" "}
              <span style={{ color: "var(--fg-primary)" }}>Want yours?</span>
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 text-white text-[12px] font-medium px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.03]"
            style={{ background: "var(--orange)" }}
          >
            Start a project →
          </a>
        </div>

      </div>
    </section>
  );
}
