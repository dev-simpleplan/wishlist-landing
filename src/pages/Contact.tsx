import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavHeader from "@/components/NavHeader";
import FooterCTA from "@/components/FooterCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL?.replace(/\/$/, "") || "";

type ContactFormData = {
  name: string;
  email: string;
  storeName: string;
  message: string;
};

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    storeName: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!STRAPI_URL) {
      setErrorMessage("Strapi URL is missing in frontend .env file.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${STRAPI_URL}/api/contact-submissions/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          storeName: formData.storeName,
          message: formData.message,
        }),
      });

      const responseText = await response.text();

      let result: any = null;

      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
          result?.message ||
          responseText ||
          "Failed to submit form"
        );
      }

      setFormData({
        name: "",
        email: "",
        storeName: "",
        message: "",
      });

      navigate("/thank-you");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />

      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Contact Us
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Have questions or need help? Send us a message and we’ll get back to you.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    type="text"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your store name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here"
                    className="min-h-[160px]"
                  />
                </div>

                {errorMessage ? (
                  <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                ) : null}

                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <FooterCTA />
    </div>
  );
};

export default Contact;