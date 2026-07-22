import { github } from 'better-auth';
import {
    pgTable,
    uuid,
    text,
    date,
    timestamp,
} from 'drizzle-orm/pg-core';


export const candidateProfiles = pgTable("candidate_profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().unique(),

    headline: text("headline"),
    bio: text("bio"),
    location: text("location"),
    phone: text("phone"),

    resumeUrl: text("resume_url"),
    portfolioUrl: text("portfolio_url"),
    githubUrl: text("github_url"),


    experienceLevel: text("experience_level"),
    preferredRole: text("preferred_role"),


    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})