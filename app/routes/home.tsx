import type { Events } from "~/modules/event/type";
import type { Route } from "./+types/home";

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
  return (
    <div>
      <h1>Acaraga</h1>

      <ul>
        {events.map((event) => {
          return (
            <li key={event.slug}>
              <img src={event.imageUrl ?? ""} alt={event.name} />
              <h2>{event.name}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
