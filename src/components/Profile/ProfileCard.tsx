import { User2Icon } from "lucide-react";
import { TypographyH3, TypographyH4, TypographyP } from "../ui/Typography";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileCard() {
  return (
    <Card className="my-auto">
      <CardContent className="w-96 h-44 pt-6 flex gap-x-2">
        <div className="w-32 h-full flex items-center justify-center">
          <User2Icon className="w-full" />
        </div>
        <div className="h-full border-2 rounded" />
        <div className="grow text-right">
          <TypographyH3>Name</TypographyH3>
          <TypographyH4>About You</TypographyH4>
          <TypographyP>
            Projects
            <span className="bg-slate-50/10 hover:bg-slate-50/20 rounded-lg px-2 py-1 ml-2">
              1
            </span>
          </TypographyP>
        </div>
      </CardContent>
    </Card>
  );
}
