# NDD.Studio — Next.js Website

> **Digital. Done different.**

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** — Syne 800 (headings) + DM Sans 300–500 (body)

## Brand
- **Primary color:** `#E8630A` (Ember Orange)
- **Background:** `#0D0D0D` (Void)
- **Domain:** nddstudio.in
- **Contact:** hello@nddstudio.in · +91 91065 79181

## Folder structure

```
ndd-studio/
├── app/
│   ├── layout.tsx        ← Root layout, fonts, metadata
│   ├── page.tsx          ← Homepage (assembles all sections)
│   └── globals.css       ← CSS variables, Tailwind, animations
├── components/
│   ├── Logo.tsx          ← 4-pane window SVG mark
│   ├── Navbar.tsx        ← Sticky nav with mobile menu
│   ├── Hero.tsx          ← Hero section
│   ├── Services.tsx      ← 6-service grid
│   ├── Process.tsx       ← 4-step process
│   ├── Testimonials.tsx  ← Client reviews
│   ├── CTASection.tsx    ← Orange CTA + contact
│   └── Footer.tsx        ← Footer with links
├── public/               ← Static assets (add favicon.ico here)
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

## Quick start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

## Build for production

```bash
npm run build
npm start
```

## Customise

| What                  | Where                              |
|-----------------------|------------------------------------|
| Name / contact        | `components/CTASection.tsx`        |
| Nav links             | `components/Navbar.tsx`            |
| Services list         | `components/Services.tsx`          |
| Testimonials          | `components/Testimonials.tsx`      |
| Colors                | `tailwind.config.ts` + `globals.css` |
| SEO metadata          | `app/layout.tsx`                   |
| Logo                  | `components/Logo.tsx` (pure SVG)   |

## Favicon
Add a `favicon.ico` (or `icon.png`) to the `/public` folder.
Next.js picks it up automatically.

## Deploy
Easiest: push to GitHub → connect to [Vercel](https://vercel.com).
Free tier handles a studio site with no issues.
