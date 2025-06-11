import type { Route } from "./+types/home";
import { drizzle } from "drizzle-orm/postgres-js";
import { tasksTable } from "~/db/schema";
import { uuidv7 } from "uuidv7";
import { Form, redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo List" },
    { name: "description", content: "A simple todo list app" },
  ];
}

export async function loader() {
  const db = drizzle("postgres://postgres:refresh25@127.0.0.1:5432/demo");
  const result = await db.select().from(tasksTable);
  return { result };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const taskName = formData.get("taskName") as string;

  if (!taskName || taskName.trim() === "") {
    return { error: "Task name cannot be empty" };
  }

  const db = drizzle("postgres://postgres:refresh25@127.0.0.1:5432/demo");
  await db.insert(tasksTable).values({
    id: uuidv7(),
    name: taskName.trim(),
  });

  return redirect("/");
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const { result } = loaderData;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo List</h1>

      <Form method="post" className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="taskName"
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Task
          </button>
        </div>
        {actionData?.error && (
          <p className="text-red-500 text-sm mt-2">{actionData.error}</p>
        )}
      </Form>

      <div className="space-y-3">
        {result.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No tasks yet. Add one above!
          </p>
        ) : (
          result.map((task) => (
            <div
              key={task.id}
              className="bg-blue-800 border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
            >
              {task.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
