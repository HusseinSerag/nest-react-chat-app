import { deleteProfilePicture } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export function useDeleteProfilePicture() {
  const queryClient = useQueryClient();

  const { mutate: deletePicture, isPending } = useMutation({
    mutationFn: deleteProfilePicture,
    async onSuccess() {
      await queryClient.invalidateQueries();
      toast.success("Profile picture successfully deleted!!");
    },
    onError: (e) => toast.error(e.message),
  });
  return {
    deletePicture,
    isPending,
  };
}
