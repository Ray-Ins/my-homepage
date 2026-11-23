import {
  integer,
  pgTable,
  varchar,
  boolean,
  date,
  serial,
  timestamp,
  primaryKey,
  text,
  uniqueIndex,
  index,
  pgEnum,
  uuid,
  bigint,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    phone: varchar({ length: 255 }).notNull(),
    organisation: varchar({ length: 255 }).notNull(),
  },
  (table) => {
    return {
      // Enforce case-insensitive uniqueness for emails
      emailLowerUnique: uniqueIndex("users_email_lower_unique").on(
        sql`lower(${table.email})`
      ),
    };
  }
);

export const adminTable = pgTable("admins", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const eventTable = pgTable("events", {
  id: serial("id").primaryKey(),
  eventName: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  date: date().notNull(),
  startTime: varchar({ length: 255 }).notNull(),
  endTime: varchar({ length: 255 }).notNull(),
  zoomLink: varchar({ length: 255 }).notNull(),
  organizerEmail: varchar({ length: 255 }).notNull(),
  available: boolean().notNull(),
});

// Many-to-many relationship table between users and events
export const registrationStatusEnum = pgEnum("registration_status", [
  "registered",
  "closed",
]);

export const userEventTable = pgTable(
  "user_events",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    eventId: integer("event_id")
      .notNull()
      .references(() => eventTable.id),
    registeredAt: timestamp("registered_at").defaultNow().notNull(),
    status: registrationStatusEnum("status").default("registered").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.eventId] }),
    };
  }
);

// Contact form messages table
export const contactMessagesTable = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }),
  organisation: varchar({ length: 255 }),
  message: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isRead: boolean("is_read").default(false).notNull(),
});

// ---------------------------------------------------------------------------
// Better Auth tables. JS keys must match Better Auth field names; Postgres
// tables are prefixed with auth_ to keep them apart from event `users`.
// ---------------------------------------------------------------------------

export const authUser = pgTable("auth_user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const authSession = pgTable(
  "auth_session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => authUser.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("auth_session_user_id_idx").on(table.userId)]
);

export const authAccount = pgTable(
  "auth_account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => authUser.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [index("auth_account_user_id_idx").on(table.userId)]
);

export const authVerification = pgTable(
  "auth_verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("auth_verification_identifier_idx").on(table.identifier)]
);

// ---------------------------------------------------------------------------
// Client document submissions (files stored in Cloudflare R2)
// ---------------------------------------------------------------------------

export const submissionStatusEnum = pgEnum("submission_status", [
  "draft",
  "submitted",
]);

export const submissionFileStatusEnum = pgEnum("submission_file_status", [
  "pending",
  "uploaded",
]);

export const submissionsTable = pgTable(
  "submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => authUser.id),
    userEmail: text("user_email").notNull(),
    userName: text("user_name").notNull(),
    status: submissionStatusEnum("status").default("draft").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    submittedAt: timestamp("submitted_at"),
  },
  (table) => [
    index("submissions_user_id_idx").on(table.userId),
    // At most one open draft per user
    uniqueIndex("submissions_one_draft_per_user")
      .on(table.userId)
      .where(sql`${table.status} = 'draft'`),
  ]
);

export const submissionFilesTable = pgTable(
  "submission_files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    submissionId: uuid("submission_id")
      .notNull()
      .references(() => submissionsTable.id),
    r2Key: text("r2_key").notNull().unique(),
    originalName: text("original_name").notNull(),
    contentType: text("content_type").notNull(),
    size: bigint("size", { mode: "number" }).notNull(),
    sha256: text("sha256").notNull(),
    status: submissionFileStatusEnum("status").default("pending").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    uploadedAt: timestamp("uploaded_at"),
  },
  (table) => [index("submission_files_submission_id_idx").on(table.submissionId)]
);

export const fileAuditActionEnum = pgEnum("file_audit_action", [
  "upload",
  "remove_draft",
  "submit",
  "preview",
  "download",
]);

// Append-only: no API updates or deletes rows in this table.
export const fileAuditLogsTable = pgTable(
  "file_audit_logs",
  {
    id: serial("id").primaryKey(),
    action: fileAuditActionEnum("action").notNull(),
    submissionId: uuid("submission_id"),
    fileId: uuid("file_id"),
    fileName: text("file_name"),
    actorUserId: text("actor_user_id").notNull(),
    actorEmail: text("actor_email").notNull(),
    actorRole: text("actor_role").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("file_audit_logs_submission_id_idx").on(table.submissionId),
    index("file_audit_logs_created_at_idx").on(table.createdAt),
  ]
);

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);

export const postsTable = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    coverImageUrl: text("cover_image_url"),
    // Tiptap document, used to reload the editor
    contentJson: jsonb("content_json").notNull(),
    // Sanitized HTML rendered from contentJson, served to visitors
    contentHtml: text("content_html").notNull(),
    status: postStatusEnum("status").default("draft").notNull(),
    publishedAt: timestamp("published_at"),
    authorId: text("author_id")
      .notNull()
      .references(() => authUser.id),
    authorName: text("author_name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("posts_status_published_at_idx").on(table.status, table.publishedAt)]
);
