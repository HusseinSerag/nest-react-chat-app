import { ReactNode } from "react";
import Lottie from "lottie-react";
import { animation } from "@/lib/utils";
interface EmptyContainerProps {
  children: ReactNode;
  height?: number;
  width?: number;
  className: string;
}
export default function EmptyContainer({
  children,
  height = 200,
  width = 200,
  className,
}: EmptyContainerProps) {
  return (
    <div className={className}>
      <Lottie
        style={{
          height,
          width,
        }}
        animationData={animation}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="poppins-medium">{children}</h3>
      </div>
    </div>
  );
}
