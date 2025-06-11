import type { Route } from "./+types/home";
import { drizzle } from "drizzle-orm/postgres-js";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const db = drizzle("postgres://postgres:refresh25@127.0.0.1:5432/demo");
  const result = await db.execute("select 3");
  return { result };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { result } = loaderData;
  return <div>{JSON.stringify(result)}</div>;
}
