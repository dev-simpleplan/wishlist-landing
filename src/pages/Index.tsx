import NavHeader from "@/components/NavHeader";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import WhySection from "@/components/WhySection";
import EverywhereStrategy from "@/components/EverywhereStrategy";
import FeaturesBento from "@/components/FeaturesBento";
import ReviewsSection from "@/components/ReviewsSection";
import EarlyAdopter from "@/components/EarlyAdopter";
import FAQSection from "@/components/FAQSection";
import FooterCTA from "@/components/FooterCTA";

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
      <NavHeader />
      <main>
        <HeroSection />
        <TrustBar />
        <WhySection />
        <EverywhereStrategy />
        <FeaturesBento />
        <ReviewsSection />
        <EarlyAdopter />
        <FAQSection />
        <FooterCTA />
      </main>
    </div>
  );
};

export default Index;
