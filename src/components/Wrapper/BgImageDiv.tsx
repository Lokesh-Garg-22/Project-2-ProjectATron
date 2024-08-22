import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function BgImageDiv({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-h-[calc(100vh-4rem)] grow bg-create-img bg-[length:max(60vw,100vh)] bg-fixed bg-[#0000ff]/50 bg-blend-darken bg-left-bottom"
      )}
      {...props}
    >
      {children}
    </div>
  );
}
