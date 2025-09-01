import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.string().optional(),
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