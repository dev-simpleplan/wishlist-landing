import { BarChart3, Heart, Repeat2, ShoppingCart, Sparkles } from "lucide-react";
import dashboardImg from "@/assets/dashboard.png";
import productpage3rdsectionImg from "@/assets/productpage3rdsection.png";
import collectionImg from "@/assets/collection page.png";
import cartRescueImg from "@/assets/cart-rescue.png";
import wishlistImg from "@/assets/wishlist-page.png";

const FeaturesBento = () => (
  <section className="pb-16 md:pb-24">
    <div className="container mx-auto px-4">
      <div className="mb-8 md:mb-10">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
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
            src={productpage3rdsectionImg}
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

        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
          <div className="mb-3 inline-flex items-center gap-2 text-foreground">
            <ShoppingCart className="h-4 w-4 text-brand-green" />
            <h3 className="text-lg font-heading font-semibold">Give Abandoned Carts a Second Chance</h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Allow hesitant shoppers a simple Save for Later option inside the cart. Keep products saved, reduce abandonment, and bring customers back to buy later.
          </p>
          <img
            src={cartRescueImg}
            alt="Cart rescue with save for later"
            className="h-[190px] w-full rounded-xl border border-border object-cover md:h-[220px]"
            loading="lazy"
          />
        </article>

        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
          <div className="mb-3 inline-flex items-center gap-2 text-foreground">
            <Sparkles className="h-4 w-4 text-brand-green" />
            <h3 className="text-lg font-heading font-semibold">The Wishlist Page That Actually Sells</h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Transform save for later into a powerful sales channel. Give customers a dedicated wishlist page where they can review, share, and move items to cart in one click.
          </p>
          <img
            src={wishlistImg}
            alt="Wishlist page with saved items"
            className="h-[190px] w-full rounded-xl border border-border object-cover md:h-[220px]"
            loading="lazy"
          />
        </article>
      </div>
    </div>
  </section>
);

export default FeaturesBento;
