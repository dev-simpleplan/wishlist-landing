import { BarChart3, Heart, Repeat2 } from "lucide-react";
import dashboardImg from "@/assets/dashboard.png";
import thirdSectionImg from "@/assets/3rd Section.png";
import collectionImg from "@/assets/collection-page.png";

const FeaturesBento = () => (
  <section className="pb-16 md:pb-24">
    <div className="container mx-auto px-4">
      <div className="mb-8 md:mb-10">
        <p className="inline-flex items-center rounded-full bg-brand-green-light px-4 py-1.5 text-sm font-medium text-foreground">
          Feature Highlights
        </p>
        <h2 className="mt-4 text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
          Turn Browsing Into Buying Intent
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
          Wishlists are more than just a button; they are a powerful tool for capturing shopper interest and providing the data you need to scale your store&apos;s revenue.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm md:col-span-2 md:p-5">
          <div className="mb-3 inline-flex items-center gap-2 text-foreground">
            <Heart className="h-4 w-4 text-brand-green" />
            <h3 className="text-lg font-heading font-semibold">Recover Lost Buying Intent</h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Many shoppers are interested but not ready to buy right away. Wishlists keep that intent alive so they can return and purchase later.
          </p>
          <img
            src={thirdSectionImg}
            alt="Wishlist mobile interface preview"
            className="h-[220px] w-full rounded-xl border border-border object-cover object-top md:h-[280px]"
            loading="lazy"
          />
        </article>

        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
          <div className="mb-3 inline-flex items-center gap-2 text-foreground">
            <Repeat2 className="h-4 w-4 text-brand-green" />
            <h3 className="text-lg font-heading font-semibold">Shorten Decision Time</h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            When customers can save and compare products easily, they decide faster and spend less time dropping off mid-journey.
          </p>
          <img
            src={collectionImg}
            alt="Wishlist on collection grid"
            className="h-[190px] w-full rounded-xl border border-border object-cover md:h-[220px]"
            loading="lazy"
          />
        </article>

        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
          <div className="mb-3 inline-flex items-center gap-2 text-foreground">
            <BarChart3 className="h-4 w-4 text-brand-green" />
            <h3 className="text-lg font-heading font-semibold">Increase Conversions</h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Wishlists turn passive browsing into measurable revenue by bringing high-intent visitors back to products they already liked.
          </p>
          <img
            src={dashboardImg}
            alt="Wishlist analytics and performance dashboard"
            className="h-[190px] w-full rounded-xl border border-border object-cover md:h-[220px]"
            loading="lazy"
          />
        </article>
      </div>
    </div>
  </section>
);

export default FeaturesBento;
