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
          <Button variant="secondary" size="lg" className="gap-2 text-base border-brand-cream/30 text-brand-cream hover:bg-brand-cream/10">
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
