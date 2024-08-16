import * as z from "zod";

export const ContactSchema = z.object({
  _id: z.string(),
  email: z.string().email(),

  createdAt: z.string(),
  updatedAt: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.string(),
  color: z.string(),
});

export type Contact = z.infer<typeof ContactSchema>;
