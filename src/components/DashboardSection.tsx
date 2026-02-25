import dashboardImg from "@/assets/dashboard.png";
import { BarChart3 } from "lucide-react";

const DashboardSection = () => (
  <section className="py-20 md:py-32 bg-card">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-green-light rounded-full px-4 py-1.5 text-sm font-medium text-foreground">
            <BarChart3 className="w-4 h-4 text-brand-green" />
            Revenue Intelligence
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
            Let Data Guide Your Growth
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Understand which products shoppers love most, how often wishlists turn into purchases, and what trends are emerging — all in one simple dashboard.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-5 py-4">
            <p className="text-sm text-foreground font-medium">
              Track interest early and plan inventory with confidence.
            </p>
          </div>
        </div>
        <div className="bg-brand-green-light rounded-3xl p-6">
          <img src={dashboardImg} alt="Analytics dashboard" className="rounded-2xl shadow-lg w-full" />
        </div>
      </div>
    </div>
  </section>
);

export default DashboardSection;
