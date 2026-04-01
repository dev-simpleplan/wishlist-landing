import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  User2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogCard from "@/components/blog/BlogCard";
import FooterCTA from "@/components/FooterCTA";
import NavHeader from "@/components/NavHeader";
import { Button } from "@/components/ui/button";
import {
  formatBlogDate,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getStrapiAssetUrl,
} from "@/lib/strapi";

const SITE_URL = window.location.origin;

const BlogPost = () => {
  const { slug = "" } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPostBySlug(slug),
    enabled: Boolean(slug),
  });

  const { data: relatedPosts = [] } = useQuery({
    queryKey: ["related-blog-posts", slug],
    queryFn: () => getRelatedBlogPosts(slug),
    enabled: Boolean(slug),
  });

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  const seoTitle =
    post?.seoTitle || (post ? `${post.title} | WishlistSuite Blog` : "Blog Post");

  const seoDescription =
    post?.seoDescription ||
    post?.excerpt ||
    "Read the latest wishlist strategy, retention, and Shopify growth insights.";

  const heroImage = getStrapiAssetUrl(post?.coverImage);

  const renderContent = useMemo(() => {
    if (!post) return null;

    if (typeof post.content === "string") {
      return post.content
        .split("\n")
        .map((paragraph, index) =>
          paragraph.trim() ? (
            <p
              key={index}
              className="text-[17px] leading-8 text-muted-foreground"
            >
              {paragraph}
            </p>
          ) : null
        );
    }

    if (Array.isArray(post.content)) {
      return post.content.map((block, index) => {
        const blockText =
          block.text ??
          block.children?.map((child) => child.text ?? "").join(" ") ??
          "";

        if (!blockText.trim()) return null;

        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-5 text-2xl font-bold leading-snug text-foreground md:text-3xl"
            >
              {blockText}
            </h2>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-secondary pl-5 text-lg italic leading-8 text-foreground"
            >
              {blockText}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const items =
            block.children?.map((child, childIndex) => (
              <li key={childIndex}>{child.text}</li>
            )) ?? [];

          return (
            <ul
              key={index}
              className="list-disc space-y-3 pl-6 text-[17px] leading-8 text-muted-foreground"
            >
              {items}
            </ul>
          );
        }

        return (
          <p
            key={index}
            className="text-[17px] leading-8 text-muted-foreground"
          >
            {blockText}
          </p>
        );
      });
    }

    return null;
  }, [post]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {heroImage ? <meta property="og:image" content={heroImage} /> : null}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {heroImage ? <meta name="twitter:image" content={heroImage} /> : null}
      </Helmet>

      <NavHeader />

      <main className="pb-20 pt-28 md:pb-28 md:pt-36">
        {isLoading ? (
          <section className="container mx-auto px-4">
            <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
              Loading blog post...
            </div>
          </section>
        ) : isError || !post ? (
          <section className="container mx-auto px-4">
            <div className="rounded-2xl border border-destructive/30 bg-card p-8 text-destructive">
              Could not load this blog post.
            </div>

            <div className="mt-6">
              <Button asChild variant="outline">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4" />
                  Back to blog
                </Link>
              </Button>
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
                  <span className="text-foreground">{post.title}</span>
                </nav>

                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {post.category ? (
                    <span className="inline-flex items-center rounded-full bg-brand-yellow-light px-3 py-1 font-medium text-foreground">
                      {post.category.name}
                    </span>
                  ) : null}

                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {formatBlogDate(post.publishedAt)}
                  </span>

                  {post.readTime ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  ) : null}

                  <span className="inline-flex items-center gap-1">
                    <User2 className="h-4 w-4" />
                    {post.author?.name ?? "WishlistSuite Team"}
                  </span>
                </div>

                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  {post.title}
                </h1>

                {post.excerpt ? (
                  <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
            </section>

            <section className="container mx-auto px-4 pt-8">
              <div className="max-w-5xl overflow-hidden rounded-3xl">
                <div className="min-h-[280px] overflow-hidden md:min-h-[460px]">
                  <img
                    src={heroImage}
                    alt={post.coverImage?.alternativeText ?? post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>

            <section className="container mx-auto px-4 pt-10 md:pt-14">
              <div className="max-w-4xl">
                <article className="min-w-0">
                  <div className="space-y-6">
                    {renderContent}
                  </div>

                  <div className="mt-12 border-t border-border pt-8">
                    <div className="rounded-2xl bg-muted/30 p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Need help next?
                      </p>
                      <h2 className="mt-3 text-2xl font-bold text-foreground">
                        Talk to our team about wishlist strategy and setup.
                      </h2>
                      <p className="mt-3 text-base leading-7 text-muted-foreground">
                        If you want help improving retention, saved-item flows, or
                        conversion experience, contact us and we will guide you.
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button asChild>
                          <Link to="/contact">
                            Contact us
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button asChild variant="outline">
                          <Link to="/blog">Browse more blogs</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            {relatedPosts.length > 0 ? (
              <section className="container mx-auto px-4 pt-14 md:pt-16">
                <div className="space-y-4">
                  <div className="max-w-5xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Related reading
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                      More blog posts you may like
                    </h2>
                  </div>

                  <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <BlogCard key={relatedPost.id} post={relatedPost} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </>
        )}
      </main>

      <FooterCTA />
    </div>
  );
};

export default BlogPost;