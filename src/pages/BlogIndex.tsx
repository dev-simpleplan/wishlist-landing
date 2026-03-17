import { useDeferredValue, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import BlogCard from "@/components/blog/BlogCard";
import FooterCTA from "@/components/FooterCTA";
import NavHeader from "@/components/NavHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isUsingMockStrapi, listBlogCategories, listBlogPosts } from "@/lib/strapi";
import type { BlogSortOption } from "@/types/blog";

const SORT_OPTIONS: Array<{ value: BlogSortOption; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title-asc", label: "A-Z" },
  { value: "title-desc", label: "Z-A" },
];

const BlogIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");
  const deferredSearch = useDeferredValue(searchInput);
  const selectedCategory = searchParams.get("category") ?? "";
  const selectedSort = (searchParams.get("sort") as BlogSortOption | null) ?? "newest";

  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["blog-posts", deferredSearch, selectedCategory, selectedSort],
    queryFn: () =>
      listBlogPosts({
        search: deferredSearch,
        category: selectedCategory || undefined,
        sort: selectedSort,
      }),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: listBlogCategories,
  });

  useEffect(() => {
    document.title = "WishlistSuite Blog";
  }, []);

  useEffect(() => {
    setSearchInput(searchParams.get("search") ?? "");
  }, [searchParams]);

  const updateFilters = (next: { search?: string; category?: string; sort?: BlogSortOption }) => {
    const params = new URLSearchParams(searchParams);

    const searchValue = next.search ?? searchInput;
    const categoryValue = next.category ?? selectedCategory;
    const sortValue = next.sort ?? selectedSort;

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    if (categoryValue) {
      params.set("category", categoryValue);
    } else {
      params.delete("category");
    }

    if (sortValue && sortValue !== "newest") {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }

    setSearchParams(params, { replace: true });
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters = Boolean(searchInput.trim() || selectedCategory || selectedSort !== "newest");
  const showFeatured = !hasActiveFilters && posts.length > 0;
  const featuredPost = showFeatured ? posts.find((post) => post.featured) ?? posts[0] : null;
  const otherPosts = featuredPost ? posts.filter((post) => post.id !== featuredPost.id) : posts;


  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="pb-20 pt-28 md:pb-28 md:pt-36">
        <section className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-border/70 bg-gradient-to-br from-brand-yellow-light via-background to-brand-green-light px-6 py-12 shadow-sm md:px-10 md:py-16">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex rounded-full bg-brand-dark px-4 py-2 text-sm font-semibold text-brand-cream">
                Blog
              </span>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Articles on wishlists, retention, and Shopify conversion strategy.
              </h1>
              <p className="text-lg leading-8 text-muted-foreground md:text-xl">
                Use this section for product education, growth playbooks, release notes, and search-driven content from Strapi.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="https://apps.shopify.com/wishlistsuite" target="_blank" rel="noreferrer">
                    Install App
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Talk to the team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {isUsingMockStrapi() ? (
          <section className="container mx-auto px-4 pt-8">
            <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-4 text-sm text-muted-foreground">
              Mock blog data is active because `VITE_STRAPI_URL` is not set yet. Add your Strapi URL in `.env` to load real content.
            </div>
          </section>
        ) : null}

        <section className="container mx-auto px-4 pt-10 md:pt-14">
          <div className="mb-8 rounded-[2rem] border border-border/70 bg-card p-5 shadow-sm md:p-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_220px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchInput}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSearchInput(value);
                    updateFilters({ search: value });
                  }}
                  placeholder="Search articles by title or excerpt"
                  className="h-12 rounded-2xl border-border/70 pl-11 pr-4"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-border/70 bg-background px-3">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedSort} onValueChange={(value: BlogSortOption) => updateFilters({ sort: value })}>
                    <SelectTrigger className="h-12 border-0 bg-transparent px-0 shadow-none focus:ring-0">
                      <SelectValue placeholder="Sort posts" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {hasActiveFilters ? (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant={selectedCategory ? "outline" : "secondary"}
                size="sm"
                onClick={() => updateFilters({ category: "" })}
                className="rounded-full"
              >
                All topics
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => updateFilters({ category: category.slug })}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-3xl border border-border bg-card p-8 text-muted-foreground">
              Loading blog posts...
            </div>
          ) : isError ? (
            <div className="rounded-3xl border border-destructive/30 bg-card p-8 text-destructive">
              Could not load blog posts from Strapi. Check your environment variables and API permissions.
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-8 text-muted-foreground">
              No posts found for the current search or filters. Adjust the controls above or publish more articles in Strapi.
            </div>
          ) : (
            <div className="space-y-10">
              {featuredPost ? (
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Featured article
                  </p>
                  <BlogCard post={featuredPost} featured />
                </div>
              ) : null}

              {otherPosts.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {hasActiveFilters ? "Results" : "Latest posts"}
                  </p>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {otherPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </section>
      </main>
      <FooterCTA />
    </div>
  );
};

export default BlogIndex;
