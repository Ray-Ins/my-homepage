"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2, FileText, Loader2, RotateCw, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import UserMenu from "@/components/auth/UserMenu";
import FileList, { type FileItem } from "@/components/uploads/FileList";
import { jsonOrThrow, putWithProgress, sha256Hex } from "@/components/uploads/client-upload";
import { useSession } from "@/lib/auth-client";
import {
  ACCEPT_ATTRIBUTE,
  MAX_FILE_SIZE,
  MAX_FILES_PER_SUBMISSION,
  formatBytes,
  resolveContentType,
} from "@/lib/upload-rules";

type ServerFile = FileItem & { status: "pending" | "uploaded"; uploadedAt: string | null };
type Submission = {
  id: string;
  status: "draft" | "submitted";
  note: string | null;
  submittedAt: string | null;
  files: ServerFile[];
};

type DraftItem = {
  localId: string;
  serverId?: string;
  name: string;
  size: number;
  file?: File;
  state: "queued" | "uploading" | "uploaded" | "error";
  progress: number;
  error?: string;
};

const CONCURRENCY = 3;

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Australia/Sydney",
});

export default function PortalPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [items, setItems] = useState<DraftItem[]>([]);
  const [history, setHistory] = useState<Submission[]>([]);
  const [note, setNote] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const queueRef = useRef<DraftItem[]>([]);
  const activeRef = useRef(0);

  const patch = useCallback((localId: string, update: Partial<DraftItem>) => {
    setItems((prev) => prev.map((i) => (i.localId === localId ? { ...i, ...update } : i)));
  }, []);

  const load = useCallback(async () => {
    try {
      const data = await jsonOrThrow<{ draft: Submission | null; submitted: Submission[] }>(
        await fetch("/api/uploads/submissions")
      );
      setHistory(data.submitted);
      setDraftId(data.draft?.id ?? null);
      setItems(
        (data.draft?.files ?? []).map((f) => ({
          localId: f.id,
          serverId: f.id,
          name: f.name,
          size: f.size,
          state: f.status === "uploaded" ? "uploaded" : "error",
          progress: f.status === "uploaded" ? 100 : 0,
          error: f.status === "uploaded" ? undefined : "Upload was interrupted. Remove and add it again.",
        }))
      );
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadOne = useCallback(
    async (item: DraftItem) => {
      const file = item.file!;
      patch(item.localId, { state: "uploading", progress: 0, error: undefined });
      try {
        const sha256 = await sha256Hex(file);
        const created = await jsonOrThrow<{
          submissionId: string;
          file: { id: string };
          upload: { url: string; headers: Record<string, string> };
        }>(
          await fetch("/api/uploads/files", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: file.name, size: file.size, type: file.type, sha256 }),
          })
        );
        setDraftId(created.submissionId);
        patch(item.localId, { serverId: created.file.id });

        await putWithProgress(created.upload.url, file, created.upload.headers, (p) =>
          patch(item.localId, { progress: p })
        );

        await jsonOrThrow(
          await fetch(`/api/uploads/files/${created.file.id}/complete`, { method: "POST" })
        );
        patch(item.localId, { state: "uploaded", progress: 100 });
      } catch (e) {
        patch(item.localId, { state: "error", error: (e as Error).message });
      }
    },
    [patch]
  );

  const pump = useCallback(() => {
    while (activeRef.current < CONCURRENCY && queueRef.current.length > 0) {
      const next = queueRef.current.shift()!;
      activeRef.current++;
      uploadOne(next).finally(() => {
        activeRef.current--;
        pump();
      });
    }
  }, [uploadOne]);

  const addFiles = (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList);
    const room = MAX_FILES_PER_SUBMISSION - items.length;
    if (incoming.length > room) {
      toast.error(`You can add up to ${MAX_FILES_PER_SUBMISSION} files per submission.`);
    }
    const accepted: DraftItem[] = [];
    for (const file of incoming.slice(0, Math.max(0, room))) {
      if (!resolveContentType(file.name, file.type)) {
        toast.error(`${file.name}: file type not allowed`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: larger than ${formatBytes(MAX_FILE_SIZE)}`);
        continue;
      }
      if (file.size === 0) {
        toast.error(`${file.name}: file is empty`);
        continue;
      }
      accepted.push({
        localId: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        file,
        state: "queued",
        progress: 0,
      });
    }
    if (accepted.length === 0) return;
    setItems((prev) => [...prev, ...accepted]);
    queueRef.current.push(...accepted);
    pump();
  };

  const removeItem = async (item: DraftItem) => {
    queueRef.current = queueRef.current.filter((q) => q.localId !== item.localId);
    if (item.serverId) {
      try {
        await jsonOrThrow(await fetch(`/api/uploads/files/${item.serverId}`, { method: "DELETE" }));
      } catch (e) {
        toast.error((e as Error).message);
        return;
      }
    }
    setItems((prev) => prev.filter((i) => i.localId !== item.localId));
  };

  const retryItem = async (item: DraftItem) => {
    if (!item.file) return;
    if (item.serverId) {
      await fetch(`/api/uploads/files/${item.serverId}`, { method: "DELETE" }).catch(() => {});
    }
    const fresh = { ...item, serverId: undefined, state: "queued" as const, progress: 0, error: undefined };
    patch(item.localId, fresh);
    queueRef.current.push(fresh);
    pump();
  };

  const submit = async () => {
    if (!draftId) return;
    setSubmitting(true);
    try {
      await jsonOrThrow(
        await fetch(`/api/uploads/submissions/${draftId}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: note.trim() || undefined }),
        })
      );
      toast.success("Documents submitted. A confirmation email is on its way.");
      setNote("");
      setConfirmOpen(false);
      await load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const busy = items.some((i) => i.state === "queued" || i.state === "uploading");
  const hasErrors = items.some((i) => i.state === "error");
  const canSubmit = !!draftId && items.length > 0 && !busy && !hasErrors && !submitting;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Document upload</h1>
          <p className="text-sm text-muted-foreground">
            {session?.user ? `Signed in as ${session.user.email}. ` : ""}
            Upload your documents, then confirm the submission.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {session?.user?.role === "admin" && (
            <Button asChild variant="outline" size="sm">
              <Link href="/admin">Admin</Link>
            </Button>
          )}
          <UserMenu />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New submission</CardTitle>
          <CardDescription>
            PDF, Word, Excel, JPG or PNG. Up to {MAX_FILES_PER_SUBMISSION} files,{" "}
            {formatBytes(MAX_FILE_SIZE)} each. Files are only sent to us when you click
            &quot;Confirm submission&quot;.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              dragging ? "border-primary bg-muted" : "hover:bg-muted/50"
            }`}
          >
            <Upload className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">Drag files here or click to browse</p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPT_ATTRIBUTE}
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading...
            </div>
          ) : (
            items.length > 0 && (
              <ul className="divide-y rounded-md border">
                {items.map((item) => (
                  <li key={item.localId} className="flex items-center gap-3 p-3">
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{item.name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatBytes(item.size)}
                        </span>
                      </div>
                      {item.state === "uploading" && <Progress value={item.progress} className="h-1.5" />}
                      {item.state === "queued" && (
                        <p className="text-xs text-muted-foreground">Waiting...</p>
                      )}
                      {item.state === "error" && (
                        <p className="text-xs text-destructive">{item.error}</p>
                      )}
                    </div>
                    {item.state === "uploaded" && (
                      <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                    )}
                    {item.state === "error" && item.file && (
                      <Button variant="ghost" size="icon" onClick={() => retryItem(item)} title="Retry">
                        <RotateCw className="size-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item)}
                      disabled={item.state === "uploading"}
                      title="Remove"
                    >
                      <X className="size-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )
          )}

          <div className="space-y-2">
            <label htmlFor="note" className="text-sm font-medium">
              Note (optional)
            </label>
            <Textarea
              id="note"
              value={note}
              maxLength={2000}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything we should know about these documents?"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {items.length} / {MAX_FILES_PER_SUBMISSION} files
              {busy && " · uploading..."}
            </p>
            <Button disabled={!canSubmit} onClick={() => setConfirmOpen(true)}>
              Confirm submission
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Previous submissions</h2>
        {!loading && history.length === 0 && (
          <p className="text-sm text-muted-foreground">No submissions yet.</p>
        )}
        {history.map((s) => (
          <Card key={s.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base">
                  {s.submittedAt ? dateFormatter.format(new Date(s.submittedAt)) : "-"}
                </CardTitle>
                <Badge variant="secondary">
                  {s.files.length} file{s.files.length === 1 ? "" : "s"} · Submitted
                </Badge>
              </div>
              <CardDescription className="font-mono text-xs">Ref: {s.id}</CardDescription>
              {s.note && <p className="text-sm whitespace-pre-wrap">{s.note}</p>}
            </CardHeader>
            <CardContent>
              <FileList files={s.files} urlBase="/api/uploads/files" />
            </CardContent>
          </Card>
        ))}
      </section>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit {items.length} file(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              Once submitted, these files are locked for compliance and can&apos;t be removed or
              replaced. You can always make a new submission later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={submitting}
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              {submitting ? "Submitting..." : "Confirm submission"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
