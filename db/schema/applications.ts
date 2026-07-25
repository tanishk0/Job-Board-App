import {
    pgTable,
    uuid,
    text,
    date,
    timestamp,
    
} from "drizzle-orm/pg-core"


export const applications = pgTable("applications", {
    id: uuid("id").defaultRandom().primaryKey(),
    jobId: text("job_id").notNull(),
    candidateId: text("candidate_id").notNull(),

    coverLetter: text("cover_letter"),
    resumeUrl: text("resume_url"),
    status: text("status").notNull().default("pending"), 

    appliedAt: timestamp("applied_at").defaultNow(),

})