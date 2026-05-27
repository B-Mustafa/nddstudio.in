"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";

gsap.registerPlugin(ScrollTrigger);

const serviceLinks = ["SEO", "Website Design & Dev", "App Development", "UI / UX Design", "Brand & Graphic Design", "Digital Marketing"];
const studioLinks  = ["About", "Work", "Process", "Blog", "Contact"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        opacity: 0, y: 30, duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="footer-col">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={30} />
              <div>
                <div className="font-syne font-extrabold text-[14px] tracking-tight" style={{ color: "var(--fg-primary)" }}>
                  NDD<span style={{ color: "var(--orange)" }}>.</span>Studio
                </div>
                <div className="text-[8px] tracking-[0.12em] uppercase mt-0.5" style={{ color: "var(--fg-faint)" }}>
                  Digital. Done different.
                </div>
              </div>
            </div>
            <p className="text-[12px] font-light leading-relaxed max-w-[200px]" style={{ color: "var(--fg-faint)" }}>
              Built for businesses that want to grow — not just look good.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { id: "in", href: "https://linkedin.com" },
                { id: "tw", href: "https://twitter.com" },
                { id: "ig", href: "https://instagram.com" },
                { id: "gh", href: "https://github.com" },
              ].map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-medium transition-all duration-200 hover:scale-110"
                  style={{
                    background: "var(--fg-faintest)",
                    border: "1px solid var(--border)",
                    color: "var(--fg-faint)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--orange-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--orange)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--fg-faint)";
                  }}
                >
                  {s.id}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="text-[9px] font-medium tracking-[0.14em] uppercase mb-4" style={{ color: "var(--fg-faint)" }}>Services</div>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-[12px] font-light transition-colors duration-200"
                    style={{ color: "var(--fg-muted)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-primary)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="text-[9px] font-medium tracking-[0.14em] uppercase mb-4" style={{ color: "var(--fg-faint)" }}>Studio</div>
            <ul className="flex flex-col gap-2.5 mb-6">
              {studioLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[12px] font-light transition-colors duration-200"
                    style={{ color: "var(--fg-muted)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-primary)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
              <div className="text-[9px] font-medium tracking-[0.14em] uppercase mb-3" style={{ color: "var(--fg-faint)" }}>Get in touch</div>
              <a href="mailto:hello@nddstudio.in" className="text-[12px] font-light block mb-1 transition-colors" style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--orange)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")}>
                hello@nddstudio.in
              </a>
              <a href="tel:+919106579181" className="text-[12px] font-light block transition-colors" style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--orange)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")}>
                +91 91065 79181
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>
            © {new Date().getFullYear()} NDD.Studio. All rights reserved.
          </span>
          <span className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>
            Godhra, Gujarat · India · nddstudio.in
          </span>
        </div>
      </div>
    </footer>
  );
}
