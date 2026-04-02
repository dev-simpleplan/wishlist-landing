import NavHeader from "@/components/NavHeader";
import FooterCTA from "@/components/FooterCTA";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <NavHeader />
    <main className="pt-28 pb-16 md:pt-36 md:pb-24">
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">Last Modified: 6 March 2026</p>
          <p className="text-muted-foreground leading-relaxed">
            SimpleSuite ("we", "our", "us") is committed to protecting the privacy of all users of our wishlist
            application and services (the "Services"). This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you install our app through the Shopify platform.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By using our Services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">1. CONTACT DETAILS</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-muted-foreground leading-relaxed">Email: simplesuiteapp@gmail.com</p>
            <p className="text-muted-foreground leading-relaxed">Address: 252-L Sant Nagar, New Delhi, India</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">2. HOW WE COLLECT YOUR INFORMATION</h2>
            <p className="text-muted-foreground leading-relaxed">We collect information in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>App Installation: When you install the app on your Shopify store.</li>
              <li>Direct Interaction: When you contact us for support via email or chat.</li>
              <li>
                Shopify API: As a Shopify ecosystem app, we receive data via Shopify’s API to provide the wishlist
                functionality.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">3. INFORMATION WE COLLECT</h2>
            <p className="text-muted-foreground leading-relaxed">
              To provide a functional wishlist experience, we collect and process the following data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Store Information: Shopify domain, store owner name, and contact email.</li>
              <li>
                Customer Interaction Data:
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Shopify Customer IDs of users who add items to a wishlist.</li>
                  <li>Products and specific variants added to wishlists.</li>
                  <li>Dates/times when items are added or removed.</li>
                </ul>
              </li>
              <li>
                Technical Data: Partial product metadata and metafields required to display wishlist items correctly
                on your storefront.
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Note: We do not directly collect or store payment information. All billing is handled securely through
              the Shopify Billing API.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">4. USE OF YOUR INFORMATION</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the data collected for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Service Delivery: To maintain the wishlist functionality for your customers.</li>
              <li>Customer Support: To troubleshoot technical issues and respond to your inquiries.</li>
              <li>
                Analytics: To provide you with dashboard insights regarding which products are most frequently
                "wishlisted."
              </li>
              <li>Communication: To notify you of critical app updates or changes to our service.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">5. DATA RETENTION</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your information only as long as the app is installed on your Shopify store.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                App Uninstallation: Upon uninstallation, we follow Shopify’s mandatory webhooks to delete
                store-related data within 48 hours, unless required by law to retain it.
              </li>
              <li>
                Customer Data: Individual wishlist data is purged if the customer remains inactive for a prolonged
                period or upon a "Data Erasure" request from Shopify.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">6. DISCLOSURE OF YOUR INFORMATION</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your data. We may share information with third parties only in the following cases:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Service Providers: Cloud hosting (e.g., AWS or Google Cloud) and database providers used to run the app.</li>
              <li>Legal Obligations: To comply with law enforcement requests or protect our legal rights.</li>
              <li>Business Transfers: In the event of a merger, sale, or acquisition of SimpleSuite.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">7. SECURITY</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your data. However, please remember that no
              method of transmission over the internet is 100% secure. While we strive to use commercially acceptable
              means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">8. YOUR RIGHTS</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your location (such as the EEA under GDPR or California under CCPA), you and your customers
              may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access/Portability: The right to request copies of your data.</li>
              <li>Correction: The right to request that we correct inaccurate information.</li>
              <li>Erasure: The right to request that we delete your data.</li>
              <li>Withdraw Consent: The right to opt-out of certain data processing.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise these rights, please contact us at simplesuiteapp@gmail.com.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-heading font-bold text-foreground">9. CHANGES TO THIS POLICY</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Modified" date.
            </p>
          </section>
        </div>
      </section>
    </main>
  </div>
);

export default PrivacyPolicy;
