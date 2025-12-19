import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";

export default function Navbar() {
  return (
    <nav className="w-full bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-extrabold tracking-tight">
            Acaraga
          </span>
        </Link>

        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className="hover:text-blue-600 transition-colors"
            >
              Events
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center">
          <ModeToggle />
          <div className="h-6 w-1px bg-border mx-1 hidden sm:block" />{" "}
          <div className="flex gap-2">
            <Button asChild className="rounded-md shadow-none" variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
