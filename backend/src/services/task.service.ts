import prisma from "../prisma";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  creatorId: string;
  assignedToId?: string;
}

interface GetTasksFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  sortByDueDate?: "asc" | "desc";
}

/**
 * Create a new task
 */
export const createTask = async (data: CreateTaskInput) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      creatorId: data.creatorId,
      assignedToId: data.assignedToId
    }
  });
};

/**
 * Get tasks with filters and sorting
 */
export const getTasks = async (filters: GetTasksFilter) => {
  return prisma.task.findMany({
    where: {
      status: filters.status,
      priority: filters.priority
    },
    orderBy: filters.sortByDueDate
      ? { dueDate: filters.sortByDueDate }
      : undefined,
    include: {
      creator: true,
      assignedTo: true
    }
  });
};

/**
 * Update task status
 */
export const updateTaskStatus = async (
  taskId: string,
  status: TaskStatus,
  userId: string
) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.creatorId !== userId && task.assignedToId !== userId) {
    throw new Error("Not authorized to update this task");
  }

  return prisma.task.update({
    where: { id: taskId },
    data: { status }
  });
};

/**
 * Update task priority
 */
export const updateTaskPriority = async (
  taskId: string,
  priority: TaskPriority,
  userId: string
) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.creatorId !== userId) {
    throw new Error("Only creator can update priority");
  }

  return prisma.task.update({
    where: { id: taskId },
    data: { priority }
  });
};

/**
 * Update task assignee
 */
export const updateTaskAssignee = async (
  taskId: string,
  assignedToId: string,
  userId: string
) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.creatorId !== userId) {
    throw new Error("Only creator can reassign task");
  }

  return prisma.task.update({
    where: { id: taskId },
    data: { assignedToId }
  });
};

/**
 * Delete task
 */
export const deleteTask = async (taskId: string, userId: string) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.creatorId !== userId) {
    throw new Error("Only creator can delete task");
  }

  await prisma.task.delete({ where: { id: taskId } });
};
