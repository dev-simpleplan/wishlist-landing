import NavHeader from "@/components/NavHeader";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import WhySection from "@/components/WhySection";
import EverywhereStrategy from "@/components/EverywhereStrategy";
import FeaturesBento from "@/components/FeaturesBento";
import CustomizationSection from "@/components/CustomizationSection";
import ReviewsSection from "@/components/ReviewsSection";
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
        <CustomizationSection />
        <ReviewsSection />
        <FAQSection />
        <FooterCTA />
      </main>
    </div>
  );
};

export default Index;
