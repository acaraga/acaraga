import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import type { Event } from "~/modules/event/type";
import { formatEventDateOnly, formatPrice } from "~/lib/format";

interface EventListProps {
  event: Event;
}

export function EventList({ event }: EventListProps) {
  return (
    <Card className="pt-0 overflow-hidden border border-border/60 hover:shadow-sm transition-shadow">
      <img
        src={event.imageUrl ?? "No image available"}
        alt={event.name}
        className="w-full h-full object-contain"
      />

      <CardContent className="pt-4 space-y-2">
        <p className="text-xs text-muted-foreground">
          {formatEventDateOnly(event.dateTimeStart)}
        </p>

        <h2 className="font-bold text-lg leading-tight line-clamp-2">
          {event.name}
        </h2>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span className="truncate">
            {event.location
              ? `${event.location.name}, ${event.location.city}`
              : "-"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-2">
        <span className="text-sm font-semibold">
          {formatPrice(event.registrationFee)}
        </span>

        <a
          href={`/events/${event.slug}`}
          className="text-xs text-blue-600 border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          Detail
        </a>
      </CardFooter>
    </Card>
  );
}
