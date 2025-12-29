import type { Route } from "./+types/home";
import EventList from "~/components/event/event-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Event - Acaraga" },
    {
      name: "description",
      content: "Explore and join events with Acaraga.",
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

  return (
    <div className="w-full">
      <section className="max-w-5xl mx-auto px-6 mt-24 mb-24">
        <EventList data={events} limit={3} />
      </section>
    </div>
  );
}
