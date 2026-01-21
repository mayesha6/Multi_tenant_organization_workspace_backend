import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(3, "Task title is required"),
  description: z.string().optional(),
  projectId: z.string().min(1, "Project ID is required"),
  assignedTo: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});

export const TaskValidations = {
  createTaskSchema,
  updateTaskSchema,
};
