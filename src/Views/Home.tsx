"use client";

import { WebTitle } from "@/components/global/navBar/navBar";
import LoginDialog from "@/components/global/user/loginDialog";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2 } from "@/components/ui/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (window) {
      if (window.localStorage.getItem("username")) router.push("/app");
    }
  }, []);

  return (
    <main className="min-h-[89vh] xl:mx-auto mx-0 xl:px-0 p-24 max-w-7xl">
      <div className="flex flex-col text-center">
        <TypographyH2>
          Welcome to your own personlised Project Manager
        </TypographyH2>
        <TypographyH1 className="my-10">
          <WebTitle />
        </TypographyH1>
        <div className="flex justify-center items-center p-10 my-5">
          {(
            <Button asChild>
              <Link href="/app">Get Started</Link>
            </Button>
          ) || (
            <LoginDialog
              DialogTriggerButton={({ children }: { children: ReactNode }) => (
                <Button asChild>{children}</Button>
              )}
              DialogTriggerText="Get Started"
            />
          )}
        </div>
      </div>
    </main>
  );
}
