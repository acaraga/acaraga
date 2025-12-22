import type { Events } from "~/modules/event/type";
import type { Route } from "./+types/events";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Events - Acaraga" },
    { name: "description", content: "All events from Acaraga." },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/events`
  );
  const events: Events = await response.json();
  return events;
}

export default function Events() {
  return <div className="p-4">See all events</div>;
}
