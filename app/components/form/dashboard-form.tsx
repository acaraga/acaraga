import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Card } from "~/components/ui/card";
import { MyEventsLists } from "./my-events-lists";
import type { User } from "~/modules/user/type";

export function DashboardForm({ meResponse }: { meResponse: User }) {
  const [eventsData, setEventsData] = useState<{ total: number; data: any[] }>({
    total: 0,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/my-events`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          const result = await response.json();
          setEventsData(result);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 rounded-xl border border-border bg-background">
          <div className="flex h-full flex-col justify-center px-6 py-5 gap-0.5">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {meResponse.fullName}
            </h1>

            <p className="text-lg text-muted-foreground">
              {meResponse.username}
            </p>

            <p className="text-sm text-muted-foreground/70">
              {meResponse.email}
            </p>
          </div>
        </Card>

        <Card className="rounded-xl border-none bg-[#0F172A]">
          <div className="flex h-full items-center justify-between px-6 py-5">
            <div className="flex flex-col">
              <span className="text-lg uppercase tracking-wider text-white/50">
                Event Journey
              </span>
              <span className="text-lg text-white/80">You have finished</span>
            </div>

            {isLoading ? (
              <div className="h-18 w-18 animate-pulse" />
            ) : (
              <span className="text-7xl font-bold text-lime-400">
                {eventsData.total}
              </span>
            )}
          </div>
        </Card>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-muted-foreground">
          Loading your events...
        </div>
      ) : (
        <MyEventsLists events={eventsData.data} />
      )}
    </div>
  );
}
