import { useMe } from "@/features/authentication/useMe";
import { Loader2 } from "lucide-react";

import { Outlet } from "react-router-dom";
export default function LoadUserLayer() {
  const { isLoading } = useMe();

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />;
      </div>
    );
  return <Outlet />;
}
