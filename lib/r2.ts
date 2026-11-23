import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const PRESIGN_TTL_SECONDS = 5 * 60;

const bucket = process.env.R2_BUCKET!;

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  // R2 rejects the SDK's default CRC32 checksum params on presigned URLs.
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

/**
 * Presigned PUT bound to an exact size, content type and SHA-256. The browser
 * must send matching `Content-Type` and `x-amz-checksum-sha256` headers.
 */
export function presignPut(params: {
  key: string;
  contentType: string;
  size: number;
  sha256Base64: string;
}) {
  return getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: bucket,
      Key: params.key,
      ContentType: params.contentType,
      ContentLength: params.size,
      ChecksumSHA256: params.sha256Base64,
    }),
    {
      expiresIn: PRESIGN_TTL_SECONDS,
      unhoistableHeaders: new Set(["x-amz-checksum-sha256"]),
    }
  );
}

/** Presigned PUT into the public media bucket (blog images). */
export function presignPublicPut(params: { key: string; contentType: string; size: number }) {
  return getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: process.env.R2_PUBLIC_BUCKET!,
      Key: params.key,
      ContentType: params.contentType,
      ContentLength: params.size,
    }),
    { expiresIn: PRESIGN_TTL_SECONDS }
  );
}

export function presignGet(params: {
  key: string;
  fileName: string;
  contentType: string;
  disposition: "inline" | "attachment";
}) {
  const asciiName = params.fileName.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");
  return getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: bucket,
      Key: params.key,
      ResponseContentType: params.contentType,
      ResponseContentDisposition: `${params.disposition}; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(params.fileName)}`,
    }),
    { expiresIn: PRESIGN_TTL_SECONDS }
  );
}

export async function headObject(key: string) {
  try {
    return await r2.send(
      new HeadObjectCommand({ Bucket: bucket, Key: key, ChecksumMode: "ENABLED" })
    );
  } catch (error) {
    if ((error as { name?: string }).name === "NotFound") return null;
    throw error;
  }
}

export function deleteObject(key: string) {
  return r2.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
