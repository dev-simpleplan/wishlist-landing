import NavHeader from "@/components/NavHeader";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import EverywhereStrategy from "@/components/EverywhereStrategy";
import ProductPageFeature from "@/components/ProductPageFeature";
import CartRescue from "@/components/CartRescue";
import CollectionMultiList from "@/components/CollectionMultiList";
import CustomizationSection from "@/components/CustomizationSection";
import DashboardSection from "@/components/DashboardSection";
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
        <EverywhereStrategy />
        <ProductPageFeature />
        <CartRescue />
        <CollectionMultiList />
        <CustomizationSection />
        <DashboardSection />
        <EarlyAdopter />
        <FAQSection />
        <FooterCTA />
      </main>
    </div>
  );
};

export default Index;
