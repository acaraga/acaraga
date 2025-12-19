import type { Events } from "~/modules/event/type";
import type { Route } from "./+types/events";
import { MapPin } from "lucide-react";

import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Events | Acaraga" },
    {
      name: "description",
      content: "Explore sports events around you with Acaraga",
    },
  ];
}

export async function clientLoader() {
  const apiBase =
    import.meta.env.VITE_BACKEND_API_URL || "https://acaraga-api.onrender.com";
  const res = await fetch(`${apiBase}/events`);
  const events: Events = await res.json();
  return { events };
}

function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Events({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

  console.log("Data Events:", events);

  return (
    <div className="w-full">
      <section className="max-w-5xl mx-auto px-6 pt-16 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          Explore Sports Events
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
          Discover exciting competitions or fun community events around you.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search event"
            className="border rounded-lg px-4 py-2 text-sm"
          />

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
              <SelectItem value="swimming">Swimming</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jakarta">Jakarta</SelectItem>
              <SelectItem value="bandung">Bandung</SelectItem>
              <SelectItem value="lampung">Lampung</SelectItem>
            </SelectContent>
          </Select>

          <button className="bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Apply
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden border border-border/60"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-muted rounded-t-xl">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              <CardContent className="pt-4 space-y-2">
                <p className="text-xs text-muted-foreground">
                  {formatEventDate(event.dateTimeStart)}
                </p>

                <h2 className="font-bold text-lg leading-tight line-clamp-2">
                  {event.name}
                </h2>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={14} />
                  <span className="truncate">
                    {event.location
                      ? `${event.location.name}, ${event.location.city}`
                      : "—"}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <span className="font-semibold text-sm">
                  Rp {event.registrationFee.toLocaleString("id-ID")}
                </span>

                <a
                  href={`/events/${event.slug}`}
                  className="text-xs text-blue-600 border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition"
                >
                  Detail
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex justify-center mt-10 mb-24">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
}
