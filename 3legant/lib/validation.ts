import { z } from "zod";

export const SignInFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "User name must be greater than 2 characters" })
    .max(50, { message: "User name must be less than 50 characters" }),
  password: z.string(),
});

export const SignUpFormSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string(),
});
