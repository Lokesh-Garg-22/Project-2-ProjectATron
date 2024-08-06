import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { TeamInterface } from "../../lib/interface/team/interface";

export default function TeamsCard() {
  const teams: Array<TeamInterface> = [
    { name: "Team 1", id: "982hbkma" },
    { name: "Team 1", id: "982hbkma" },
    { name: "Team 1", id: "982hbkma" },
    { name: "Team 1", id: "982hbkma" },
  ];

  return (
    <Card className="my-auto">
      <CardHeader>
        <CardTitle>
          <Link href="app/teams" className="hover:underline">
            Recent Teams
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-80 flex flex-col">
        {teams.map((ele, id) => (
          <Link
            key={id}
            href={"app/team/" + ele.id}
            className="block w-full py-1 px-2 hover:bg-slate-50/10"
          >
            {ele.name}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
