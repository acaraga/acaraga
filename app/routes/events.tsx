import { useState } from "react";
import type { Route } from "./+types/events";
import type { Events } from "~/modules/event/type";

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
    { name: "description", content: "Explore sports events around you" },
  ];
}

export async function clientLoader() {
  const apiBase =
    import.meta.env.VITE_BACKEND_API_URL || "https://acaraga-api.onrender.com";

  const res = await fetch(`${apiBase}/events`);
  const events: Events = await res.json();

  return { events };
}

const ITEMS_PER_PAGE = 6;

export default function Events({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedEvents = events.slice(start, end);

  return (
    <div className="flex flex-col">
      <section className="w-full max-w-7xl mx-auto px-6 pt-16 text-center">
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

      <section className="w-full max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedEvents.map((event) => (
            <EventList key={event.id} event={event} />
          ))}
        </div>
      </section>

      {totalPages > 1 && (
        <section className="flex justify-center mt-10 mb-24">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => p - 1)}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => p + 1)}
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      )}
    </div>
  );
}
