import {
    pgTable,
    uuid,
    text,
    date,
    timestamp,
} from 'drizzle-orm/pg-core';

export const savedJobs = pgTable("saved_jobs", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    jobId: text("job_id").notNull(),
    savedAt: timestamp("saved_at").defaultNow()
})