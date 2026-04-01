import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { formatBlogDate, getStrapiAssetUrl } from "@/lib/strapi";
import type { BlogPost } from "@/types/blog";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Card
      className={`overflow-hidden border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
        featured ? "grid gap-0 lg:grid-cols-[1.1fr_1fr]" : "flex h-full flex-col"
      }`}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div
          className={
            featured ? "h-full min-h-[320px]" : "aspect-[16/10] overflow-hidden"
          }
        >
          <img
            src={getStrapiAssetUrl(post.coverImage)}
            alt={post.coverImage?.alternativeText ?? post.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        </div>
      </Link>

      <CardContent
        className={`flex flex-1 flex-col ${
          featured ? "justify-center p-8" : "p-5"
        }`}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {post.category ? (
            <Link
              to={`/blog/category/${post.category.slug}`}
              className="rounded-full bg-brand-yellow-light px-3 py-1 font-medium text-foreground transition-opacity hover:opacity-80"
            >
              {post.category.name}
            </Link>
          ) : null}

          <span>{formatBlogDate(post.publishedAt)}</span>

          {post.readTime ? <span>• {post.readTime}</span> : null}
        </div>

        <h2
          className={`font-heading font-bold leading-snug text-foreground ${
            featured
              ? "mb-3 text-3xl md:text-4xl"
              : "mb-3 line-clamp-3 min-h-[96px] text-xl md:text-2xl"
          }`}
        >
          <Link
            to={`/blog/${post.slug}`}
            className="transition-colors hover:text-secondary"
          >
            {post.title}
          </Link>
        </h2>

        <p
          className={`text-sm leading-7 text-muted-foreground md:text-base ${
            featured ? "mb-5" : "mb-5 line-clamp-3 min-h-[84px]"
          }`}
        >
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {post.author?.name ?? "WishlistSuite Team"}
            </span>
            {post.author?.role ? ` · ${post.author.role}` : ""}
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-foreground"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;