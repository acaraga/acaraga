import { useState } from "react";
import { Form, Link, redirect } from "react-router"; // Menggunakan Link untuk navigasi ke Login
import { Eye, EyeOff } from "lucide-react"; // Import ikon mata

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "../+types/root";
import type { RegisterResponse } from "~/modules/user/type";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register - Acaraga" }];
}

export default function RegisterRoute({}: Route.ComponentProps) {
  // State untuk mengatur visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-sm">
        {/* Header Section */}
        <div className="mb-8">
          <p className="text-sm mb-1">Welcome!</p>
          <h1 className="text-2xl font-bold">
            Register new account for Acaraga
          </h1>
        </div>

        <Form method="POST" className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">User name</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your user name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
            />
          </div>

          {/* Password dengan Toggle Visibility */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"} // Ubah tipe input berdasarkan state
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

          {/* Button */}
          <Button type="submit">Register</Button>
        </Form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an Account ?{" "}
          <Link to="/login" className="text-black font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const registerBody = {
    username: formData.get("username")?.toString(),
    email: formData.get("email")?.toString(),
    fullName: formData.get("fullName")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerBody),
    }
  );

  const registerResponse: RegisterResponse = await response.json();
  console.log(registerResponse);

  return redirect("/login");
}
