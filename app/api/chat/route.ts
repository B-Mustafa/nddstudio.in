import { NextRequest, NextResponse } from "next/server";

// ── Rule-based chatbot — no API key needed ─────────────────────────────────
// Fast, free, and covers every common visitor question about NDD Studio.

interface Rule {
  keywords: string[];
  response: string;
}

const RULES: Rule[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "namaste", "hii", "helo"],
    response: "Hey! 👋 Great to have you here. I can help with questions about our services, pricing, timelines, or how to get started. What would you like to know?",
  },
  {
    keywords: ["service", "offer", "what do you do", "what can you do", "help with"],
    response: "We offer 6 core services:\n\n• SEO & Search\n• Website Design & Dev\n• App Development\n• UI / UX Design\n• Brand & Graphic Design\n• Digital Marketing\n\nNeed details on any specific one? Just ask!",
  },
  {
    keywords: ["seo", "search engine", "rank", "google", "ranking", "organic", "keyword"],
    response: "Our SEO service starts at ₹15,000/mo. We cover on-page, technical, and local SEO. Most clients see real movement in rankings within 30–90 days.\n\nWant to start? → /contact",
  },
  {
    keywords: ["website", "web design", "web development", "next.js", "webflow", "landing page", "redesign"],
    response: "Websites start at ₹30,000. We build in Next.js or Webflow — mobile-first, fast, and designed to convert. Most sites launch in 2–5 weeks.\n\nReady to start? → /contact",
  },
  {
    keywords: ["app", "mobile", "ios", "android", "flutter", "react native", "application"],
    response: "App development starts at ₹80,000. We build iOS, Android, and cross-platform apps — from idea to App Store. Typical timeline is 4–10 weeks.\n\nLet's discuss your app → /contact",
  },
  {
    keywords: ["design", "ui", "ux", "figma", "prototype", "wireframe", "interface"],
    response: "UI/UX design starts at ₹20,000. We do user research, wireframes, Figma prototypes, and full design systems — developer-ready handoff included.",
  },
  {
    keywords: ["brand", "logo", "identity", "branding", "graphic", "visual"],
    response: "Brand & graphic design starts at ₹12,000. You get 3 logo concepts, a full brand kit, color system, typography, social templates, and every file format you'll ever need.",
  },
  {
    keywords: ["marketing", "ads", "google ads", "meta", "facebook", "instagram ads", "campaign", "paid"],
    response: "Digital marketing starts at ₹20,000/mo. We run Google Ads and Meta campaigns — every rupee tracked, optimised for cost per lead, not just clicks.",
  },
  {
    keywords: ["price", "cost", "pricing", "how much", "rate", "charge", "fee", "budget", "₹", "rupee"],
    response: "Starting prices:\n\n• SEO — ₹15,000/mo\n• Website — ₹30,000\n• App — ₹80,000\n• UI/UX — ₹20,000\n• Brand — ₹12,000\n• Marketing — ₹20,000/mo\n\nBundle 2+ services and save 10–15%. Get an exact quote → /contact",
  },
  {
    keywords: ["timeline", "how long", "time", "duration", "deadline", "fast", "quick", "week", "days"],
    response: "Typical timelines:\n\n• Brand identity — 5–10 days\n• Website — 2–5 weeks\n• App — 4–10 weeks\n• SEO results — 30–90 days\n\nWe always give you a fixed deadline before starting — and we hit it.",
  },
  {
    keywords: ["contact", "reach", "talk", "call", "meeting", "consult", "consultation", "enquire", "enquiry"],
    response: "Best ways to reach us:\n\n📧 hello@nddstudio.in\n💬 WhatsApp via the contact page\n📋 Fill the project brief → /contact\n\nWe reply within 24 hours. Free 30-min call, no commitment.",
  },
  {
    keywords: ["free", "no cost", "free consultation", "trial"],
    response: "Yes — our discovery consultation is completely free. 30 minutes, no commitment. We'll tell you exactly what to focus on even if you don't hire us. Book it → /contact",
  },
  {
    keywords: ["where", "location", "based", "godhra", "gujarat", "india", "remote"],
    response: "We're based in Godhra, Gujarat, India — but work 100% remotely with clients across India, UAE, Kuwait, and beyond. Time zones haven't been a problem.",
  },
  {
    keywords: ["who", "founder", "mustafa", "about", "team", "people", "studio"],
    response: "NDD.Studio was founded by Mustafa Bhikhapur in Godhra, Gujarat. We're a lean studio — you work directly with the person doing the work, no account managers, no layers. Learn more → /about",
  },
  {
    keywords: ["work", "portfolio", "project", "case study", "example", "past work", "client"],
    response: "We've built projects for clients in India, UAE, and Kuwait — including godhrajamaat.org, bintelsoor.com, ibestfze.com, and more. See them live → /work",
  },
  {
    keywords: ["package", "bundle", "combo", "together", "multiple"],
    response: "Bundling services saves you 10–15%! Popular combos:\n\n• Launch Kit — Brand + Website\n• Growth Bundle — Website + SEO\n• Full Digital — Website + SEO + Marketing\n\nMention it when you enquire → /contact",
  },
  {
    keywords: ["guarantee", "refund", "satisfaction", "promise", "quality"],
    response: "We don't offer refunds — instead, we do the work right the first time. 98% client satisfaction, fixed scope, and we don't start until you approve the design direction.",
  },
  {
    keywords: ["start", "begin", "get started", "next step", "how to", "process"],
    response: "Getting started is easy:\n\n1️⃣ Fill the brief → /contact (3 mins)\n2️⃣ We review and reach out same day\n3️⃣ Free 30-min discovery call\n4️⃣ Fixed proposal with price + timeline\n\nThat's it — no lengthy onboarding.",
  },
  {
    keywords: ["thanks", "thank you", "perfect", "great", "awesome", "helpful"],
    response: "Happy to help! If you're ready to talk about a project, head to /contact — we'd love to hear what you're building. 🚀",
  },
];

const FALLBACK =
  "Good question — I may not have a specific answer for that. For anything detailed, email hello@nddstudio.in or fill our contact form at /contact. Mustafa replies within 24 hours.";

function findResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return FALLBACK;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages?.[messages.length - 1];
    if (!lastMessage?.content) {
      return NextResponse.json({ message: FALLBACK });
    }
    const response = findResponse(lastMessage.content);
    // Small artificial delay so it doesn't feel instant-robotic
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
    return NextResponse.json({ message: response });
  } catch {
    return NextResponse.json({ message: FALLBACK });
  }
}
