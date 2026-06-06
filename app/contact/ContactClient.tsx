"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "submitting" | "success" | "error";
interface FormData {
  name: string; email: string; phone: string;
  service: string; budget: string; message: string;
}

const services = [
  "SEO & Search", "Website Design & Dev", "App Development",
  "UI / UX Design", "Brand & Graphic Design", "Digital Marketing",
  "Multiple services / not sure yet",
];
const budgets = [
  "Under ₹10,000", "₹10,000 – ₹30,000", "₹30,000 – ₹75,000",
  "₹75,000 – ₹1,50,000", "₹1,50,000+", "Let's discuss",
];

const contactMethods = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    label: "Email us", value: "hello@nddstudio.in",
    href: "mailto:hello@nddstudio.in", sub: "We reply within 24 hours",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
    label: "Response time", value: "Within 24 hours",
    href: "#contact-form", sub: "Usually same day",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    label: "Location", value: "Godhra, Gujarat, India",
    href: "https://maps.google.com/?q=Godhra,Gujarat,India", sub: "Remote-friendly across India",
  },
];

const faqs = [
  { q: "How fast do you reply?", a: "Within 24 hours on weekdays. Usually within a few hours." },
  { q: "Is the consultation really free?", a: "Yes. No strings. We spend 30 minutes understanding your needs — even if you don't hire us, you'll leave with clarity." },
  { q: "Do you work outside Gujarat?", a: "Absolutely. We work 100% remotely with clients across India and internationally." },
  { q: "What happens after I submit this form?", a: "We review your brief, then reach out to schedule a 30-minute discovery call. No cold pitch, no lengthy process." },
];

export default function ContactClient() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const update = (f: keyof FormData, v: string) => setFormData(p => ({ ...p, [f]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setFormState("success");
      gsap.from(".success-block", { opacity: 0, y: 24, duration: 0.6, ease: "power3.out" });
    } catch (err: unknown) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please email us directly.");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".contact-eyebrow", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
        .from(".contact-h1",      { opacity: 0, y: 60, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .from(".contact-sub",     { opacity: 0, y: 24, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .from(".contact-method",  { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.4");

      gsap.to(".contact-glow", {
        y: -80, ease: "none",
        scrollTrigger: { trigger: ".contact-hero", start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.from(".contact-form-wrap", {
        opacity: 0, y: 48, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form-wrap", start: "top 85%", once: true },
      });
      gsap.set(".why-card", { opacity: 0, y: 32 });
      ScrollTrigger.create({
        trigger: ".why-grid", start: "top bottom", once: true, invalidateOnRefresh: true,
        onEnter: () => gsap.to(".why-card", { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }),
      });
      gsap.set(".contact-faq-item", { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: ".contact-faq-list", start: "top bottom", once: true, invalidateOnRefresh: true,
        onEnter: () => gsap.to(".contact-faq-item", { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" }),
      });
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: "100%", background: "var(--bg-tertiary)",
    border: `1px solid ${focused === name ? "var(--orange)" : "var(--border)"}`,
    borderRadius: 10, padding: "13px 16px", fontSize: 13,
    color: "var(--fg-primary)", outline: "none", transition: "border-color .2s",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
  });
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 500,
    letterSpacing: "0.06em", textTransform: "uppercase",
    color: "var(--fg-faint)", marginBottom: 7,
  };

  return (
    <>
      <Cursor />
      <div ref={pageRef}>
        <Navbar />
        <main>

          {/* ── HERO */}
          <section className="contact-hero relative overflow-hidden pt-16" style={{ background: "var(--bg-primary)" }}>
            <div className="contact-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 700, height: 400, background: "radial-gradient(ellipse, var(--orange-glow) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/3 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
              <div className="absolute left-2/3 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-16" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="max-w-xl">
                  <div className="contact-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
                    style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--orange)" }} />
                    <span className="text-[10px] font-medium tracking-[0.14em] uppercase" style={{ color: "var(--orange-light)" }}>Let&apos;s talk</span>
                  </div>
                  <h1 className="contact-h1 font-syne font-extrabold leading-[0.92] tracking-tight mb-5">
                    <span className="block text-[clamp(44px,8vw,88px)]" style={{ color: "var(--fg-primary)" }}>Start something</span>
                    <span className="block text-[clamp(44px,8vw,88px)]" style={{ color: "var(--orange)" }}>great.</span>
                  </h1>
                  <p className="contact-sub text-[15px] lg:text-[17px] font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    Fill the form or reach out directly. Free consultation, no commitment, response within 24 hours.
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:min-w-[280px]">
                  {contactMethods.map((m) => (
                    <a key={m.label} href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="contact-method flex items-center gap-4 rounded-xl p-4 group transition-all duration-200"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "var(--orange-border)"; el.style.background = "var(--bg-tertiary)"; }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "var(--border)"; el.style.background = "var(--bg-card)"; }}
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>
                        {m.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-medium tracking-[0.08em] uppercase mb-0.5" style={{ color: "var(--fg-faint)" }}>{m.label}</div>
                        <div className="text-[13px] font-medium truncate" style={{ color: "var(--fg-primary)" }}>{m.value}</div>
                        <div className="text-[11px] font-light" style={{ color: "var(--fg-muted)" }}>{m.sub}</div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className="ml-auto flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "var(--fg-faint)" }}>
                        <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Process strip */}
              <div className="flex flex-wrap gap-0 py-6">
                {[
                  { n: "01", t: "Fill the form",   d: "Tell us about your project — takes 3 minutes." },
                  { n: "02", t: "We review",        d: "We read every submission carefully, same day." },
                  { n: "03", t: "Discovery call",   d: "30-min call to align on goals and scope." },
                  { n: "04", t: "Fixed proposal",   d: "Price, timeline, deliverables. You decide." },
                ].map((step, i) => (
                  <div key={step.n} className="flex-1 min-w-[160px] flex gap-3 px-4 py-2"
                    style={{ borderRight: i < 3 ? "1px solid var(--border)" : "none" }}>
                    <span className="font-syne font-extrabold text-[11px] mt-0.5 flex-shrink-0" style={{ color: "var(--orange)", opacity: 0.6 }}>{step.n}</span>
                    <div>
                      <div className="font-syne font-extrabold text-[12px] mb-0.5" style={{ color: "var(--fg-primary)" }}>{step.t}</div>
                      <div className="text-[11px] font-light leading-snug" style={{ color: "var(--fg-faint)" }}>{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FORM + SIDEBAR */}
          <section id="contact-form" className="py-24 lg:py-32" style={{ background: "var(--bg-secondary)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-10">

                {/* Form */}
                <div className="contact-form-wrap flex-1 min-w-0">
                  {formState === "success" ? (
                    <div className="success-block rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[500px]"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                        style={{ background: "rgba(40,200,64,0.12)", border: "2px solid rgba(40,200,64,0.3)" }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#28C840" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <h2 className="font-syne font-extrabold text-[28px] tracking-tight mb-3" style={{ color: "var(--fg-primary)" }}>
                        We&apos;ve got your message.
                      </h2>
                      <p className="text-[14px] font-light leading-relaxed mb-8 max-w-sm" style={{ color: "var(--fg-muted)" }}>
                        Thanks {formData.name.split(" ")[0]}! We&apos;ll review your brief and reach out within 24 hours to schedule your free discovery call.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center">
                        <Link href="/" className="text-[13px] font-medium px-5 py-2.5 rounded-lg transition-all hover:scale-[1.03]"
                          style={{ background: "var(--orange)", color: "white" }}>Back to home</Link>
                        <Link href="/services" className="text-[13px] font-light px-5 py-2.5 rounded-lg transition-all hover:scale-[1.02]"
                          style={{ border: "1px solid var(--border)", color: "var(--fg-secondary)" }}>Explore our services</Link>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="rounded-2xl overflow-hidden"
                      style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}>
                      <div className="px-7 py-5 flex items-center justify-between"
                        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-tertiary)" }}>
                        <div>
                          <div className="font-syne font-extrabold text-[16px] tracking-tight" style={{ color: "var(--fg-primary)" }}>Project brief</div>
                          <div className="text-[11px] font-light mt-0.5" style={{ color: "var(--fg-faint)" }}>Takes about 3 minutes · All fields help us prepare better</div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(40,200,64,0.1)", border: "1px solid rgba(40,200,64,0.25)", color: "#28C840" }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#28C840" }}/>
                          Accepting projects
                        </div>
                      </div>

                      <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label style={labelStyle}>Your name *</label>
                          <input type="text" required placeholder="Your full name" value={formData.name}
                            onChange={e => update("name", e.target.value)}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                            style={fieldStyle("name")}/>
                        </div>
                        <div>
                          <label style={labelStyle}>Email address *</label>
                          <input type="email" required placeholder="you@company.com" value={formData.email}
                            onChange={e => update("email", e.target.value)}
                            onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                            style={fieldStyle("email")}/>
                        </div>
                        <div>
                          <label style={labelStyle}>WhatsApp (optional)</label>
                          <input type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone}
                            onChange={e => update("phone", e.target.value)}
                            onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                            style={fieldStyle("phone")}/>
                        </div>
                        <div>
                          <label style={labelStyle}>Service needed *</label>
                          <select required value={formData.service}
                            onChange={e => update("service", e.target.value)}
                            onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                            style={{ ...fieldStyle("service"), cursor: "pointer" }}>
                            <option value="" disabled>Select a service</option>
                            {services.map(s => <option key={s} value={s} style={{ background: "#111", color: "white" }}>{s}</option>)}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label style={labelStyle}>Budget range</label>
                          <div className="flex flex-wrap gap-2">
                            {budgets.map(b => (
                              <button key={b} type="button" onClick={() => update("budget", b)}
                                className="text-[11px] font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:scale-[1.03]"
                                style={{ background: formData.budget === b ? "var(--orange)" : "var(--bg-tertiary)", border: `1px solid ${formData.budget === b ? "var(--orange)" : "var(--border)"}`, color: formData.budget === b ? "white" : "var(--fg-muted)" }}>
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label style={labelStyle}>Tell us about your project *</label>
                          <textarea required rows={5}
                            placeholder="What are you building? What's the goal? Any specific requirements, timeline, or context..."
                            value={formData.message} onChange={e => update("message", e.target.value)}
                            onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                            style={{ ...fieldStyle("message"), resize: "vertical", minHeight: 120 }}/>
                          <div className="flex justify-between mt-1.5">
                            <span className="text-[10px]" style={{ color: "var(--fg-faint)" }}>The more detail, the better we can prepare.</span>
                            <span className="text-[10px]" style={{ color: formData.message.length > 500 ? "var(--orange)" : "var(--fg-faint)" }}>{formData.message.length} / 1000</span>
                          </div>
                        </div>

                        {formState === "error" && (
                          <div className="md:col-span-2 rounded-lg px-4 py-3 text-[12px] font-light"
                            style={{ background: "rgba(232,70,70,0.1)", border: "1px solid rgba(232,70,70,0.25)", color: "#e84646" }}>
                            {errorMsg}
                          </div>
                        )}

                        <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                          <p className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>
                            We read every submission. No auto-replies, no spam.
                          </p>
                          <button type="submit" disabled={formState === "submitting"}
                            className="flex items-center gap-2.5 text-white text-[13px] font-medium px-6 py-3 rounded-lg transition-all duration-200"
                            style={{ background: formState === "submitting" ? "var(--orange-hover)" : "var(--orange)", opacity: formState === "submitting" ? 0.8 : 1 }}
                            onMouseEnter={e => { if (formState !== "submitting") gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 }); }}
                            onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}>
                            {formState === "submitting" ? (
                              <><div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }}/>Sending…</>
                            ) : (
                              <>Send project brief <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-5 lg:w-72 flex-shrink-0">
                  <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-syne font-extrabold text-[16px] flex-shrink-0"
                        style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>M</div>
                      <div>
                        <div className="font-syne font-extrabold text-[14px]" style={{ color: "var(--fg-primary)" }}>Mustafa Bhikhapur</div>
                        <div className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>Founder · NDD.Studio</div>
                      </div>
                    </div>
                    <p className="text-[12px] font-light leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
                      "Every enquiry gets a personal response from me. No bots, no assistants. You&apos;ll always know exactly who you&apos;re talking to."
                    </p>
                  </div>

                  <div className="rounded-xl p-5" style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: "var(--orange)" }}>
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span className="text-[10px] font-medium tracking-[0.1em] uppercase" style={{ color: "var(--orange)" }}>Response time</span>
                    </div>
                    <div className="font-syne font-extrabold text-[22px]" style={{ color: "var(--fg-primary)" }}>&lt; 24 hours</div>
                    <div className="text-[11px] font-light mt-1" style={{ color: "var(--fg-muted)" }}>Usually same day. Always by next morning.</div>
                  </div>

                  <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="text-[10px] font-medium tracking-[0.1em] uppercase mb-4" style={{ color: "var(--fg-faint)" }}>What happens next</div>
                    <div className="flex flex-col gap-3">
                      {[
                        { n: "1", t: "We read your brief",  d: "Carefully. Same day." },
                        { n: "2", t: "We reach out",        d: "To schedule a 30-min call." },
                        { n: "3", t: "Discovery call",      d: "We align on goals and scope." },
                        { n: "4", t: "Fixed proposal",      d: "Price, timeline, deliverables." },
                      ].map(s => (
                        <div key={s.n} className="flex gap-3 items-start">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5"
                            style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>{s.n}</div>
                          <div>
                            <div className="text-[12px] font-medium" style={{ color: "var(--fg-primary)" }}>{s.t}</div>
                            <div className="text-[11px] font-light" style={{ color: "var(--fg-faint)" }}>{s.d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="text-[10px] font-medium tracking-[0.1em] uppercase mb-3" style={{ color: "var(--fg-faint)" }}>Prefer to reach out directly?</div>
                    <div className="flex flex-col gap-2">
                      <a href="https://wa.me/919106579181?text=Hi%20Mustafa%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20NDD%20Studio."
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg text-[12px] font-medium transition-all hover:scale-[1.02]"
                        style={{ background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)", color: "#25D366" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp us
                      </a>
                      <a href="mailto:hello@nddstudio.in"
                        className="flex items-center gap-3 p-3 rounded-lg text-[12px] font-medium transition-all hover:scale-[1.02]"
                        style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        hello@nddstudio.in
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── WHY NDD */}
          <section className="py-20" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-3" style={{ color: "var(--orange)" }}>Why choose us</p>
              <h2 className="font-syne font-extrabold text-[clamp(24px,3.5vw,40px)] tracking-tight leading-[1] mb-10" style={{ color: "var(--fg-primary)" }}>
                What you get when you<br/><span style={{ color: "var(--fg-muted)" }}>work with NDD.Studio.</span>
              </h2>
              <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: "⚡", title: "Fixed pricing",    desc: "We quote before we start. What you see is what you pay. No hourly surprises." },
                  { icon: "📅", title: "Fixed timeline",   desc: "You get a deadline before we start — and we hit it. Always." },
                  { icon: "👤", title: "Direct access",    desc: "You talk to Mustafa directly. No account managers, no layers." },
                  { icon: "📈", title: "Results first",    desc: "Every decision is tied back to your business outcome — not just aesthetics." },
                ].map(w => (
                  <div key={w.title} className="why-card rounded-xl p-5 transition-all duration-300"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--orange-border)"; el.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)"; }}>
                    <div className="text-2xl mb-3">{w.icon}</div>
                    <div className="font-syne font-extrabold text-[14px] mb-1.5" style={{ color: "var(--fg-primary)" }}>{w.title}</div>
                    <div className="text-[12px] font-light leading-relaxed" style={{ color: "var(--fg-muted)" }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ */}
          <section className="py-20" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase mb-2" style={{ color: "var(--orange)" }}>Quick answers</p>
              <h2 className="font-syne font-extrabold text-[clamp(22px,3vw,36px)] tracking-tight leading-[1] mb-8" style={{ color: "var(--fg-primary)" }}>
                Before you send the form.
              </h2>
              <div className="contact-faq-list flex flex-col">
                {faqs.map((faq, i) => (
                  <div key={i} className="contact-faq-item" style={{ borderBottom: "1px solid var(--border)" }}>
                    <button className="w-full flex items-center justify-between gap-6 py-4 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span className="font-syne font-bold text-[13px] tracking-tight" style={{ color: "var(--fg-primary)" }}>{faq.q}</span>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{ background: openFaq === i ? "var(--orange)" : "var(--bg-tertiary)", border: `1px solid ${openFaq === i ? "var(--orange)" : "var(--border)"}`, transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </div>
                    </button>
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === i ? "120px" : "0" }}>
                      <p className="text-[12px] font-light leading-relaxed pb-4" style={{ color: "var(--fg-muted)" }}>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
