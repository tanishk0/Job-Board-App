import { updateJob } from "@/app/employer/jobs/actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function EditJobForm({ job }: { job: any }) {
  return (
    <form action={updateJob} className="w-full max-w-4xl mx-auto py-4">
      <input type="hidden" name="id" value={job.id} />
      <Card className="space-y-6">
        <div className="border-b border-[#F1F5F9] pb-4">
          <h1 className="text-2xl font-bold text-[#0F172A]">Edit Job Posting</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Update the listing details, requirements, or salary for {job.title}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Job Title */}
          <div className="sm:col-span-2">
            <Input
              label="Job Title"
              type="text"
              name="title"
              id="title"
              defaultValue={job.title}
              placeholder="e.g. Senior Full Stack Engineer"
              required
            />
          </div>

          {/* Location */}
          <Input
            label="Location"
            type="text"
            name="location"
            id="location"
            defaultValue={job.location ?? ""}
            placeholder="e.g. Bangalore / Remote / Hybrid"
          />

          {/* Job Type */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="jobType" className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Job Type
            </label>
            <select
              name="jobType"
              id="jobType"
              defaultValue={job.jobType ?? "full-time"}
              className="w-full h-10 px-3.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors cursor-pointer"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="experienceLevel" className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              id="experienceLevel"
              defaultValue={job.experienceLevel ?? "mid"}
              className="w-full h-10 px-3.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors cursor-pointer"
            >
              <option value="fresher">Fresher</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          {/* Salary */}
          <Input
            label="Salary Range"
            type="text"
            name="salary"
            id="salary"
            defaultValue={job.salary ?? ""}
            placeholder="e.g. ₹25–35 LPA"
          />

          {/* Description */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Job Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              defaultValue={job.description}
              placeholder="Overview of position responsibilities and team context..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors resize-y"
            ></textarea>
          </div>

          {/* Requirements */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="requirements" className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Requirements & Technical Qualifications
            </label>
            <textarea
              name="requirements"
              id="requirements"
              rows={4}
              defaultValue={job.requirements}
              placeholder="Technical stack requirements, domain experience, degree requirements..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors resize-y"
            ></textarea>
          </div>

          {/* Responsibilities */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="responsibilities" className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Key Responsibilities
            </label>
            <textarea
              name="responsibilities"
              id="responsibilities"
              rows={4}
              defaultValue={job.responsibilities}
              placeholder="Day-to-day duties and core deliverables..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors resize-y"
            ></textarea>
          </div>
        </div>

        <div className="pt-4 border-t border-[#F1F5F9] flex justify-end gap-3">
          <Link href="/employer/jobs">
            <Button type="button" variant="outline" size="md">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="md">
            Update Job Listing
          </Button>
        </div>
      </Card>
    </form>
  );
}