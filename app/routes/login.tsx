import Cookies from "js-cookie";

import { useState } from "react";
import { Form, Link, redirect } from "react-router";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/login";
import type { LoginResponse } from "~/modules/user/type";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login - Acaraga" }];
}

export default function LoginRoute({}: Route.ComponentProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm">Let's continue with Acaraga</p>
        </div>

        <Form method="POST" className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit">Login</Button>
        </Form>

        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const loginBody = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginBody),
    },
  );

  if (!response.ok) return { error: "Login failed" };

  const rawData = await response.json();
  const result = rawData as LoginResponse;

  Cookies.set("token", result.token);

  if (result.user.role === "ORGANIZER") {
    return redirect("/dashboard/organizer");
  }

  return redirect("/dashboard");
}
