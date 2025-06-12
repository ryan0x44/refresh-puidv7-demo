import { text, pgTable } from "drizzle-orm/pg-core";
import { puidv7drizzle } from "@refreshjs/puidv7/drizzle_helpers";

export const tasksTable = pgTable("tasks_table", {
  id: puidv7drizzle("tsk")("id").primaryKey(),
  name: text().notNull(),
  description: text(),
});
