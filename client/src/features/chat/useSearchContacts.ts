import { searchContacts } from "@/lib/api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useSearchContacts() {
  const [pageParam, setNextPageParam] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,

    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["contacts", searchTerm],
    queryFn: ({ pageParam }) => searchContacts(searchTerm, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages, last) => {
      if (lastPage?.count === 0) {
        return undefined;
      }
      return last + 1;
    },
  });

  const returnedData =
    data?.pages &&
    data?.pages
      .filter((value) => {
        return value;
      })
      .map((value) => value?.users)
      .flat();
  return {
    data: returnedData,
    pageParam,
    setNextPageParam,
    setSearchTerm,
    searchTerm,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  };
}
