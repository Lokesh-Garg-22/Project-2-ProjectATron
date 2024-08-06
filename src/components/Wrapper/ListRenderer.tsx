import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function ListRenderer<P>({
  ItemComponent,
  list,
  className,
}: {
  ItemComponent: (data: P, id: number) => ReactNode;
  list: Array<P>;
  className?: string | object;
}) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {list.map(ItemComponent)}
    </div>
  );
}
