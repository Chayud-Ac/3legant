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

export const ContactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "FIRSTNAME must be at least 2 characters long." })
    .max(50, { message: "FIRSTNAME can't exceed 50 characters long." }),
  lastName: z
    .string()
    .min(2, { message: "LASTNAME must be at least 2 characters long." })
    .max(50, { message: "LASTNAME can't exceed 50 characters long." }),
  phoneNumber: z
    .string()
    .min(10, { message: "PHONE NUMBER must be at least 10 number" })
    .max(15, { message: "PHONE NUMBER  can't exceed 15 number" }),
  emailAddress: z.string().email({ message: "Invalid email address." }),
});

export const AddressFormSchema = z.object({
  street: z
    .string()
    .min(10, { message: "Please provide more information of the street" }),
  country: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.number(),
});

export const CheckOutFromSchema = z.object({
  contact: ContactFormSchema,
  address: AddressFormSchema,
});

export const AccountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "FIRSTNAME must be at least 2 characters long." })
    .max(50, { message: "FIRSTNAME can't exceed 50 characters long." }),
  lastName: z
    .string()
    .min(2, { message: "LASTNAME must be at least 2 characters long." })
    .max(50, { message: "LASTNAME can't exceed 50 characters long." }),
  displayName: z
    .string()
    .min(2, { message: "displayName must be at least 2 characters long." })
    .max(50, { message: "displayName can't exceed 50 characters long." }),
});

export const ImageUploadFormSchema = z.object({
  image: z
    //Rest of validations done via react dropzone
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
});
