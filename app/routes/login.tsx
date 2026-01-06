import Cookies from "js-cookie";

import { useState } from "react";
import { Form, Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import type { Route } from "./+types/login";
import type { LoginResponse } from "~/modules/user/type";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - Acaraga" },
    {
      name: "description",
      content: "Login to your account for Acara Olahraga web",
    },
  ];
}

export default function LoginRoute({}: Route.ComponentProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-sm">Let’s continue with Acaraga</p>
        </div>

        <Form method="POST" className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="h-11 bg-white border-gray-300 placeholder:text-gray-300 focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
                className="h-11 bg-white border-gray-300 placeholder:text-gray-300 focus-visible:ring-blue-500 pr-10"
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

          <Button
            type="submit"
            className="w-full h-11 bg-[#1363DF] hover:bg-[#1152ba] text-white font-medium text-base mt-2"
          >
            Login
          </Button>
        </Form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an Account ?{" "}
          <Link to="/register" className="text-black font-bold hover:underline">
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
    }
  );

  if (response.ok) {
    const token = await response.text();
    Cookies.set("token", token, { expires: 7, path: "/" });

    return redirect("/dashboard");
  }

  const errorData = await response
    .json()
    .catch(() => ({ message: "Login failed" }));
  console.error("Login Error:", errorData);

  return { error: errorData.message };
}
