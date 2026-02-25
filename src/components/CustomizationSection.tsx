import { Paintbrush } from "lucide-react";
import showcaseImg from "@/assets/custom-showcase-single.png";

const CustomizationSection = () => (
  <section className="py-14 md:py-20">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5 text-sm font-medium text-foreground">
          <Paintbrush className="w-4 h-4" />
          No coding required
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
          Style It to Match Your Brand
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Easily customize styles, text, colors, and placement to match your store perfectly. No coding required. Just simple controls that keep everything on-brand.
        </p>
      </div>

      <div className="max-w-3xl md:max-w-4xl mx-auto">
        <figure className="rounded-2xl overflow-hidden bg-transparent">
          <img
            src={showcaseImg}
            alt="Wishlist mobile views across homepage, collection, and product pages"
            className="w-full h-auto block"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  </section>
);

export default CustomizationSection;
