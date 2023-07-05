import { NavLink, Link, Outlet } from "react-router-dom";

const statuses = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};

const statusMapToId = {
  "Bookmarked": 1,
  "Applying": 2,
  "Applied": 3,
  "Interviewing": 4,
  "Negotiating": 5,
  "Accepted": 6,
};

function Root() {
  const statusLinks = Object.keys(statuses).map((statusId) => {
    const buttonClass = "px-4 py-2 border";
    return (
      <NavLink
        to={`/jobs/byStatus/${statuses[statusId]}`}
        key={statusId}
        className={({ isActive }) =>
          isActive ? `bg-blue-500 ${buttonClass}` : buttonClass
        }
      >
        {statuses[statusId]}
      </NavLink>
    );
  });

  return (
    <div className="mx-auto max-w-4xl sm:px-12 px-4">
      <h1>
        <Link to="/">Job Application Tracker</Link>
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-6 my-4">{statusLinks}</div>
      <div className="flex justify-between">
        <div></div>
        <div>
          <Link
            to="/jobs/new"
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 hover:text-white transition"
          >
            + Add Job
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Root;
