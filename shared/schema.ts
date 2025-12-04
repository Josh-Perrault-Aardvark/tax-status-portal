import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tax Year Summary Types
export interface AssemblyTicket {
  tax_year: string;
  status_label?: string;
  stage_raw?: string;
  updated_iso: string;
  [key: string]: any;
}

export interface TaxYearSummary {
  taxYear: string;
  status: string;
  lastUpdatedIso: string;
}
