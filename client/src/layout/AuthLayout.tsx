import { Card, CardContent } from "@/components/ui/card";

import { Routes } from "@/constants/routes-names";
import clsx from "clsx";

import { Link, Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const locationObj = useLocation();
  const pathname = locationObj.pathname;

  return (
    <div className="flex h-full justify-center items-center w-full">
      <Card className="shadow-2xl rounded-2xl w-[80%] h-[80%] max-w-[800px] border-white border-2">
        <CardContent className="flex  flex-row items-center h-full">
          <>
            <div className="flex-1 w-full flex flex-col gap-6 p-2 sm:p-8">
              <div className="text-center space-y-4">
                <h1 className=" text-2xl items-center text-center justify-center flex  sm:text-4xl font-semibold">
                  <div>Welcome! </div>{" "}
                  <img className="h-16 md:h-[100px]" src="/victory.svg" />
                </h1>
                <h2 className="sm:text-sm text-xs font-semibold">
                  Fill in your details to get started with our chat app!
                </h2>
              </div>
              <div className="w-full">
                <div className="w-full flex gap-2">
                  <Link
                    className={clsx(
                      "flex-1 px-1 py-3 shadow-lg text-sm text-center border-b font-semibold",
                      pathname === `/auth/${Routes.login}`
                        ? "  border-b-purple-500"
                        : "text-black/60 border-b-black/20"
                    )}
                    to={Routes.login}
                  >
                    <button>Login</button>
                  </Link>
                  <Link
                    className={clsx(
                      "flex-1 px-1 py-3 shadow-lg text-sm text-center border-b font-semibold",
                      pathname === `/auth/${Routes.signup}`
                        ? "  border-b-purple-500"
                        : "text-black/60 border-b-black/20"
                    )}
                    to={Routes.signup}
                  >
                    <button>Sign up</button>
                  </Link>
                </div>
              </div>

              <div>
                <Outlet />
              </div>
            </div>
          </>
          <div className="lg:flex-1 hidden lg:block">
            <img src="/login2.png" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
