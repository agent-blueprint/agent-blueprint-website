import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Please keep this under 200 characters"),
  email: z.string().trim().min(1, "Email is required").max(254, "Please enter a valid email").email("Please enter a valid email"),
  company: z.string().trim().min(1, "Company is required").max(200, "Please keep this under 200 characters"),
  message: z.string().max(5000, "Please keep this under 5,000 characters").optional(),
  // Hidden from people; bots that fill every field fill this one too.
  website: z.string().max(500).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
