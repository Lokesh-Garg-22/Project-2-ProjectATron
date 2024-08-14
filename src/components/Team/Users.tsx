import Link from "next/link";
import { ProfileInterface } from "../../lib/interface/profile/interface";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SelectSearchCommandRender from "../Wrapper/SelectSearchInputRender";

export default function Users({
  values,
  form,
}: {
  values: ProfileInterface[];
  form?: {
    OnSubmit: (values: ProfileInterface[]) => void;
    UserList: ProfileInterface[];
  };
}) {
  return (
    <Card>
      <CardContent className="px-0 py-3">
        <ScrollArea className="h-72">
          {form && (
            <Popover>
              <PopoverTrigger asChild>
                <div
                  role="combobox"
                  className="px-6 py-2 flex items-center cursor-pointer hover:bg-primary-foreground/50"
                >
                  Add Member
                  <PlusCircleIcon size={20} className="ml-auto" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <SelectSearchCommandRender
                  placeholder="Search Member"
                  optionsList={form.UserList.map((ele) => {
                    return { label: ele.name, value: ele.username };
                  })}
                  onSelect={(value) => {
                    const user: ProfileInterface = form.UserList.filter(
                      (ele) => ele.username == value
                    )[0];
                    form.OnSubmit([...values, user]);
                  }}
                />
              </PopoverContent>
            </Popover>
          )}
          {values.map((ele, id) => (
            <Link
              key={id}
              href={`/app/profile/${ele.id}`}
              target="_blank"
              className="px-6 py-2 gap-3 flex items-center hover:bg-primary-foreground /50"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={ele.avatar} />
                <AvatarFallback>{ele.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              {ele.name}
              {form && (
                <MinusCircleIcon
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    form.OnSubmit(values.filter((_, i) => i != id));
                  }}
                  size={20}
                  className="ml-auto cursor-pointer rounded-full hover:text-secondary hover:bg-accent-foreground"
                />
              )}
            </Link>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
