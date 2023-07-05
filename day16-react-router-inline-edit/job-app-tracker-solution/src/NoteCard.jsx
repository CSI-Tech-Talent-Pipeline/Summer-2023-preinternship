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
