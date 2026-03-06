import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "Is Wishlistsuite compatible with Shopify 2.0 themes?",
    a: "Yes. Wishlistsuite is fully optimized for Shopify 2.0 themes and works seamlessly with most modern Shopify stores, including Shopify Plus.",
  },
  {
    q: "Do customers need to create an account to use the wishlist?",
    a: "No. Guests can save products without logging in. If they create an account later, their wishlist can still be retained — making the experience frictionless.",
  },
  {
    q: "Can I customize the look of the wishlist button?",
    a: "Absolutely. You can customize text, colors, icons, and placement to match your store’s branding — no coding required.",
  },
  {
    q: "Does it slow down my store?",
    a: "No. Wishlistsuite is lightweight and optimized for performance, ensuring it won’t impact your store speed.",
  },
  {
    q: "Can customers share their wishlist?",
    a: "Yes. Customers can share their wishlist via link, making it easy to send favorites to friends or family.",
  },
  {
    q: "Can shoppers move items from wishlist to cart easily?",
    a: "Yes. Items can be added to cart in one click directly from the wishlist page.",
  },
  {
    q: "Does it help reduce cart abandonment?",
    a: "Yes. Shoppers can move items from their cart to their wishlist instead of removing them completely — helping you preserve buying intent.",
  },
  {
    q: "Do I get analytics with Wishlistsuite?",
    a: "Yes. You get insights into most-saved products, wishlist-to-cart conversions, and customer trends to help you make smarter merchandising decisions.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. You can try Wishlistsuite free for 14 days and explore all features before committing.",
  },
  {
    q: "What kind of support do you offer?",
    a: "We offer priority support and guided onboarding — especially during our launch phase — to ensure smooth setup and maximum performance.",
  },
];

const visibleFaqs = faqs.slice(0, 4);

const FAQSection = () => (
  <section id="faq" className="scroll-mt-28 py-20 md:py-32 bg-card">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground text-center mb-12">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {visibleFaqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-background rounded-xl border border-border px-6"
          >
            <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-8 text-center">
        <Link
          to="/faq"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View More FAQ
        </Link>
      </div>
    </div>
  </section>
);

export default FAQSection;
