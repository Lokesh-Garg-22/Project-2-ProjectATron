import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JSXElementConstructor, ReactNode, useEffect } from "react";
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
import { ProfileInterface } from "@/lib/interface/profile/interface";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  about: z.string(),
});

export default function EditProfileDialog({
  DialogTriggerButton,
  DialogTriggerText = "Edit Profile",
}: {
  DialogTriggerButton: JSXElementConstructor<{ children: ReactNode }>;
  DialogTriggerText?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
    },
  });
  const { toast } = useToast();
  const [active, setActive] = useState(true);
  const [user, setUser] = useState<ProfileInterface>();

  useEffect(() => {
    if (window) {
      (async () => {
        await fetch(`/api/user?id=${window.localStorage.getItem(windowUserid)}`)
          .then((res) => res.json())
          .then((res: { user?: ProfileInterface }) => {
            if (res?.user) {
              setUser(res.user);
              form.setValue("name", res.user.name);
              form.setValue("about", res.user.about);
            }
          });
      })();
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!active) return;
    setActive(false);
    const res: { msg: string; user: HydratedDocument<userSchema> } & {
      error: string;
    } = await fetch(`/api/user/editProfile`, {
      method: "POST",
      body: JSON.stringify({
        username: window.localStorage.getItem(windowUsername),
        password: window.localStorage.getItem(windowUserPassword),
        name:
          values.name != "" && values.name != user?.name
            ? values.name
            : undefined,
        about:
          values.about != "" && values.about != user?.about
            ? values.about
            : undefined,
      }),
    }).then((res) => res.json());
    if (!!res?.error) {
      toast({ title: res.error });
      setActive(true);
    } else {
      toast({ title: "Updated Successfully" });
      setActive(true);
    }
  }

  return (
    <Dialog>
      <DialogTriggerButton>
        <DialogTrigger>{DialogTriggerText}</DialogTrigger>
      </DialogTriggerButton>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Input placeholder="About" {...field} />
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
      </DialogContent>
    </Dialog>
  );
}
