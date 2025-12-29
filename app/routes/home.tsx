import type { Route } from "./+types/home";
import { ArrowRight } from "lucide-react";
import EventList from "~/components/event/event-list";

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
  const events = await response.json();
  return { events };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData || {};
  console.log("DATA DARI LIVE SERVER:", events);

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

        <EventList data={events} limit={3} />
      </section>
    </div>
  );
}
