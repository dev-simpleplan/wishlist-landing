import { Shield, Star } from "lucide-react";

type TrustBarProps = {
  home?: any;
};

const TrustBar = ({ home }: TrustBarProps) => {
  const items =
    Array.isArray(home?.trustbar_items) && home.trustbar_items.length > 0
      ? home.trustbar_items
      : [
          { label: "Built for Shopify" },
          { label: "Shopify Plus Ready" },
        ];

  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
          {home?.trustbar_heading || "Optimized for Shopify 2.0"}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {items.map((item: any, index: number) => (
            <div key={item.label || index} className="flex items-center gap-2 text-muted-foreground">
              {index % 2 === 0 ? (
                <Star className="w-5 h-5 text-primary fill-current" />
              ) : (
                <Shield className="w-5 h-5 text-brand-green" />
              )}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;