import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address!",
  }),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters!",
  }),
});

export const SignupSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address!",
    }),
    password: z.string().min(6, {
      message: "Password must be atleast 6 characters!",
    }),
    confirmPassword: z.string({
      required_error: "Please confirm your password!",
    }),
  })
  .refine(
    ({ confirmPassword, password }) => {
      return confirmPassword === password;
    },
    {
      message: "Password doesn't match!",
      path: ["confirmPassword"],
    }
  );

export const UserSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  profileSetup: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profilePicture: z.string(),
  color: z.string(),
});

export type User = z.infer<typeof UserSchema>;
