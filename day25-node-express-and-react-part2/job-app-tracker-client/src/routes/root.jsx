import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigation, useLoaderData, Form } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import classNames from "classnames";
import { AuthContext } from "../contexts/AuthContext";

export async function loader({ request }) {
  const response = await fetch("/api/auth/current_user");
  if (response.ok) {
    const { user } = await response.json();
    return { currentUser: user };
  }
  return { currentUser: null };
}

export async function action({ request }) {
  const response = await fetch("/api/auth/logout", {
    method: "DELETE"
  });
  return null;
}

function Root() {
  const { currentUser } = useLoaderData();
  const { setCurrentUser } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);

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
          <Form method="post">
            <button type="submit" className="">
              Logout
            </button>
          </Form>
        </div>
      </nav>

      <div className={outletClasses}>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
