import { redirect } from "react-router-dom";

export async function action({ params, request }) {
  const { noteId } = params;
  const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
    method: "DELETE"
  })
  const jobId = new URL(request.url).searchParams.get("jobId");
  return redirect(`/jobs/${jobId}`);
}