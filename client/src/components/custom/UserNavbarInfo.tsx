import { Routes } from "@/constants/routes-names";
import { useMe } from "@/features/authentication/useMe";
import { LogOut, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useLogout } from "@/features/authentication/useLogout";

export default function UserNavbarInfo() {
  const { user } = useMe();
  const userFullName = `${user?.firstName} ${user?.lastName}`;
  const { isPending: isLoggingOut, signout } = useLogout();
  function logout() {
    signout();
  }
  return (
    <div className="w-full p-4 bg-[#212b33] gap-1 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ProfilePicture user={user!} imgSize="h-12 w-12" />
        <div className="poppins-medium">{userFullName}</div>
      </div>
      <div className="flex items-center gap-4">
        <Link to={`/${Routes.profile}`}>
          <Pencil className="text-blue-400" />
        </Link>
        <button disabled={isLoggingOut} onClick={logout}>
          <LogOut className="text-red-400" />
        </button>
      </div>
    </div>
  );
}
