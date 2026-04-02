import { Clock3, Repeat2, TrendingUp } from "lucide-react";

type WhySectionProps = {
  home?: any;
};

// ✅ Map icon names from Strapi → Lucide icons
const iconMap: Record<string, any> = {
  repeat: Repeat2,
  clock: Clock3,
  trending: TrendingUp,
};

const WhySection = ({ home }: WhySectionProps) => {
  const chartValues = Array.isArray(home?.why_chart_values)
    ? home.why_chart_values
    : [];

  const reasons = Array.isArray(home?.why_reason_cards)
    ? home.why_reason_cards
    : [];

  // ❌ Hide section if no API
  if (!home) return null;

  return (
    <section className="pt-20 pb-6 md:pt-24 md:pb-8">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
            {home?.why_heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {home?.why_description}
          </p>
        </div>

        {/* Chart + Donut */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          
          {/* Bar Chart */}
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">
              {home?.why_chart_label}
            </p>

            <div className="mt-5 grid h-40 grid-cols-6 items-end gap-3 rounded-xl bg-muted/50 p-3">
              {chartValues.map((value: number, index: number) => (
                <div key={index} className="flex flex-col items-center justify-end gap-2 h-full">
                  <div
                    className="w-full rounded-md bg-brand-green"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-[11px] text-muted-foreground">
                    W{index + 1}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {home?.why_chart_note}
            </p>
          </article>

          {/* Donut */}
          <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">
              {home?.why_donut_label}
            </p>

            <div className="mt-4 flex justify-center">
              <div
                className="relative h-28 w-28 rounded-full"
                style={{
                  background:
                    "conic-gradient(hsl(var(--brand-green)) 0 72%, hsl(var(--muted)) 72% 100%)",
                }}
              >
                <div className="absolute inset-3 rounded-full bg-card flex items-center justify-center">
                  <span className="text-xl font-heading font-bold text-foreground">
                    {home?.why_donut_value}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground text-center">
              {home?.why_donut_note}
            </p>
          </article>
        </div>

        {/* Reason Cards */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {reasons.map((reason: any, index: number) => {
            const Icon =
              iconMap[reason?.icon_name?.toLowerCase()] || TrendingUp;

            return (
              <article
                key={index}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-light">
                  <Icon className="h-5 w-5 text-brand-green" />
                </div>

                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {reason?.title}
                </h3>

                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {reason?.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySection;