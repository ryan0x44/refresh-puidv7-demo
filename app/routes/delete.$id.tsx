import type { Route } from "./+types/delete.$id";
import { drizzle } from "drizzle-orm/postgres-js";
import { tasksTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { Form, redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Delete Task" },
    { name: "description", content: "Confirm task deletion" },
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

export async function action({ params }: Route.ActionArgs) {
  const db = drizzle("postgres://postgres:refresh25@127.0.0.1:5432/demo");
  await db.delete(tasksTable).where(eq(tasksTable.id, params.id));
  
  return redirect("/");
}

export default function DeleteTask({ loaderData }: Route.ComponentProps) {
  const { task } = loaderData;
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Delete Task</h1>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-lg mb-6 text-center">
          Are you sure you want to delete task "{task.name}"?
        </p>
        
        {task.description && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
        )}
        
        <div className="flex gap-4 justify-center">
          <Form method="post">
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Yes, Delete
            </button>
          </Form>
          
          <a
            href="/"
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            No, Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
