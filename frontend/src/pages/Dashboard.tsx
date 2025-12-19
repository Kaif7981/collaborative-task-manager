import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CreateTaskForm from "../components/CreateTaskForm";
import { fetchTasks } from "../api/tasks";
import type { Task } from "../api/tasks";
import socket from "../socket";


export default function Dashboard() {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    socket.on("task:created", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:updated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:assigned", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:assigned");
    };
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Task Dashboard
      </h1>

      <CreateTaskForm />

      {isLoading && <p>Loading tasks...</p>}

      {isError && (
        <p className="text-red-600">
          Failed to load tasks
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.map((task: Task) => (
          <div
            key={task.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg mb-2">
              {task.title}
            </h2>

            <p className="text-gray-600 mb-3">
              {task.description}
            </p>

            <p className="text-sm">
              <b>Priority:</b>{" "}
              <span className="text-indigo-600">
                {task.priority}
              </span>
            </p>

            <p className="text-sm">
              <b>Status:</b>{" "}
              <span className="text-green-600">
                {task.status}
              </span>
            </p>

            <p className="text-sm">
              <b>Due:</b>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
