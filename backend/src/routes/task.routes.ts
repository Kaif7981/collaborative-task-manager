import { Router } from "express";
import * as TaskController from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Protect all task routes
router.use(authMiddleware);

// Create task
router.post("/", TaskController.createTask);

// Get tasks (with filters)
router.get("/", TaskController.getTasks);

// Update task status
router.put("/:id/status", TaskController.updateStatus);

// Update task priority
router.put("/:id/priority", TaskController.updatePriority);

// Update task assignee
router.put("/:id/assignee", TaskController.updateAssignee);

// Delete task
router.delete("/:id", TaskController.deleteTask);

export default router;
