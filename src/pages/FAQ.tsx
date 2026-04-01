import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ChevronDown } from "lucide-react";
import NavHeader from "@/components/NavHeader";
import FooterCTA from "@/components/FooterCTA";
import { getFaqCategories, getFaqItems, getFaqPage } from "@/lib/strapi";

type FaqPageData = {
  title: string;
  heroHeading: string;
  heroDescription: string;
  seo: {
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    og_title?: string;
    og_description?: string;
  };
};

type FaqCategory = {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
};

type FaqItem = {
  id: string | number;
  question: string;
  answer: unknown;
  shortAnswer?: string;
  sortOrder?: number;
  featured?: boolean;
  categorySlug?: string;
  categoryName?: string;
};

const getEntityData = (entry: any) => {
  if (!entry) return null;
  return entry.attributes ? entry.attributes : entry;
};

const normalizeFaqPage = (raw: any): FaqPageData | null => {
  const page = getEntityData(raw?.data ?? raw);
  if (!page) return null;

  return {
    title: page.title || "FAQ",
    heroHeading: page.hero_heading || page.title || "FAQ",
    heroDescription: page.hero_description || "",
    seo: page.seo || {},
  };
};

const normalizeFaqCategories = (raw: any): FaqCategory[] => {
  const rows = Array.isArray(raw?.data) ? raw.data : [];

  return rows
    .map((row: any) => {
      const category = getEntityData(row);
      if (!category || !category.name || !category.slug) return null;

      return {
        id: row.id ?? category.documentId ?? category.slug,
        name: category.name,
        slug: category.slug,
        description: category.description || "",
      };
    })
    .filter(Boolean) as FaqCategory[];
};

const normalizeFaqItems = (raw: any): FaqItem[] => {
  const rows = Array.isArray(raw?.data) ? raw.data : [];

  return rows
    .map((row: any) => {
      const faq = getEntityData(row);
      if (!faq || !faq.question) return null;

      const rawCategory = faq.category?.data
        ? getEntityData(faq.category.data)
        : getEntityData(faq.category);

      const answerValue = faq.answer ?? "";

      return {
        id: row.id ?? faq.documentId ?? faq.question,
        question: faq.question,
        answer: answerValue,
        shortAnswer: faq.short_answer || "",
        sortOrder: typeof faq.sort_order === "number" ? faq.sort_order : 9999,
        featured: Boolean(faq.featured),
        categorySlug: rawCategory?.slug || "",
        categoryName: rawCategory?.name || "",
      };
    })
    .filter(Boolean) as FaqItem[];
};

const renderAnswer = (answer: unknown) => {
  if (!answer) return null;

  if (typeof answer === "string") {
    return answer.split("\n").map((paragraph, index) =>
      paragraph.trim() ? (
        <p key={index} className="mb-3 last:mb-0">
          {paragraph}
        </p>
      ) : null
    );
  }

  if (Array.isArray(answer)) {
    return answer.map((block: any, index: number) => {
      const text =
        typeof block?.text === "string"
          ? block.text
          : Array.isArray(block?.children)
            ? block.children.map((child: any) => child?.text || "").join(" ")
            : "";

      if (!text.trim()) return null;

      return (
        <p key={index} className="mb-3 last:mb-0">
          {text}
        </p>
      );
    });
  }

  return <p className="mb-3 last:mb-0">{String(answer)}</p>;
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const {
    data: pageData,
    isLoading: pageLoading,
    isError: pageError,
  } = useQuery({
    queryKey: ["faq-page"],
    queryFn: getFaqPage,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["faq-categories"],
    queryFn: getFaqCategories,
  });

  const {
    data: itemsData,
    isLoading: itemsLoading,
    isError: itemsError,
  } = useQuery({
    queryKey: ["faq-items"],
    queryFn: getFaqItems,
  });

  const page = useMemo(() => normalizeFaqPage(pageData), [pageData]);
  const categories = useMemo(
    () => normalizeFaqCategories(categoriesData),
    [categoriesData]
  );
  const faqItems = useMemo(() => normalizeFaqItems(itemsData), [itemsData]);

  const groupedCategories = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      items: faqItems
        .filter((item) => item.categorySlug === category.slug)
        .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999)),
    }));
  }, [categories, faqItems]);

  const filteredCategories = useMemo(() => {
    if (!activeCategory) return groupedCategories;
    return groupedCategories.filter((cat) => cat.slug === activeCategory);
  }, [groupedCategories, activeCategory]);

  const isLoading = pageLoading || categoriesLoading || itemsLoading;
  const hasError = pageError || categoriesError || itemsError;
  const seo = page?.seo || {};

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seo.meta_title || page?.title || "FAQ"}</title>
        <meta name="description" content={seo.meta_description || ""} />
        {seo.canonical_url ? (
          <link rel="canonical" href={seo.canonical_url} />
        ) : null}
        {seo.og_title ? <meta property="og:title" content={seo.og_title} /> : null}
        {seo.og_description ? (
          <meta property="og:description" content={seo.og_description} />
        ) : null}
      </Helmet>

      <NavHeader />

      <main className="pb-20 pt-28 md:pb-28 md:pt-36">
        <section className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-4xl font-bold text-foreground md:text-6xl">
              {page?.heroHeading || "Frequently Asked Questions"}
            </h1>

            {page?.heroDescription ? (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                {page.heroDescription}
              </p>
            ) : null}
          </div>
        </section>

        <section className="container mx-auto px-4 pt-10">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === null
                  ? "border-black bg-black text-white"
                  : "border-border bg-transparent text-foreground"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.slug
                    ? "border-black bg-black text-white"
                    : "border-border bg-transparent text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pt-10">
          <div className="max-w-4xl space-y-8">
            {isLoading ? (
              <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
                Loading FAQs...
              </div>
            ) : hasError ? (
              <div className="rounded-2xl border border-destructive/30 bg-card p-6 text-destructive">
                Could not load FAQ data. Please check Strapi permissions and API
                responses.
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
                No FAQ categories found.
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id}>
                  <h2 className="mb-2 text-2xl font-bold text-foreground">
                    {category.name}
                  </h2>

                  {category.description ? (
                    <p className="mb-5 text-muted-foreground">
                      {category.description}
                    </p>
                  ) : null}

                  {category.items.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
                      No FAQs found in this category yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {category.items.map((faq) => (
                        <details
                          key={faq.id}
                          className="group rounded-2xl border border-border bg-card p-5 shadow-sm"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                            <span>{faq.question}</span>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                          </summary>

                          <div className="mt-4 leading-7 text-muted-foreground">
                            {renderAnswer(faq.answer)}
                          </div>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <FooterCTA />
    </div>
  );
};

export default FAQ;