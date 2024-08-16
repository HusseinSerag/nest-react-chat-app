import { getMe } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
  return {
    user,
    isLoading,
  };
}
