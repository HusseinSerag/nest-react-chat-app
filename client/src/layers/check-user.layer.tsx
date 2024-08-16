import { Routes } from "@/constants/routes-names";
import { useMe } from "@/features/authentication/useMe";

import { Navigate, Outlet } from "react-router-dom";

export default function CheckUserLayer() {
  const { user } = useMe();

  if (!user) {
    return <Navigate to={`${Routes.auth}/${Routes.login}`} replace />;
  }

  return <Outlet />;
}
