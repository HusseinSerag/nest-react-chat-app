import Logo from "@/components/custom/Logo";
import Title from "@/components/custom/Title";
import UserNavbarInfo from "@/components/custom/UserNavbarInfo";
import NewDM from "./NewDM";

export default function Navbar() {
  return (
    <div className="border-r-2 w-full border-[#2f303b] sm:w-[45vw]  bg-[#1b1c24] lg:w-[30vw] flex flex-col justify-between xl:w-[25vw] h-full md:w-[35vw]">
      <div>
        <div className="pt-3">
          <Logo />
        </div>
        <div className="my-5">
          <div className="flex items-center justify-between pr-10">
            <Title text="direct messages" />
            <NewDM />
          </div>
        </div>
        <div className="my-5">
          <div className="flex items-center justify-between pr-10">
            <Title text="channels" />
          </div>
        </div>
      </div>
      <UserNavbarInfo />
    </div>
  );
}
