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
import Cookies from "js-cookie";

interface DashboardFormProps {
  meResponse: User;
}

export function DashboardForm({
  className,
  meResponse,
  ...props
}: React.ComponentProps<"div"> & DashboardFormProps) {
  const [myEvents, setMyEvents] = useState<{ total: number; data: any[] }>({
    total: 0,
    data: [],
  });

  useEffect(() => {
    const fetchMyEvents = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/my-events`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setMyEvents(result);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="overflow-hidden">
        <section className="p-6 md:p-8">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Your Profile Information</p>
          </div>
          <FieldSeparator className="my-6" />
          <CardContent className="grid p-0 grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <FieldDescription>{meResponse.fullName}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <FieldDescription>{meResponse.username}</FieldDescription>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldDescription>{meResponse.email}</FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </section>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            My Events ({myEvents.total})
          </h2>
        </div>

        {myEvents.data.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            You haven't joined any events yet.
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myEvents.data.map((item) => (
              <Card key={item.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{item.event.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    📍 {item.event.location}
                  </p>
                  <p className="text-xs bg-secondary w-fit px-2 py-1 rounded">
                    Joined: {formatEventDateOnly(item.createdAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
