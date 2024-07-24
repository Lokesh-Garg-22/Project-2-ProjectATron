import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { TeamInterface } from "./interface";
import { TypographyH2, TypographyP } from "../ui/Typography";

export default function TeamCard({ team }: { team: TeamInterface }) {
  return (
    <Card className="my-auto max-w-[24rem] grow">
      <CardContent className="w-80 pt-6 flex flex-col">
        <Link href={"/app/team/" + team.id} className="hover:underline">
          <TypographyH2>{team.name}</TypographyH2>
        </Link>
        <TypographyP>Members: {team.userIDs.length}</TypographyP>
      </CardContent>
    </Card>
  );
}
