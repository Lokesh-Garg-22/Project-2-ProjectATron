import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchBar({
  className,
}: {
  className?: string | object;
}) {
  return (
    <form className={cn("flex w-full max-w-3xl gap-2", className)}>
      <Input placeholder="Search" name="search" />
      <Button type="submit">Search</Button>
    </form>
  );
}
