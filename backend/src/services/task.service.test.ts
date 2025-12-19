import * as TaskService from "./task.service";
import prisma from "../prisma";

jest.mock("../prisma");
jest.mock("../socket");

describe("Task Service", () => {
  const userId = "user-1";
  const otherUserId = "user-2";
  const taskId = "task-1";

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ TEST 1: Create task
  it("should create a task", async () => {
    (prisma.task.create as jest.Mock).mockResolvedValue({
      id: taskId,
      title: "Test Task",
    });

    const task = await TaskService.createTask({
      title: "Test Task",
      description: "Desc",
      dueDate: new Date(),
      priority: "HIGH",
      creatorId: userId,
    });

    expect(prisma.task.create).toHaveBeenCalled();
    expect(task.title).toBe("Test Task");
  });

  // ✅ TEST 2: Prevent unauthorized update
  it("should block status update by non-authorized user", async () => {
    (prisma.task.findUnique as jest.Mock).mockResolvedValue({
      id: taskId,
      creatorId: userId,
      assignedToId: userId,
    });

    await expect(
      TaskService.updateTaskStatus(
        taskId,
        "COMPLETED",
        otherUserId
      )
    ).rejects.toThrow("Not authorized");
  });

  // ✅ TEST 3: Only creator can delete
  it("should allow creator to delete task", async () => {
    (prisma.task.findUnique as jest.Mock).mockResolvedValue({
      id: taskId,
      creatorId: userId,
    });

    (prisma.task.delete as jest.Mock).mockResolvedValue({});

    await TaskService.deleteTask(taskId, userId);

    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: { id: taskId },
    });
  });
});
