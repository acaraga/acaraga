import Cookies from "js-cookie";

import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSeparator,
} from "~/components/ui/field";
import type { User } from "~/modules/user/type";
import { formatEventDateOnly } from "~/lib/format";
import { useEffect, useState } from "react";
import { MyEventsLists } from "./my-events-lists";

interface DashboardFormProps {
  meResponse: User;
}

export function DashboardForm({
  meResponse,
}: React.ComponentProps<"div"> & DashboardFormProps) {
  const [myEvents, setMyEvents] = useState<{ total: number; data: any[] }>({
    total: 0,
    data: [],
  });

  return (
    <div>
      <Card className="overflow-hidden">
        <section className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-bold">{meResponse.fullName}</h1>
            <p className="text-muted-foreground">{meResponse.username}</p>
            <p className="text-gray-300">{meResponse.email}</p>
          </div>
        </section>
      </Card>

      <MyEventsLists meResponse={meResponse} />
    </div>
  );
}
