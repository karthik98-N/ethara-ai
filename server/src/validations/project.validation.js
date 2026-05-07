import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional().default(""),
  deadline: z.string().datetime().optional(),
  status: z.enum(["PLANNING", "ACTIVE", "COMPLETED", "ARCHIVED"]).default("ACTIVE")
});
