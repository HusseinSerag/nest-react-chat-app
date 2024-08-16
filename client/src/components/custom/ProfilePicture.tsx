import { User } from "@/features/authentication/schema";

import clsx from "clsx";
const size = "h-8 w-8";
interface ProfilePictureProps {
  imgSize?: string;
  user: Omit<User, "profileSetup">;
}
export default function ProfilePicture({
  imgSize = size,
  user,
}: ProfilePictureProps) {
  return user?.profilePicture ? (
    <>
      <img
        src={user?.profilePicture}
        className={clsx("rounded-full img bg-cover", imgSize)}
      />
    </>
  ) : (
    <div
      className={clsx(
        "rounded-full  text-base font-semibold flex items-center justify-center",
        user?.color,
        imgSize
      )}
    >
      {user?.email[0].toUpperCase()}
    </div>
  );
}
