import { MinusCircleIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Tags({
  values,
  form,
}: {
  values: String[];
  form?: undefined | { OnSubmit: (values: String[]) => void };
}) {
  return (
    <ScrollArea className="h-60 p-4 border rounded-lg">
      <div className="flex flex-wrap gap-4">
        {form && (
          <Popover>
            <PopoverTrigger>
              <Badge>
                Add <PlusIcon size="16" className="ml-1" />
              </Badge>
            </PopoverTrigger>
            <PopoverContent>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  const input = (event.target as HTMLElement)
                    .firstChild as HTMLInputElement;
                  if (input.value) form.OnSubmit([...values, input.value]);
                  input.value = "";
                }}
                className="flex gap-3"
              >
                <Input name="newTag" />
                <Button>Submit</Button>
              </form>
            </PopoverContent>
          </Popover>
        )}
        {values.map((ele, id) => (
          <Badge key={id}>
            {ele}
            {form && (
              <MinusCircleIcon
                onClick={() => {
                  form.OnSubmit(values.filter((e) => e != ele));
                }}
                size="20"
                className="ml-1 cursor-pointer rounded-full hover:text-secondary hover:bg-accent-foreground"
              />
            )}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  );
}
