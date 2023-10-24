import { defineCollection, z } from 'astro:content';

const seoSchema = z
  .object({
    page_description: z.string().nullable(),
    canonical_url: z.string().nullable(),
    featured_image: z.string().nullable(),
    featured_image_alt: z.string().nullable(),
    author_twitter_handle: z.string().nullable(),
    open_graph_type: z.string().nullable(),
    no_index: z.boolean(),
  })
  .optional();

const blogCollection = defineCollection({
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    thumb_image_path: z.string(),
    thumb_image_alt: z.string(),
    image: z.string(),
    image_alt: z.string(),
    seo: seoSchema,
  }),
});

const pageSchema = z.object({
  _schema: z.any().optional(),
  hidden: z.boolean().optional().default(false),
  title: z.string(),
  description: z.string(),
  page_size: z.number().nonnegative(),
  seo: seoSchema,
});

const paginatedCollectionSchema = z.object({
  _schema: z.literal('paginated_collection'),
  hidden: z.literal(true).optional().default(true),
  title: z.string(),
  description: z.string().optional(),
  page_size: z.number().nonnegative(),
  seo: seoSchema,
});

const pagesCollection = defineCollection({
  schema: z.union([paginatedCollectionSchema, pageSchema]),
});

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
};
