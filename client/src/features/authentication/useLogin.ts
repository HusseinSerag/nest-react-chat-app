import { Routes } from "@/constants/routes-names";
import { login } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signin, isPending } = useMutation({
    mutationFn: login,
    async onSuccess(data) {
      await queryClient.invalidateQueries();
      await queryClient.resetQueries();
      queryClient.removeQueries();
      toast.success("Sucessfully logged in!");
      !data.profileSetup
        ? navigate(`/${Routes.profile}`)
        : navigate(`/${Routes.chat}`);
    },
    onError: (e) => toast.error(e.message),
  });
  return {
    signin,
    isPending,
  };
}
