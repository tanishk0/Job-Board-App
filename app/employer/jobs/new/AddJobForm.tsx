import { createJob } from "../actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function AddJobForm() {
  return (
    <form action={createJob} className="w-full max-w-4xl mx-auto py-4">
      <Card className="space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-[#0E103D]">Post a New Job</h1>
          <p className="text-xs text-[#313638]/70 mt-1">
            Fill in position details to publish a new job opening on Talentry.
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
              placeholder="e.g. Senior Frontend Developer"
              required
            />
          </div>

          {/* Location */}
          <Input
            label="Location"
            type="text"
            name="location"
            id="location"
            placeholder="e.g. San Francisco, CA / Remote"
          />

          {/* Job Type */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="jobType" className="block text-sm font-medium text-[#0E103D]">
              Job Type
            </label>
            <select
              name="jobType"
              id="jobType"
              defaultValue="full-time"
              className="w-full px-3.5 py-2 text-sm text-[#313638] bg-white border border-slate-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors cursor-pointer"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-[#0E103D]">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              id="experienceLevel"
              defaultValue="mid"
              className="w-full px-3.5 py-2 text-sm text-[#313638] bg-white border border-slate-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors cursor-pointer"
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
            placeholder="e.g. ₹12–18 LPA or $120,000 - $150,000"
          />

          {/* Description */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="description" className="block text-sm font-medium text-[#0E103D]">
              Job Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              placeholder="Provide a comprehensive summary of the job role..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-[#313638] focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors resize-y"
            ></textarea>
          </div>

          {/* Requirements */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="requirements" className="block text-sm font-medium text-[#0E103D]">
              Requirements & Technical Qualifications
            </label>
            <textarea
              name="requirements"
              id="requirements"
              rows={4}
              placeholder="List required skills, technologies, and years of experience..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-[#313638] focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors resize-y"
            ></textarea>
          </div>

          {/* Responsibilities */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="responsibilities" className="block text-sm font-medium text-[#0E103D]">
              Key Responsibilities
            </label>
            <textarea
              name="responsibilities"
              id="responsibilities"
              rows={4}
              placeholder="Detail day-to-day responsibilities and team expectations..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-[#313638] focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors resize-y"
            ></textarea>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Publish Job Listing
          </Button>
        </div>
      </Card>
    </form>
  );
}