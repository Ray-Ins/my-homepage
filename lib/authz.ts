import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth, type Session } from "@/lib/auth";

export type AuthedUser = Session["user"];

export class AuthError extends Error {
  constructor(public status: 401 | 403) {
    super(status === 401 ? "Unauthorized" : "Forbidden");
  }
}

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export function isAdmin(user: AuthedUser | undefined | null) {
  return !!user && user.role === "admin" && user.emailVerified && !user.banned;
}

export async function requireUser(): Promise<AuthedUser> {
  const session = await getSession();
  if (!session) throw new AuthError(401);
  return session.user;
}

export async function requireAdmin(): Promise<AuthedUser> {
  const user = await requireUser();
  if (!isAdmin(user)) throw new AuthError(403);
  return user;
}

/** Converts AuthError into a JSON response; rethrows anything else. */
export function authErrorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  return null;
}

export async function requestMeta() {
  const h = await headers();
  return {
    ipAddress:
      h.get("cf-connecting-ip") ??
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      h.get("x-real-ip") ??
      null,
    userAgent: h.get("user-agent"),
  };
}
