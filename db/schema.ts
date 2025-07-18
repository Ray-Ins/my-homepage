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
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }).notNull(),
  organisation: varchar({ length: 255 }).notNull(),
});

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
