import { User2Icon } from "lucide-react";
import { TypographyH3, TypographyH4, TypographyP } from "../ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "./interface";

export default function PersonalProfileCard() {
  const profile: Profile = {
    name: "Name",
    about: "About You",
    projects: 1,
    id: "928347",
  };

  return (
    <Card className="my-auto">
      <CardContent className="max-sm:w-72 w-96 h-44 pt-6 flex gap-x-2">
        <div className="w-32 h-full flex items-center justify-center">
          <User2Icon className="w-full h-full" />
        </div>
        <div className="h-full border-2 rounded" />
        <div className="grow text-right">
          <TypographyH3>{profile.name}</TypographyH3>
          <TypographyH4>{profile.about}</TypographyH4>
          <TypographyP>
            Projects
            <span className="bg-slate-50/10 hover:bg-slate-50/20 rounded-lg px-2 py-1 ml-2">
              {profile.projects}
            </span>
          </TypographyP>
        </div>
      </CardContent>
    </Card>
  );
}
