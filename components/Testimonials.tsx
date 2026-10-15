"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { clientReviews } from "@/data/reviews";
import ReviewCard from "./ReviewCard";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testi-header", {
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".testi-header", start: "top 85%", once: true },
      });

      if (clientReviews.length > 0) {
      gsap.from(".testi-card", {
        opacity: 0, y: 50, scale: 0.97, duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".testi-grid", start: "top 82%", once: true },
      });

      // Quote mark swoops in
      gsap.from(".quote-mark", {
        opacity: 0, x: -20, duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".testi-grid", start: "top 82%", once: true },
      });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-24 lg:py-32"
      style={{ background: "var(--bg-tertiary)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="testi-header mb-14">
          <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>
            Client reviews
          </p>
          <h2 id="reviews-heading" className="font-syne font-extrabold text-[clamp(32px,5vw,52px)] leading-[1] tracking-tight" style={{ color: "var(--fg-primary)" }}>
            Their projects.<br />
            <span style={{ color: "var(--fg-muted)" }}>Their words.</span>
          </h2>
        </div>

        {clientReviews.length === 0 ? (
          <div className="rounded-2xl p-8 lg:p-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div>
              <p className="font-syne font-bold text-xl mb-2" style={{ color: "var(--fg-primary)" }}>Reviews coming soon.</p>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: "var(--fg-muted)" }}>Client stories will appear here. In the meantime, explore our work.</p>
            </div>
            <Link href="/work" className="inline-flex self-start sm:self-auto shrink-0 items-center justify-center rounded-lg px-5 py-3 text-xs font-bold" style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>Explore our work →</Link>
          </div>
        ) : (
        <div className="testi-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {clientReviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
        )}
      </div>
    </section>
  );
}
