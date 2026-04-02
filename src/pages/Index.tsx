import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import NavHeader from "@/components/NavHeader";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import WhySection from "@/components/WhySection";
import EverywhereStrategy from "@/components/EverywhereStrategy";
import FeaturesBento from "@/components/FeaturesBento";
import CustomizationSection from "@/components/CustomizationSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import FooterCTA from "@/components/FooterCTA";
import { getFaqItems, getHomePage, getNavbar } from "@/lib/strapi";

const getEntityData = (entry: any) => {
  if (!entry) return null;
  return entry.attributes ? entry.attributes : entry;
};

const Index = () => {
  const { data: homeData } = useQuery({
    queryKey: ["home-page"],
    queryFn: getHomePage,
  });

  const { data: navbarData } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
  });

  const { data: faqItemsData } = useQuery({
    queryKey: ["faq-items-home"],
    queryFn: getFaqItems,
  });

  const home = useMemo(() => getEntityData(homeData?.data ?? homeData), [homeData]);
  const navbar = useMemo(() => getEntityData(navbarData?.data ?? navbarData), [navbarData]);

  console.log('home data:', home);
  console.log('hero image:', home?.hero_image);

  const faqItems = useMemo(() => {
    const rows = Array.isArray(faqItemsData?.data) ? faqItemsData.data : [];

    return rows
      .map((row: any) => {
        const faq = getEntityData(row);
        if (!faq?.question) return null;

        return {
          id: row.id ?? faq.question,
          question: faq.question,
          answer: faq.answer ?? "",
          sort_order: typeof faq.sort_order === "number" ? faq.sort_order : 9999,
        };
      })
      .filter(Boolean)
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .slice(0, 4);
  }, [faqItemsData]);

  const seo = home?.seo || {};

  return (
    <div id="top" className="min-h-screen bg-background">
      <Helmet>
        <title>{seo.meta_title || "WishlistSuite"}</title>
        <meta name="description" content={seo.meta_description || ""} />
        {seo.canonical_url ? <link rel="canonical" href={seo.canonical_url} /> : null}
        {seo.og_title ? <meta property="og:title" content={seo.og_title} /> : null}
        {seo.og_description ? (
          <meta property="og:description" content={seo.og_description} />
        ) : null}
      </Helmet>

      <NavHeader navbar={navbar} />

      <main>
        <HeroSection home={home} />
        <TrustBar home={home} />
        <WhySection home={home} />
        <EverywhereStrategy home={home} />
        <FeaturesBento home={home} />
        <CustomizationSection home={home} />
        <ReviewsSection home={home} />
        <FAQSection home={home} faqItems={faqItems} />
        <FooterCTA home={home} />
      </main>
    </div>
  );
};

export default Index;