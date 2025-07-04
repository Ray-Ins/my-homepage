import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import CustomerReviews from "@/components/CustomerReviews";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroCarousel />
      <AboutSection />
      <CustomerReviews />
      <ContactSection />
    </main>
  );
}
