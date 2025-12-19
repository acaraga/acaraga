import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout-main.tsx", [
    index("routes/home.tsx"),
    route("/events", "routes/events.tsx"),
    route("/event/:slug", "routes/events-slug.tsx"),
    route("/about", "routes/about.tsx"),

    route("/register", "routes/register.tsx"),
    route("/login", "routes/login.tsx"),
  ]),
] satisfies RouteConfig;
