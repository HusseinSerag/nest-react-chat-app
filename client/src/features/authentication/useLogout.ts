import { logout } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signout, isPending } = useMutation({
    mutationFn: logout,
    async onSuccess() {
      await queryClient.invalidateQueries();
      await queryClient.resetQueries();
      queryClient.removeQueries();

      toast.success("Sucessfully logged out!");
    },
    onError: (e) => toast.error(e.message),
  });
  return {
    signout,
    isPending,
  };
}
