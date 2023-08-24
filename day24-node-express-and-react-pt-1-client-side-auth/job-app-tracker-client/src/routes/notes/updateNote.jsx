export async function action({ params, request }) {
  const formData = await request.formData();
  const preparedNote = {
    ...Object.fromEntries(formData),
    timestamp: new Date(),
  };
  const response = await fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preparedNote),
  });
  return null;
}
