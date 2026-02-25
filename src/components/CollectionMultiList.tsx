import collectionImg from "@/assets/collection-page.png";
import wishlistImg from "@/assets/wishlist-page.png";

const CollectionMultiList = () => (
  <section className="py-20 md:py-32 bg-card">
    <div className="container mx-auto px-4 space-y-16">
      {/* Collection */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="bg-brand-green-light rounded-3xl p-6">
          <img src={collectionImg} alt="Collection page with wishlist buttons" className="rounded-2xl shadow-lg w-full" />
        </div>
        <div className="space-y-5">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            Make Your Collection Page Wishlist-Ready
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Turn casual scrolling into saved intent. Add smooth, responsive wishlist icons to your collection grid so customers can save favorites instantly.
          </p>
        </div>
      </div>

      {/* Wishlist Page */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-5 order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            The Wishlist Page That Actually Sells
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Transform “save for later” into a powerful sales channel. Give customers a dedicated wishlist page where they can create multiple lists, share them with friends, and move items to cart in one click, even as guests.
          </p>
        </div>
        <div className="order-1 md:order-2 bg-primary/10 rounded-3xl p-6">
          <img src={wishlistImg} alt="Shared wishlist page with multiple lists" className="rounded-2xl shadow-lg w-full" />
        </div>
      </div>
    </div>
  </section>
);

export default CollectionMultiList;
