import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import { useEffect, useState } from "react";
import { windowUsername, windowUserPassword } from "@/lib/data";

export default function FollowedProfilesCard() {
  const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (window) {
        setLoading(true);
        setProfiles([
          ...((await fetch(`/api/user/follow/list`, {
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
              if (res.followed) {
                const data: any[] = [];
                for (let ele of res.followed.followedIDs) {
                  const d = await fetch(`/api/user?id=${ele}`)
                    .then((res) => res.json())
                    .then((res) => {
                      if (res?.user) return { ...res.user, id: res.user._id };
                      return null;
                    });
                  if (d) data.push(d);
                }
                return data;
              }
              return [];
            })) as ProfileInterface[]),
        ]);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card className="my-auto">
      <CardHeader>
        <CardTitle>
          <Link href="app/followedProfiles" className="hover:underline">
            Followed Profiles
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-80 flex flex-col capitalize">
        {loading
          ? "Loading..."
          : profiles.length == 0
          ? "No one Followed yet!"
          : profiles.map((ele, id) => (
              <Link
                key={id}
                href={"app/profile/" + ele.id}
                className="block w-full py-1 px-2 hover:bg-slate-50/10"
              >
                {ele.name}
              </Link>
            ))}
      </CardContent>
    </Card>
  );
}
