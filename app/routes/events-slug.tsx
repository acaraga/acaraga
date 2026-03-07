import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";

import type { Event } from "~/modules/event/type";
import type { Route } from "./+types/events-slug";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { CalendarIcon, MapPinIcon, TagIcon, UsersIcon } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { formatEventDateRange, formatPrice } from "~/lib/format";
import { EventMapBox } from "~/components/detail-event/map-box";
import { Badge } from "~/components/ui/badge";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: `${loaderData.event.name}  - Acaraga` },
    {
      name: "description",
      content: loaderData.event.description,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const slug = params.slug;
  const token = Cookies.get("token");

  // 1. Ambil detail event
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/events/${slug}`,
  );
  if (!response.ok) throw new Response("Event not found", { status: 404 });
  const event: Event = await response.json();

  let isJoined = false;
  let userRole = null; // Inisialisasi role

  if (token) {
    try {
      // 2. Ambil data user terbaru langsung dari API (Paling Aman untuk cek Role)
      const meRes = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (meRes.ok) {
        const userData = await meRes.json();
        userRole = userData.role;
      }

      // 3. Cek status pendaftaran (Hanya jika event.id tersedia)
      const checkRes = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/join-event/check/${event.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (checkRes.ok) {
        const data = await checkRes.json();
        isJoined = data.isJoined;
      }
    } catch (error) {
      console.error("Auth/Join check failed silently");
    }
  }

  return { event, isJoined, userRole };
}

export default function EventDetail({ loaderData }: Route.ComponentProps) {
  const { event, isJoined: initialJoined, userRole } = loaderData;

  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(initialJoined);

  // Variabel saklar untuk Business Logic: Cek apakah user adalah Organizer
  const isOrganizer = userRole === "ORGANIZER";

  const joinEvent = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setIsJoining(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/join-event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ eventId: event.id }),
        },
      );

      if (!response.ok) {
        const result = await response.json();
        // Backend akan melempar 403 jika role bukan USER
        throw new Error(result.message || "Failed to join event");
      }

      setHasJoined(true);
      alert("Successfully joined event!");
      navigate("/dashboard");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="overflow-hidden rounded-xl">
            <img
              src={event.imageUrl ?? undefined}
              alt={event.name}
              className="w-full h-320px object-cover rounded-xl"
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold leading-tight">
              {event.name}
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {formatEventDateRange(event.dateTimeStart, event.dateTimeEnd)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>
                  {event.location?.name}, {event.location?.city}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <TagIcon className="h-4 w-4" />
                <span>{event.category?.name}</span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-10">
              <section className="space-y-3">
                <h2 className="text-3xl font-semibold">About Event</h2>
                <p className="leading-relaxed text-base text-muted-foreground">
                  {event.description}
                </p>
              </section>

              <div className="border-t" />

              {event.facilities && (
                <section className="space-y-3">
                  <h2 className="text-3xl font-semibold">
                    Race Pack & Participant Benefits
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-base text-muted-foreground">
                    {event.facilities
                      .split("\n")
                      .map((line) => line.replace("-", "").trim())
                      .filter(Boolean)
                      .map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                  </ul>
                </section>
              )}

              <div className="border-t" />

              <section className="space-y-3">
                <h2 className="text-3xl font-semibold">Route & Location</h2>
                <p className="text-base text-muted-foreground">
                  {event.location?.address ?? "Lokasi belum tersedia"}
                </p>

                {event.location?.latitude != null &&
                event.location?.longitude != null ? (
                  <div className="h-70 rounded-md border overflow-hidden">
                    <EventMapBox location={event.location} />
                  </div>
                ) : (
                  <div className="h-70 rounded-md border flex items-center justify-center text-sm text-muted-foreground">
                    Map is not available yet
                  </div>
                )}
              </section>
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
                  {formatPrice(event.registrationFee)}
                </p>
              </div>

              {/* LOGIKA FINAL: Sembunyikan tombol jika role adalah ORGANIZER */}
              {!isOrganizer ? (
                <>
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
                    variant={hasJoined ? "secondary" : "outline"}
                    className="h-12 w-full text-base font-medium"
                    onClick={joinEvent}
                    disabled={isJoining || hasJoined}
                  >
                    {isJoining
                      ? "Joining..."
                      : hasJoined
                        ? "You've Joined"
                        : "Join Event"}
                  </Button>
                </>
              ) : (
                // UI Khusus Organizer
                <div className="rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-700 border border-amber-200">
                  ℹ️ Anda login sebagai <b>Organizer</b>. <br/>
                  Fitur pendaftaran hanya tersedia untuk Peserta.
                </div>
              )}

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                      <UsersIcon className="h-5 w-5 text-lime-600" />
                      Joined Users
                    </h2>
                    <Badge variant="secondary">
                      {event.joined?.total ?? 0} People
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="border-t pt-4">
                <p className="mb-3 text-center text-sm font-medium">
                  Share this event
                </p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="rounded-full border p-2 transition hover:bg-muted">
                    <FaWhatsapp className="text-xl" />
                  </a>
                  <a href="#" className="rounded-full border p-2 transition hover:bg-muted">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="rounded-full border p-2 transition hover:bg-muted">
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