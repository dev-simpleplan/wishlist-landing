import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { formatBlogDate, getStrapiAssetUrl } from "@/lib/strapi";
import type { BlogPost } from "@/types/blog";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

const BlogCard = ({ post, featured = false }: BlogCardProps) => (
  <Card
    className={`overflow-hidden border-border/70 bg-card/95 transition-transform duration-300 hover:-translate-y-1 ${
      featured ? "grid gap-0 lg:grid-cols-[1.2fr_1fr]" : "h-full"
    }`}
  >
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <div className={featured ? "h-full min-h-72" : "aspect-[16/10]"}>
        <img
          src={getStrapiAssetUrl(post.coverImage)}
          alt={post.coverImage?.alternativeText ?? post.title}
          className="h-full w-full object-cover"
        />
      </div>
    </Link>
    <CardContent className={`flex h-full flex-col ${featured ? "justify-center p-8" : "p-6"}`}>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        {post.category ? (
          <span className="rounded-full bg-brand-yellow-light px-3 py-1 font-medium text-foreground">
            {post.category.name}
          </span>
        ) : null}
        <span>{formatBlogDate(post.publishedAt)}</span>
        {post.readTime ? <span>{post.readTime}</span> : null}
      </div>

      <div className="space-y-3">
        <h2 className={`${featured ? "text-3xl md:text-4xl" : "text-2xl"} font-heading font-bold leading-tight`}>
          <Link to={`/blog/${post.slug}`} className="hover:text-secondary transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-base leading-7 text-muted-foreground">{post.excerpt}</p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{post.author?.name ?? "WishlistSuite Team"}</span>
          {post.author?.role ? ` · ${post.author.role}` : ""}
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-foreground"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </CardContent>
  </Card>
);

export default BlogCard;
