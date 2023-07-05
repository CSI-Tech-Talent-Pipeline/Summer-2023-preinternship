import { redirect } from "react-router-dom";

export async function action({ params, request }) {
  const response = await fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: "DELETE",
  });
  const jobId = new URL(request.url).searchParams.get("jobId");
  return redirect(`/jobs/${jobId}`);
}
