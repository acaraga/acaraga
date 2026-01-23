import Cookies from "js-cookie";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { User } from "~/modules/user/type";
import { formatEventDateOnly } from "~/lib/format";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

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
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {myEvents.data.map((item) => (
            <Card
              key={item.id}
              className="pt-0 overflow-hidden border border-border/60 hover:shadow-sm transition-shadow"
            >
              <img
                src={item.event.imageUrl ?? "No image available"}
                alt={item.event.name}
                className="w-full h-full object-contain"
              />
              <CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    <strong>Event Start :</strong>{" "}
                    {formatEventDateOnly(item.event.dateTimeStart)}
                  </p>

                  <a
                    href={`/events/${item.event.slug}`}
                    className="font-bold text-lg leading-tight line-clamp-2 transition-colors hover:text-blue-600"
                  >
                    {item.event.name}
                  </a>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    <span className="truncate">
                      {item.event.location
                        ? `${item.event.location.name}, ${item.event.location.city}`
                        : "-"}
                    </span>
                  </div>
                </CardContent>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex flex-col border-t pt-2 mt-1 gap-1">
                    <p className="text-xs text-muted-foreground italic">
                      Joined on : {formatEventDateOnly(item.joinedAt)}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
