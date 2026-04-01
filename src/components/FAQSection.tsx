import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

type FAQSectionProps = {
  home?: any;
  faqItems?: Array<{
    id: string | number;
    question: string;
    answer: unknown;
  }>;
};

const renderAnswer = (answer: unknown) => {
  if (!answer) return null;

  if (typeof answer === "string") return answer;

  if (Array.isArray(answer)) {
    return answer
      .map((block: any) => {
        if (typeof block?.text === "string") return block.text;
        if (Array.isArray(block?.children)) {
          return block.children.map((child: any) => child?.text || "").join(" ");
        }
        return "";
      })
      .join(" ");
  }

  return String(answer);
};

const fallbackFaqs = [
  {
    question: "Is WishlistSuite compatible with Shopify 2.0 themes?",
    answer:
      "Yes. WishlistSuite is fully optimized for Shopify 2.0 themes and works seamlessly with most modern Shopify stores, including Shopify Plus.",
  },
  {
    question: "Do customers need to create an account to use the wishlist?",
    answer:
      "No. Guests can save products without logging in. If they create an account later, their wishlist can still be retained — making the experience frictionless.",
  },
  {
    question: "Can I customize the look of the wishlist button?",
    answer:
      "Absolutely. You can customize text, colors, icons, and placement to match your store’s branding — no coding required.",
  },
  {
    question: "Does it slow down my store?",
    answer:
      "No. WishlistSuite is lightweight and optimized for performance, ensuring it won’t impact your store speed.",
  },
];

const FAQSection = ({ home, faqItems = [] }: FAQSectionProps) => {
  const visibleFaqs =
    faqItems.length > 0
      ? faqItems.map((item) => ({
          q: item.question,
          a: renderAnswer(item.answer),
        }))
      : fallbackFaqs.map((faq) => ({
          q: faq.question,
          a: faq.answer,
        }));

  return (
    <section id="faq" className="scroll-mt-28 py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground text-center mb-12">
          {home?.home_faq_heading || "Frequently Asked Questions"}
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
            to={home?.home_faq_button_link || "/faq"}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {home?.home_faq_button_text || "View More FAQ"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;