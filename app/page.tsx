import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <main>
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <Testimonials />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
