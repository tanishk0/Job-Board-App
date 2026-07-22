import { getEmployerJobById } from "@/app/employer/jobs/actions";
import EditJobForm from "./EditJobForm";
import { notFound } from "next/navigation";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: PageProps) {
    const { id } = await params;
    const job = await getEmployerJobById(id);

    if (!job) {
        notFound();
    }

    return <EditJobForm job={job} />;
}
