"use client";

import { CheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

export default function SelectSearchCommandRender({
  value,
  placeholder = "Search framework...",
  optionsList,
  onSelect,
}: {
  value?: string;
  placeholder?: string;
  optionsList: Array<{ label: string; value: string }>;
  onSelect: { (value: string): void };
}) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>Not found</CommandEmpty>
        <CommandGroup>
          {optionsList.map((item, id) => (
            <CommandItem
              key={id}
              value={item.value}
              onSelect={() => {
                onSelect(item.value);
              }}
            >
              {value && (
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              )}
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
