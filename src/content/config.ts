import { defineCollection, z } from 'astro:content';

const apartment = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    heroImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    amenities: z.array(z.string()).default([]),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      canonical: z.string().url().optional(),
    }).optional(),
    published: z.boolean().default(true),
    order: z.number().default(0),
  })
});

export const collections = { apartment };
