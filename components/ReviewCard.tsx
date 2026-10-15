"use client";

import { useState } from "react";
import type { ClientReview } from "@/data/reviews";

export default function ReviewCard({ review }: { review: ClientReview }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const initials = review.name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const isLogo = review.imageType === "logo";
  const project = review.project;
  const safeProject = project && (/^https:\/\//i.test(project.href) || /^\/(?!\/)/.test(project.href));

  return (
    <article className="testi-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 lg:p-8 transition-[border-color,box-shadow] duration-300 hover:border-[var(--orange-border)] hover:shadow-lg">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-[var(--orange)] opacity-40 transition-opacity group-hover:opacity-100" />
      <header className="mb-6">
        <div className={`mb-4 flex h-16 items-center justify-center overflow-hidden border border-[var(--border)] ${isLogo ? "w-28 rounded-xl bg-white" : "w-16 rounded-full bg-[var(--orange-bg)]"}`}>
          {review.image && failedImage !== review.image ? (
            <img src={review.image} alt={isLogo ? `${review.name} logo` : review.name} width={isLogo ? 112 : 64} height={64} loading="lazy" className={`h-full w-full ${isLogo ? "object-contain p-2" : "object-cover"}`} onError={() => setFailedImage(review.image!)} />
          ) : (
            <span aria-hidden="true" className="font-syne text-xl font-extrabold" style={{ color: "var(--orange)" }}>{initials}</span>
          )}
        </div>
        <h3 className="font-syne text-lg font-bold tracking-tight break-words" style={{ color: "var(--fg-primary)" }}>{review.name}</h3>
        {review.role && <p className="mt-1 text-xs leading-relaxed break-words" style={{ color: "var(--fg-muted)" }}>{review.role}</p>}
      </header>

      <div aria-hidden="true" className="quote-mark mb-2 font-syne text-4xl font-extrabold leading-none" style={{ color: "var(--orange)" }}>&ldquo;</div>
      <blockquote className="mb-6 flex-1 whitespace-pre-line break-words text-sm leading-7" style={{ color: "var(--fg-secondary)" }}>{review.quote}</blockquote>

      {review.rating && (
        <div role="img" aria-label={`${review.rating} out of 5 stars`} className="mb-5 flex items-center gap-3">
          <span aria-hidden="true" className="flex gap-1" style={{ color: "var(--orange)" }}>
            {[1, 2, 3, 4, 5].map((star) => <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= review.rating! ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="m12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91L12 3Z" /></svg>)}
          </span>
          <span aria-hidden="true" className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>{review.rating}/5</span>
        </div>
      )}

      <footer className="border-t border-[var(--border)] pt-5">
        <p className="mb-2.5 text-[9px] font-medium uppercase tracking-[0.14em]" style={{ color: "var(--fg-muted)" }}>Services used</p>
        <ul className="flex flex-wrap gap-2" aria-label="Services used">
          {review.services.map((service) => <li key={service} className="rounded-md border border-[var(--orange-border)] bg-[var(--orange-bg)] px-2.5 py-1.5 text-[10px] font-medium" style={{ color: "var(--orange)" }}>{service}</li>)}
        </ul>
        {safeProject && <a href={project.href} target={project.href.startsWith("/") ? undefined : "_blank"} rel={project.href.startsWith("/") ? undefined : "noopener noreferrer"} className="mt-5 inline-flex items-center gap-2 text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-offset-4" style={{ color: "var(--fg-primary)" }}>{project.label}<span aria-hidden="true">↗</span></a>}
      </footer>
    </article>
  );
}
