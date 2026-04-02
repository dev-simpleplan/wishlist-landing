import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogCard from "@/components/blog/BlogCard";
import FooterCTA from "@/components/FooterCTA";
import NavHeader from "@/components/NavHeader";
import { Button } from "@/components/ui/button";
import {
  getBlogCategoryBySlug,
  getStrapiAssetUrl,
  listBlogPosts,
} from "@/lib/strapi";

const SITE_URL = window.location.origin;
import { getNavbar } from "@/lib/strapi";

const BlogCategory = () => {

  const { data: navbar } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
  });

  const { slug = "" } = useParams();

  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["blog-category", slug],
    queryFn: () => getBlogCategoryBySlug(slug),
    enabled: Boolean(slug),
  });

  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    queryKey: ["blog-category-posts", slug],
    queryFn: () => listBlogPosts({ category: slug, sort: "newest" }),
    enabled: Boolean(slug),
  });

  const seoTitle = useMemo(() => {
    if (category?.seo?.metaTitle) return category.seo.metaTitle;
    if (category?.name) return `${category.name} Blog Posts | WishlistSuite`;
    return "Blog Category | WishlistSuite";
  }, [category]);

  const seoDescription = useMemo(() => {
    if (category?.seo?.metaDescription) return category.seo.metaDescription;
    if (category?.description) return category.description;
    return "Browse blog posts by category.";
  }, [category]);

  const canonicalUrl = useMemo(() => {
    if (category?.seo?.canonicalUrl) return category.seo.canonicalUrl;
    return `${SITE_URL}/blog/category/${slug}`;
  }, [category, slug]);

  const ogTitle = category?.seo?.ogTitle || seoTitle;
  const ogDescription = category?.seo?.ogDescription || seoDescription;
  const ogImage = category?.seo?.ogImage
    ? getStrapiAssetUrl(category.seo.ogImage)
    : null;

  const isLoading = categoryLoading || postsLoading;
  const isError = categoryError || postsError;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      </Helmet>


      <main className="pb-20 pt-28 md:pb-28 md:pt-36">
        {isLoading ? (
          <section className="container mx-auto px-4">
            <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
              Loading category page...
            </div>
          </section>
        ) : isError || !category ? (
          <section className="container mx-auto px-4">
            <div className="rounded-2xl border border-destructive/30 bg-card p-8 text-destructive">
              Could not load this category page.
            </div>
          </section>
        ) : (
          <>
            <section className="container mx-auto px-4">
              <div className="max-w-5xl">
                <nav className="mb-6 text-sm text-muted-foreground">
                  <Link to="/" className="transition-colors hover:text-foreground">
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  <Link to="/blog" className="transition-colors hover:text-foreground">
                    Blog
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{category.name}</span>
                </nav>

                <div className="rounded-[2rem] border border-border/70 bg-card px-6 py-10 shadow-sm md:px-10 md:py-14">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Category archive
                  </p>

                  <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                    {category.name}
                  </h1>

                  {category.description ? (
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                      {category.description}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild variant="outline">
                      <Link to="/blog">Back to all blogs</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="container mx-auto px-4 pt-10 md:pt-14">
              <div className="space-y-4">
                <div className="max-w-5xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Category posts
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                    Blogs under {category.name}
                  </h2>
                </div>

                {posts.length === 0 ? (
                  <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
                    No blog posts found in this category yet.
                  </div>
                ) : (
                  <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="container mx-auto px-4 pt-12 md:pt-16">
              <div className="max-w-5xl rounded-2xl bg-muted/30 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Need help next?
                </p>
                <h2 className="mt-3 text-2xl font-bold text-foreground">
                  Talk to our team about wishlist strategy and setup.
                </h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Explore more blog categories or contact us if you want help
                  improving retention and wishlist conversions.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/contact">
                      Contact us
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline">
                    <Link to="/blog">Browse all blogs</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default BlogCategory;