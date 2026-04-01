import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/wishlistsuite-logo.svg";

type FooterCTAProps = {
  home?: any;
};

const defaultFooterLinks = [
  { text: "Privacy", url: "/privacy-policy" },
  { text: "FAQ", url: "/faq" },
  { text: "Support", url: "/contact" },
];

const FooterCTA = ({ home }: FooterCTAProps) => {
  const primary = home?.footer_cta_primary || {
    text: "Install on Shopify",
    url: "https://apps.shopify.com/wishlistsuite",
    is_external: true,
  };

  const secondary = home?.footer_cta_secondary || {
    text: "Schedule a Demo",
    url: "https://calendar.app.google/GSETSTRMgj7eVL7e6",
    is_external: true,
  };

  const footerLinks =
    Array.isArray(home?.footer_links) && home.footer_links.length > 0
      ? home.footer_links
      : defaultFooterLinks;

  return (
    <>
      <section className="py-20 md:py-32 bg-primary">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground leading-tight">
            {home?.footer_cta_heading ||
              "Ready to Turn Saves into Sales with WishlistSuite?"}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="gap-2 text-base">
              <a
                href={primary.url}
                target={primary.is_external ? "_blank" : undefined}
                rel={primary.is_external ? "noreferrer" : undefined}
              >
                {primary.text} <ArrowRight className="w-4 h-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a
                href={secondary.url}
                target={secondary.is_external ? "_blank" : undefined}
                rel={secondary.is_external ? "noreferrer" : undefined}
              >
                {secondary.text}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-brand-dark py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="WishlistSuite logo" className="w-8 h-8 object-contain" />
              <span className="font-heading text-lg font-bold text-brand-cream">
                WishlistSuite
              </span>
            </div>

            <div className="flex gap-8 text-sm text-brand-cream/60">
              {footerLinks.map((item: any, index: number) => (
                <Link
                  key={item.text || index}
                  to={item.url}
                  className="hover:text-brand-cream transition-colors"
                >
                  {item.text}
                </Link>
              ))}
            </div>

            <p className="text-sm text-brand-cream/40">
              {home?.footer_copyright || "© 2026 WishlistSuite. All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterCTA;