import { Request, Response } from "express";
import * as TaskService from "../services/task.service";
import { TaskPriority, TaskStatus } from "@prisma/client";

/**
 * Create a task
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const task = await TaskService.createTask({
      title: req.body.title,
      description: req.body.description,
      dueDate: new Date(req.body.dueDate),
      priority: req.body.priority as TaskPriority,
      assignedToId: req.body.assignedToId,
      creatorId: userId,
    });

    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Get tasks with filters
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getTasks({
      status: req.query.status as TaskStatus,
      priority: req.query.priority as TaskPriority,
      sortByDueDate: req.query.sortByDueDate as "asc" | "desc",
    });

    res.json(tasks);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Update task status
 */
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const task = await TaskService.updateTaskStatus(
      req.params.id,
      req.body.status as TaskStatus,
      userId
    );

    res.json(task);
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

/**
 * Update task priority
 */
export const updatePriority = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const task = await TaskService.updateTaskPriority(
      req.params.id,
      req.body.priority as TaskPriority,
      userId
    );

    res.json(task);
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

/**
 * Update task assignee
 */
export const updateAssignee = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const task = await TaskService.updateTaskAssignee(
      req.params.id,
      req.body.assignedToId,
      userId
    );

    res.json(task);
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};

/**
 * Delete task
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    await TaskService.deleteTask(req.params.id, userId);
    res.status(204).send();
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};
