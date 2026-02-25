import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import cartRescueImg from "@/assets/cart-rescue.png";

const CartRescue = () => (
  <section className="py-20 md:py-32">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-destructive/10 rounded-full px-4 py-1.5 text-sm font-medium text-destructive">
            <ShoppingCart className="w-4 h-4" />
            7 of 10 shoppers leave without checking out
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
            Give Abandoned Carts a Second Chance
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Allow hesitant shoppers a simple “Save for Later” option inside the cart. Keep products saved, reduce abandonment, and bring customers back to buy later.
          </p>
          <Button asChild size="lg" className="gap-2">
            <a href="https://apps.shopify.com/wishlistsuite" target="_blank" rel="noreferrer">
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
        <div className="bg-primary/10 rounded-3xl p-6">
          <img
            src={cartRescueImg}
            alt="Cart rescue with save to wishlist"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

export default CartRescue;
