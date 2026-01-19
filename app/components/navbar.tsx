import Cookies from "js-cookie";

import {
  Search,
  CircleUserRoundIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "~/components/ui/dropdown-menu";
import { useId, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const id = useId();

  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userToken = Cookies.get("token");

  const isLoggedIn = userToken !== undefined;

  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoggedIn || !userToken) return;

      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Data dari backend:", result);
          if (result.data) {
            setUser(result.data);
          } else {
            setUser(result);
          }
        } else {
          console.error("Failed to fetch profile, status:", response.status);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchUserData();
  }, [isLoggedIn, userToken]);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

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

          {isLoggedIn ? (
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
              modal={false}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Open account menu"
                >
                  <CircleUserRoundIcon size={16} aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={10} className="w-35">
                <DropdownMenuLabel className="flex items-start gap-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.username || "User"}&background=random`}
                    alt="Avatar"
                    width={30}
                    height={30}
                    className="shrink-0 rounded-full"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">
                      {user?.username || "Loading..."}
                    </span>
                    <span className="truncate text-xs font-normal text-muted-foreground">
                      {user?.email || "..."}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <a href="/dashboard" className="flex items-center gap-2">
                    <LogInIcon size={16} />
                    Dashboard
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOutIcon size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3 shrink-0">
              <Button asChild variant="ghost" className="h-9 px-4">
                <Link to="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
