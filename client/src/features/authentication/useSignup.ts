import { signup } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    async onSuccess() {
      await queryClient.invalidateQueries();
      await queryClient.resetQueries();
      queryClient.removeQueries();
      toast.success("Sucessfully created account!");
      navigate("/profile");
    },
    onError: (e) => toast.error(e.message),
  });
  return {
    mutate,
    isPending,
  };
}
