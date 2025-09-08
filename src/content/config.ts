import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const competitors = defineCollection({
  schema: z.object({
    title: z.string(),
    competitor: z.string(),
    subtitle: z.string(),
    heroImage: z.string().optional(),
    pricing: z.object({
      hoogly: z.string(),
      competitor: z.string(),
    }),
    featureComparison: z.array(z.object({
      feature: z.string(),
      hoogly: z.union([z.string(), z.boolean()]),
      competitor: z.union([z.string(), z.boolean()]),
    })),
  }),
});

export const collections = {
  'blog': blog,
  'competitors': competitors,
};