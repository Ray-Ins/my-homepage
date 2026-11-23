"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton, { OrDivider } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/safe-redirect";

function SignUpForm() {
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: redirectTo,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "Could not create account");
      return;
    }
    setSentTo(email);
  };

  if (sentTo) {
    return (
      <AuthCard
        title="Check your inbox"
        description={`We sent a verification link to ${sentTo}.`}
        footer={
          <Link href="/sign-in" className="text-foreground underline">
            Back to sign in
          </Link>
        }
      >
        <p className="text-sm text-muted-foreground">
          Click the link in the email to verify your address. You&apos;ll be
          signed in automatically.
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create an account"
      description="Create an account to securely upload your documents."
      footer={
        <span>
          Already have an account?{" "}
          <Link
            href={`/sign-in?redirect=${encodeURIComponent(redirectTo)}`}
            className="text-foreground underline"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <GoogleButton callbackURL={redirectTo} />
      <OrDivider />
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            minLength={10}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">At least 10 characters.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthCard>
  );
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
