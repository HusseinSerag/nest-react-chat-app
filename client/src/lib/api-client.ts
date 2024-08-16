import { UserSchema } from "@/features/authentication/schema";
import { ContactSchema } from "@/features/chat/schema";
import axios, { AxiosError } from "axios";
import * as z from "zod";
const host = import.meta.env.VITE_BACKEND;

const axiosFetch = axios.create({
  baseURL: host,
  withCredentials: true,
});

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axiosFetch.post("auth/signin", {
      email,
      password,
    });
    const data = z
      .object({
        profileSetup: z.boolean(),
      })
      .parse(response.data);
    return data;
  } catch (e) {
    const error = e as AxiosError;
    const cause = error.response?.data as { message: string };

    throw new Error(cause.message);
  }
}

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axiosFetch.post("auth/signup", {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    const cause = error.response?.data as { message: string };

    throw new Error(cause.message);
  }
}
export async function getMe() {
  try {
    const response = await fetch(`${host}/auth/me`, {
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    const res = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    const data = z
      .object({
        user: UserSchema,
      })
      .parse(res);
    return data.user;
  } catch (e) {
    console.log("returned");
    return null;
  }
}

export async function completeProfile(formData: FormData) {
  try {
    const response = await axiosFetch.patch("users/completeProfile", formData);
    const data = z
      .object({
        id: z.string(),
      })
      .parse(response.data);
    return data.id;
  } catch (e) {
    const error = e as AxiosError;
    const cause = error.response?.data as { message: string };

    throw new Error(cause.message);
  }
}

export async function deleteProfilePicture() {
  try {
    const response = await axiosFetch.patch("users/deleteProfilePicture");
    const data = z
      .object({
        status: z.string(),
      })
      .parse(response.data);
    return data.status;
  } catch (e) {
    const error = e as AxiosError;
    const cause = error.response?.data as { message: string };

    throw new Error(cause.message);
  }
}

export async function logout() {
  try {
    const response = await axiosFetch.post("auth/logout");
    const data = z
      .object({
        status: z.string(),
      })
      .parse(response.data);
    return data;
  } catch (e) {
    const error = e as AxiosError;
    const cause = error.response?.data as { message: string };

    throw new Error(cause.message);
  }
}

export async function searchContacts(searchTerm: string, page: number) {
  if (!searchTerm) return null;
  try {
    const response = await axiosFetch.get(
      `users/searchContacts?searchTerm=${searchTerm}&page=${page}`
    );

    const data = z
      .object({
        users: ContactSchema.array(),
        count: z.number(),
      })

      .parse(response.data);
    return data;
  } catch (e) {
    return null;
  }
}
