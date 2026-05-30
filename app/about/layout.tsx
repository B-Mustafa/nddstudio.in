import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — NDD.Studio",
  description:
    "We're a digital studio from Godhra, Gujarat. Founded by Mustafa Bhikhapur, NDD.Studio builds websites, apps, SEO, and design that actually grows your business.",
  openGraph: {
    title: "About — NDD.Studio",
    description: "We're a digital studio from Godhra, Gujarat, obsessed with building digital things that work.",
    url: "https://nddstudio.in/about",
    siteName: "NDD.Studio",
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
