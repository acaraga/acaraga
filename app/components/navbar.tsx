import { Link } from "react-router";
import { Search } from "lucide-react";

import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";
import { Input } from "~/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <div className="relative w-260px">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <ModeToggle />

          <div className="hidden sm:block h-6 w-px bg-border" />

          <Button asChild variant="ghost" className="h-9 px-4">
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
