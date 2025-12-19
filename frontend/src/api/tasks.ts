import api from "./axios";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  assignedToId?: string;
}

export const createTask = async (
  data: CreateTaskInput
): Promise<Task> => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};
