"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminNav from "@/components/admin/AdminNav";
import UserMenu from "@/components/auth/UserMenu";
import { jsonOrThrow } from "@/components/uploads/client-upload";

type AuditLog = {
  id: number;
  action: string;
  submissionId: string | null;
  fileName: string | null;
  actorEmail: string;
  actorRole: string;
  ipAddress: string | null;
  createdAt: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "medium",
  timeStyle: "medium",
  timeZone: "Australia/Sydney",
});

function AuditLogView() {
  const submissionId = useSearchParams().get("submissionId");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ logs: AuditLog[]; total: number; pageSize: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page) });
    if (submissionId) params.set("submissionId", submissionId);
    setLoading(true);
    fetch(`/api/admin/audit-logs?${params}`)
      .then((res) => jsonOrThrow<NonNullable<typeof data>>(res))
      .then(setData)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [page, submissionId]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="container mx-auto max-w-6xl py-10 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
          <UserMenu />
        </div>
        <AdminNav />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Audit log {data && `(${data.total})`}
            {submissionId && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                for submission <span className="font-mono">{submissionId}</span> ·{" "}
                <Link href="/admin/audit" className="underline">
                  show all
                </Link>
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Time</TableHead>
                  <TableHead className="text-xs">Action</TableHead>
                  <TableHead className="text-xs">Actor</TableHead>
                  <TableHead className="text-xs">File</TableHead>
                  <TableHead className="text-xs">Submission</TableHead>
                  <TableHead className="text-xs">IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : !data || data.logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No activity
                    </TableCell>
                  </TableRow>
                ) : (
                  data.logs.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="whitespace-nowrap text-xs">
                        {dateFormatter.format(new Date(l.createdAt))}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{l.action}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {l.actorEmail}
                        {l.actorRole === "admin" && (
                          <Badge variant="secondary" className="ml-2">
                            admin
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-56 truncate text-xs">{l.fileName ?? "-"}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {l.submissionId ? l.submissionId.slice(0, 8) : "-"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">{l.ipAddress ?? "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-sm">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminAuditPage() {
  return (
    <Suspense>
      <AuditLogView />
    </Suspense>
  );
}
