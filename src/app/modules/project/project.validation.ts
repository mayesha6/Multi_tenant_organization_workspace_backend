import { z } from "zod";

const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be at most 100 characters"),
  description: z.string().max(500, "Description must be at most 500 characters").optional(),
});

const updateProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be at most 100 characters")
    .optional(),
  description: z.string().max(500, "Description must be at most 500 characters").optional(),
});

export const ProjectValidations = {
  createProjectSchema,
  updateProjectSchema,
};
