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
import {
  listBlogCategories,
  listBlogPosts,
} from "@/lib/strapi";
import type { BlogSortOption } from "@/types/blog";


import { getNavbar } from "@/lib/strapi";


const BlogIndex = () => {

  const { data: navbar } = useQuery({
    queryKey: ["navbar"],
    queryFn: getNavbar,
  });


  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  );

  const deferredSearch = useDeferredValue(searchInput);
  const selectedCategory = searchParams.get("category") ?? "";
  const selectedSort =
    (searchParams.get("sort") as BlogSortOption | null) ?? "newest";

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog-posts", deferredSearch, selectedCategory, selectedSort],
    queryFn: () =>
      listBlogPosts({
        search: deferredSearch,
        category: selectedCategory || undefined,
        sort: selectedSort,
      }),
  });

  const { data: categories } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: listBlogCategories,
  });

  useEffect(() => {
    document.title = "Blog";
  }, []);

  useEffect(() => {
    setSearchInput(searchParams.get("search") ?? "");
  }, [searchParams]);

  const updateFilters = (next: {
    search?: string;
    category?: string;
    sort?: BlogSortOption;
  }) => {
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

  const hasActiveFilters = Boolean(
    searchInput.trim() || selectedCategory || selectedSort !== "newest"
  );

  // ✅ Only API-driven (no fallback logic)
  const featuredPost =
    Array.isArray(posts) && posts.find((post) => post.featured);

  const otherPosts =
    Array.isArray(posts) && featuredPost
      ? posts.filter((post) => post.id !== featuredPost.id)
      : posts;

  return (
    <div className="min-h-screen bg-background">

      <main className="pb-20 pt-28 md:pb-28 md:pt-36">
        
        {/* ❌ Removed static hero section */}

        {/* Filters */}
        <section className="container mx-auto px-4 pt-10 md:pt-14">
          <div className="mb-8 rounded-[2rem] border border-border/70 bg-card p-5 shadow-sm md:p-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_220px]">
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchInput(value);
                    updateFilters({ search: value });
                  }}
                  placeholder="Search blogs"
                  className="h-12 pl-11"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <Select
                  value={selectedSort}
                  onValueChange={(value: BlogSortOption) =>
                    updateFilters({ sort: value })
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="title-asc">A-Z</SelectItem>
                    <SelectItem value="title-desc">Z-A</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.isArray(categories) &&
                categories.map((category: any) => (
                  <Button
                    key={category.slug}
                    variant={
                      selectedCategory === category.slug
                        ? "secondary"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      updateFilters({ category: category.slug })
                    }
                    className="rounded-full"
                  >
                    {category.name}
                  </Button>
                ))}
            </div>
          </div>

          {/* States */}
          {isLoading && (
            <div className="p-8 text-muted-foreground">
              Loading blog posts...
            </div>
          )}

          {isError && (
            <div className="p-8 text-destructive">
              Failed to load blog posts.
            </div>
          )}

          {Array.isArray(posts) && posts.length === 0 && (
            <div className="p-8 text-muted-foreground">
              No blog posts found.
            </div>
          )}

          {/* Blog List */}
          {Array.isArray(posts) && posts.length > 0 && (
            <div className="space-y-10">
              
              {/* Featured */}
              {featuredPost && (
                <div>
                  <BlogCard post={featuredPost} featured />
                </div>
              )}

              {/* Other Posts */}
              {Array.isArray(otherPosts) && otherPosts.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {otherPosts.map((post: any) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <FooterCTA />
    </div>
  );
};

export default BlogIndex;