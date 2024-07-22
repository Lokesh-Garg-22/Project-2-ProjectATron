import { WebTitle } from "@/components/global/navBar/navBar";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2 } from "@/components/ui/Typography";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-[90vh] xl:m-24 m-0 xl:p-0 p-24 max-w-7xl">
      <div className="flex flex-col">
        <TypographyH2>
          Welcome to your own personlised Project Manager
        </TypographyH2>
        <TypographyH1>
          <WebTitle />
        </TypographyH1>
        <div className="flex justify-center items-center p-10">
          <Button asChild>
            <Link href="app">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
