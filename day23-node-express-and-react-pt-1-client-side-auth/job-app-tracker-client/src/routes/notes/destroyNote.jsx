export async function action({ params }) {
  const response = await fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: "DELETE",
  });
  return null;
}
