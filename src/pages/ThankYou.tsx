import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import NavHeader from "@/components/NavHeader";
import { Button } from "@/components/ui/button";

const REDIRECT_DELAY_MS = 3000;

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate("/");
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 md:p-12 text-center shadow-sm space-y-6">
            <CheckCircle2 className="mx-auto h-14 w-14 text-brand-green" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Thank you!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your message was sent successfully. Redirecting you to the homepage...
            </p>
            <Button asChild size="lg">
              <Link to="/">Go to homepage now</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThankYou;
