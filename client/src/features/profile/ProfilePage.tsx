import { useForm } from "react-hook-form";
import { useMe } from "../authentication/useMe";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { ProfileSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { colors, getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useCompleteProfile } from "./useCompleteProfile";
import { Link } from "react-router-dom";
import { Routes } from "@/constants/routes-names";
import UserProfilePicture from "@/components/custom/UserProfilePicture";
import { useState } from "react";
import { useDeleteProfilePicture } from "./useDeleteProfilePicture";

export default function ProfilePage() {
  const { user } = useMe();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      color: user?.color || getColor(0),
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  });
  const selectedColor = form.watch("color");

  const [profilePicture, setProfilePicture] = useState<File>();
  const [displayImg, setDisplayImg] = useState("");

  const { isPending: IsUpdating, updateProfile } = useCompleteProfile();

  const { deletePicture, isPending: isDeletingPicture } =
    useDeleteProfilePicture();
  function onSubmit(values: z.infer<typeof ProfileSchema>) {
    if (!IsUpdating && !isDeletingPicture) {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("color", values.color);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture, profilePicture.name);
      }
      updateProfile(formData, {
        onSuccess() {
          setProfilePicture(undefined);
          setDisplayImg("");
        },
      });
    }
  }
  function deleteProfilePicture() {
    deletePicture();
  }
  return (
    <Form {...form}>
      <form
        className="h-full flex-col  flex items-center justify-center gap-8 bg-[#1b1c24]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className=" mx-auto w-[80%] max-w-[600px] ">
          <div className=" flex  text-white items-center w-full  justify-center gap-12    sm:flex-row flex-col">
            <UserProfilePicture
              size="h-36 w-36"
              selectedColor={selectedColor}
              displayImg={displayImg}
              image={profilePicture}
              setDisplayImg={setDisplayImg}
              setImage={setProfilePicture}
              deleteProfilePicture={deleteProfilePicture}
            />
            <div className="flex  flex-1 flex-col gap-4">
              <Input
                className="rounded-lg w-full p-6 focus:border-0 bg-[#2c2e3b] border-none"
                disabled
                value={user?.email}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="rounded-lg w-full p-6 focus:border-0 bg-[#2c2e3b] border-none"
                        placeholder="First Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        className="rounded-lg w-full p-6 bg-[#2c2e3b] border-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center gap-5">
                {colors.map((color, index) => (
                  <div
                    onClick={() => form.setValue("color", getColor(index))}
                    className={`${color} h-8 w-8 rounded-full  cursor-pointer 
                  ${
                    color === selectedColor &&
                    "outline outline-white/50 outline-2"
                  }`}
                    key={color}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <>
          <Button
            disabled={IsUpdating || isDeletingPicture}
            className="py-4 px-2 w-[80%] max-w-[600px] bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          >
            Save Changes
          </Button>
          <Button
            disabled={!user?.profileSetup || IsUpdating || isDeletingPicture}
            type="button"
            className="py-4 px-2 w-[80%] max-w-[600px] bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          >
            <Link className="w-full" to={`/${Routes.chat}`}>
              Continue to chat
            </Link>
          </Button>
        </>
      </form>
    </Form>
  );
}
