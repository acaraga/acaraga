import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";

export default function LayoutMain() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex justify-center p-4">
        <ul className="flex gap-10 items-center">
          <li>
            <Link to="/">
              <h1 className="font-extrabold">Acaraga</h1>
            </Link>
          </li>
          <li>
            <Button asChild>
              <Link to="/">Home</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link to="/event">Event</Link>
            </Button>
          </li>

          <li>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </li>
        </ul>
      </nav>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer>
        <p>&copy; {year} Acaraga</p>
      </footer>
    </div>
  );
}
