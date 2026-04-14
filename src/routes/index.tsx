import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Serene Flow — Book Yoga Sessions Effortlessly" },
      { name: "description", content: "Find your inner peace with Serene Flow. Book yoga sessions with trusted instructors, flexible scheduling, and a calming booking experience." },
      { property: "og:title", content: "Serene Flow — Book Yoga Sessions" },
      { property: "og:description", content: "Effortless yoga session booking with trusted instructors." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
