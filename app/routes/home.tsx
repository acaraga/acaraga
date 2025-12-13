import type { Events } from "~/modules/event/type";
import type { Route } from "./+types/home";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Acaraga" },
    { name: "description", content: "Welcome to Acaraga !" },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/events`
  );
  const events: Events = await response.json();
  return { events };
}

function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

  return (
    <div className="w-full">
      <section className="max-w-5xl mx-auto px-6 pt-16 flex flex-col md:flex-row items-center gap-10">
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">
            Your Sport Experience <br /> Starts Here.
          </h2>
        </div>

        <div className="flex justify-center md:justify-end flex-1">
          <img
            src="/assets/hero.svg"
            alt="Hero Image"
            className="w-[360px] md:w-[480px] h-auto"
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-20 text-center">
        <h3 className="text-xl font-semibold mb-8">Choose Your Sport</h3>

        <div className="flex justify-center gap-6">
          {[
            { name: "Running", icon: "🏃" },
            { name: "Cycling", icon: "🚴" },
            { name: "Swimming", icon: "🏊" },
          ].map((sport) => (
            <div
              key={sport.name}
              className="w-24 h-24 border border-border/60 rounded-xl flex flex-col items-center justify-center gap-2 bg-background hover:bg-muted transition-colors"
            >
              <span className="text-2xl">{sport.icon}</span>
              <span className="text-sm font-medium">{sport.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-24 mb-24">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-semibold">Most Popular Events</h3>
          <a
            href="/events"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            See All <ArrowRight size={14} />
          </a>
        </div>

        {/* Component: Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <Card
              key={event.id}
              className="pt-0 overflow-hidden border border-border/60 hover:shadow-sm transition-shadow"
            >
              <img
                src={event.imageUrl ?? "No image available"}
                alt={event.name}
                className="w-full h-full object-contain"
              />
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
                      : "-"}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center pt-2">
                <span className="text-sm font-semibold">
                  Rp {event.registrationFee.toLocaleString("id-ID")}
                </span>

                <Link
                  to={`/events/${event.slug}`}
                  className="text-xs text-blue-600 border border-blue-600 px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white transition"
                >
                  Detail
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
