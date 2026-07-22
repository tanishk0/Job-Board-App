import { getEmployerJobs } from "./actions";
import Link from "next/link";

export default async function Jobs() {
    const jobs = await getEmployerJobs();

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Your Job Postings</h1>
                <Link
                    href="/employer/jobs/new"
                    className="inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium shadow-sm transition-colors"
                >
                    Post New Job
                </Link>
            </div>

            <div className="space-y-4">
                {jobs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-600">You haven't posted any jobs yet.</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white border border-slate-200 rounded-md shadow-sm p-5 hover:border-orange-300 hover:shadow-md transition-all"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>
                                    <p className="text-sm text-slate-600">{job.location}</p>
                                </div>
                                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                                    {job.jobType}
                                </span>
                            </div>

                            <p className="text-sm text-slate-600 mb-3 line-clamp-2">{job.description}</p>

                            <div className="flex items-center gap-3 text-sm text-slate-700 mb-3">
                                <span>• {job.experienceLevel?.toUpperCase()}</span>
                                <span>• {job.salary}</span>
                            </div>

                            <div className="flex justify-end">
                                <Link
                                    href={`/employer/jobs/${job.id}/edit`}
                                    className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                                >
                                    Edit Job
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}