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


import { getNavbar } from "@/lib/strapi";

const { data: navbar } = useQuery({
  queryKey: ["navbar"],
  queryFn: getNavbar,
});

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

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-blog-posts", slug],
    queryFn: () => getRelatedBlogPosts(slug),
    enabled: Boolean(slug),
  });

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  const seoTitle = post?.seoTitle;
  const seoDescription = post?.seoDescription;

  const heroImage = getStrapiAssetUrl(post?.coverImage);

  const renderContent = useMemo(() => {
    if (!post?.content) return null;

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
          block.children?.map((child: any) => child.text ?? "").join(" ") ??
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
            block.children?.map((child: any, i: number) => (
              <li key={i}>{child.text}</li>
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
      {/* ✅ SEO (only if API exists) */}
      {post && (
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <link rel="canonical" href={canonicalUrl} />

          <meta property="og:type" content="article" />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:url" content={canonicalUrl} />
          {heroImage && <meta property="og:image" content={heroImage} />}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDescription} />
          {heroImage && <meta name="twitter:image" content={heroImage} />}
        </Helmet>
      )}

      <NavHeader navbar={navbar} />

      <main className="pb-20 pt-28 md:pb-28 md:pt-36">
        {/* Loading */}
        {isLoading && (
          <section className="container mx-auto px-4">
            <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
              Loading blog post...
            </div>
          </section>
        )}

        {/* Error */}
        {isError && (
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
        )}

        {/* Content */}
        {post && (
          <>
            <section className="container mx-auto px-4">
              <div className="max-w-5xl">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm text-muted-foreground">
                  <Link to="/">Home</Link>
                  <span className="mx-2">/</span>
                  <Link to="/blog">Blog</Link>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{post.title}</span>
                </nav>

                {/* Meta */}
                <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {post.category && (
                    <span className="inline-flex rounded-full bg-brand-yellow-light px-3 py-1 font-medium text-foreground">
                      {post.category.name}
                    </span>
                  )}

                  {post.publishedAt && (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {formatBlogDate(post.publishedAt)}
                    </span>
                  )}

                  {post.readTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  )}

                  {post.author?.name && (
                    <span className="inline-flex items-center gap-1">
                      <User2 className="h-4 w-4" />
                      {post.author.name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-foreground">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="mt-5 text-lg text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </section>

            {/* Image */}
            {heroImage && (
              <section className="container mx-auto px-4 pt-8">
                <img
                  src={heroImage}
                  alt={post.title}
                  className="rounded-3xl w-full object-cover"
                />
              </section>
            )}

            {/* Content */}
            <section className="container mx-auto px-4 pt-10">
              <div className="max-w-4xl space-y-6">
                {renderContent}
              </div>
            </section>

            {/* Related Posts */}
            {Array.isArray(relatedPosts) && relatedPosts.length > 0 && (
              <section className="container mx-auto px-4 pt-14">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  More blog posts you may like
                </h2>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {relatedPosts.map((item: any) => (
                    <BlogCard key={item.id} post={item} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <FooterCTA />
    </div>
  );
};

export default BlogPost;