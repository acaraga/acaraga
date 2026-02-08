import type { Route } from "./+types/about";
import { UserCircle } from "lucide-react"; // Install dulu: bun add lucide-react

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Acaraga" },
    {
      name: "description",
      content: "Explore sports events around you with Acaraga",
    },
  ];
}

export default function About() {
  const teamMembers = [
    { name: "Ammar Ismail Khocan", role: "Team Leader" },
    { name: "Akhirudin Salasa", role: "Full Stack Developer" },
    { name: "Endi Suwandi", role: "Full Stack Developer" },
    { name: "Purnomo Arif", role: "Full Stack Developer" },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6 text-slate-900">About Acaraga</h1>

      <div className="text-lg text-gray-700 leading-relaxed space-y-4 mb-12">
        <p>
          Tired of hunting for the latest sports event info in Indonesia?
          Acaraga is the must-visit spot for you! We've got the complete lineup
          of all the exciting sports events across Indonesia, from the major
          leagues to the most local happenings. We guarantee you won't miss the
          latest updates, so you can immediately plan your participation or
          spectating. Acaraga isn't just for sports lovers, though! We're also a
          cool platform for event organizers. Use this website to amplify the
          news of your sports event to every corner! Got specific questions
          about a particular event? Just say hello to the organizer contact
          we've provided on each event page, okay? If you spot an event that
          hasn't popped up on this website yet, or if some info isn't quite
          right, don't hesitate to let us know at info@acaraga Come on, let's
          work together and help Acaraga become the top sports database in
          Indonesia! Thank you!
        </p>
      </div>

      <div className="border-t pt-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Team Acaraga
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                <UserCircle size={32} />
              </div>

              <div>
                <p className="font-semibold text-slate-900 leading-none">
                  {member.name}
                </p>
                <p className="text-sm text-slate-500 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
