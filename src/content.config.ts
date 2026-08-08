import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['planned', 'in-progress', 'done']).default('in-progress'),
    year: z.number().int().min(2000).max(2100),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    period: z.string(),
    summary: z.string(),
    kind: z.enum(['education', 'internship', 'work', 'activity']).default('work'),
  }),
});

export const collections = {
  projects,
  writings,
  experience,
};