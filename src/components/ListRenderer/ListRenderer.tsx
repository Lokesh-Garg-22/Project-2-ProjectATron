import { cn } from "@/lib/utils";
import { ComponentType, ReactNode } from "react";

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
    <div className={cn("flex flex-wrap gap-2", className)}>
      {list.map(ItemComponent)}
    </div>
  );
}
