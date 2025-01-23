import { z } from "zod";

export const registerSchema = z.object({
    phone_number: z.string().min(17).max(17),
    first_name: z.string(),
    last_name: z.string(),
    password: z.string(),
});

export type RegisterFields = z.infer<typeof registerSchema>;
