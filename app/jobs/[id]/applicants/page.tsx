import { redirect } from "next/navigation";

export default async function JobsApplicantsRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/employer/jobs/${id}/applicants`);
}
