import Cookies from "js-cookie";

import { useState, useEffect } from "react";
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

  const [myEvents, setMyEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/my-events`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setMyEvents(result.data);
          setTotal(result.total);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center p-6 md:p-8">
      <div className="w-full max-w-sm md:max-w-7xl">
        <DashboardForm meResponse={meResponse} />
      </div>
    </div>
  );
}
