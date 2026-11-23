import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { isUuid } from "@/lib/submissions";
import PostEditor, { type EditablePost } from "@/components/blog/PostEditor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const [post] = await db.select().from(postsTable).where(eq(postsTable.id, id)).limit(1);
  if (!post) notFound();

  const editable: EditablePost = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImageUrl: post.coverImageUrl,
    contentJson: post.contentJson as EditablePost["contentJson"],
    status: post.status,
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <PostEditor post={editable} />
    </div>
  );
}
