import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import BlogCard from "@/components/blog/BlogCard";
import BlogContent from "@/components/blog/BlogContent";
import FooterCTA from "@/components/FooterCTA";
import NavHeader from "@/components/NavHeader";
import { formatBlogDate, getBlogPostBySlug, getRelatedBlogPosts, getStrapiAssetUrl } from "@/lib/strapi";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPostBySlug(slug!),
    enabled: Boolean(slug),
  });

  const { data: relatedPosts = [] } = useQuery({
    queryKey: ["related-blog-posts", slug],
    queryFn: () => getRelatedBlogPosts(slug!),
    enabled: Boolean(slug),
  });

  useEffect(() => {
    if (!post) return;
    document.title = post.seoTitle || post.title;
  }, [post]);

  if (!slug) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="pb-20 pt-28 md:pb-28 md:pt-36">
        <section className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            {isLoading ? (
              <div className="rounded-3xl border border-border bg-card p-8 text-muted-foreground">
                Loading article...
              </div>
            ) : isError ? (
              <div className="rounded-3xl border border-destructive/30 bg-card p-8 text-destructive">
                Could not load this article from Strapi.
              </div>
            ) : !post ? (
              <Navigate to="/404" replace />
            ) : (
              <>
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {post.category ? (
                      <span className="rounded-full bg-brand-yellow-light px-3 py-1 font-medium text-foreground">
                        {post.category.name}
                      </span>
                    ) : null}
                    <span>{formatBlogDate(post.publishedAt)}</span>
                    {post.readTime ? <span>{post.readTime}</span> : null}
                  </div>

                  <h1 className="text-4xl font-bold leading-tight md:text-6xl">{post.title}</h1>
                  <p className="text-lg leading-8 text-muted-foreground md:text-xl">{post.excerpt}</p>

                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{post.author?.name ?? "WishlistSuite Team"}</span>
                    {post.author?.role ? ` · ${post.author.role}` : ""}
                  </div>
                </div>

                <img
                  src={getStrapiAssetUrl(post.coverImage)}
                  alt={post.coverImage?.alternativeText ?? post.title}
                  className="w-full rounded-[2rem] border border-border/70 object-cover"
                />

                <article className="rounded-[2rem] border border-border/70 bg-card px-6 py-8 md:px-10 md:py-12">
                  <BlogContent content={post.content} />
                </article>

                {relatedPosts.length > 0 ? (
                  <div className="space-y-4 pt-6">
                    <h2 className="text-2xl font-bold">Related articles</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {relatedPosts.map((relatedPost) => (
                        <BlogCard key={relatedPost.id} post={relatedPost} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>
      </main>
      <FooterCTA />
    </div>
  );
};

export default BlogPost;
