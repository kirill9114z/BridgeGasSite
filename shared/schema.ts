import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const whitelistEmails = pgTable("whitelist_emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteContent = pgTable("site_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: text("section").notNull().unique(),
  content: json("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertWhitelistEmailSchema = createInsertSchema(whitelistEmails).pick({
  email: true,
});

export const insertSiteContentSchema = createInsertSchema(siteContent).pick({
  section: true,
  content: true,
});

export type InsertWhitelistEmail = z.infer<typeof insertWhitelistEmailSchema>;
export type WhitelistEmail = typeof whitelistEmails.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContent = typeof siteContent.$inferSelect;

// Content schemas for type safety
export const heroContentSchema = z.object({
  title: z.string(),
  tagline: z.string(),
});

export const aboutContentSchema = z.object({
  heading: z.string(),
  description: z.string(),
  mission: z.string(),
  values: z.string(),
});

export const solutionsContentSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  payment: z.object({
    title: z.string(),
    description: z.string(),
    benefit: z.string(),
  }),
  bridging: z.object({
    title: z.string(),
    description: z.string(),
    benefit: z.string(),
  }),
  compliance: z.object({
    title: z.string(),
    description: z.string(),
    benefit: z.string(),
  }),
});

export const teamContentSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  kirill: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
  }),
  footerNote: z.string(),
});

export type HeroContent = z.infer<typeof heroContentSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
export type SolutionsContent = z.infer<typeof solutionsContentSchema>;
export type TeamContent = z.infer<typeof teamContentSchema>;
