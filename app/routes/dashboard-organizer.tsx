import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { redirect } from "react-router";
import type { Route } from "./+types/dashboard-organizer";
import { Card } from "~/components/ui/card";

export async function clientLoader() {
  const token = Cookies.get("token");
  if (!token) return redirect("/login");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) return redirect("/login");
  const meResponse = await response.json();

  if (meResponse.role !== "ORGANIZER") return redirect("/dashboard");

  return { meResponse };
}

export default function OrganizerDashboard({
  loaderData,
}: Route.ComponentProps) {
  const { meResponse } = loaderData;
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizerData = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/my-events/organizer`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const result = await response.json();
        if (response.ok) setMyEvents(result.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizerData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 rounded-xl border border-border bg-background">
          <div className="relative">
            <span className="absolute top-4 right-4 bg-purple-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">
              Organizer Mode
            </span>
          </div>
          <div className="flex h-full flex-col justify-center px-6 py-5 gap-0.5">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {meResponse.fullName}
            </h1>

            <p className="text-lg text-muted-foreground">
              {meResponse.username}
            </p>

            <p className="text-sm text-muted-foreground/70">
              {meResponse.email}
            </p>
          </div>
        </Card>

        <Card className="rounded-xl border-none bg-[#0F172A]">
          <div className="flex h-full items-center justify-between px-6 py-5">
            <div className="flex flex-col">
              <span className="text-lg uppercase tracking-wider text-white/50">
                Total Participants
              </span>
              <span className="text-lg text-white/80">
                How many have joined
              </span>
            </div>

            {loading ? (
              <div className="h-18 w-18 animate-pulse" />
            ) : (
              <p className="text-7xl font-bold text-lime-400">
                {myEvents.reduce(
                  (total, event) => total + (event.joinedUsers?.length || 0),
                  0,
                )}
              </p>
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 px-1">
          Management My Event
        </h2>

        {loading ? (
          <div className="p-10 text-center bg-white rounded-xl border italic text-slate-400">
            Memuat data event...
          </div>
        ) : myEvents.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-xl border text-slate-400">
            Belum ada event yang dibuat.
          </div>
        ) : (
          <div className="grid gap-6">
            {myEvents.map((event: any) => (
              <div
                key={event.id}
                className="bg-white border rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
                  <div>
                    <h3 className="font-bold uppercase tracking-tight">
                      {event.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {new Date(event.dateTimeStart).toLocaleDateString(
                        "id-ID",
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-green-400">
                      {event.joinedUsers?.length || 0}
                    </p>

                    <p className="text-[10px] uppercase font-bold text-slate-400">
                      Total Participant
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b text-slate-500 font-semibold">
                      <tr>
                        <th className="p-3 pl-6">FULLNAME</th>
                        <th className="p-3">USERNAME</th>
                        <th className="p-3">EMAIL</th>
                        <th className="p-3">JOINED</th>
                        <th className="p-3">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {event.joinedUsers?.map((participant: any) => (
                        <tr
                          key={participant.user.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="p-3 pl-6 font-medium text-slate-700">
                            {participant.user.fullName}
                          </td>
                          <td className="p-3 text-slate-500">
                            {participant.user.username}
                          </td>
                          <td className="p-3 text-slate-500">
                            {participant.user.email}
                          </td>
                          <td className="p-3 text-slate-500">
                            {new Date(participant.joinedAt).toLocaleDateString(
                              "id-ID",
                            )}
                          </td>
                          <td className="p-3">
                            <button className="text-sm text-blue-500 hover:text-blue-700">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
