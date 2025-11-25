import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Acaraga" },
    { name: "description", content: "Welcome to Acaraga !" },
  ];
}

export default function Home() {
  return <Welcome />;
}
