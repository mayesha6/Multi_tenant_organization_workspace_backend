import { z } from "zod";

const createOrganizationSchema = z.object({
  name: z.string().min(3, "Organization name is required"),
});

export const OrganizationValidations = {
  createOrganizationSchema,
};
