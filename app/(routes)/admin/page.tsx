"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CSVLink } from "react-csv";
import type { LinkProps as CSVLinkProps } from "react-csv/components/Link";
import { Download } from "lucide-react";

type EventItem = {
  id: number;
  eventName: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
};

type UserForEvent = {
  id: number;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  registeredAt?: string | null;
};

export default function AdminPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [users, setUsers] = useState<UserForEvent[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/admin/events");
        if (!res.ok) throw new Error("Failed to load events");
        const data: EventItem[] = await res.json();
        setEvents(data);
        if (data.length > 0) {
          setSelectedEventId(String(data[0].id));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadEvents();
  }, []);

  useEffect(() => {
    const loadForEvent = async (eventId: string) => {
      setLoading(true);
      try {
        const [usersRes, countRes] = await Promise.all([
          fetch(`/api/admin/users?eventId=${eventId}`),
          fetch(`/api/admin/registrations?eventId=${eventId}`),
        ]);
        if (usersRes.ok) {
          const usersData: UserForEvent[] = await usersRes.json();
          setUsers(usersData);
        } else {
          setUsers([]);
        }
        if (countRes.ok) {
          const countData: { eventId: number; count: number } =
            await countRes.json();
          setCount(countData.count ?? 0);
        } else {
          setCount(0);
        }
      } catch (e) {
        console.error(e);
        setUsers([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    if (selectedEventId) {
      loadForEvent(selectedEventId);
    }
  }, [selectedEventId]);

  const selectedEvent = useMemo(
    () => events.find((e) => String(e.id) === selectedEventId),
    [events, selectedEventId]
  );

  // Ensure client-only elements (like data: href) render after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Deterministic date formatter to avoid SSR/client locale or timezone mismatches
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-AU", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Australia/Sydney",
      }),
    []
  );

  const csvHeaders: CSVLinkProps["headers"] = useMemo(
    () => [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "Organisation", key: "organisation" },
      { label: "Registered At", key: "registeredAt" },
    ],
    []
  );

  const csvData = useMemo(
    () =>
      users.map((u) => ({
        name: u.name,
        email: u.email,
        phone: u.phone,
        organisation: u.organisation,
        registeredAt: u.registeredAt
          ? new Date(u.registeredAt).toISOString()
          : "",
      })),
    [users]
  );

  const csvFilename = useMemo(() => {
    if (!selectedEvent) return "registrations.csv";
    const sanitize = (s: string) =>
      s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "");
    return `${sanitize(selectedEvent.eventName)}-${selectedEvent.date}.csv`;
  }, [selectedEvent]);

  return (
    <div className="container mx-auto max-w-5xl py-10 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <p className="text-sm text-muted-foreground">
            Manage event registrations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-72">
            <Select value={selectedEventId} onValueChange={setSelectedEventId}>
              <SelectTrigger className="w-72">
                {selectedEvent ? (
                  <div className="flex w-full items-center gap-1 min-w-0">
                    <span className="truncate">{selectedEvent.eventName}</span>
                    <span className="shrink-0 text-muted-foreground">
                      ({selectedEvent.date})
                    </span>
                  </div>
                ) : (
                  <SelectValue placeholder="Select event" />
                )}
              </SelectTrigger>
              <SelectContent>
                {events.map((ev) => (
                  <SelectItem key={ev.id} value={String(ev.id)}>
                    {ev.eventName} ({ev.date})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isMounted && (
            <Button
              asChild
              variant="outline"
              disabled={loading || users.length === 0 || !selectedEvent}
            >
              <CSVLink
                data={csvData}
                headers={csvHeaders}
                filename={csvFilename}
              >
                <Download className="inline-block" />
                <span className="sr-only md:not-sr-only md:ml-1">
                  Download CSV
                </span>
              </CSVLink>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{count}</div>
            {selectedEvent && (
              <p className="text-sm text-muted-foreground mt-1">
                For {selectedEvent.eventName}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Phone</TableHead>
                  <TableHead className="text-xs">Organisation</TableHead>
                  <TableHead className="text-xs">Registered At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No users yet
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((u) => (
                    <TableRow key={`${u.id}`}>
                      <TableCell className="whitespace-nowrap text-xs">
                        {u.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {u.email}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {u.phone}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {u.organisation}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        {u.registeredAt
                          ? dateFormatter.format(new Date(u.registeredAt))
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
