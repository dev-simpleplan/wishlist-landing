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
      typeof attributes.alternativeText === "string"
        ? attributes.alternativeText
        : null,
    width:
      typeof attributes.width === "number" ? attributes.width : undefined,
    height:
      typeof attributes.height === "number" ? attributes.height : undefined,
    formats:
      attributes.formats && typeof attributes.formats === "object"
        ? (attributes.formats as Record<
            string,
            { url: string; width?: number; height?: number }
          >)
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

const normalizePost = (
  entry: BlogPost | StrapiEntity<Record<string, unknown>> | Record<string, unknown>
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
    throw new Error(`Strapi request failed: ${response.status}`);
  }

  return (await response.json()) as T;
};

const sortPosts = (posts: BlogPost[], sort: BlogSortOption) => {
  return [...posts].sort((a, b) =>
    sort === "oldest"
      ? new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const listBlogPosts = async ({
  search,
  category,
  sort = DEFAULT_BLOG_SORT,
}: BlogListParams = {}) => {
  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    `/api/blog-posts?populate=*`
  );

  console.log("STRAPI_URL:", STRAPI_URL);
  console.log("RAW RESPONSE:", response);

  let posts = response.data.map((entry) => normalizePost(entry));

  if (search?.trim()) {
    const s = search.toLowerCase();
    posts = posts.filter((p) =>
      `${p.title} ${p.excerpt}`.toLowerCase().includes(s)
    );
  }

  if (category?.trim()) {
    posts = posts.filter((p) => p.category?.slug === category);
  }

  return sortPosts(posts, sort);
};

export const listBlogCategories = async () => {
  const response = await strapiFetch<StrapiCollectionResponse<Record<string, unknown>>>(
    "/api/categories?sort[0]=name:asc"
  );

  return response.data
    .map((entry) => normalizeCategory(entry))
    .filter(Boolean);
};

export const getBlogPostBySlug = async (slug: string) => {
  const response = await strapiFetch<any>(
    `/api/blog-posts?filters[slug][$eq]=${slug}&filters[publishedAt][$notNull]=true&populate=*`
  );

  return response?.data?.[0] || null;
};

export const getRelatedBlogPosts = async (slug: string) => {
  const posts = await listBlogPosts();
  return posts.filter((p) => p.slug !== slug).slice(0, 3);
};

export const getFaqPage = async () => {
  return strapiFetch<any>(`/api/faq-page?populate=*`);
};

export const getFaqCategories = async () => {
  return strapiFetch<any>(`/api/faq-categories?populate=*`);
};

export const getFaqItems = async () => {
  return strapiFetch<any>(`/api/faq-items?populate=*`);
};

export const getHomePage = async () => {
  return strapiFetch<any>(`/api/home-page?populate=*`);
};

export const getNavbar = async () => {
  return strapiFetch<any>(`/api/navbar?populate=*`);
};