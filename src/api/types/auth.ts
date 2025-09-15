import { z } from "zod";

// Runtime + compile-time validation
export const CreateAuthSchema = z.object({
  name: z.string().min(1),
  isActive: z.boolean(),
  isDeleted: z.boolean().optional(),
  isEdited: z.boolean().optional(),
});

export type CreateAuth = z.infer<typeof CreateAuthSchema>;
