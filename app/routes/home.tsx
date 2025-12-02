import type { Events } from "~/modules/event/type";
import type { Route } from "./+types/home";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
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

export default function Home({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

  const sports = [
    { name: "Running", icon: "🏃" },
    { name: "Badminton", icon: "🏸" },
    { name: "Cycling", icon: "🚴" },
    { name: "Football", icon: "⚽" },
    { name: "Swimming", icon: "🏊" },
  ];

  return (
    <div className="w-full">
      {/* =================== HERO SECTION =================== */}
      <section className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* LEFT: Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Your Sport Experience <br /> Starts Here.
          </h1>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs mt-4 mx-auto md:mx-0">
            <Input
              type="text"
              placeholder="Search event"
              className="pl-4 pr-10 py-2 rounded-full border"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* RIGHT: Hero Illustration */}
        <div className="flex justify-center">
          <img
            src="/assets/hero-sport.png"
            alt="Sport Illustration"
            className="max-w-md w-full"
          />
        </div>
      </section>

      {/* =================== SPORTS CATEGORY =================== */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">Choose Your Sport</h2>

        <div className="flex justify-center gap-6 flex-wrap">
          {sports.map((sport) => (
            <div
              key={sport.name}
              className="w-36 h-32 bg-white rounded-xl shadow-md border flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-4xl mb-2">{sport.icon}</div>
              <p className="font-medium">{sport.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =================== EVENTS SECTION =================== */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Most Popular Events</h2>

          <Link to="/event" className="text-sm text-blue-500 hover:underline">
            Lihat Semua →
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <li
              key={event.slug}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
            >
              <img
                src={event.imageUrl ?? "/placeholder.jpg"}
                alt={event.name}
                className="rounded-lg h-40 w-full object-cover"
              />

              <h3 className="font-semibold mt-3">{event.name}</h3>

              <p className="mt-1 text-gray-600"></p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
