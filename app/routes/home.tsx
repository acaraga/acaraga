import type { Route } from "./+types/home";
import { ArrowRight } from "lucide-react";
import type { Events } from "~/modules/event/type";
import { EventList } from "~/components/event/event-list";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Acaraga" },
    {
      name: "description",
      content: "Discover and track events easily with Acaraga.",
    },
  ];
}

export async function clientLoader() {
  const apiBase =
    import.meta.env.VITE_BACKEND_API_URL || "https://acaraga-api.onrender.com";
  const response = await fetch(`${apiBase}/events`);
  const events: Events = await response.json();
  return { events };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData || {};
  console.log("DATA DARI LIVE SERVER:", events);

  const featuredEvents = events?.slice(0, 3) || [];

  return (
    <div className="flex flex-col">
      <section className="w-full max-w-7xl mx-auto px-6 pt-16 flex flex-col md:flex-row items-center gap-10">
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">
            Your Sport Experience <br /> Starts Here.
          </h2>
        </div>

        <div className="flex justify-center md:justify-end flex-1">
          <img
            src="/assets/marathon.png"
            alt="Hero Image"
            className="w-360px md:w-480px h-auto"
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

      <section className="w-full max-w-7xl mx-auto px-6 mt-24 mb-24">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-semibold">Most Popular Events</h3>
          <Link
            to="/events"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            See All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventList key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
