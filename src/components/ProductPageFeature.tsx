import heroPhone from "@/assets/hero-phone.png";
import { Heart } from "lucide-react";

const ProductPageFeature = () => (
  <section className="py-20 md:py-32 bg-card">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Visual */}
        <div className="order-2 md:order-1">
          <div className="bg-primary/10 rounded-3xl p-8 relative">
            <img
              src={heroPhone}
              alt="Product page with wishlist counts"
              className="rounded-2xl shadow-lg w-72 mx-auto"
            />
            {/* Floating count */}
            <div className="absolute top-6 right-6 bg-card rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 border border-border">
              <Heart className="w-5 h-5 text-destructive fill-current" />
              <span className="font-heading font-bold text-foreground">1,243</span>
              <span className="text-xs text-muted-foreground">saves</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
            Upgrade Your Product Page into a Sales Engine
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Boost product page performance with live wishlist counts that drive urgency and social proof. Let shoppers save in one click with a customizable button that matches your store perfectly.
          </p>
          <div className="bg-brand-green-light border border-brand-green/20 rounded-xl px-5 py-4">
            <p className="text-sm text-foreground font-medium">
              Real-time wishlist counts build trust and help shoppers decide faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProductPageFeature;
