import { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const emails = user.emailAddresses.map((e) => e.emailAddress.toLowerCase());
  const isAllowed =
    allowed.length === 0 || emails.some((e) => allowed.includes(e));
  if (!isAllowed) redirect("/");
  return <>{children}</>;
}
