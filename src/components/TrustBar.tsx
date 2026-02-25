import { Shield, Star } from "lucide-react";

const TrustBar = () => (
  <section className="py-12 border-y border-border bg-card">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
        Optimized for Shopify 2.0
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Star className="w-5 h-5 text-primary fill-current" />
          <span className="text-sm font-medium">Built for Shopify</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="w-5 h-5 text-brand-green" />
          <span className="text-sm font-medium">Shopify Plus Ready</span>
        </div>
      </div>
    </div>
  </section>
);

export default TrustBar;
