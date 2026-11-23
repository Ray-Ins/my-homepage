import { z } from "zod";
import { revalidatePath } from "next/cache";
import type { JSONContent } from "@tiptap/core";
import { isMediaUrl, renderPostHtml, slugify } from "@/lib/blog";

export const postInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z.string().trim().max(80).optional(),
  excerpt: z.string().trim().max(500).optional().nullable(),
  coverImageUrl: z
    .string()
    .nullable()
    .optional()
    .refine((v) => !v || isMediaUrl(v), "Cover image must be uploaded to the media bucket"),
  contentJson: z.object({ type: z.literal("doc") }).passthrough(),
  status: z.enum(["draft", "published"]),
});

export type PostInput = z.infer<typeof postInputSchema>;

/** Validates and converts editor content; returns null if the document is invalid. */
export function preparePost(input: PostInput) {
  let contentHtml: string;
  try {
    contentHtml = renderPostHtml(input.contentJson as JSONContent);
  } catch {
    return null;
  }
  return {
    title: input.title,
    slugBase: slugify(input.slug || input.title),
    excerpt: input.excerpt || null,
    coverImageUrl: input.coverImageUrl || null,
    contentJson: input.contentJson,
    contentHtml,
    status: input.status,
  };
}

export function revalidateBlog(...slugs: (string | null | undefined)[]) {
  revalidatePath("/blog");
  for (const slug of new Set(slugs)) {
    if (slug) revalidatePath(`/blog/${slug}`);
  }
}
