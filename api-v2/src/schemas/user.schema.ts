import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["USER", "ADMIN", "ASSOCIATION"]),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
