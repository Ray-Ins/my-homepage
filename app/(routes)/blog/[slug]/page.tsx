import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBySlug } from "@/lib/blog";

export const revalidate = 3600;

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "long",
  timeZone: "Australia/Sydney",
});

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPublishedBySlug((await params).slug);
  if (!post) return { title: "Article not found" };

  return {
    title: `${post.title} - Inspire Partners Blog`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.authorName],
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPublishedBySlug((await params).slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-slate-50">
      <header className="bg-[#052f46] py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <Link
            href="/blog"
            className="text-sm text-[#f5e5be]/70 hover:text-[#f5e5be] hover:underline"
          >
            ← Back to Blog
          </Link>
          <h1 className="mt-4 font-montaga text-3xl md:text-5xl text-[#f5e5be] leading-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[#f5e5be]/80">
            <span>{post.authorName}</span>
            {post.publishedAt && (
              <>
                <span aria-hidden>·</span>
                <time dateTime={post.publishedAt.toISOString()}>
                  {dateFormatter.format(post.publishedAt)}
                </time>
              </>
            )}
          </div>
        </div>
      </header>

      {post.coverImageUrl && (
        <div className="container mx-auto max-w-4xl px-4 -mt-6 md:-mt-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-white shadow-sm">
            <Image
              src={post.coverImageUrl}
              alt=""
              fill
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
        <div
          className="prose prose-slate prose-lg max-w-none prose-headings:text-[#052f46] prose-a:text-[#052f46] prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </article>
  );
}
