import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_PAGE_SIZE, listPublished } from "@/lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog - Inspire Partners | Insights on Tax, Accounting & Finance",
  description:
    "Articles and practical insights from Inspire Partners on tax, accounting, lending and growing your wealth.",
  openGraph: {
    title: "Inspire Partners Blog",
    description:
      "Articles and practical insights on tax, accounting, lending and growing your wealth.",
    type: "website",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "long",
  timeZone: "Australia/Sydney",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const { posts, total } = await listPublished(page);
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-[#052f46] py-16 text-center">
        <h1 className="font-montaga text-4xl md:text-5xl text-[#f5e5be]">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-[#f5e5be]/80">
          Insights and practical guidance on tax, accounting, lending and wealth.
        </p>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-12">
        {posts.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No articles yet. Please check back soon.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9] bg-[#052f46]">
                  {post.coverImageUrl ? (
                    <Image
                      src={post.coverImageUrl}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-montaga text-2xl text-[#f5e5be]/70">
                      Inspire Partners
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {post.publishedAt && (
                    <time className="text-xs uppercase tracking-wide text-muted-foreground">
                      {dateFormatter.format(post.publishedAt)}
                    </time>
                  )}
                  <h2 className="text-xl font-semibold text-[#052f46] group-hover:underline">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
                  )}
                  <span className="mt-auto pt-2 text-sm font-medium text-[#052f46]">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-4 text-sm" aria-label="Pagination">
            {page > 1 ? (
              <Link href={`/blog?page=${page - 1}`} className="rounded-md border bg-white px-4 py-2 hover:bg-slate-100">
                ← Newer
              </Link>
            ) : (
              <span className="px-4 py-2 opacity-0">← Newer</span>
            )}
            <span className="text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link href={`/blog?page=${page + 1}`} className="rounded-md border bg-white px-4 py-2 hover:bg-slate-100">
                Older →
              </Link>
            ) : (
              <span className="px-4 py-2 opacity-0">Older →</span>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}
