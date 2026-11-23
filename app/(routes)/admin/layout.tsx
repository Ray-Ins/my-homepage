import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/authz";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/admin");
  if (!isAdmin(session.user)) redirect("/portal");
  return <>{children}</>;
}
