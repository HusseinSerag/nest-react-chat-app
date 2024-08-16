import { Input } from "@/components/ui/input";
import EmojiPicker, { Theme } from "emoji-picker-react";

import { Paperclip, SendHorizontal, SmilePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MessageBar() {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [message, setMessage] = useState("");
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function clickOutside(event: MouseEvent) {
        if (
          emojiRef.current &&
          !emojiRef.current.contains(event.target as Node)
        ) {
          setIsEmojiOpen(false);
        }
      }

      document.addEventListener("mousedown", clickOutside);
      return () => document.removeEventListener("mousedown", clickOutside);
    },
    [emojiRef]
  );

  return (
    <div className="py-5 relative bg-[#1c1d25] flex  items-center px-2  sm:px-8  gap-2  sm:gap-4">
      <div className="flex h-full sm:mr-5 flex-1 bg-[#2a2b33] rounded-md px-2 gap-2  sm:gap-5 ">
        <Input
          placeholder="Enter your message"
          className="flex-1 h-full border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0  p-3 px-1 sm:p-5 bg-transparent rounded-md focus:border-none outline-none"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="text-neutral-500  hover:text-white duration-300 transition-all">
          <Paperclip />
        </button>
        <div className=" flex items-center justify-center">
          <button
            onClick={() => setIsEmojiOpen((val) => !val)}
            className="text-neutral-500  hover:text-white duration-300 transition-all"
          >
            <SmilePlus />
          </button>
          <div ref={emojiRef} className="absolute bottom-20 right-4">
            <EmojiPicker
              onEmojiClick={(emoji) => setMessage((msg) => msg + emoji.emoji)}
              className="w-[280px] sm:w-[350px]"
              width={"w-[280px]"}
              open={isEmojiOpen}
              theme={Theme.DARK}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button className="bg-[#8417ff] p-5 hover:bg-[#741bda] focus:bg-[#741bda]  flex items-center justify-center rounded-md h-full text-white">
        <SendHorizontal />
      </button>
    </div>
  );
}
