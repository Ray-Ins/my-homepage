"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminNav from "@/components/admin/AdminNav";
import UserMenu from "@/components/auth/UserMenu";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string;
  authorName: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Australia/Sydney",
});

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<PostRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    fetch("/api/admin/posts")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        setPosts(await res.json());
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/posts/${toDelete.id}`, { method: "DELETE" });
    setDeleting(false);
    if (!res.ok) {
      toast.error("Failed to delete post");
      return;
    }
    toast.success("Post deleted");
    setToDelete(null);
    setPosts((prev) => prev.filter((p) => p.id !== toDelete.id));
  };

  return (
    <div className="container mx-auto max-w-5xl py-10 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
            <UserMenu />
          </div>
          <AdminNav />
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="size-4" />
            New post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Title</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Published</TableHead>
                  <TableHead className="text-xs">Updated</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No posts yet
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="max-w-72 truncate font-medium">
                        <Link href={`/admin/blog/${p.id}/edit`} className="hover:underline">
                          {p.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant={p.status === "published" ? "default" : "secondary"}>
                          {p.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {p.publishedAt ? dateFormatter.format(new Date(p.publishedAt)) : "-"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {dateFormatter.format(new Date(p.updatedAt))}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {p.status === "published" && (
                          <Button asChild variant="ghost" size="icon" title="View">
                            <Link href={`/blog/${p.slug}`} target="_blank">
                              <ExternalLink className="size-4" />
                            </Link>
                          </Button>
                        )}
                        <Button asChild variant="ghost" size="icon" title="Edit">
                          <Link href={`/admin/blog/${p.id}/edit`}>
                            <Pencil className="size-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete" onClick={() => setToDelete(p)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &ldquo;{toDelete?.title}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the post. To hide it temporarily, unpublish it instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
