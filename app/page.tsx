import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import HostingerPartner from "@/components/HostingerPartner";

export default function Home() {
  return (
    <>
      <Cursor />
      <main>
        <Navbar />
        <Hero />
        <Services />
        <HostingerPartner />
        <Process />
        <Testimonials />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
