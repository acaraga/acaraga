import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { formatEventDateOnly } from "~/lib/format";
import { MapPin, CalendarDays, Users } from "lucide-react";
import { Link } from "react-router";

interface MyEventsLists {
  events: any[];
}

export function MyEventsLists({ events }: MyEventsLists) {
  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Events</h2>
        </div>
      </div>

      {events.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <CalendarDays className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No events yet</h3>
            <p className="text-muted-foreground text-sm mb-6 text-center max-w-sm">
              You haven't joined any events yet. Explore upcoming events and
              start networking!
            </p>
            <Link
              to="/events"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse Events
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((item) => (
            <Link
              key={item.id}
              to={`/events/${item.event.slug}`}
              className="group"
            >
              <Card className="overflow-hidden border border-border/60  hover:shadow-lg transition-all duration-300 h-full p-0">
                <div className="relative w-full h-48 overflow-hidden bg-linear-to-br from-primary/5 to-primary/10">
                  <img
                    src={item.event.imageUrl}
                    alt={item.event.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <CardHeader className="p-4 space-y-3">
                  <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {item.event.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">
                        {formatEventDateOnly(item.event.dateTimeStart)}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">
                        {item.event.location?.city || "Online Event"}
                      </span>
                    </div>

                    {item.event.participantsCount && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 shrink-0" />
                        <span>{item.event.participantsCount} participants</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      Joined {formatEventDateOnly(item.joinedAt)}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
