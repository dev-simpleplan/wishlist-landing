import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/wishlistsuite-logo.svg";

const FooterCTA = () => (
  <>
    {/* Final CTA */}
    <section className="py-20 md:py-32 bg-primary">
      <div className="container mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground leading-tight">
          Ready to Turn Saves into Sales with WishlistSuite?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="gap-2 text-base"
          >
            <a href="https://apps.shopify.com/wishlistsuite" target="_blank" rel="noreferrer">
              Install on Shopify <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <a href="https://calendar.app.google/GSETSTRMgj7eVL7e6" target="_blank" rel="noreferrer">
              Schedule a Demo
            </a>
          </Button>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-brand-dark py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="WishlistSuite logo" className="w-8 h-8 object-contain" />
            <span className="font-heading text-lg font-bold text-brand-cream">WishlistSuite</span>
          </div>
          <div className="flex gap-8 text-sm text-brand-cream/60">
            <Link to="/privacy-policy" className="hover:text-brand-cream transition-colors">Privacy</Link>
            <Link to="/faq" className="hover:text-brand-cream transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-brand-cream transition-colors">Support</Link>
          </div>
          <p className="text-sm text-brand-cream/40">
            © 2026 WishlistSuite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </>
);

export default FooterCTA;
