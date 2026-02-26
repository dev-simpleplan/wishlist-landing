import NavHeader from "@/components/NavHeader";
import FooterCTA from "@/components/FooterCTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  q: string;
  a: string[];
  bullets?: string[];
};

type FAQCategory = {
  title: string;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    title: "General",
    items: [
      {
        q: "What is WishlistSuite?",
        a: [
          "WishlistSuite allows customers to save products to a wishlist so they can purchase them later. It helps increase return visits, customer engagement, and conversions.",
        ],
      },
      {
        q: "How does WishlistSuite work?",
        a: [
          "Customers can click the wishlist icon on product or collection pages to save items. Saved products can be accessed later from their wishlist page or icon.",
        ],
      },
      {
        q: "Does WishlistSuite work with all Shopify themes?",
        a: [
          "WishlistSuite is compatible with all Shopify 2.0 themes and most vintage and legacy themes. If your theme has heavy customizations, our team can assist with placement adjustments.",
        ],
      },
      {
        q: "Does the app affect store speed?",
        a: [
          "No. WishlistSuite is built using lightweight scripts and Shopify's native app blocks, ensuring minimal performance impact.",
        ],
      },
      {
        q: "Does it work on mobile?",
        a: [
          "Yes. WishlistSuite is fully responsive and works seamlessly across desktop, tablet, and mobile devices.",
        ],
      },
    ],
  },
  {
    title: "Installation and Setup",
    items: [
      {
        q: "How do I install WishlistSuite?",
        a: [
          "To install WishlistSuite:",
          "Install the app from the Shopify App Store.",
          "Go to your Theme Customizer and enable the App Embed for WishlistSuite.",
          "Once enabled, the wishlist functionality will be live on your storefront.",
        ],
      },
      {
        q: "Do I need to add an App Block?",
        a: [
          "Yes. WishlistSuite uses Shopify App Blocks to position the wishlist button on the product page. You can also add custom CSS and JS to customize the button based on your requirements.",
        ],
      },
      {
        q: "Can I choose where the wishlist icon appears?",
        a: [
          "Yes. You can position the icon using the floating icon or adjust placement via the Launch Point option in the Settings page. You can also add custom CSS and JS from the Wishlist Floating Icon Embed.",
        ],
      },
      {
        q: "Do I need coding knowledge?",
        a: [
          "No coding is required for standard setup. Most customizations can be done from the Settings page in the app. Advanced custom positioning may require minor theme adjustments, and our team can assist.",
        ],
      },
    ],
  },
  {
    title: "Wishlist Behavior",
    items: [
      {
        q: "Can guest users create a wishlist?",
        a: [
          "Yes. Guests can save products. However, wishlist persistence across devices requires customer login.",
        ],
      },
      {
        q: "Are wishlists saved after logout?",
        a: [
          "If the customer is logged in, their wishlist is saved to their account and accessible anytime they log back in.",
        ],
      },
      {
        q: "Can customers share their wishlist?",
        a: [
          "As long as the app embed is enabled, both existing and guest customers can share their wishlist via a public link.",
        ],
      },
      {
        q: "Can customers add product variants to their wishlist?",
        a: [
          "Yes. WishlistSuite supports saving specific product variants (for example, size or color). The selected variant will be visible properly in the wishlist.",
        ],
      },
      {
        q: "What happens if a product goes out of stock?",
        a: [
          "The product remains in the wishlist, but customers see the updated availability status. The out-of-stock product will not be added to cart.",
        ],
      },
    ],
  },
  {
    title: "Customization",
    items: [
      {
        q: "Can I customize the wishlist icon?",
        a: [
          "Yes. You can change icon style, size, color, and placement to match your brand. This can be done from the Settings page in the app.",
        ],
      },
      {
        q: "Can I edit wishlist text labels?",
        a: [
          "Yes. All major labels (for example, Add to Wishlist and My Wishlist) can be customized from the Settings page in the app.",
        ],
      },
      {
        q: "Can I translate WishlistSuite?",
        a: [
          "No, translations are not supported yet. This is something we are considering for future updates.",
        ],
      },
    ],
  },
  {
    title: "Customer Data and Sync",
    items: [
      {
        q: "Where is wishlist data stored?",
        a: [
          "Wishlist data is stored securely and linked to the customer account when logged in.",
        ],
      },
      {
        q: "Is wishlist data synced across devices?",
        a: [
          "Yes. Wishlist data is synced across devices if the customer is logged in to their account.",
          "When a customer is logged in, their wishlist is linked to their Shopify customer account. They can save a product on one device and see it later on another device.",
          "For guest users, the wishlist is stored locally in the browser. It is device-specific and does not sync across devices.",
        ],
      },
    ],
  },
  {
    title: "Compatibility",
    items: [
      {
        q: "Does WishlistSuite work with cart drawers?",
        a: [
          "Yes. WishlistSuite is designed to work with both traditional cart pages and modern cart drawer (side cart) setups.",
          "If your theme uses a heavily customized cart drawer, minor adjustments may be required and our team can assist.",
        ],
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        q: "Does WishlistSuite provide analytics?",
        a: [
          "Yes. WishlistSuite includes built-in analytics to help you understand customer behavior and product demand. Visit the Analytics page in the app to view detailed information about wishlists, customers, and products.",
        ],
      },
      {
        q: "What analytics can I see inside WishlistSuite?",
        a: ["You can track:"],
        bullets: [
          "Total Wishlists",
          "Total Customers",
          "Wishlist Views",
          "Total Items Added",
          "Conversion insights",
          "Most wishlisted products",
          "Total Revenue from Conversions",
          "Average Order Value",
        ],
      },
    ],
  },
];

const FAQPage = () => (
  <div className="min-h-screen bg-background">
    <NavHeader />
    <main className="pt-28 pb-16 md:pt-36 md:pb-24">
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 md:mb-16">
          <p className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5 text-sm font-medium text-foreground">
            FAQ
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-heading font-bold text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about WishlistSuite setup, behavior, and compatibility.
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category) => (
            <section key={category.title} className="rounded-2xl border border-border bg-card p-5 md:p-7">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">{category.title}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {category.items.map((item, index) => (
                  <AccordionItem
                    key={`${category.title}-${item.q}`}
                    value={`${category.title}-${index}`}
                    className="bg-background rounded-xl border border-border px-5"
                  >
                    <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed space-y-3">
                      {item.a.map((paragraph, pIndex) => (
                        <p key={`${item.q}-p-${pIndex}`}>{paragraph}</p>
                      ))}
                      {item.bullets && (
                        <ul className="list-disc pl-6 space-y-1">
                          {item.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </section>
    </main>
    <FooterCTA />
  </div>
);

export default FAQPage;
