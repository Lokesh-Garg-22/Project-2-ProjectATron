import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function MainContainer({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string | object;
}) {
  return (
    <div
      className={cn(
        "my-4 mx-auto px-1 h-fit max-w-6xl grow flex flex-col gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}
