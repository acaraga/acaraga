import { cn } from "~/lib/utils";
import { Card, CardContent } from "~/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSeparator,
} from "~/components/ui/field";
import type { User } from "~/modules/user/type";
import { formatEventDateOnly } from "~/lib/format";

interface DashboardFormProps {
  meResponse: User;
}

export function DashboardForm({
  className,
  meResponse,
  ...props
}: React.ComponentProps<"div"> & DashboardFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 ">
        <section className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p>Your Profile Information</p>
          </div>
          <FieldSeparator className="my-4" />
          <CardContent className="grid p-0 grid-cols-1 sm:grid-cols-2">
            <FieldGroup>
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <FieldDescription>{meResponse.fullName}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <FieldDescription>{meResponse.username}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Created At</FieldLabel>
                <FieldDescription>
                  {formatEventDateOnly(
                    meResponse.createdAt as unknown as string
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>

            <FieldGroup className="mt-8 sm:mt-0">
              <Field>
                <FieldLabel>User ID</FieldLabel>
                <FieldDescription>{meResponse.id}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldDescription>{meResponse.email}</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Updated At</FieldLabel>
                <FieldDescription>
                  {formatEventDateOnly(
                    meResponse.updatedAt as unknown as string
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </section>
      </Card>
    </div>
  );
}
