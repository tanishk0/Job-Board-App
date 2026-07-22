import {
    pgTable,
    uuid,
    text,
    date,
    timestamp,
} from "drizzle-orm/pg-core";

export const jobPostings = pgTable("job_postings", {
    id: uuid("id").defaultRandom().primaryKey(),
    employerId: text("employer_id").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    requirements: text("requirements").notNull(),
    responsibilities: text("responsibilities").notNull(),

    salary: text("salary"),
    jobType: text("job_type"),
    experienceLevel: text("experience_level"),
    location: text("location"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
}) 