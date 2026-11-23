import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { requireAdmin, authErrorResponse } from "@/lib/authz";
import { uniqueSlug } from "@/lib/blog";
import { postInputSchema, preparePost, revalidateBlog } from "@/lib/blog-input";
import { isUuid } from "@/lib/submissions";

type Params = { params: Promise<{ id: string }> };

async function findPost(id: string) {
  if (!isUuid(id)) return null;
  const [post] = await db.select().from(postsTable).where(eq(postsTable.id, id)).limit(1);
  return post ?? null;
}

function handleError(error: unknown, action: string) {
  const authRes = authErrorResponse(error);
  if (authRes) return authRes;
  console.error(`Failed to ${action} post:`, error);
  return NextResponse.json({ error: `Failed to ${action} post` }, { status: 500 });
}

export async function GET(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const post = await findPost((await params).id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return handleError(error, "load");
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const existing = await findPost((await params).id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

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
    const slug =
      slugBase === existing.slug ? existing.slug : await uniqueSlug(slugBase, existing.id);

    const [updated] = await db
      .update(postsTable)
      .set({
        ...values,
        slug,
        publishedAt:
          values.status === "published" ? existing.publishedAt ?? new Date() : existing.publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(postsTable.id, existing.id))
      .returning();

    revalidateBlog(existing.slug, updated.slug);
    return NextResponse.json(updated);
  } catch (error) {
    return handleError(error, "update");
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdmin();
    const existing = await findPost((await params).id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await db.delete(postsTable).where(eq(postsTable.id, existing.id));
    revalidateBlog(existing.slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleError(error, "delete");
  }
}
