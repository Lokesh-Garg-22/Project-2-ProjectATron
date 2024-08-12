"use client";

import MainContainer from "@/components/global/MainContainer";
import Tags from "@/components/Project/Tags";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH1 } from "@/components/ui/Typography";
import { useToast } from "@/components/ui/use-toast";
import SelectSearchCommandRender from "@/components/Wrapper/SelectSearchInputRender";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string(),
  url: z.string(),
  team: z.string(),
  tags: z.array(z.string()),
});

export default function CreateProject() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      team: "",
      tags: [],
    },
  });
  const { toast } = useToast();
  const [active, setActive] = useState(true);

  const teamsList = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!active) return;
    setActive(false);
    const res = await fetch(`/api/project/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      }),
    }).then((res) => res.json());
    if (!!res?.error) {
      toast({ title: res.error });
      setActive(true);
    } else {
      // TODO
      console.log(res);
      toast({ title: "Project Created Successfully" });
      setActive(true);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] grow bg-[url('/a-stunning-digital-illustration-with-a-dominant-bl.jpeg')] bg-no-repeat bg-contain bg-fixed bg-left bg-[#0000ff]/50 bg-blend-darken">
      <div className="ml-auto px-8 py-4 h-full w-1/2 max-w-3xl bg-background grow flex flex-col gap-2">
        <TypographyH1 className="text-center">Create New Project</TypographyH1>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site</FormLabel>
                  <FormControl>
                    <Input placeholder="Site Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO Team Id Search */}
            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] mx-4 justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? teamsList.find(
                                (item) => item.value === field.value
                              )?.label
                            : "Team" || "Select..."}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <SelectSearchCommandRender
                        value={field.value}
                        optionsList={teamsList}
                        onSelect={(value) => {
                          form.setValue("team", value);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Tags
                      values={field.value}
                      form={{ OnSubmit: field.onChange }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={!active} type="submit">
                  Submit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Do you want to Submit?</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    disabled={!active}
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                  <DialogClose asChild>
                    <Button>Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </div>
    </div>
  );
}
