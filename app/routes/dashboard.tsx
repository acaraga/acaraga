import Cookies from "js-cookie";

import type { Route } from "./+types/dashboard";
import { redirect } from "react-router";
import type { User, MeResponse } from "~/modules/user/type";
import { DashboardForm } from "~/components/form/dashboard-form";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - Acara Olahraga" }];
}

export async function clientLoader() {
  const token = Cookies.get("token");

  if (!token) return redirect("/login");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    Cookies.remove("token");
    return redirect("/login");
  }

  const meResponse: User = await response.json();
  return { meResponse };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { meResponse } = loaderData;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <DashboardForm meResponse={meResponse} />
      </div>
    </div>
  );
}
