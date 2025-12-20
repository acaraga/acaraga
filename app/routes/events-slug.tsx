import type { Event } from "~/modules/event/type";
import type { Route } from "./+types/events-slug";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

import { CalendarIcon, MapPinIcon, TagIcon, WalletIcon } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

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

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/events/${slug}`
  );

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

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <img
            src={event.imageUrl ?? undefined}
            alt={event.name}
            className="w-full h-320px object-cover rounded-xl"
          />

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{event.name}</h1>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDate(event.dateTimeStart)}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                <span>
                  {event.location?.name}, {event.location?.city}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <TagIcon className="w-4 h-4" />
                <span>{event.category?.name}</span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="font-semibold text-lg">Tentang Event</h2>
              <p className="leading-relaxed">{event.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="font-semibold text-lg">Rute & Lokasi</h2>
              <p className="text-sm">{event.location?.address}</p>

              <div className="h-[220px] rounded-md border flex items-center justify-center text-sm">
                Peta Google Maps
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Registration Fee */}
              <div className="space-y-2">
                <p className="text-sm font-medium uppercase tracking-wide">
                  Registration Fee
                </p>

                <p className="text-3xl font-bold">
                  {formatRupiah(event.registrationFee)}
                </p>
              </div>

              {/* Primary CTA */}
              <Button
                asChild
                className="w-full h-12 bg-lime-400 text-black text-base font-semibold hover:bg-lime-500"
              >
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </a>
              </Button>

              {/* Secondary CTA */}
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium"
              >
                Join Event
              </Button>

              {/* Trust Text */}
              <p className="text-xs text-center">Secure & Verified Payments</p>

              {/* Divider */}
              <div className="border-t pt-4 space-y-3">
                <p className="text-sm font-medium text-center">
                  Share this event
                </p>

                {/* Social Share */}
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="p-2 rounded-full border hover:bg-gray-100 transition"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>

                  <a
                    href="#"
                    className="p-2 rounded-full border hover:bg-gray-100 transition"
                    aria-label="Share on Instagram"
                  >
                    <FaInstagram className="text-xl" />
                  </a>

                  <a
                    href="#"
                    className="p-2 rounded-full border hover:bg-gray-100 transition"
                    aria-label="Share on Facebook"
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
