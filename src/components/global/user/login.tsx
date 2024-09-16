"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { windowUserid, windowUsername, windowUserPassword } from "@/lib/data";
import { userSchema } from "@/lib/db/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { HydratedDocument } from "mongoose";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const [active, setActive] = useState(true);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!active) return;
    setActive(false);
    const res: { msg: string; user: HydratedDocument<userSchema> } & {
      error: string;
    } = await fetch(
      `/api/user/login?username=${values.username.toLowerCase()}&password=${
        values.password
      }`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    if (!!res?.error) {
      toast({ title: res.error });
      setActive(true);
    } else {
      res.user.id = res.user._id;
      window.localStorage.setItem(windowUsername, res.user.username);
      window.localStorage.setItem(windowUserid, res.user.id);
      window.localStorage.setItem(windowUserPassword, res.user.password);
      toast({ title: "Logged in Successfully" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setActive(true);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!active} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
