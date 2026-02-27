import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Mail, MessageSquare, Store } from "lucide-react";
import NavHeader from "@/components/NavHeader";
import FooterCTA from "@/components/FooterCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type ContactFormData = {
  name: string;
  email: string;
  storeName: string;
  message: string;
};

const STORAGE_KEY = "wishlistsuite_contact_submissions";
const MAX_SAVED_SUBMISSIONS = 100;
const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string | number;
      reset: (widgetId?: string | number) => void;
      remove: (widgetId: string | number) => void;
    };
  }
}

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [formStartedAt] = useState(() => Date.now());
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    storeName: "",
    message: "",
  });
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | number | null>(null);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileContainerRef.current) {
      return;
    }

    let cancelled = false;

    const mountWidget = () => {
      if (cancelled || !window.turnstile || !turnstileContainerRef.current) {
        return;
      }

      if (turnstileWidgetIdRef.current !== null) {
        return;
      }

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": () => setCaptchaToken(""),
        theme: "light",
      });
    };

    const loadScriptAndMount = async () => {
      if (window.turnstile) {
        mountWidget();
        return;
      }

      const existing = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", mountWidget, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", mountWidget, { once: true });
      document.head.appendChild(script);
    };

    void loadScriptAndMount();

    return () => {
      cancelled = true;
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [turnstileSiteKey]);

  const recordSubmission = (payload: ContactFormData) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      const next = [{ ...payload, submittedAt: new Date().toISOString() }, ...existing].slice(0, MAX_SAVED_SUBMISSIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Continue silently if localStorage is unavailable.
    }
  };

  const submitContactForm = async (payload: ContactFormData) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        captchaToken,
        companyWebsite,
        startedAt: formStartedAt,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "Could not deliver message by email.");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        storeName: formData.storeName.trim(),
        message: formData.message.trim(),
      };

      if (!captchaToken) {
        throw new Error("Complete the captcha check before submitting.");
      }

      recordSubmission(payload);
      await submitContactForm(payload);

      toast({
        title: "Message sent",
        description: "Thanks for reaching out. We will reply soon.",
      });

      setFormData({
        name: "",
        email: "",
        storeName: "",
        message: "",
      });
      setCaptchaToken("");
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
      navigate("/thank-you");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submission failed.";
      toast({
        title: "Could not send message",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-5">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-foreground">
                <MessageSquare className="h-4 w-4 text-brand-green" />
                Contact Wishlistsuite
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight text-foreground">
                Let&apos;s talk about your store goals
              </h1>
              <p className="text-lg text-muted-foreground">
                Share your store details and what you want to improve. We usually respond within one business day.
              </p>
            </div>

            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    placeholder="you@store.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeName" className="inline-flex items-center gap-2">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  Store name
                </Label>
                <Input
                  id="storeName"
                  required
                  value={formData.storeName}
                  onChange={(event) => setFormData((current) => ({ ...current, storeName: event.target.value }))}
                  placeholder="Your Shopify store"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                  placeholder="Tell us what you're looking to improve with wishlists."
                  className="min-h-36"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Submissions are protected by captcha and rate limiting before being emailed.
                </p>
                <Button type="submit" size="lg" disabled={isSubmitting} className="gap-2 sm:min-w-44">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </div>

              <input
                type="text"
                name="companyWebsite"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                value={companyWebsite}
                onChange={(event) => setCompanyWebsite(event.target.value)}
              />

              {turnstileSiteKey ? (
                <div ref={turnstileContainerRef} className="pt-2" />
              ) : (
                <p className="text-sm text-destructive">
                  Captcha is not configured. Set `VITE_TURNSTILE_SITE_KEY` to enable secure submissions.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
      <FooterCTA />
    </div>
  );
};

export default Contact;
