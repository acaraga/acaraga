import { useState } from "react";
import { Form, Link } from "react-router"; // Menggunakan Link untuk navigasi ke Login
import { Eye, EyeOff } from "lucide-react"; // Import ikon mata

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register - Acaraga" }];
}

export default function RegisterRoute({}: Route.ComponentProps) {
  // State untuk mengatur visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        {/* Header Section */}
        <div className="mb-8">
          <p className="text-gray-600 text-sm mb-1">Welcome !</p>
          <h1 className="text-2xl font-bold text-gray-900">
            Sign up to Acaraga
          </h1>
        </div>

        <Form method="POST" className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700">
              User name
            </Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your user name"
              className="h-11 bg-white border-gray-300 placeholder:text-gray-300 focus-visible:ring-blue-500"
            />
          </div>

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

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full-name" className="text-gray-700">
              Full Name
            </Label>
            <Input
              id="full-name"
              type="text"
              name="fullName"
              placeholder="Enter your Full Name"
              className="h-11 bg-white border-gray-300 placeholder:text-gray-300 focus-visible:ring-blue-500"
            />
          </div>

          {/* Password dengan Toggle Visibility */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"} // Ubah tipe input berdasarkan state
                name="password"
                placeholder="Enter your Password"
                className="h-11 bg-white border-gray-300 placeholder:text-gray-300 focus-visible:ring-blue-500 pr-10" // pr-10 memberi ruang untuk ikon
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
          <Button
            type="submit"
            className="w-full h-11 bg-[#1363DF] hover:bg-[#1152ba] text-white font-medium text-base mt-2"
          >
            Register
          </Button>
        </Form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an Account ?{" "}
          <Link to="/login" className="text-black font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
