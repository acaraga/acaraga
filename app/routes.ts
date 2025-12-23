import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout-main.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("events", "routes/events.tsx"),
    route("register", "routes/register.tsx"),
    route("login", "routes/login.tsx"),
  ]),
] satisfies RouteConfig;
