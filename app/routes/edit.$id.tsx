import type { Route } from "./+types/edit.$id";
import { drizzle } from "drizzle-orm/postgres-js";
import { tasksTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { Form, redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Task" },
    { name: "description", content: "Edit task details" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const db = drizzle("postgres://postgres:refresh25@127.0.0.1:5432/demo");
  const task = await db.select().from(tasksTable).where(eq(tasksTable.id, params.id)).limit(1);
  
  if (task.length === 0) {
    throw new Response("Task not found", { status: 404 });
  }
  
  return { task: task[0] };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const taskName = formData.get("taskName") as string;
  const taskDescription = formData.get("taskDescription") as string;
  
  if (!taskName || taskName.trim() === "") {
    return { error: "Task name cannot be empty" };
  }

  const db = drizzle("postgres://postgres:refresh25@127.0.0.1:5432/demo");
  await db.update(tasksTable)
    .set({
      name: taskName.trim(),
      description: taskDescription?.trim() || null,
    })
    .where(eq(tasksTable.id, params.id));

  return redirect("/");
}

export default function EditTask({ loaderData, actionData }: Route.ComponentProps) {
  const { task } = loaderData;
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Task</h1>
      
      <Form method="post" className="space-y-6">
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-2">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            defaultValue={task.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            defaultValue={task.description || ""}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Add a description for this task..."
          />
        </div>
        
        {actionData?.error && (
          <p className="text-red-500 text-sm">{actionData.error}</p>
        )}
        
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save Changes
          </button>
          <a
            href="/"
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </a>
        </div>
      </Form>
    </div>
  );
}
