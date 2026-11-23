import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { requireAdmin, authErrorResponse } from "@/lib/authz";
import { presignPublicPut } from "@/lib/r2";
import { mediaBaseUrl } from "@/lib/blog";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const bodySchema = z.object({
  type: z.string(),
  size: z.number().int().positive().max(MAX_IMAGE_SIZE),
});

export async function POST(req: Request) {
  try {
    await requireAdmin();
    if (!mediaBaseUrl || !process.env.R2_PUBLIC_BUCKET) {
      return NextResponse.json({ error: "Media storage is not configured" }, { status: 500 });
    }
    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Image must be 5MB or smaller" }, { status: 400 });
    }
    const ext = IMAGE_TYPES[parsed.data.type];
    if (!ext) {
      return NextResponse.json({ error: "Use JPG, PNG, WebP or GIF" }, { status: 400 });
    }

    const key = `blog/${new Date().getFullYear()}/${randomUUID()}.${ext}`;
    const uploadUrl = await presignPublicPut({
      key,
      contentType: parsed.data.type,
      size: parsed.data.size,
    });

    return NextResponse.json({
      uploadUrl,
      headers: { "Content-Type": parsed.data.type },
      publicUrl: `${mediaBaseUrl}/${key}`,
    });
  } catch (error) {
    const authRes = authErrorResponse(error);
    if (authRes) return authRes;
    console.error("Failed to presign blog image:", error);
    return NextResponse.json({ error: "Failed to start image upload" }, { status: 500 });
  }
}
