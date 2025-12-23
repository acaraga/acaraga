import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function Navbar() {
  return (
    <nav className="w-full bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-extrabold tracking-tight">
            Acaraga
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <ul className="flex h-9 items-center gap-8 font-medium">
            <li>
              <Link
                to="/"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                About
              </Link>
            </li>
          </ul>

          <div className="relative w-260px">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="h-9 pl-9 focus-visible:ring-1 focus-visible:ring-blue-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <ModeToggle />

          <div className="hidden sm:block h-6 w-px bg-border" />

          <Button asChild variant="ghost" className="h-9 px-4">
            <Link to="/login">Login</Link>
          </Button>

          <Button
            asChild
            className="h-9 bg-blue-600 px-4 text-white hover:bg-blue-700"
          >
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
