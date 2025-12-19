import { Outlet } from "react-router";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import { ThemeProvider } from "~/components/theme-provider";

export default function LayoutMain() {
  const year = new Date().getFullYear();

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 bg-white dark:bg-slate-950 transition-colors">
          <Outlet />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
