import { useState } from "react";
import collectionImg from "@/assets/collection-page.png";
import heroPhone from "@/assets/hero-phone.png";

const EverywhereStrategy = () => {
  const [activeTab, setActiveTab] = useState<"homepage" | "collection">("homepage");
  const previewImage = activeTab === "homepage" ? heroPhone : collectionImg;

  return (
    <section id="features" className="scroll-mt-28 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
              Let Shoppers Save From Every Page
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Drop a heart wherever shoppers browse — homepage, collections, or product pages. With full Shopify 2.0 compatibility, responsive design, and easy styling, it looks and feels completely native.
            </p>

            {/* Toggle */}
            <div className="flex gap-2 bg-muted rounded-xl p-1 w-fit">
              <button
                onClick={() => setActiveTab("homepage")}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "homepage"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Homepage Grid
              </button>
              <button
                onClick={() => setActiveTab("collection")}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "collection"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Collection Page
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-brand-green-light rounded-3xl p-6">
              <img
                src={previewImage}
                alt={activeTab === "homepage" ? "Homepage grid with wishlist" : "Collection page with wishlist"}
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EverywhereStrategy;
