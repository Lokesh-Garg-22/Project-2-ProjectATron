import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { TeamInterface } from "../../lib/interface/team/interface";
import { useEffect, useState } from "react";
import { windowUsername, windowUserPassword } from "@/lib/data";
import { HydratedDocument } from "mongoose";
import { teamSchema } from "@/lib/db/models/Team";

export default function TeamsCard() {
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (window) {
        setLoading(true);
        setTeams([
          ...((await fetch(`/api/teams`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: window.localStorage.getItem(windowUsername),
              password: window.localStorage.getItem(windowUserPassword),
            }),
          })
            .then((res) => res.json())
            .then(async (res) => {
              if (res?.teams) return res.teams;
              return [];
            })
            .then((res) =>
              res.map((ele: HydratedDocument<teamSchema>) => {
                ele.id = ele._id;
                return ele;
              })
            )) as TeamInterface[]),
        ]);
        setLoading(false);
      }
    })();
  }, []);

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
        {loading
          ? "Loading..."
          : teams.length <= 0
          ? "No Team Found!"
          : teams.map((ele, id) => (
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
