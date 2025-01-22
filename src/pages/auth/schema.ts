import { z } from "zod";

export const loginSchema = z.object({
    phone_number: z.string().min(17),
    password: z.string(),
});

export type LoginFields = z.infer<typeof loginSchema>;
