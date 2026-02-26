import { BarChart3, Heart, Paintbrush, Repeat2, ShoppingCart, Sparkles } from "lucide-react";
import thirdSectionImg from "@/assets/3rd Section.png";
import collectionImg from "@/assets/collection-page.png";
import wishlistImg from "@/assets/wishlist-page.png";
import cartRescueImg from "@/assets/cart-rescue.png";
import showcaseImg from "@/assets/custom-showcase-single.png";
import dashboardImg from "@/assets/dashboard.png";

const featureCards = [
  {
    icon: Heart,
    title: "Product Page Wishlists",
    description: "One-click save with visible social proof to increase confidence.",
    image: thirdSectionImg,
    alt: "Product page with wishlist button",
    className: "md:col-span-2",
    imageWrapClass: "bg-card p-2",
    imageClass: "h-56 w-full object-contain",
  },
  {
    icon: Repeat2,
    title: "Collection Grid Save",
    description: "Capture intent while shoppers browse and compare.",
    image: collectionImg,
    alt: "Collection page wishlist icon",
  },
  {
    icon: Sparkles,
    title: "Shareable Wishlist Page",
    description: "Let customers revisit, organize, and share saved products.",
    image: wishlistImg,
    alt: "Wishlist page view",
  },
  {
    icon: ShoppingCart,
    title: "Cart Rescue",
    description: "Save-for-later flow keeps high-intent products alive.",
    image: cartRescueImg,
    alt: "Cart rescue with wishlist",
  },
  {
    icon: Paintbrush,
    title: "Brand Customization",
    description: "Control styles and placement without custom coding.",
    image: showcaseImg,
    alt: "Customization controls and mobile preview",
    className: "md:col-span-2",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track top saved products and conversion-driven insights.",
    image: dashboardImg,
    alt: "Wishlist analytics dashboard",
  },
];

const FeaturesBento = () => (
  <section className="pb-16 md:pb-24">
    <div className="container mx-auto px-4">
      <div className="mb-8 md:mb-10">
        <p className="inline-flex items-center rounded-full bg-brand-green-light px-4 py-1.5 text-sm font-medium text-foreground">
          Feature Highlights
        </p>
        <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
          Compact, Powerful, and Built for Conversion
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:[grid-auto-flow:dense]">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className={`rounded-2xl border border-border bg-card p-4 shadow-sm ${card.className ?? ""}`}
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">{card.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{card.description}</p>
              <div className={`mt-4 overflow-hidden rounded-xl border border-border bg-muted/40 ${card.imageWrapClass ?? ""}`}>
                <img
                  src={card.image}
                  alt={card.alt}
                  className={card.imageClass ?? "h-44 w-full object-cover"}
                  loading="lazy"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeaturesBento;
