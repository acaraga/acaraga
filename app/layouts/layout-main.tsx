import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";

export default function LayoutMain() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-gray-200 shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo + Text */}
          <Link to="/" className="flex items-center gap-1">
            <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
            <span className="text-2xl font-extrabold">Acaraga</span>
          </Link>

          {/* Menu */}
          <ul className="flex gap-8 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/event" className="hover:text-blue-600">
                Event
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
          </ul>

          {/* Login/Register */}
          <div className="flex gap-3 bg-gray-200">
            <Button
              asChild
              className="bg-gray-300 text-gray-900 hover:bg-gray-300 rounded-md shadow-none border-none"
              variant="outline"
            >
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
      </nav>

      {/* Page Content */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <p>&copy; {year} Acaraga Indonesia. All rights reserved.</p>
      </footer>
    </div>
  );
}
