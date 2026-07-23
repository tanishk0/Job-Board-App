import { getJobs } from "./action";
import JobCard from "./JobCard";

export default async function JobsPage() {
    const jobs = await getJobs();

    return (
        <>
            <div className="h-screen w-screen bg-slate-200 p-12">
                <div>
                    <h1 className="text-2xl sm:text-3xl text-slate-900 font-bold tracking-tight">
                        Browse Jobs
                    </h1>
                    <div className="h-full w-full mt-6 cursor-pointer bg-green-400">
                    </div>
                </div>


                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </>
    );
}


