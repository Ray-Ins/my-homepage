"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Download, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatBytes, isPreviewable } from "@/lib/upload-rules";
import { jsonOrThrow } from "@/components/uploads/client-upload";

export type FileItem = {
  id: string;
  name: string;
  contentType: string;
  size: number;
  sha256?: string;
};

/**
 * Read-only list of stored files with preview/download. `urlBase` is the API
 * prefix that signs URLs, e.g. "/api/uploads/files" or "/api/admin/files".
 */
export default function FileList({
  files,
  urlBase,
  showHash = false,
}: {
  files: FileItem[];
  urlBase: string;
  showHash?: boolean;
}) {
  const [preview, setPreview] = useState<{ file: FileItem; url: string } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const open = async (file: FileItem, mode: "preview" | "download") => {
    setBusyId(file.id);
    try {
      const { url } = await jsonOrThrow<{ url: string }>(
        await fetch(`${urlBase}/${file.id}/url?mode=${mode}`)
      );
      if (mode === "preview") setPreview({ file, url });
      else window.location.assign(url);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <ul className="divide-y rounded-md border">
        {files.map((f) => (
          <li key={f.id} className="flex items-center gap-3 p-3">
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <button
                type="button"
                className="block max-w-full truncate text-left text-sm font-medium hover:underline"
                onClick={() => open(f, isPreviewable(f.contentType) ? "preview" : "download")}
                disabled={busyId === f.id}
              >
                {f.name}
              </button>
              <div className="text-xs text-muted-foreground">
                {formatBytes(f.size)}
                {showHash && f.sha256 && (
                  <span className="ml-2 font-mono" title={f.sha256}>
                    SHA-256 {f.sha256.slice(0, 12)}…
                  </span>
                )}
              </div>
            </div>
            {isPreviewable(f.contentType) && (
              <Button
                variant="ghost"
                size="sm"
                disabled={busyId === f.id}
                onClick={() => open(f, "preview")}
              >
                <Eye className="size-4" />
                <span className="sr-only sm:not-sr-only">Preview</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              disabled={busyId === f.id}
              onClick={() => open(f, "download")}
            >
              <Download className="size-4" />
              <span className="sr-only sm:not-sr-only">Download</span>
            </Button>
          </li>
        ))}
      </ul>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="sm:max-w-5xl w-[95vw]">
          <DialogHeader>
            <DialogTitle className="truncate pr-6">{preview?.file.name}</DialogTitle>
          </DialogHeader>
          {preview &&
            (preview.file.contentType.startsWith("image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.url}
                alt={preview.file.name}
                className="max-h-[75vh] w-full object-contain"
              />
            ) : (
              <iframe
                src={preview.url}
                title={preview.file.name}
                className="h-[75vh] w-full rounded border"
              />
            ))}
        </DialogContent>
      </Dialog>
    </>
  );
}
