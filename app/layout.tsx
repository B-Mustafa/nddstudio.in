import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import ThemeProvider from "@/components/ThemeProvider";
import "../app/globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NDD.Studio — Digital. Done different.",
  description:
    "SEO, websites, apps, and design — built to perform, delivered on time, obsessed with your growth. Based in Godhra, Gujarat, India.",
  keywords: ["web design", "SEO", "app development", "UI UX design", "digital studio", "Godhra", "Gujarat", "India"],
  openGraph: {
    title: "NDD.Studio — Digital. Done different.",
    description: "SEO, websites, apps, and design — built to perform, delivered on time, obsessed with your growth.",
    url: "https://nddstudio.in",
    siteName: "NDD.Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NDD.Studio — Digital. Done different.",
    description: "SEO, websites, apps, and design — built to perform, delivered on time, obsessed with your growth.",
  },
  metadataBase: new URL("https://nddstudio.in"),
};

const themeScript = `(function(){try{var s=localStorage.getItem('ndd-theme');if(s==='light'||s==='dark'){document.documentElement.setAttribute('data-theme',s);}else{var d=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',d);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="grain" suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
