import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout-main.tsx", [index("routes/home.tsx")]),

  // Halaman Register (/register)
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),

  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
