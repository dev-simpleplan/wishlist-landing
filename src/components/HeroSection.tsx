import { Button } from "@/components/ui/button";
import { UserRound, ArrowRight } from "lucide-react";
import heroPhone from "@/assets/hero-phone.png";

const HeroSection = () => {
  const tickerItems = [
    "Guest & Logged-In Wishlist Sync",
    "One-Click Save Buttons",
    "Multi-List Wishlists",
    "Back-In-Stock Reminders",
    "Wishlist Analytics Dashboard",
    "Smart Cart Rescue Flows",
    "Shareable Wishlist Links",
    "Fully Shopify 2.0 Compatible",
  ];

  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 rounded-bl-[120px] -z-10" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5 text-sm font-medium text-foreground">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              Built for Shopify Online Store 2.0
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-foreground">
              Turn Browsers into Buyers with Wishlistsuite
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Give shoppers a simple way to save, organize, and come back to what they love. Wishlistsuite captures buying intent, reduces cart abandonment, and turns “not now” into future revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2 text-base">
                <a href="https://apps.shopify.com/wishlistsuite" target="_blank" rel="noreferrer">
                  Install on Shopify
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 text-base">
                <a href="https://calendar.app.google/GSETSTRMgj7eVL7e6" target="_blank" rel="noreferrer">
                  <UserRound className="w-4 h-4" />
                  Book Onboarding Call
                </a>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <img
                src={heroPhone}
                alt="Wishlist on product page"
                className="w-80 md:w-96 rounded-3xl shadow-2xl"
              />
              {/* Social proof badge */}
              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-xl px-5 py-3 border border-border">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-heading font-bold text-brand-green">2,847</span>
                  <span className="text-sm text-muted-foreground">shoppers saved<br/>this item</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 w-full px-4 md:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-full border border-white/20 bg-white/60 shadow-sm backdrop-blur-md">
          <div
            className="group flex w-max animate-ticker-ltr py-2.5 motion-reduce:animate-none hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
            aria-label="Wishlist app feature ticker"
          >
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="mx-6 flex items-center gap-2 whitespace-nowrap text-[13px] font-medium text-foreground/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#55B85F]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
