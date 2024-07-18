"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH1 } from "@/components/ui/Typography";
import Login from "./login";
import SignUp from "./signUp";

export default function NavBar() {
  return (
    <>
      <nav className="w-full h-16 fixed bg-background border-b">
        <div className="py-1 h-full bg-muted/50">
          <div className="mx-2 flex items-center justify-between">
            <TypographyH1>
              Project<span className="text-muted-foreground">A</span>Tron
            </TypographyH1>
            <div className="p-1">
              <Dialog>
                <Button asChild className="text-sm font-semibold">
                  <DialogTrigger>Login</DialogTrigger>
                </Button>
                <DialogContent>
                  <DialogDescription>
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
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
}
