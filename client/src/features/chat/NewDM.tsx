import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Loader2, Plus } from "lucide-react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import EmptyContainer from "@/components/custom/EmptyContainer";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useSearchContacts } from "./useSearchContacts";
import Contact from "./Contact";
import { useQueryClient } from "@tanstack/react-query";

export default function NewDM() {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const {
    data,
    setSearchTerm,
    searchTerm,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useSearchContacts();
  async function searchContacts(e: ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  }
  function fetchMoreData(e: React.UIEvent<HTMLDivElement>) {
    const amountOfScrollLeft = e.currentTarget.scrollTop;
    const endOfScroll = e.currentTarget.scrollHeight;
    const nearTheEnd = endOfScroll - amountOfScrollLeft;

    if (nearTheEnd < 250 && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }

  function closeModal() {
    setOpenModal(false);
  }
  useEffect(
    function () {
      if (!openModal && data) {
        queryClient.resetQueries({
          queryKey: ["contacts"],
        });
        setSearchTerm("");
      }
    },
    [openModal, data]
  );
  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => setOpenModal(true)}>
              <Plus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300" />
            </TooltipTrigger>

            <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
              Select New Contact
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent className="bg-[#181920] h-[400px] flex flex-col border-none text-white w-[90%] max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={searchContacts}
            />
          </div>
          {data && data.length > 0 && (
            <ScrollArea
              viewportScroll={fetchMoreData}
              className="flex-1 w-full"
            >
              {data.map((contact) => (
                <Fragment key={contact?._id}>
                  <Contact
                    callback={() => {
                      closeModal();
                    }}
                    contact={contact!}
                  />
                </Fragment>
              ))}
              {isFetchingNextPage && (
                <div className="flex w-full items-center justify-center pb-4">
                  <Loader2 className="text-white w-8 h-8 animate-spin" />
                </div>
              )}
              {!hasNextPage && (
                <p className="w-full text-center text-sm text-muted-foreground">
                  End of results
                </p>
              )}
            </ScrollArea>
          )}
          {isPending && (
            <div className="flex h-full w-full items-center justify-center pb-4">
              <Loader2 className="text-white w-8 h-8 animate-spin" />
            </div>
          )}
          {!isPending &&
            (!data || (data.length === 0 && searchTerm === "")) && (
              <div className="mt-4">
                <EmptyContainer
                  className="flex items-center flex-col justify-center"
                  height={100}
                  width={100}
                >
                  Hi<span className="text-purple-500">!</span> Search for{" "}
                  <span className="text-purple-500">Contacts</span>
                </EmptyContainer>
              </div>
            )}
          {!isPending &&
            (!data || (data.length === 0 && searchTerm !== "")) && (
              <div className="mt-4">
                <EmptyContainer
                  className="flex items-center flex-col justify-center"
                  height={100}
                  width={100}
                >
                  No <span className="text-purple-500">Contacts</span> Found!
                </EmptyContainer>
              </div>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
