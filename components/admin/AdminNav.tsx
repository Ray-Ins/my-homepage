"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Events" },
  { href: "/admin/uploads", label: "Client uploads" },
  { href: "/admin/audit", label: "Audit log" },
  { href: "/admin/blog", label: "Blog" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="flex gap-1 rounded-lg bg-muted p-1 text-sm w-fit">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "rounded-md px-3 py-1.5 transition-colors",
            isActive(l.href)
              ? "bg-background font-medium shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
