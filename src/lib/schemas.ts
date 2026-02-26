import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  company: z.string().min(1, "Company is required"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
