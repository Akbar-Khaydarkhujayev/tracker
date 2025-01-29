import { z } from "zod";

export const loginSchema = z.object({
    phone_number: z
        .string()
        .min(17, "Телефон раками тўғри киритилмаган")
        .max(17, "Телефон раками тўғри киритилмаган"),
    password: z.string().min(1, "Пароль киритилмаган"),
});

export type LoginFields = z.infer<typeof loginSchema>;
