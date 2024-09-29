"use client";

import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/Typography";
import Link from "next/link";
import LoginDialog from "../user/loginDialog";
import { ReactNode, useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout, { logout } from "../user/logout";
import EditProfileDialog from "../user/editProfileDialog";

export default function NavBar() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (!!window && window.localStorage.getItem("username")) setLogin(true);
    else setLogin(false);
  }, []);
  const LoginButton = () => (
    <LoginDialog
      DialogTriggerButton={({ children }: { children: ReactNode }) => (
        <Button asChild className="text-sm font-semibold">
          {children}
        </Button>
      )}
    />
  );

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
              {login ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarFallback>
                        {window.localStorage
                          .getItem("username")
                          ?.charAt(0)
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <EditProfileDialog
                      DialogTriggerButton={({
                        children,
                      }: {
                        children: ReactNode;
                      }) => (
                        <DropdownMenuItem
                          onClick={(event) => {
                            event.preventDefault();
                          }}
                          className="text-sm font-semibold"
                        >
                          {children}
                        </DropdownMenuItem>
                      )}
                    />
                    <DropdownMenuItem onClick={logout}>
                      <Logout />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <LoginButton />
              )}
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
