export async function action({ params }) {
  const response = await fetch(`/api/notes/${params.noteId}`, {
    method: "DELETE",
  });
  return null;
}
