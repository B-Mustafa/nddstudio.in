import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - NDD.Studio",
  description:
    "Selected websites, apps, SEO wins, and brand systems from NDD.Studio. Digital work built to launch fast, perform well, and support real business growth.",
  openGraph: {
    title: "Work - NDD.Studio",
    description: "Selected digital projects built by NDD.Studio.",
    url: "https://nddstudio.in/work",
    siteName: "NDD.Studio",
    locale: "en_IN",
    type: "website",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
