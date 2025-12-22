import type { Events } from "~/modules/event/type";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Acaraga" },
    { name: "description", content: "Welcome to Acaraga !" },
  ];
}

export async function clientLoader() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/events`
    );

    if (!response.ok) throw new Error("Backend down");

    const events: Events = await response.json();
    return { events };
  } catch (err) {
    console.warn("dummy data");

    return {
      events: [
        { id: 1, location: "Jakarta", title: "Dummy Event 1" },
        { id: 2, location: "Bandung", title: "Dummy Event 2" },
        { id: 3, location: "Surabaya", title: "Dummy Event 3" },
      ],
    };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-6 pt-16 flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* LEFT TEXT */}
        <div className="text-center flex-1">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight mt-16">
            Your Sport Experience <br /> Starts Here.
          </h2>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end flex-1">
          <img
            src="/assets/hero.svg"
            alt="Hero Image"
            className="w-[360px] md:w-[480px] h-auto"
          />
        </div>
      </section>

      {/* CHOOSE YOUR SPORT */}
      <section className="max-w-5xl mx-auto px-6 mt-16 text-center">
        <h3 className="text-xl font-bold mb-6">Choose Your Sport</h3>

        <div className="grid grid-cols-3 gap-4 justify-center">
          {[
            { name: "Running", icon: "🏃" },
            { name: "Cycling", icon: "🚴" },
            { name: "Swimming", icon: "🏊" },
          ].map((sport) => (
            <button
              key={sport.name}
              className="border rounded-xl py-3 px-2 flex flex-col items-center hover:bg-gray-100 transition"
            >
              <span className="text-2xl">{sport.icon}</span>
              <span className="mt-1 text-sm">{sport.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* MOST POPULAR EVENTS */}
      <section className="max-w-5xl mx-auto px-6 mt-20 mb-24">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Most Popular Events</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {events.map((event) => (
            <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
              <img className="w-full h-36 object-cover" />

              <div className="p-4">
                <p className="text-sm text-gray-500">{event.location}</p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="font-bold"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
