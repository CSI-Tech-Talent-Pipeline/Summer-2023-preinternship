import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./ErrorPage";
import Job, {
  loader as jobDetailLoader,
  action as notesAction
} from "./routes/job";
import JobList, { loader as jobLoader } from "./JobList";
import AddJobForm, { action as addJobAction } from "./AddJobForm.jsx";
import EditJob, {
  loader as editJobLoader,
  action as editJobAction
} from "./routes/editJob";
import { action as destroyNoteAction } from "./routes/destroyNote";

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
        element: <AddJobForm />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


