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
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="w-full h-16 fixed bg-background border-b">
        <div className="py-1 h-full bg-secondary/50 flex flex-col justify-center">
          <div className="mx-4 flex items-center justify-between">
            <Link href="/app">
              <TypographyH1>
                <WebTitle />
              </TypographyH1>
            </Link>
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

export function WebTitle() {
  return (
    <>
      Project<span className="text-accent-foreground">A</span>Tron
    </>
  );
}
