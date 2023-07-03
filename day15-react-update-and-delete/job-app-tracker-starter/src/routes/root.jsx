import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <nav className="bg-blue-900 h-14 flex justify-items-center">
        <h2 className="flex items-center">
          <Link className="text-2xl flex items-center gap-1 px-2" to="/">
            Job Application Tracker
          </Link>
        </h2>
      </nav>

      <div className="mx-auto max-w-4xl sm:px-12 px-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
