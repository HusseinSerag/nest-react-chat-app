import { Routes } from "@/constants/routes-names";
import { useMe } from "@/features/authentication/useMe";
import ChatProvider from "@/features/chat/ChatContext";
import ChatPage from "@/features/chat/ChatPage";
import { Navigate } from "react-router-dom";

export default function Chat() {
  const { user } = useMe();
  if (!user?.profileSetup)
    return <Navigate replace to={`/${Routes.profile}`} />;
  return (
    <ChatProvider>
      <ChatPage />
    </ChatProvider>
  );
}
