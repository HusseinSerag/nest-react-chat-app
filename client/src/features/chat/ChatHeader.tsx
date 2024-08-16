import ProfilePicture from "@/components/custom/ProfilePicture";
import { X } from "lucide-react";

import { useChat } from "./ChatContext";

export default function ChatHeader() {
  const { active, currentChat, unselectChat } = useChat();
  return (
    <div className="border-b-2 border-[#2f303b] px-10  md:px-20 py-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center justify-center">
          {currentChat === "contact" && (
            <ProfilePicture imgSize="h-14 w-14" user={active} />
          )}
          {currentChat === "contact" && (
            <span>
              {active.firstName} {active.lastName}
            </span>
          )}
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="text-neutral-500 hover:border-none hover:outline-none hover:text-white duration-300 transition-all">
            <X className="text-3xl cursor-pointer" onClick={unselectChat} />
          </div>
        </div>
      </div>
    </div>
  );
}
