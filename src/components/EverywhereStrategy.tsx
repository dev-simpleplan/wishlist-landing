import { useState } from "react";
import collectionImg from "@/assets/collection page.png";
import homepageImg from "@/assets/Homepage.png";
import productPageImg from "@/assets/3rd Section.png";

const EverywhereStrategy = () => {
  const [activeTab, setActiveTab] = useState<"homepage" | "collection" | "product">("homepage");
  const previewImage =
    activeTab === "homepage" ? homepageImg : activeTab === "collection" ? collectionImg : productPageImg;
  const previewAlt =
    activeTab === "homepage"
      ? "Homepage grid with wishlist"
      : activeTab === "collection"
        ? "Collection page with wishlist"
        : "Product page with wishlist";

  return (
    <section id="features" className="scroll-mt-28 pt-12 pb-20 md:pt-16 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
            See How WishlistSuite Works Across the Store
          </h2>
        </div>

        <div className="space-y-8">
          <div className="space-y-6 max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              Let Shoppers Save From Every Page
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Drop a heart wherever shoppers browse — homepage, collections, or product pages. With full Shopify 2.0 compatibility, responsive design, and easy styling, it looks and feels completely native.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 bg-muted rounded-xl p-1 w-fit">
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
              <button
                onClick={() => setActiveTab("product")}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "product"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Product Page
              </button>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-brand-green-light rounded-3xl p-6 md:p-8">
              <img
                src={previewImage}
                alt={previewAlt}
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
