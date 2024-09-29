"use client";

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
import BgImageDiv from "@/components/Wrapper/BgImageDiv";
import SelectSearchCommandRender from "@/components/Wrapper/SelectSearchInputRender";
import { projectSchema } from "@/lib/db/models/Project";
import { teamSchema } from "@/lib/db/models/Team";
import { TeamInterface } from "@/lib/interface/team/interface";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDownIcon } from "lucide-react";
import { HydratedDocument } from "mongoose";
import { useEffect, useState } from "react";
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
  const [teamsList, setTeamsList] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (typeof window == "undefined") return;
    (async () => {
      const result: TeamInterface[] = await fetch("/api/teams", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: window.localStorage.getItem("username"),
          password: window.localStorage.getItem("password"),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.teams) {
            return res.teams.map((ele: HydratedDocument<teamSchema>) => {
              return { ...ele, id: ele._id };
            });
          }
          return [];
        });
      setTeamsList(
        result.map((ele) => {
          return { label: ele.name, value: ele.id };
        })
      );
    })();
  }, []);

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
    })
      .then((res) => res.json())
      .then(
        (res: {
          [index: string]: any;
          project?: HydratedDocument<projectSchema>;
        }) => {
          if (res.project) res.project.id = res?.project?._id;
          return res;
        }
      );
    if (!!res?.error) {
      toast({ title: res.error });
      setActive(true);
    } else {
      console.log(res);
      toast({ title: "Project Created Successfully" });
      setTimeout(() => {
        window.location.href = `/app/project/${res.project?.id}`;
      }, 1000);
      setActive(true);
    }
  }

  return (
    <BgImageDiv>
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
    </BgImageDiv>
  );
}
