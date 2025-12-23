import type { Event } from "~/modules/event/type";
import type { Route } from "./+types/events-slug";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

import { CalendarIcon, MapPinIcon, TagIcon } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Event Details - Acaraga" },
    {
      name: "description",
      content: "Event Description.",
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const slug = params.slug;

  const apiBase =
    import.meta.env.VITE_BACKEND_API_URL || "https://acaraga-api.onrender.com";

  const response = await fetch(`${apiBase}/events/${slug}`);

  if (!response.ok) {
    throw new Response("Event not found", { status: 404 });
  }

  const event: Event = await response.json();
  return { event };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function EventDetail({ loaderData }: Route.ComponentProps) {
  const { event } = loaderData;

  let locationDisplay = "Unknown Location";
  let addressDisplay = "Alamat tidak tersedia";

  if (event.location) {
    if (typeof event.location === "string") {
      locationDisplay = event.location;
      addressDisplay = event.location;
    } else if (typeof event.location === "object") {
      locationDisplay = `${event.location.name || ""}, ${event.location.city || ""}`;
      addressDisplay = event.location.address || "Detail alamat tidak tersedia";
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="overflow-hidden rounded-xl">
            <img
              src={
                event.imageUrl ?? "https://placehold.co/800x400?text=No+Image"
              }
              alt={event.name}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-bold sm:text-3xl">{event.name}</h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDate(event.dateTimeStart)}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />

                <span>{locationDisplay}</span>
              </div>

              <div className="flex items-center gap-2">
                <TagIcon className="h-4 w-4" />

                <span>
                  {typeof event.category === "object"
                    ? event.category?.name
                    : event.categorySlug || "Event"}
                </span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold">Tentang Event</h2>
              <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                {event.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="font-semibold text-lg">Rute & Lokasi</h2>
              {/* Pake variable aman */}
              <p className="text-sm">{addressDisplay}</p>

              <div className="h-55 rounded-md border flex items-center justify-center text-sm bg-muted/20">
                Peta Google Maps (Placeholder)
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 h-fit space-y-6">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Registration Fee
                </p>
                <p className="text-3xl font-bold">
                  {formatRupiah(event.registrationFee)}
                </p>
              </div>

              <Button
                asChild
                className="h-12 w-full bg-lime-400 text-base font-semibold text-black hover:bg-lime-500"
              >
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </a>
              </Button>

              <Button
                variant="outline"
                className="h-12 w-full text-base font-medium"
              >
                Join Event
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Secure & Verified Payments
              </p>

              <div className="border-t pt-4">
                <p className="mb-3 text-center text-sm font-medium">
                  Share this event
                </p>

                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="rounded-full border p-2 transition hover:bg-muted"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="rounded-full border p-2 transition hover:bg-muted"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="rounded-full border p-2 transition hover:bg-muted"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
