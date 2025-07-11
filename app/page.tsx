import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import CustomerReviews from "@/components/CustomerReviews";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#003447",
        backgroundImage: `url('/background/background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <HeroCarousel />
      <AboutSection />
      <CustomerReviews />
      <ContactSection />
    </main>
  );
}
