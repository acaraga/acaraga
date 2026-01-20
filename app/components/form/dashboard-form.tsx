import { Card } from "~/components/ui/card";

import type { User } from "~/modules/user/type";
import { useState } from "react";
import { MyEventsLists } from "./my-events-lists";

interface DashboardFormProps {
  meResponse: User;
}

export function DashboardForm({ meResponse }: DashboardFormProps) {
  const [myEvents, setMyEvents] = useState<{ total: number; data: any[] }>({
    total: 0,
    data: [],
  });

  return (
    <div>
      <section className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
        <Card className="p-4 md:p-6">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold">{meResponse.fullName}</h1>
            <p className="text-muted-foreground">{meResponse.username}</p>
            <p className="text-gray-300">{meResponse.email}</p>
          </div>
        </Card>
        <Card className="p-4 md:p-6 bg-gray-800">
          <div className="flex flex-col ">
            <h1 className="text-2xl text-white font-bold">Events Journey</h1>
            <p className="text-muted-foreground">You have joined :</p>
          </div>
        </Card>
      </section>

      <MyEventsLists meResponse={meResponse} />
    </div>
  );
}
