"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What services do you offer?",
  "How much does a website cost?",
  "How fast can you deliver?",
  "Hostinger hosting & coupon",
];

function MessageContent({ content }: { content: string }) {
  const parts = content.split(/(https:\/\/[^\s]+|hello@nddstudio\.in|\/(?:contact|about|work|services)\b)/g);
  return <>{parts.map((part, index) => {
    const isExternal = part.startsWith("https://");
    const isEmail = part === "hello@nddstudio.in";
    if (!isExternal && !isEmail && !/^\/(contact|about|work|services)$/.test(part)) return part;
    const sponsored = part.startsWith("https://www.hostinger.com/");
    return <a key={index} href={isEmail ? `mailto:${part}` : part} target={isExternal ? "_blank" : undefined} rel={isExternal ? `${sponsored ? "sponsored " : ""}noopener noreferrer` : undefined} className="underline underline-offset-2 break-words font-medium">{part}</a>;
  })}</>;
}

export default function Chatbot() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [showDot, setShowDot]     = useState(true);

  const panelRef    = useRef<HTMLDivElement>(null);
  const btnRef      = useRef<HTMLButtonElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const hasSentRef  = useRef(false);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  // Greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hi! 👋 I'm NDD.Studio's automated guide. I can help with services, starting prices, timelines, and Hostinger hosting.\n\nWhat are you looking to build? You can also talk directly with Mustafa using the buttons below.",
        },
      ]);
    }
  }, [open, messages.length]);

  // Panel open/close animation
  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      setShowDot(false);
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" }
      );
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(focusTimer);
    } else {
      gsap.to(panelRef.current, {
        opacity: 0, scale: 0.92, y: 16, duration: 0.2, ease: "power2.in",
      });
    }
  }, [open]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Animate new message bubbles
  useEffect(() => {
    if (!scrollRef.current) return;
    const bubbles = scrollRef.current.querySelectorAll(".chat-bubble:last-child");
    if (bubbles.length > 0) {
      gsap.from(bubbles, { opacity: 0, y: 10, duration: 0.3, ease: "power2.out" });
    }
  }, [messages]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || sendingRef.current || msg.length > 2000) return;
    sendingRef.current = true;

    setInput("");
    hasSentRef.current = true;

    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error("Chat request failed");
      const data = await res.json();
      if (typeof data.message !== "string") throw new Error("Invalid chat response");
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please email hello@nddstudio.in directly." },
      ]);
    } finally {
      sendingRef.current = false;
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* ── CHAT PANEL */}
      {open && (
        <div
          ref={panelRef}
          id="studio-chat"
          role="dialog"
          aria-labelledby="studio-chat-title"
          className="fixed bottom-24 right-3 sm:right-5 z-[9998] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: "min(410px, calc(100vw - 24px))",
            height: "min(600px, calc(100dvh - 120px))",
            background: "var(--bg-primary)",
            border: "1px solid var(--border)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--orange)" }}>
                <svg width="18" height="18" viewBox="0 0 44 44" fill="none">
                  <line x1="11" y1="31" x2="11" y2="13" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="11" y1="13" x2="26" y2="31" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="26" y1="31" x2="26" y2="19" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="26" y1="19" x2="33" y2="13" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="28" y1="13" x2="33" y2="13" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="33" y1="13" x2="33" y2="18" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div id="studio-chat-title" className="font-syne font-extrabold text-[14px] tracking-tight" style={{ color: "var(--fg-primary)" }}>
                  Let&apos;s build something.
                </div>
                <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "var(--fg-faint)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  NDD.Studio · Automated guide
                </div>
              </div>
            </div>
            <button aria-label="Close chat" onClick={() => { setOpen(false); btnRef.current?.focus(); }}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                style={{ color: "var(--fg-muted)" }}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-3"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 mt-0.5"
                    style={{ background: "var(--orange)", minWidth: 24 }}>
                    <svg width="10" height="10" viewBox="0 0 44 44" fill="none">
                      <line x1="11" y1="31" x2="11" y2="13" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="11" y1="13" x2="26" y2="31" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="26" y1="31" x2="26" y2="19" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="26" y1="19" x2="33" y2="13" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="28" y1="13" x2="33" y2="13" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                      <line x1="33" y1="13" x2="33" y2="18" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
                <div className="max-w-[82%] rounded-xl px-3.5 py-2.5"
                  style={{
                    background: msg.role === "user" ? "var(--orange)" : "var(--bg-tertiary)",
                    border: msg.role === "user" ? "none" : "1px solid var(--border)",
                  }}>
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap break-words"
                    style={{ color: msg.role === "user" ? "white" : "var(--fg-secondary)", fontWeight: 300 }}>
                    {msg.role === "assistant" ? <MessageContent content={msg.content} /> : msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="chat-bubble flex justify-start">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center mr-2 flex-shrink-0"
                  style={{ background: "var(--orange)", minWidth: 24 }}>
                  <svg width="10" height="10" viewBox="0 0 44 44" fill="none">
                    <line x1="11" y1="31" x2="11" y2="13" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="11" y1="13" x2="26" y2="31" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="26" y1="31" x2="26" y2="19" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="26" y1="19" x2="33" y2="13" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="28" y1="13" x2="33" y2="13" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                    <line x1="33" y1="13" x2="33" y2="18" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="rounded-xl px-4 py-3 flex items-center gap-1"
                  style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "var(--fg-faint)", animationDelay: `${i * 0.15}s` }}/>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick suggestions — only before first user message */}
          {!hasSentRef.current && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {SUGGESTIONS.map((s) => (
                <button key={s} disabled={loading} onClick={() => send(s)}
                  className="text-[10px] font-medium px-2.5 py-1.5 rounded-lg transition-all hover:scale-[1.03]"
                  style={{ background: "var(--orange-bg)", border: "1px solid var(--orange-border)", color: "var(--orange)" }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex gap-2 mb-3 mt-1">
              <a href="/contact" className="flex-1 text-center text-xs font-medium rounded-lg px-3 py-2" style={{ background: "var(--orange-bg)", color: "var(--orange)", border: "1px solid var(--orange-border)" }}>Request a quote</a>
              <a href="https://wa.me/919106579181" target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-xs font-medium rounded-lg px-3 py-2" style={{ background: "var(--bg-tertiary)", color: "var(--fg-primary)", border: "1px solid var(--border)" }}>WhatsApp Mustafa ↗</a>
            </div>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)" }}>
              <input
                ref={inputRef}
                type="text"
                aria-label="Your question"
                maxLength={2000}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about your next project…"
                disabled={loading}
                className="flex-1 bg-transparent outline-none text-[12px] font-light placeholder:text-[var(--fg-faint)]"
                style={{ color: "var(--fg-primary)", minWidth: 0 }}
              />
              <button
                aria-label="Send message"
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: input.trim() && !loading ? "var(--orange)" : "var(--bg-card)",
                  border: `1px solid ${input.trim() && !loading ? "var(--orange)" : "var(--border)"}`,
                  opacity: !input.trim() || loading ? 0.5 : 1,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round"
                  style={{ color: input.trim() && !loading ? "white" : "var(--fg-faint)" }}>
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-center mt-2" style={{ color: "var(--fg-muted)" }}>
              Automated answers · Final scope and pricing confirmed by our team
            </p>
          </div>
        </div>
      )}

      {/* ── FLOATING BUTTON */}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ background: "var(--orange)", boxShadow: open ? "0 0 0 4px rgba(232,99,10,0.2)" : "0 8px 32px rgba(232,99,10,0.4)" }}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        aria-controls="studio-chat"
      >
        {/* Notification dot */}
        {showDot && !open && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: "#28C840", border: "2px solid var(--bg-primary)" }}>
            <span className="text-[7px] font-bold text-white">1</span>
          </div>
        )}

        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </>
  );
}
