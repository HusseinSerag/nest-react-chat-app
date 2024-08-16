import * as z from "zod";

export const ProfileSchema = z.object({
  firstName: z.string().min(2, "First name should be atleast 2 characters"),
  lastName: z.string().min(2, "First name should be atleast 2 characters"),
  color: z.string({
    required_error: "Please choose a color!",
  }),
});
