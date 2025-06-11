import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./app/db/*.ts",
  out: "./migrations",
  dbCredentials: {
    url: "postgres://postgres:refresh25@127.0.0.1:5432/demo",
  },
} satisfies Config;
