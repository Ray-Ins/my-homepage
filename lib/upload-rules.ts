// Shared between client and server; keep free of server-only imports.

export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const MAX_FILES_PER_SUBMISSION = 20;

export const ALLOWED_FILE_TYPES: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

export const ACCEPT_ATTRIBUTE = Object.entries(ALLOWED_FILE_TYPES)
  .flatMap(([type, exts]) => [type, ...exts])
  .join(",");

const extensionOf = (name: string) => {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
};

/**
 * Browsers sometimes report an empty or generic MIME type (e.g. for .doc on
 * Windows), so resolve the canonical type from the extension.
 */
export function resolveContentType(name: string, reportedType: string): string | null {
  const ext = extensionOf(name);
  const byExt = Object.entries(ALLOWED_FILE_TYPES).find(([, exts]) =>
    exts.includes(ext)
  );
  if (!byExt) return null;
  if (reportedType && reportedType !== byExt[0] && ALLOWED_FILE_TYPES[reportedType]) {
    // Extension and reported type disagree on a known type; reject.
    return null;
  }
  return byExt[0];
}

export function isPreviewable(contentType: string) {
  return contentType === "application/pdf" || contentType.startsWith("image/");
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
