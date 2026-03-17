export type StrapiImageFormat = {
  url: string;
  width?: number;
  height?: number;
};

export type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiImageFormat>;
};

export type BlogAuthor = {
  name: string;
  role?: string;
  avatar?: StrapiMedia | null;
};

export type BlogCategory = {
  name: string;
  slug: string;
};

export type BlogBlock = {
  type: string;
  level?: number;
  text?: string;
  format?: string;
  image?: StrapiMedia | null;
  children?: BlogBlock[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | BlogBlock[];
  publishedAt: string;
  featured?: boolean;
  readTime?: string;
  coverImage?: StrapiMedia | null;
  author?: BlogAuthor | null;
  category?: BlogCategory | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type BlogSortOption = "newest" | "oldest" | "title-asc" | "title-desc";

export type BlogListParams = {
  search?: string;
  category?: string;
  sort?: BlogSortOption;
};
