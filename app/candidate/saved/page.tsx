import { redirect } from "next/navigation";

export default function CandidateSavedRedirect() {
  redirect("/candidate/saved-jobs");
}
