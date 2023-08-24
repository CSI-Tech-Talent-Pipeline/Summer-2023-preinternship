import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./ErrorPage";
import JobList, { loader as jobLoader } from "./routes/jobs/JobList";
import Job, {
  loader as jobDetailLoader,
  action as notesAction,
} from "./routes/jobs/job";
import AddJob, { action as addJobAction } from "./routes/jobs/AddJob";
import EditJob, {
  loader as editJobLoader,
  action as editJobAction,
} from "./routes/jobs/editJob";
import { action as destroyNoteAction } from "./routes/notes/destroyNote";
import { action as updateNoteAction } from "./routes/notes/updateNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <JobList />,
        loader: jobLoader,
      },
      {
        path: "jobs/new",
        element: <AddJob />,
        action: addJobAction,
      },
      {
        path: "jobs/byStatus/:status",
        element: <JobList />,
        loader: jobLoader,
      },
      {
        path: "jobs/:jobId",
        element: <Job />,
        errorElement: <ErrorPage />,
        loader: jobDetailLoader,
        action: notesAction,
      },
      {
        path: "jobs/:jobId/edit",
        element: <EditJob />,
        errorElement: <ErrorPage />,
        loader: editJobLoader,
        action: editJobAction,
      },
      {
        path: "notes/:noteId/destroy",
        action: destroyNoteAction,
      },
      {
        path: "notes/:noteId/edit",
        action: updateNoteAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
