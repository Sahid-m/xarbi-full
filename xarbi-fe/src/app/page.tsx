import CTA from "@/components/cta";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Navbar from "@/components/navbar";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background overflow-hidden">
        <Navbar />
        <Hero />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="tech-stack">
          <TechStack />
        </section>
        <section id="cta">
          <CTA />
        </section>
        <Footer />
      </div>
    </>
  );
}
