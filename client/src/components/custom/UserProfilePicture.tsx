import { useMe } from "@/features/authentication/useMe";
import clsx from "clsx";
import { Plus, Trash } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface UserProfilePicture {
  selectedColor?: string;
  size?: string;

  image: File | undefined;
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  displayImg: string;
  setDisplayImg: React.Dispatch<React.SetStateAction<string>>;
  deleteProfilePicture(): void;
}
export default function UserProfilePicture({
  selectedColor,
  size = "h-24 w-24",
  displayImg,
  image,
  setDisplayImg,
  setImage,
  deleteProfilePicture,
}: UserProfilePicture) {
  const { user } = useMe();
  const [hovered, setHovered] = useState(false);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const imgString = URL.createObjectURL(file);
      setImage(file);
      setDisplayImg(imgString);
    }
  }
  function removeImageChange() {
    setImage(undefined);

    setDisplayImg("");
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="relative rounded-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && (
            <div className="absolute rounded-full inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-100">
              {" "}
              {image && displayImg ? (
                <Trash onClick={removeImageChange} className="cursor-pointer" />
              ) : (
                <label className="h-full flex items-center justify-center rounded-full cursor-pointer w-full">
                  <Plus />
                  <Input
                    onChange={handleImageChange}
                    accept="image/*"
                    type="file"
                    className="hidden"
                  />
                </label>
              )}{" "}
            </div>
          )}
          {(image && displayImg) || user?.profilePicture ? (
            <>
              <img
                src={displayImg || user?.profilePicture}
                className={clsx("rounded-full img bg-cover", size)}
              />
            </>
          ) : (
            <div
              className={clsx(
                "rounded-full  text-4xl font-semibold flex items-center justify-center",
                selectedColor || user?.color,
                size
              )}
            >
              {user?.email[0].toUpperCase()}
            </div>
          )}
        </div>
        {user?.profilePicture && !displayImg && !image && (
          <Button
            onClick={deleteProfilePicture}
            type="button"
            variant={"ghost"}
            className="my-4 text-sm "
          >
            Delete Profile Picture
          </Button>
        )}
      </div>
    </>
  );
}
