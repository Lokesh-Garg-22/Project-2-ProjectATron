import { WebTitle } from "@/components/global/navBar/navBar";
import LoginDialog from "@/components/global/user/loginDialog";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2 } from "@/components/ui/Typography";
import Link from "next/link";
import { ReactNode } from "react";

export default function Page() {
  return (
    <main className="min-h-[90vh] xl:m-24 m-0 xl:p-0 p-24 max-w-7xl">
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
