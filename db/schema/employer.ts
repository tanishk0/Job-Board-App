import {
    pgTable,
    uuid,
    text,
    date,
    timestamp,
} from 'drizzle-orm/pg-core';

export const employerProfiles = pgTable("employer_profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().unique(),
    companyName: text("company_name").notNull(),
    companyDescription: text("company_description"),
    companyLogoUrl: text("company_logo_url"),
    
    website: text("website"),
    location: text("location"),
    contactEmail: text("contact_email"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})