import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const EarlyAdopter = () => (
  <section className="py-20 md:py-32">
    <div className="container mx-auto px-4">
      <div className="relative bg-brand-dark rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5 text-sm font-medium text-brand-yellow">
            <Sparkles className="w-4 h-4" />
            Limited Spots
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-cream leading-tight">
            Get Early Access to the First Wave of Wishlistsuite
          </h2>
          <p className="text-lg text-brand-cream/70 leading-relaxed">
            Join our early access program and get personalized onboarding, priority support, and white-glove setup to launch with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2 text-base"
          >
            <a href="https://apps.shopify.com/wishlistsuite" target="_blank" rel="noreferrer">
              Install Now <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            <a href="https://calendar.app.google/GSETSTRMgj7eVL7e6" target="_blank" rel="noreferrer">
              Book a Demo
            </a>
          </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default EarlyAdopter;
