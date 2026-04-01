import type {
  BlogAuthor,
  BlogBlock,
  BlogCategory,
  BlogListParams,
  BlogPost,
  BlogSortOption,
  StrapiMedia,
} from "@/types/blog";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL?.replace(/\/$/, "") || "";
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || "";

const mockPosts: BlogPost[] = [
  {
    id: "wishlist-ux-patterns",
    slug: "wishlist-ux-patterns",
    title: "Wishlist UX patterns that improve repeat visits",
    excerpt:
      "A practical breakdown of the wishlist interactions that nudge customers to save products and come back with purchase intent.",
    publishedAt: "2026-03-14T09:00:00.000Z",
    readTime: "6 min read",
    featured: true,
    category: { name: "Shopify Tips", slug: "shopify-tips" },
    author: { name: "WishlistSuite Team", role: "Growth Commerce" },
    content:
      "Wishlists work best when they feel native to the shopping journey. Add save actions where intent is highest, keep the interaction lightweight, and use reminders to bring shoppers back to the store.",
  },
  {
    id: "wishlist-analytics-retention",
    slug: "wishlist-analytics-retention",
    title: "Using wishlist analytics to improve customer retention",
    excerpt:
      "What product, marketing, and support teams can learn from saved items, return visits, and restock demand.",
    publishedAt: "2026-03-10T09:00:00.000Z",
    readTime: "4 min read",
    category: { name: "Retention", slug: "retention" },
    author: { name: "WishlistSuite Team", role: "Lifecycle Marketing" },
    content:
      "The strongest retention signals often appear before the purchase. Saved products, repeated product views, and returning sessions can all inform smarter campaigns and better merchandising decisions.",
  },
  {
    id: "wishlist-data-merchandising",
    slug: "wishlist-data-merchandising",
    title: "How Shopify brands use wishlist data for merchandising",
    excerpt:
      "How to use saved-product signals to identify high-intent products, seasonal patterns, and collection gaps.",
    publishedAt: "2026-03-05T09:00:00.000Z",
    readTime: "5 min read",
    category: { name: "Insights", slug: "insights" },
    author: { name: "WishlistSuite Team", role: "Product Marketing" },
    content:
      "Wishlist data helps teams understand what customers want before they buy. In Strapi, this body can later be replaced with rich content blocks.",
  },
];

type StrapiEntity<T> = {
  id?: string | number;
  documentId?: string;
  attributes?: T;
};

type StrapiCollectionResponse<T> = {
  data: Array<T | StrapiEntity<T>>;
};

const isAbsoluteUrl = (value: string) => /^https?:\/\//.test(value);

const DEFAULT_BLOG_SORT: BlogSortOption = "newest";

const getTextFromBlocks = (blocks?: BlogBlock[]) =>
  (blocks ?? [])
    .flatMap((block) => {
      if (block.text) return [block.text];
      return (block.children ?? []).map((child) => child.text ?? "");
    })
    .filter(Boolean)
    .join(" ");

const extractMedia = (value: unknown): StrapiMedia | null => {
  if (!value || typeof value !== "object") return null;

  const source =
    "data" in value && typeof (value as { data?: unknown }).data === "object"
      ? (value as { data: unknown }).data
      : value;

  if (!source || typeof source !== "object") return null;

  const entity = source as Record<string, unknown>;
  const attributes =
    entity.attributes && typeof entity.attributes === "object"
      ? (entity.attributes as Record<string, unknown>)
      : entity;

  const url = typeof attributes.url === "string" ? attributes.url : null;
  if (!url) return null;

  return {
    url,
    alternativeText:
      typeof attributes.alternativeText === "string" ? attributes.alternativeText : null,
    width: typeof attributes.width === "number" ? attributes.width : undefined,
    height: typeof attributes.height === "number" ? attributes.height : undefined,
    formats:
      attributes.formats && typeof attributes.formats === "object"
        ? (attributes.formats as Record<string, { url: string; width?: number; height?: number }>)
        : undefined,
  };
};

const extractRelation = <T extends object>(value: unknown): T | null => {
  if (!value || typeof value !== "object") return null;

  const source =
    "data" in value && typeof (value as { data?: unknown }).data === "object"
      ? (value as { data: unknown }).data
      : value;

  if (!source || typeof source !== "object") return null;

  const entity = source as Record<string, unknown>;

  if (entity.attributes && typeof entity.attributes === "object") {
    return entity.attributes as T;
  }

  return entity as T;
};

const normalizeCategory = (value: unknown): BlogCategory | null => {
  const relation = extractRelation<Record<string, unknown>>(value);
  if (!relation || typeof relation.name !== "string" || typeof relation.slug !== "string") {
    return null;
  }

  return {
    name: relation.name,
    slug: relation.slug,
  };
};

const normalizeAuthor = (value: unknown): BlogAuthor | null => {
  const relation = extractRelation<Record<string, unknown>>(value);
  if (!relation || typeof relation.name !== "string") return null;

  return {
    name: relation.name,
    role: typeof relation.role === "string" ? relation.role : undefined,
    avatar: extractMedia(relation.avatar),
  };
};

const normalizeSeoField = (seo: unknown, key: "meta_title" | "meta_description") => {
  if (!seo || typeof seo !== "object") return null;
  const value = (seo as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
};

const normalizePost = (
  entry: BlogPost | StrapiEntity<Record<string, unknown>> | Record<string, unknown>,
): BlogPost => {
  const raw =
    "attributes" in entry && entry.attributes
      ? (entry.attributes as Record<string, unknown>)
      : (entry as Record<string, unknown>);

  const id =
    ("documentId" in entry && typeof entry.documentId === "string" && entry.documentId) ||
    ("id" in entry && entry.id != null ? String(entry.id) : undefined) ||
    (typeof raw.slug === "string" ? raw.slug : undefined) ||
    crypto.randomUUID();

  const content = Array.isArray(raw.body)
    ? (raw.body as BlogBlock[])
    : Array.isArray(raw.content)
      ? (raw.content as BlogBlock[])
      : typeof raw.body === "string"
        ? raw.body
        : typeof raw.content === "string"
          ? raw.content
          : "";

  return {
    id,
    slug: typeof raw.slug === "string" ? raw.slug : id,
    title: typeof raw.title === "string" ? raw.title : "Untitled post",
    excerpt:
      typeof raw.excerpt === "string"
        ? raw.excerpt
        : Array.isArray(content)
          ? getTextFromBlocks(content).slice(0, 180)
          : String(content).slice(0, 180),
    content,
    publishedAt:
      typeof raw.publish_date === "string"
        ? raw.publish_date
        : typeof raw.publishedAt === "string"
          ? raw.publishedAt
          : typeof raw.createdAt === "string"
            ? raw.createdAt
            : new Date().toISOString(),
    featured: Boolean(raw.featured),
    readTime:
      typeof raw.read_time === "string"
        ? raw.read_time
        : typeof raw.readTime === "string"
          ? raw.readTime
          : undefined,
    coverImage: extractMedia(raw.featured_image ?? raw.coverImage),
    author: normalizeAuthor(raw.author),
    category: normalizeCategory(raw.category),
    seoTitle:
      normalizeSeoField(raw.seo, "meta_title") ||
      (typeof raw.seoTitle === "string" ? raw.seoTitle : null),
    seoDescription:
      normalizeSeoField(raw.seo, "meta_description") ||
      (typeof raw.seoDescription === "string" ? raw.seoDescription : null),
  };
};

const strapiFetch = async <T>(path: string): Promise<T> => {
  if (!STRAPI_URL) {
    throw new Error("Missing VITE_STRAPI_URL");
  }

  const response = await fetch(`${STRAPI_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Strapi request failed with status ${response.status}${text ? `: ${text}` : ""}`);
  }

  return (await response.json()) as T;
};

const sortPosts = (posts: BlogPost[], sort: BlogSortOption = DEFAULT_BLOG_SORT) => {
  const next = [...posts];

  next.sort((a, b) => {
    switch (sort) {
      case "oldest":
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "newest":
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  return next;
};

const buildBlogQueryString = ({
  search,
  category,
  sort = DEFAULT_BLOG_SORT,
}: BlogListParams = {}) => {
  const params = new URLSearchParams();

  const sortMap: Record<BlogSortOption, string> = {
    newest: "publish_date:desc",
    oldest: "publish_date:asc",
    "title-asc": "title:asc",
    "title-desc": "title:desc",
  };

  params.set("sort[0]", sortMap[sort]);
  params.set("populate[featured_image]", "true");
  params.set("populate[category]", "true");
  params.set("populate[seo][populate][og_image]", "true");

  if (search?.trim()) {
    const trimmedSearch = search.trim();
    params.set("filters[$or][0][title][$containsi]", trimmedSearch);
    params.set("filters[$or][1][excerpt][$containsi]", trimmedSearch);
  }

  if (category?.trim()) {
    params.set("filters[category][slug][$eq]", category.trim());
  }

  return params.toString();
};

export const isUsingMockStrapi = () => !STRAPI_URL;

export const getStrapiAssetUrl = (media?: StrapiMedia | null) => {
  if (!media?.url) return "/placeholder.svg";
  return isAbsoluteUrl(media.url) ? media.url : `${STRAPI_URL}${media.url}`;
};

export const formatBlogDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export const listBlogPosts = async ({
  search,
  category,
  sort = DEFAULT_BLOG_SORT,
}: BlogListParams = {}) => {
  if (!STRAPI_URL) {
    const normalizedSearch = search?.trim().toLowerCase();

    const filteredPosts = mockPosts.filter((post) => {
      const matchesSearch = normalizedSearch
        ? [
            post.title,
            post.excerpt,
            typeof post.content === "string" ? post.content : getTextFromBlocks(post.content),
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch)
        : true;

      const matchesCategory = category ? post.category?.slug === category : true;

      return matchesSearch && matchesCategory;
    });

    return sortPosts(filteredPosts, sort);
  }

  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    `/api/blog-posts?${buildBlogQueryString({ search, category, sort })}`,
  );

  return sortPosts(response.data.map((entry) => normalizePost(entry)), sort);
};

export const listBlogCategories = async () => {
  if (!STRAPI_URL) {
    const categories = mockPosts
      .map((post) => post.category)
      .filter((category): category is BlogCategory => Boolean(category));

    const uniqueCategories = new Map(categories.map((item) => [item.slug, item]));
    return [...uniqueCategories.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    "/api/categories?sort[0]=name:asc",
  );

  return response.data
    .map((entry) => normalizeCategory(entry))
    .filter((category): category is BlogCategory => Boolean(category));
};

export const getBlogPostBySlug = async (slug: string) => {
  if (!STRAPI_URL) {
    return mockPosts.find((post) => post.slug === slug) ?? null;
  }

  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    `/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(
      slug,
    )}&populate[featured_image]=true&populate[category]=true&populate[seo][populate][og_image]=true`,
  );

  const [entry] = response.data;
  return entry ? normalizePost(entry) : null;
};

export const getRelatedBlogPosts = async (slug: string) => {
  const posts = await listBlogPosts({ sort: "newest" });
  return posts.filter((post) => post.slug !== slug).slice(0, 3);
};


export type BlogCategoryDetail = {
  name: string;
  slug: string;
  description?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: StrapiMedia | null;
  } | null;
};


const normalizeCategoryDetail = (
  entry: Record<string, unknown> | { attributes?: Record<string, unknown> }
): BlogCategoryDetail | null => {
  const raw =
    "attributes" in entry && entry.attributes
      ? (entry.attributes as Record<string, unknown>)
      : (entry as Record<string, unknown>);

  if (typeof raw.name !== "string" || typeof raw.slug !== "string") {
    return null;
  }

  const seo =
    raw.seo && typeof raw.seo === "object"
      ? (raw.seo as Record<string, unknown>)
      : null;

  return {
    name: raw.name,
    slug: raw.slug,
    description:
      typeof raw.description === "string" ? raw.description : null,
    seo: seo
      ? {
          metaTitle:
            typeof seo.meta_title === "string" ? seo.meta_title : null,
          metaDescription:
            typeof seo.meta_description === "string"
              ? seo.meta_description
              : null,
          canonicalUrl:
            typeof seo.canonical_url === "string" ? seo.canonical_url : null,
          ogTitle:
            typeof seo.og_title === "string" ? seo.og_title : null,
          ogDescription:
            typeof seo.og_description === "string"
              ? seo.og_description
              : null,
          ogImage: extractMedia(seo.og_image),
        }
      : null,
  };
};
export const getBlogCategoryBySlug = async (slug: string) => {
  if (!STRAPI_URL) {
    return null;
  }

  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    `/api/categories?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate[seo][populate][og_image]=true`
  );

  const [entry] = response.data;
  return entry ? normalizeCategoryDetail(entry) : null;
};

//For Faq Page and Categories, we assume a simpler structure without complex relations or media. Adjust as needed based on your actual Strapi models.

export const getFaqPage = async () => {
  return strapiFetch<any>(`/api/faq-page?populate=*`);
};

export const getFaqCategories = async () => {
  return strapiFetch<any>(`/api/faq-categories?sort[0]=name:asc&populate=*`);
};

export const getFaqItems = async () => {
  return strapiFetch<any>(
    `/api/faq-items?sort[0]=sort_order:asc&populate[category]=true&populate[seo][populate][og_image]=true`
  );
};

export const getHomePage = async () => {
  return strapiFetch<any>(`/api/home-page?populate=*`);
};

export const getNavbar = async () => {
  return strapiFetch<any>(`/api/navbar?populate=*`);
};