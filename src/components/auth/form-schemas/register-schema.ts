
import * as z from "zod";

const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const registerFormSchema = z.object({
  lastName: z.string().min(1, { message: "Last name is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  address: z.string().optional(),
  phoneNumber: z.string().regex(phoneRegex, { message: "Invalid phone number format" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
