# Incorporating Inline Editing

- Add a new Component to render the `NoteCard`
- Refactor the job component to render a collection of `NoteCards`
- add a route for editing to `main.jsx`
- add an action (in another file called `updateNote.jsx`) to handle the inline edit form submission.

## Add a `NoteCard` component to render notes

```jsx
// src/NoteCard.jsx
import { useFetcher } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { formatTime } from "./utils";

function NoteCard({ note }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const fetcher = useFetcher();

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing])

  const renderNote = () => {
    if (isEditing) {
      return (
        <fetcher.Form
          method="post"
          action={`/notes/${note.id}/edit`}
          onSubmit={(e) => setIsEditing(false)}
        >
          <input
            name="content"
            className="w-full"
            ref={inputRef}
            defaultValue={note.content}
          />
        </fetcher.Form>
      )
    } else {
      return note.content;
    }
  }
  return (
    <div
      key={note.id}
      className="relative p-4 pb-10 bg-slate-700 text-slate-50 rounded-md my-2"
    >
      {renderNote()}
      <div className="absolute bottom-0 left-0 w-full pb-2 px-4 flex justify-between">
        <i className="text-slate-300">{formatTime(note.timestamp)}</i>
        <span className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsEditing(true)
            }  
          }><FaPen className="relative -top-0.5" /></button>
          <fetcher.Form
            method="post"
            action={`/notes/${note.id}/destroy`}
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button>
              <FaTrash />
            </button>
          </fetcher.Form>
        </span>
      </div>
    </div>
  );
}

export default NoteCard;
```

## Refactor the Job route to render `NoteCard`s

```jsx
import {
  Form,
  useLoaderData,
  Link
} from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";
import { statusTextById, formatTime } from "../utils";
import NoteCard from "../NoteCard";

export async function loader({ params }) {
  const jobResponse = await fetch(`http://localhost:3000/jobs/${params.jobId}`);
  const job = await jobResponse.json();
  const notesResponse = await fetch(
    `http://localhost:3000/notes?jobId=${params.jobId}`
  );
  const notes = await notesResponse.json();
  return { job, notes };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const preparedNote = {
    ...Object.fromEntries(formData),
    timestamp: new Date(),
    jobId: parseInt(params.jobId),
  };
  const response = await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preparedNote),
  });
  return null;
}

function Job() {
  const { job, notes, } = useLoaderData();
  const {
    id,
    company,
    title,
    minSalary,
    maxSalary,
    location,
    postDate,
    applicationDate,
    lastContactDate,
    companyContact,
    status,
  } = job;

  const renderedNotes = notes.map((note) => <NoteCard note={note} />);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link to="/">{"<"} Back</Link>
      <h1>{title}</h1>
      <p>
        <i>{company}</i>
      </p>
      <p>{location}</p>
      <p>{`$${minSalary} - $${maxSalary}`}</p>
      <p>Job posted on: {postDate}</p>
      <div className="flex my-2">
        <Link
          to={`/jobs/${id}/edit`}
          className="flex items-center gap-2 bg-blue-400 p-2 rounded-sm"
        >
          <FaPencilAlt /> Edit
        </Link>
      </div>
      <div className="overflow-auto">
        <table className="mt-4 stripe hover table-auto border-slate-700 text-center overflow-scroll w-full">
          <thead>
            <tr className="overflow-x-scroll border">
              <th className="p-4">Current Status</th>
              <th className="p-4">Application Date</th>
              <th className="p-4">Last Contact Date</th>
              <th className="p-4">Company Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr className="overflow-x-scroll border">
              <td className="p-4">{statusTextById[status]}</td>
              <td className="p-4">{applicationDate || "N/A"}</td>
              <td className="p-4">{lastContactDate || "N/A"}</td>
              <td className="p-4">{companyContact || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 className="text-xl my-2">Notes</h2>
      <Form
        className="my-4 flex gap-2"
        method="post"
      >
        <input
          placeholder="add a note..."
          className="flex-1 p-2"
          name="content"
        />
        <button className="bg-blue-500 px-3 text-2xl rounded-sm" type="submit">
          <RiSave3Fill />
        </button>
      </Form>
      <div>{renderedNotes}</div>
    </div>
  );
}

export default Job;
```

## Add a route to handle editing

```jsx
// src/main.jsx
// ...
import { action as updateNoteAction}
{
  path: "notes/:noteId/edit",
  action: updateNoteAction,
},
```

## Add an action to run when the route is matched

```jsx
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
```