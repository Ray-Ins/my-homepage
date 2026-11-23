import { and, desc, eq, like, ne, or, sql } from "drizzle-orm";
import { generateHTML } from "@tiptap/html/server";
import type { JSONContent } from "@tiptap/core";
import sanitizeHtml from "sanitize-html";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { blogExtensions } from "@/lib/blog-extensions";

export { slugify } from "@/lib/slugify";

export const BLOG_PAGE_SIZE = 9;

export const mediaBaseUrl = (process.env.R2_PUBLIC_BASE_URL ?? "").replace(/\/+$/, "");

export function isMediaUrl(url: string | null | undefined) {
  return !!url && !!mediaBaseUrl && url.startsWith(`${mediaBaseUrl}/`);
}

export function renderPostHtml(doc: JSONContent) {
  const html = generateHTML(doc, blogExtensions);
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "strong", "em", "s", "u", "code", "pre",
      "blockquote", "ul", "ol", "li", "a", "img", "hr",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "loading"],
      ol: ["start"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    // Only images hosted on our own media bucket
    exclusiveFilter: (frame) => frame.tag === "img" && !isMediaUrl(frame.attribs.src),
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  });
}

/** Returns `base`, or `base-2`, `base-3`... if taken by another post. */
export async function uniqueSlug(base: string, excludeId?: string) {
  const root = base || `post-${Date.now().toString(36)}`;
  const taken = await db
    .select({ slug: postsTable.slug })
    .from(postsTable)
    .where(
      and(
        or(eq(postsTable.slug, root), like(postsTable.slug, `${root}-%`)),
        excludeId ? ne(postsTable.id, excludeId) : undefined
      )
    );
  const used = new Set(taken.map((t) => t.slug));
  if (!used.has(root)) return root;
  let n = 2;
  while (used.has(`${root}-${n}`)) n++;
  return `${root}-${n}`;
}

const publicColumns = {
  id: postsTable.id,
  slug: postsTable.slug,
  title: postsTable.title,
  excerpt: postsTable.excerpt,
  coverImageUrl: postsTable.coverImageUrl,
  publishedAt: postsTable.publishedAt,
  authorName: postsTable.authorName,
};

export async function listPublished(page: number) {
  const where = eq(postsTable.status, "published");
  const [posts, [{ total }]] = await Promise.all([
    db
      .select(publicColumns)
      .from(postsTable)
      .where(where)
      .orderBy(desc(postsTable.publishedAt))
      .limit(BLOG_PAGE_SIZE)
      .offset((page - 1) * BLOG_PAGE_SIZE),
    db
      .select({ total: sql<number>`cast(count(*) as int)` })
      .from(postsTable)
      .where(where),
  ]);
  return { posts, total };
}

export async function getPublishedBySlug(slug: string) {
  const [post] = await db
    .select({ ...publicColumns, contentHtml: postsTable.contentHtml, updatedAt: postsTable.updatedAt })
    .from(postsTable)
    .where(and(eq(postsTable.slug, slug), eq(postsTable.status, "published")))
    .limit(1);
  return post ?? null;
}
