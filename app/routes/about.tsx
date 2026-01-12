import type { Route } from "./+types/about";

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
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">About Acaraga</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        Tired of hunting for the latest sports event info in Indonesia? Acaraga
        is the must-visit spot for you! We've got the complete lineup of all the
        exciting sports events across Indonesia, from the major leagues to the
        most local happenings. We guarantee you won't miss the latest updates,
        so you can immediately plan your participation or spectating. Acaraga
        isn't just for sports lovers, though! We're also a cool platform for
        event organizers. Use this website to amplify the news of your sports
        event to every corner! Got specific questions about a particular event?
        Just say hello to the organizer contact we've provided on each event
        page, okay? If you spot an event that hasn't popped up on this website
        yet, or if some info isn't quite right, don't hesitate to let us know at
        info@acaraga Come on, let's work together and help Acaraga become the
        top sports database in Indonesia! Thank you!
        <ul className="list-disc list-inside mt-4">
          Team Acaraga
          <li>Ammar Ismail Khocan</li>
          <li>Akhirudin Salasa</li>
          <li>Endi Suwandi</li>
          <li> Purnomo Arif</li>
        </ul>
      </p>
    </section>
  );
}
