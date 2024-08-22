"use client";

import Users from "@/components/Team/Users";
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
import { TypographyH1 } from "@/components/ui/Typography";
import { useToast } from "@/components/ui/use-toast";
import BgImageDiv from "@/components/Wrapper/BgImageDiv";
import { teamSchema } from "@/lib/db/models/Team";
import { userSchema } from "@/lib/db/models/User";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { HydratedDocument } from "mongoose";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  users: z.array(z.any()),
});

export default function CreateTeam() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      users: [],
    },
  });
  const { toast } = useToast();
  const [active, setActive] = useState(true);
  const [UserList, setUserList] = useState<ProfileInterface[]>([]);

  useEffect(() => {
    if (typeof window == "undefined") return;
    (async () => {
      const result: ProfileInterface[] = await fetch("/api/user/list", {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) =>
          res.map((ele: HydratedDocument<userSchema>) => {
            return { ...ele, id: ele._id };
          })
        );
      setUserList(result);
    })();
  }, []);

  async function onSubmit(
    values: z.infer<typeof formSchema> & { userIDs?: string[] }
  ) {
    if (!active) return;
    setActive(false);
    try {
      values.userIDs = values.users.map((ele) => ele.id);
      const res = await fetch(`/api/team/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          userIDs: values.userIDs,
          username: window.localStorage.getItem("username"),
          password: window.localStorage.getItem("password"),
        }),
      })
        .then((res) => res.json())
        .then(
          (res: {
            [index: string]: any;
            team?: HydratedDocument<teamSchema>;
          }) => {
            if (res.team) res.team.id = res?.team?._id;
            return res;
          }
        );
      if (!!res?.error) {
        toast({ title: res.error });
        setActive(true);
      } else {
        console.log(res);
        toast({ title: "Team Created Successfully" });
        setTimeout(() => {
          window.location.href = `/app/team/${res.team?.id}`;
        }, 1000);
        setActive(true);
      }
    } catch (err) {
      setActive(true);
      console.error(err);
    }
  }

  return (
    <BgImageDiv>
      <div className="ml-auto px-8 py-4 h-full w-1/2 max-w-3xl bg-background grow flex flex-col gap-2">
        <TypographyH1 className="text-center my-4">
          Create New Team
        </TypographyH1>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Team Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="users"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Members</FormLabel>
                  <FormControl>
                    <Users
                      values={field.value}
                      form={{ OnSubmit: field.onChange, UserList: UserList }}
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
