import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "We saw more returning shoppers within the first week. Setup was quick and the wishlist button blended with our theme perfectly.",
    name: "Aisha K.",
    role: "Fashion Store Owner",
  },
  {
    quote:
      "The wishlist-to-cart behavior helped us recover intent we usually lose. Customers now come back and complete purchases.",
    name: "Daniel R.",
    role: "DTC Brand Manager",
  },
  {
    quote:
      "Customization is simple, analytics are useful, and support is fast. It feels like a native Shopify feature, not a bolt-on app.",
    name: "Meera S.",
    role: "Shopify Plus Merchant",
  },
];

const ReviewsSection = () => (
  <section className="py-16 md:py-24 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
          What people say about us
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name} className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed">"{review.quote}"</p>
            <div className="mt-5">
              <p className="font-heading font-semibold text-foreground">{review.name}</p>
              <p className="text-sm text-muted-foreground">{review.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
