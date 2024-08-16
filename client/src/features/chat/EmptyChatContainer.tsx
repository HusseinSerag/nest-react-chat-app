import EmptyContainer from "@/components/custom/EmptyContainer";

export default function EmptyChatContainer() {
  return (
    <EmptyContainer
      className={
        "flex-1 px-2 sm:bg-[#1c1d25] sm:flex flex-col justify-center items-center hidden duration-1000 transition-all"
      }
    >
      Hi<span className="text-purple-500">!</span> Welcome to{" "}
      <span className="text-purple-500">Aysnc</span> Chat app{" "}
      <span className="text-purple-500">.</span>
    </EmptyContainer>
  );
}
