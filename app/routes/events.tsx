import type { Route } from "./+types/home";
import { ArrowRight } from "lucide-react";
import EventList from "~/components/event/event-list";

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/events`
  );
  const events = await response.json();
  return { events };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // Tambah default object {} buat jaga-jaga loaderData undefined
  const { events } = loaderData || {};

  return (
    <div className="w-full">
      {/* ... bagian hero & sport category lu tetap sama ... */}

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

        {/* Cukup panggil ini */}
        <EventList data={events} limit={3} />
      </section>
    </div>
  );
}
