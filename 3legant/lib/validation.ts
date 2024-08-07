import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
  remember: z.boolean().default(false).optional(),
});

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters long." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." })
    .max(50, { message: "Username must be less than 50 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy.",
  }),
});
