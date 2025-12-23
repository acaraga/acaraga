import { MapPin } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { formatEventDate } from "~/lib/format";

interface Event {
  slug: string;
  name: string;
  imageUrl: string | null;
  description: string;
  location: string;
  categorySlug: string;
  dateTimeStart: string | Date;
  registrationFee: number;
}

interface EventListProps {
  data: Event[];
  limit?: number;
}

export default function EventList({ data, limit }: EventListProps) {
  if (!data || !Array.isArray(data)) return null;

  const displayedEvents = limit ? data.slice(0, limit) : data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {displayedEvents.map((event) => (
        <Card
          key={event.slug}
          className="group overflow-hidden border border-border/60 hover:shadow-md transition-all duration-300 flex flex-col"
        >
          {/* BAGIAN GAMBAR - FIX CRASH */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-400 text-xs italic">
                No Image Available
              </div>
            )}
          </div>

          <CardContent className="pt-4 space-y-2 flex-1">
            <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wider">
              {event.categorySlug}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatEventDate(event.dateTimeStart.toString())}
            </p>
            <h2 className="font-bold text-lg leading-tight line-clamp-2 min-h-[3rem]">
              {event.name}
            </h2>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center pt-2 border-t border-border/40 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">
                Entry Fee
              </span>
              <span className="text-sm font-bold text-slate-900">
                {event.registrationFee === 0
                  ? "FREE"
                  : `Rp ${event.registrationFee.toLocaleString("id-ID")}`}
              </span>
            </div>
            <Link
              to={`/events/${event.slug}`}
              className="text-xs font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Detail
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
