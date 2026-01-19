import Cookies from "js-cookie";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { User } from "~/modules/user/type";
import { formatEventDateOnly } from "~/lib/format";
import { useEffect, useState } from "react";

interface MyEventsListsProps {
  meResponse: User;
}

export function MyEventsLists({
  className,
  meResponse,
}: React.ComponentProps<"div"> & MyEventsListsProps) {
  const [myEvents, setMyEvents] = useState<{ total: number; data: any[] }>({
    total: 0,
    data: [],
  });

  useEffect(() => {
    const fetchMyEvents = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/my-events`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setMyEvents(result);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Events ({myEvents.total})</h2>
      </div>

      {myEvents.data.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          You haven't joined any events yet.
        </Card>
      ) : (
        <div className="flex flex-col gap-1">
          {myEvents.data.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">
                  {item.event.name}
                  <p className="text-sm text-muted-foreground mb-2">
                    📍 {item.event.location} Joined:{" "}
                    {formatEventDateOnly(item.joinedAt)}
                  </p>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
