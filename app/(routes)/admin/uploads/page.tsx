"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import FileList, { type FileItem } from "@/components/uploads/FileList";
import { jsonOrThrow } from "@/components/uploads/client-upload";
import { formatBytes } from "@/lib/upload-rules";

type AdminSubmission = {
  id: string;
  userEmail: string;
  userName: string;
  note: string | null;
  submittedAt: string;
  files: FileItem[];
};

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Australia/Sydney",
});

export default function AdminUploadsPage() {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{
    submissions: AdminSubmission[];
    total: number;
    pageSize: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page) });
    if (appliedQuery) params.set("q", appliedQuery);
    setLoading(true);
    fetch(`/api/admin/submissions?${params}`)
      .then((res) => jsonOrThrow<NonNullable<typeof data>>(res))
      .then(setData)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [page, appliedQuery]);

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return (
    <div className="container mx-auto max-w-5xl py-10 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
            <UserMenu />
          </div>
          <AdminNav />
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setAppliedQuery(query.trim());
          }}
        >
          <Input
            placeholder="Search name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64"
          />
          <Button type="submit" variant="outline" size="icon">
            <Search className="size-4" />
          </Button>
        </form>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submitted documents {data && `(${data.total})`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8" />
                  <TableHead className="text-xs">Client</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Files</TableHead>
                  <TableHead className="text-xs">Total size</TableHead>
                  <TableHead className="text-xs">Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : !data || data.submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No submissions
                    </TableCell>
                  </TableRow>
                ) : (
                  data.submissions.map((s) => {
                    const open = expanded === s.id;
                    return [
                      <TableRow
                        key={s.id}
                        className="cursor-pointer"
                        onClick={() => setExpanded(open ? null : s.id)}
                      >
                        <TableCell>
                          {open ? (
                            <ChevronDown className="size-4" />
                          ) : (
                            <ChevronRight className="size-4" />
                          )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-xs">{s.userName}</TableCell>
                        <TableCell className="whitespace-nowrap text-xs">{s.userEmail}</TableCell>
                        <TableCell className="text-xs">{s.files.length}</TableCell>
                        <TableCell className="whitespace-nowrap text-xs">
                          {formatBytes(s.files.reduce((sum, f) => sum + f.size, 0))}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-xs">
                          {dateFormatter.format(new Date(s.submittedAt))}
                        </TableCell>
                      </TableRow>,
                      open && (
                        <TableRow key={`${s.id}-files`} className="hover:bg-transparent">
                          <TableCell colSpan={6} className="bg-muted/30 space-y-3 whitespace-normal">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                              <span className="font-mono">Ref: {s.id}</span>
                              <Link
                                href={`/admin/audit?submissionId=${s.id}`}
                                className="underline"
                              >
                                View audit trail
                              </Link>
                            </div>
                            {s.note && (
                              <p className="text-sm whitespace-pre-wrap">
                                <span className="font-medium">Note: </span>
                                {s.note}
                              </p>
                            )}
                            <FileList files={s.files} urlBase="/api/admin/files" showHash />
                          </TableCell>
                        </TableRow>
                      ),
                    ];
                  })
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
