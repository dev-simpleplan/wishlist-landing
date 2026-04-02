import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

type FAQSectionProps = {
  home?: any;
};

const renderAnswer = (answer: any) => {
  if (!answer) return null;

  if (typeof answer === "string") return answer;

  if (Array.isArray(answer)) {
    return answer
      .map((block: any) => {
        if (block?.children) {
          return block.children.map((child: any) => child?.text || "").join(" ");
        }
        return "";
      })
      .join(" ");
  }

  return "";
};

const FAQSection = ({ home }: FAQSectionProps) => {
  const categories = home?.faq_category || [];

  // ✅ Flatten all FAQ items from categories
  const faqs = categories.flatMap((cat: any) =>
    (cat?.faq_item || []).map((item: any) => ({
      q: item?.question,
      a: renderAnswer(item?.answer),
      order: item?.sort_order || 0,
    }))
  );

  // ✅ Sort by sort_order
  const sortedFaqs = faqs.sort((a: any, b: any) => a.order - b.order);

  // ❌ Optional: hide if no data
  if (!sortedFaqs.length) return null;

  return (
    <section id="faq" className="scroll-mt-28 py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground text-center mb-12">
          {home?.home_faq_heading}
        </h2>

        <Accordion type="single" collapsible className="space-y-3">
          {sortedFaqs.map((faq: any, i: number) => (
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

        {/* CTA */}
        {home?.home_faq_button_link && (
          <div className="mt-8 text-center">
            <Link
              to={home.home_faq_button_link}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {home?.home_faq_button_text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;