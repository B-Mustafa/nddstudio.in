import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — NDD.Studio",
  description:
    "SEO, web design & development, app development, UI/UX design, branding, and digital marketing. Every digital service your business needs — built right, delivered on time.",
  openGraph: {
    title: "Services — NDD.Studio",
    description: "Every digital service your business needs — built right, delivered on time.",
    url: "https://nddstudio.in/services",
    siteName: "NDD.Studio",
    locale: "en_IN",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
