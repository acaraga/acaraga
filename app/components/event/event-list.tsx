import { MapPin, Ticket } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import type { Event } from "~/modules/event/type";
import { formatEventDateOnly, formatPrice } from "~/lib/format";

interface EventListProps {
  event: Event;
}

export function EventList({ event }: EventListProps) {
  const isFree = event.registrationFee === 0;

  return (
    <Card className="pt-0 group relative overflow-hidden border-0 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-card">
      <img
        src={event.imageUrl ?? "No image available"}
        alt={event.name}
        className="w-full h-full object-contain"
      />

      <CardContent className="pt-4 space-y-3">
        <p className="text-sm text-muted-foreground">
          {formatEventDateOnly(event.dateTimeStart)}
        </p>

        <h2 className="font-bold text-xl leading-snug line-clamp-2 text-foreground  transition-colors duration-200">
          {event.name}
        </h2>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin size={15} className="shrink-0 text-rose-400" />
          <span className="text-sm truncate">
            {event.location
              ? `${event.location.name}, ${event.location.city}`
              : "Location not available"}
          </span>
        </div>

        <Separator />
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center pt-0 pb-4 px-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Ticket size={15} className="text-indigo-400 shrink-0" />
          <span className="text-sm font-medium">
            {isFree ? "Free Registration" : formatPrice(event.registrationFee)}
          </span>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          <a href={`/events/${event.slug}`}>Detail</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
