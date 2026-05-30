"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = ["Services", "Work", "Process", "About", "Contact"];

// About is a full page route; everything else is a home anchor
const linkHref = (link: string) =>
  link === "About" ? "/about" : `#${link.toLowerCase()}`;

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -64, opacity: 0, duration: 0.7, delay: 0.1, ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--bg-nav)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <div className="transition-transform duration-200 group-hover:scale-105">
            <Logo size={34} />
          </div>
          <div>
            <div className="font-syne font-extrabold text-[15px] tracking-tight leading-none" style={{ color: "var(--fg-primary)" }}>
              NDD<span style={{ color: "var(--orange)" }}>.</span>Studio
            </div>
            <div className="text-[8px] tracking-[0.14em] uppercase mt-0.5" style={{ color: "var(--fg-faint)" }}>
              Digital. Done different.
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={linkHref(link)}
              className="text-[12px] font-dm relative group/link transition-colors duration-200"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--fg-primary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fg-muted)")}
            >
              {link}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover/link:w-full transition-all duration-300"
                style={{ background: "var(--orange)" }}
              />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="text-white text-[12px] font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{ background: "var(--orange)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "var(--orange-hover)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--orange)")}
          >
            Get a quote
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 transition-all duration-300" style={{ background: "var(--fg-primary)", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
            <span className="block w-5 h-0.5 transition-all duration-300" style={{ background: "var(--fg-primary)", opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-0.5 transition-all duration-300" style={{ background: "var(--fg-primary)", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
          </button>
        </div>
      </nav>

      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "320px" : "0",
          background: "var(--bg-nav)",
          borderBottom: menuOpen ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={linkHref(link)}
              className="text-[14px] transition-colors py-1"
              style={{ color: "var(--fg-muted)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="text-white text-[13px] font-medium px-4 py-2.5 rounded-lg text-center mt-2"
            style={{ background: "var(--orange)" }}
            onClick={() => setMenuOpen(false)}
          >
            Get a quote
          </a>
        </div>
      </div>
    </header>
  );
}
