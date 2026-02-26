import { Clock3, Repeat2, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Repeat2,
    title: "Recover Lost Buying Intent",
    description:
      "Many shoppers are interested but not ready to buy right away. Wishlists keep that intent alive so they can return and purchase later.",
  },
  {
    icon: Clock3,
    title: "Shorten Decision Time",
    description:
      "When customers can save and compare products easily, they decide faster and spend less time dropping off mid-journey.",
  },
  {
    icon: TrendingUp,
    title: "Increase Conversions",
    description:
      "Wishlists turn passive browsing into measurable revenue by bringing high-intent visitors back to products they already liked.",
  },
];

const WhySection = () => (
  <section className="pt-20 pb-6 md:pt-24 md:pb-8">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl">
        <p className="inline-flex items-center rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-foreground">
          Why It Matters
        </p>
        <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
          Wishlists Are More Than a Button
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          They capture buying intent, reduce cart abandonment, and help shoppers return with purpose. Before we dive into features, here is the business impact.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-medium text-muted-foreground">Wishlist Impact Trend</p>
          <div className="mt-5 grid h-40 grid-cols-6 items-end gap-3 rounded-xl bg-muted/50 p-3">
            {[28, 34, 45, 53, 67, 78].map((value, index) => (
              <div key={index} className="flex h-full w-full flex-col items-center justify-end gap-2">
                <div
                  className="w-full rounded-md bg-brand-green"
                  style={{ height: `${value}%` }}
                />
                <span className="text-[11px] text-muted-foreground">W{index + 1}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Example trend: stores typically see stronger return visits after wishlist adoption.
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Intent to Purchase</p>
          <div className="mt-4 flex items-center justify-center">
            <div
              className="relative h-28 w-28 rounded-full"
              style={{
                background:
                  "conic-gradient(hsl(var(--brand-green)) 0 72%, hsl(var(--muted)) 72% 100%)",
              }}
            >
              <div className="absolute inset-3 rounded-full bg-card flex items-center justify-center">
                <span className="text-xl font-heading font-bold text-foreground">72%</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Shoppers who save are more likely to return with intent.
          </p>
        </article>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <article key={reason.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-light">
                <Icon className="h-5 w-5 text-brand-green" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground">{reason.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{reason.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhySection;
