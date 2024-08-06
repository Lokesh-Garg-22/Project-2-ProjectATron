import { User2Icon } from "lucide-react";
import { TypographyH3, TypographyH4, TypographyP } from "../ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileInterface } from "../../lib/interface/profile/interface";
import Link from "next/link";

export default function ProfileCard({
  profile,
}: {
  profile: ProfileInterface;
}) {
  return (
    <Card className="my-auto">
      <CardContent className="w-80 h-44 pt-6 flex gap-x-2">
        <div className="w-32 h-full flex items-center justify-center">
          <User2Icon className="w-full h-full" />
        </div>
        <div className="h-full border-2 rounded" />
        <div className="grow text-right">
          <Link href={"/app/profile/" + profile.id}>
            <TypographyH3>{profile.name}</TypographyH3>
          </Link>
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
