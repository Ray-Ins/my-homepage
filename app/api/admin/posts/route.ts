import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { requireAdmin, authErrorResponse } from "@/lib/authz";
import { uniqueSlug } from "@/lib/blog";
import { postInputSchema, preparePost, revalidateBlog } from "@/lib/blog-input";

export async function GET() {
  try {
    await requireAdmin();
    const posts = await db
      .select({
        id: postsTable.id,
        slug: postsTable.slug,
        title: postsTable.title,
        status: postsTable.status,
        publishedAt: postsTable.publishedAt,
        updatedAt: postsTable.updatedAt,
        authorName: postsTable.authorName,
      })
      .from(postsTable)
      .orderBy(desc(postsTable.updatedAt));
    return NextResponse.json(posts);
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to list posts:", error);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    const parsed = postInputSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid post" },
        { status: 400 }
      );
    }
    const post = preparePost(parsed.data);
    if (!post) return NextResponse.json({ error: "Invalid content" }, { status: 400 });

    const { slugBase, ...values } = post;
    const [created] = await db
      .insert(postsTable)
      .values({
        ...values,
        slug: await uniqueSlug(slugBase),
        publishedAt: values.status === "published" ? new Date() : null,
        authorId: admin.id,
        authorName: admin.name,
      })
      .returning();

    revalidateBlog(created.slug);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
