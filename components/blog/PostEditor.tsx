"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import type { JSONContent } from "@tiptap/core";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { blogExtensions } from "@/lib/blog-extensions";
import { slugify } from "@/lib/slugify";

export type EditablePost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  contentJson: JSONContent;
  status: "draft" | "published";
};

async function uploadImage(file: File) {
  const res = await fetch("/api/admin/blog-images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: file.type, size: file.size }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Image upload failed");
  const put = await fetch(data.uploadUrl, { method: "PUT", headers: data.headers, body: file });
  if (!put.ok) throw new Error(`Image upload failed (${put.status})`);
  return data.publicUrl as string;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40",
        active && "bg-muted text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, onImage, uploading }: { editor: Editor; onImage: () => void; uploading: boolean }) {
  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (leave empty to remove)", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b p-1.5">
      <ToolbarButton title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="size-4" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>
        <Link2 className="size-4" />
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Insert image" disabled={uploading} onClick={onImage}>
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-border" />
      <ToolbarButton title="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 className="size-4" />
      </ToolbarButton>
      <ToolbarButton title="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 className="size-4" />
      </ToolbarButton>
    </div>
  );
}

export default function PostEditor({ post }: { post?: EditablePost }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [cover, setCover] = useState<string | null>(post?.coverImageUrl ?? null);
  const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [...blogExtensions, Placeholder.configure({ placeholder: "Start writing..." })],
    content: post?.contentJson ?? "",
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none min-h-[420px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: () => setDirty(true),
  });

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const markDirty = () => setDirty(true);

  const insertImage = async (file: File) => {
    if (!editor) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      editor.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const uploadCover = async (file: File) => {
    setCoverUploading(true);
    try {
      setCover(await uploadImage(file));
      markDirty();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setCoverUploading(false);
    }
  };

  const save = async (nextStatus: "draft" | "published") => {
    if (!editor) return;
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(post ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
        method: post ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || undefined,
          excerpt: excerpt || null,
          coverImageUrl: cover,
          contentJson: editor.getJSON(),
          status: nextStatus,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setDirty(false);
      setStatus(data.status);
      setSlug(data.slug);
      toast.success(
        nextStatus === "published"
          ? status === "published" ? "Changes published" : "Post published"
          : status === "published" ? "Post unpublished" : "Draft saved"
      );
      if (!post) router.replace(`/admin/blog/${data.id}/edit`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link href="/admin/blog" className="text-sm text-muted-foreground hover:underline">
            ← All posts
          </Link>
          <Badge variant={status === "published" ? "default" : "secondary"}>{status}</Badge>
          {dirty && <span className="text-xs text-muted-foreground">Unsaved changes</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          {status === "published" && post && (
            <Button asChild variant="ghost">
              <Link href={`/blog/${slug}`} target="_blank">
                View
              </Link>
            </Button>
          )}
          {status === "published" ? (
            <>
              <Button variant="outline" disabled={saving} onClick={() => save("draft")}>
                Unpublish
              </Button>
              <Button disabled={saving} onClick={() => save("published")}>
                {saving ? "Saving..." : "Update"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" disabled={saving} onClick={() => save("draft")}>
                {saving ? "Saving..." : "Save draft"}
              </Button>
              <Button disabled={saving} onClick={() => save("published")}>
                Publish
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              className="text-lg"
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
                markDirty();
              }}
            />
          </div>
          <div className="rounded-md border">
            {editor && (
              <Toolbar editor={editor} uploading={uploading} onImage={() => imageInput.current?.click()} />
            )}
            <EditorContent editor={editor} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug">URL slug</Label>
            <Input
              id="slug"
              value={slug}
              placeholder="auto-generated"
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugTouched(true);
                markDirty();
              }}
            />
            <p className="text-xs text-muted-foreground break-all">/blog/{slug || "…"}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              rows={4}
              maxLength={500}
              value={excerpt}
              placeholder="Short summary shown on the blog list and in search results"
              onChange={(e) => {
                setExcerpt(e.target.value);
                markDirty();
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Cover image</Label>
            {cover ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover} alt="" className="aspect-video w-full rounded-md border object-cover" />
                <button
                  type="button"
                  aria-label="Remove cover image"
                  className="absolute right-2 top-2 rounded-full bg-background/90 p-1 shadow"
                  onClick={() => {
                    setCover(null);
                    markDirty();
                  }}
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={coverUploading}
                onClick={() => coverInput.current?.click()}
              >
                {coverUploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
                Upload cover
              </Button>
            )}
          </div>
        </aside>
      </div>

      <input
        ref={imageInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) insertImage(f);
          e.target.value = "";
        }}
      />
      <input
        ref={coverInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadCover(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
