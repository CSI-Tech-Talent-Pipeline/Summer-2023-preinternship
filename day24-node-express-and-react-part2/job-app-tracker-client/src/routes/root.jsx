import { useContext } from "react";
import { Link, Outlet, useNavigation, redirect, Form } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import classNames from "classnames";
import { AuthContext } from "../contexts/AuthContext";

function Root() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    redirect("/login");
  }

  const outletClasses = classNames(
    "mx-auto max-w-4xl sm:px-12 px-4 transition-opacity",
    {
      "opacity-100": navigation.state !== "loading",
      "opacity-50": navigation.state === "loading",
    }
  );
  return (
    <div>
      <nav className="bg-blue-900 h-14 flex justify-items-center justify-between">
        <h2 className="flex items-center">
          <Link className="text-2xl flex items-center gap-1 px-2" to="/">
            <FaHome />
            Job Application Tracker
          </Link>
        </h2>
        <div className="flex items-center pr-2">
          {currentUser && (
            <Form method="post" onSubmit={handleLogout}>
              <button type="submit" className="">
                Logout
              </button>
            </Form>
          )}
        </div>
      </nav>

      <div className={outletClasses}>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
