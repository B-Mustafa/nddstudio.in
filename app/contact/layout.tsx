import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — NDD.Studio",
  description:
    "Start a project with NDD.Studio. Free consultation, response within 24 hours. Based in Godhra, Gujarat — working remotely across India.",
  openGraph: {
    title: "Contact — NDD.Studio",
    description: "Start a project. Free consultation, response within 24 hours.",
    url: "https://nddstudio.in/contact",
    siteName: "NDD.Studio",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
