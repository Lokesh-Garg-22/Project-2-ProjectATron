import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { TypographyH3 } from "../ui/Typography";

export default function ListRenderer<P>({
  ItemComponent,
  list,
  className,
  placeholder = "Empty!!",
  loading,
}: {
  ItemComponent: (data: P, id: number) => ReactNode;
  list: Array<P>;
  className?: string | object;
  placeholder?: string;
  loading?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {loading ? (
        <TypographyH3>Loading...</TypographyH3>
      ) : list.length > 0 ? (
        list.map(ItemComponent)
      ) : (
        <TypographyH3>{placeholder}</TypographyH3>
      )}
    </div>
  );
}
