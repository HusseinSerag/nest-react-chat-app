import { completeProfile } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export function useCompleteProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: completeProfile,
    async onSuccess() {
      await queryClient.invalidateQueries();
      toast.success("Sucessfully updated your profile!");
    },
    onError: (e) => toast.error(e.message),
  });
  return {
    updateProfile,
    isPending,
  };
}
