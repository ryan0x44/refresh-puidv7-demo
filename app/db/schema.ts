import { text, uuid, pgTable } from "drizzle-orm/pg-core";
export const tasksTable = pgTable("tasks_table", {
  id: uuid().primaryKey(),
  name: text().notNull(),
});
