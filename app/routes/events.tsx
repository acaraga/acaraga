import type { Events } from "~/modules/event/type";
import type { Route } from "./+types/events";

<<<<<<< HEAD
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Events - Acaraga" },
    { name: "description", content: "All events from Acaraga." },
=======
import { EventList } from "~/components/event/event-list";
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
    { title: "Events - Acaraga" },
    {
      name: "description",
      content: "Explore sports events around you with Acaraga",
    },
>>>>>>> main
  ];
}

export async function clientLoader() {
<<<<<<< HEAD
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/events`
  );
  const events: Events = await response.json();
  return events;
}

export default function Events() {
  return <div className="p-4">See all events</div>;
=======
  const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/events`);
  const events: Events = await res.json();
  return { events };
}

export default function Events({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

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
            <EventList key={event.id} event={event} />
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
>>>>>>> main
}
