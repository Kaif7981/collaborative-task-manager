import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";
import type { CreateTaskInput, TaskPriority } from "../api/tasks";

export default function CreateTaskForm() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] =
    useState<TaskPriority>("MEDIUM");

  const mutation = useMutation({
    mutationFn: (data: CreateTaskInput) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("MEDIUM");
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>

      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          className="w-full border rounded px-3 py-2"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as TaskPriority)
          }
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <button
          onClick={() =>
            mutation.mutate({
              title,
              description,
              dueDate,
              priority,
            })
          }
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Task"}
        </button>
      </div>
    </div>
  );
}
