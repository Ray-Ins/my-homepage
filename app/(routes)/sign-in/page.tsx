"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton, { OrDivider } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/safe-redirect";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNeedsVerification(false);
    const { error } = await signIn.email({
      email,
      password,
      callbackURL: redirectTo,
    });
    setLoading(false);
    if (error) {
      if (error.status === 403) {
        setNeedsVerification(true);
        return;
      }
      toast.error(error.message ?? "Invalid email or password");
      return;
    }
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <AuthCard
      title="Sign in"
      description="Sign in to upload and manage your documents."
      footer={
        <span>
          Don&apos;t have an account?{" "}
          <Link
            href={`/sign-up?redirect=${encodeURIComponent(redirectTo)}`}
            className="text-foreground underline"
          >
            Create one
          </Link>
        </span>
      }
    >
      <GoogleButton callbackURL={redirectTo} />
      <OrDivider />
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {needsVerification && (
          <p className="text-sm text-amber-700 bg-amber-50 rounded-md p-3">
            Please verify your email first. We&apos;ve sent you a new
            verification link.
          </p>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthCard>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
