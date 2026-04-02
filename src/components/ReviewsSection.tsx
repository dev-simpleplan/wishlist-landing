import { Star } from "lucide-react";

type ReviewsSectionProps = {
  home?: any;
};

const ReviewsSection = ({ home }: ReviewsSectionProps) => {
  const reviews =
    Array.isArray(home?.reviews_items) ? home.reviews_items : [];

  // Optional: don't render section if no API data
  if (!reviews.length) return null;

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            {home?.reviews_heading}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {reviews.map((review: any, index: number) => (
            <article
              key={index}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-1 text-primary">
                {Array.from({ length: review.stars || 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{review.quote}"
              </p>

              <div className="mt-5">
                <p className="font-heading font-semibold text-foreground">
                  {review.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {review.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;