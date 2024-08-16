import ChatContainer from "./ChatContainer";
import { useChat } from "./ChatContext";
import EmptyChatContainer from "./EmptyChatContainer";
import Navbar from "./Navbar";

export default function ChatPage() {
  const { currentChat } = useChat();
  return (
    <div className="h-full flex text-white  ">
      <Navbar />
      {currentChat === "none" && <EmptyChatContainer />}
      {currentChat !== "none" && <ChatContainer />}
    </div>
  );
}
