import type {
  BlogAuthor,
  BlogBlock,
  BlogCategory,
  BlogListParams,
  BlogPost,
  BlogSortOption,
  StrapiMedia,
} from "@/types/blog";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL?.replace(/\/$/, "");
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

const mockPosts: BlogPost[] = [
  {
    id: "wishlist-strategy",
    slug: "wishlist-strategy-for-shopify-growth",
    title: "Wishlist strategy for Shopify growth",
    excerpt:
      "A practical framework for turning wishlist intent into repeat traffic, email triggers, and better merchandising decisions.",
    publishedAt: "2026-03-12T09:00:00.000Z",
    featured: true,
    readTime: "6 min read",
    category: { name: "Strategy", slug: "strategy" },
    author: { name: "WishlistSuite Team", role: "Product Marketing" },
    content: [
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Why wishlists matter" }],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "A strong wishlist flow helps stores capture intent before purchase and gives customers a clear reason to return.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Three useful lifecycle triggers" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          { type: "list-item", children: [{ type: "text", text: "Back-in-stock reminders" }] },
          { type: "list-item", children: [{ type: "text", text: "Price-drop notifications" }] },
          { type: "list-item", children: [{ type: "text", text: "Saved-items abandonment campaigns" }] },
        ],
      },
    ],
  },
  {
    id: "wishlist-merchandising",
    slug: "using-wishlist-data-for-merchandising",
    title: "Using wishlist data for merchandising",
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

  const source = "data" in value && typeof value.data === "object" ? (value as { data: unknown }).data : value;
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

  const source = "data" in value && typeof value.data === "object" ? (value as { data: unknown }).data : value;
  if (!source || typeof source !== "object") return null;

  const entity = source as Record<string, unknown>;
  if (entity.attributes && typeof entity.attributes === "object") {
    return entity.attributes as T;
  }

  return entity as T;
};

const normalizeCategory = (value: unknown): BlogCategory | null => {
  const relation = extractRelation<Record<string, unknown>>(value);
  if (!relation || typeof relation.name !== "string" || typeof relation.slug !== "string") return null;

  return {
    name: relation.name,
    slug: relation.slug,
  };
};

const normalizeAuthor = (value: unknown): BlogAuthor | null => {
  if (!value || typeof value !== "object") return null;

  const relation = extractRelation<Record<string, unknown>>(value);
  if (!relation || typeof relation.name !== "string") return null;

  return {
    name: relation.name,
    role: typeof relation.role === "string" ? relation.role : undefined,
    avatar: extractMedia(relation.avatar),
  };
};

const normalizePost = (entry: BlogPost | StrapiEntity<Record<string, unknown>> | Record<string, unknown>): BlogPost => {
  const raw = "attributes" in entry && entry.attributes ? entry.attributes : entry;
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
      typeof raw.publishedAt === "string"
        ? raw.publishedAt
        : typeof raw.createdAt === "string"
          ? raw.createdAt
          : new Date().toISOString(),
    featured: Boolean(raw.featured),
    readTime: typeof raw.readTime === "string" ? raw.readTime : undefined,
    coverImage: extractMedia(raw.coverImage),
    author: normalizeAuthor(raw.author),
    category: normalizeCategory(raw.category),
    seoTitle: typeof raw.seoTitle === "string" ? raw.seoTitle : null,
    seoDescription: typeof raw.seoDescription === "string" ? raw.seoDescription : null,
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
    throw new Error(`Strapi request failed with status ${response.status}`);
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

const buildBlogQueryString = ({ search, category, sort = DEFAULT_BLOG_SORT }: BlogListParams = {}) => {
  const params = new URLSearchParams();

  const sortMap: Record<BlogSortOption, string> = {
    newest: "publishedAt:desc",
    oldest: "publishedAt:asc",
    "title-asc": "title:asc",
    "title-desc": "title:desc",
  };

  params.set("sort[0]", sortMap[sort]);
  params.set("populate[coverImage]", "true");
  params.set("populate[author][populate][avatar]", "true");
  params.set("populate[category]", "true");

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
  return isAbsoluteUrl(media.url) ? media.url : `${STRAPI_URL ?? ""}${media.url}`;
};

export const formatBlogDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export const listBlogPosts = async ({ search, category, sort = DEFAULT_BLOG_SORT }: BlogListParams = {}) => {
  if (!STRAPI_URL) {
    const normalizedSearch = search?.trim().toLowerCase();
    const filteredPosts = mockPosts.filter((post) => {
      const matchesSearch = normalizedSearch
        ? [post.title, post.excerpt, typeof post.content === "string" ? post.content : getTextFromBlocks(post.content)]
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
    `/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[coverImage]=true&populate[author]=true&populate[category]=true`,
  );

  const [entry] = response.data;
  return entry ? normalizePost(entry) : null;
};

export const getRelatedBlogPosts = async (slug: string) => {
  const posts = await listBlogPosts({ sort: "newest" });
  return posts.filter((post) => post.slug !== slug).slice(0, 3);
};
