# Strapi Blog Setup

This frontend expects a Strapi project that exposes a `blog-post` collection through the REST API.

## 1. Create the Strapi project

Run this in a separate repo:

```bash
npx create-strapi@latest wishlist-blog-cms
cd wishlist-blog-cms
npm run develop
```

Then create your admin user in the Strapi dashboard.

## 2. Create content types

Create these collection types:

- `Blog Post`
- `Author`
- `Category`

### Blog Post fields

- `title`: Text, required
- `slug`: UID based on `title`, required
- `excerpt`: Text, required
- `body`: Rich text or Blocks, required
- `coverImage`: Media, single image
- `featured`: Boolean
- `readTime`: Text
- `author`: Relation to `Author`
- `category`: Relation to `Category`
- `seoTitle`: Text
- `seoDescription`: Text
- `Draft & Publish`: enabled

### Author fields

- `name`: Text, required
- `role`: Text
- `avatar`: Media, single image

### Category fields

- `name`: Text, required
- `slug`: UID based on `name`, required

## 3. Add sample content

Create and publish at least 3 blog posts before wiring the frontend to live data.

Recommended minimum:

- one featured article
- two normal articles
- cover image on each post
- valid slug on each post
- author and category assigned

## 4. Configure API access

The frontend supports 2 modes:

- public REST access
- token-based REST access with `VITE_STRAPI_API_TOKEN`

If you use public access, enable these permissions for the Public role:

- `blog-post.find`
- `author.find`
- `category.find`

If your Strapi version also separates single-item reads:

- `blog-post.findOne`
- `author.findOne`
- `category.findOne`

## 5. API shape expected by the frontend

The frontend fetches blog posts from:

```txt
/api/blog-posts?sort[0]=publishedAt:desc&populate[coverImage]=true&populate[author][populate][avatar]=true&populate[category]=true
```

And single posts by slug from:

```txt
/api/blog-posts?filters[slug][$eq]=your-slug&populate[coverImage]=true&populate[author][populate][avatar]=true&populate[category]=true
```

The frontend reads these fields from each post:

- `title`
- `slug`
- `excerpt`
- `body` or `content`
- `publishedAt`
- `featured`
- `readTime`
- `coverImage`
- `author`
- `category`
- `seoTitle`
- `seoDescription`

It reads these nested fields from relations:

- `author.name`
- `author.role`
- `author.avatar`
- `category.name`
- `category.slug`

## 6. Environment variables in this frontend

Set these in `.env`:

```bash
VITE_STRAPI_URL=https://your-project.strapiapp.com
VITE_STRAPI_API_TOKEN=your_read_only_token
```

`VITE_STRAPI_API_TOKEN` is optional if the Strapi blog endpoints are public.

## 7. Local frontend test

After adding the env vars, run:

```bash
npm run dev
```

Then open:

- `http://localhost:8080/blog`
- `http://localhost:8080/blog/your-post-slug`

If the blog still shows mock data, `VITE_STRAPI_URL` is missing or not being loaded.

## 8. Deploying Strapi to Strapi Cloud

Recommended flow:

1. Build and test the Strapi schema locally
2. Push the Strapi project to GitHub or GitLab
3. Create a project in Strapi Cloud
4. Connect the repository and branch
5. Add environment variables if needed
6. Deploy
7. Recreate or import content into the cloud environment

Important:

- local Strapi data does not automatically move to Strapi Cloud
- media URLs must be accessible from the frontend domain
- if you use private API tokens, add them to the frontend hosting environment too

## 9. Recommended next improvements

Once the backend is live, the next frontend improvements should be:

- category filter on `/blog`
- SEO meta tags per article
- 404 state for missing posts
- pagination
- author pages
