import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUp from "./signUp";
import Login from "./login";
import { JSXElementConstructor, ReactNode } from "react";

export default function LoginDialog({
  DialogTriggerButton,
  DialogTriggerText = "Login",
}: {
  DialogTriggerButton: JSXElementConstructor<{ children: ReactNode }>;
  DialogTriggerText?: string;
}) {
  return (
    <Dialog>
      <DialogTriggerButton>
        <DialogTrigger>{DialogTriggerText}</DialogTrigger>
      </DialogTriggerButton>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <Tabs defaultValue="login" className="">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="grow">
              Login
            </TabsTrigger>
            <TabsTrigger value="signUp" className="grow">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUp />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
