import type { Route } from "./+types/home";
import { ArrowRight } from "lucide-react";
import type { Events } from "~/modules/event/type";
import { EventList } from "~/components/event/event-list";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Acaraga - Find Sports Events" },
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
  const featuredEvents = events?.slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full max-w-7xl mx-auto px-6 min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center gap-12 py-10">
        <div className="text-center md:text-left flex-1 space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Discover and Join <br className="hidden md:block" />
            <span className="text-blue-600">Sports Events</span> Easily
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
            Find various exciting sports events around you, register easily, and
            start your healthy lifestyle today with Acaraga.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2">
            <Link
              to="/events"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-center"
            >
              Explore Events
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end flex-1 w-full">
          <img
            src="/assets/hero.png"
            alt="Illustration of people playing sports"
            className="w-full max-w-135 h-auto object-contain drop-shadow-sm"
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-8">Choose Your Sport</h3>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Running", icon: "🏃" },
            { name: "Cycling", icon: "🚴" },
            { name: "Badminton", icon: "🏸" },
            { name: "Swimming", icon: "🏊" },
          ].map((sport) => (
            <div
              key={sport.name}
              className="w-28 h-28 border border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-white hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {sport.icon}
              </span>
              <span className="text-sm font-semibold text-slate-700 transition-colors">
                {sport.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 mt-32 mb-24">
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
          <h3 className="text-2xl font-bold">Most Popular Events</h3>
          <Link
            to="/events"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors"
          >
            See All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <EventList key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
