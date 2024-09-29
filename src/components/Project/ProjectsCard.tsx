import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ProjectInterface } from "../../lib/interface/project/interface";
import { useEffect, useState } from "react";
import { windowUsername, windowUserPassword } from "@/lib/data";
import { getProjects } from "./utils";

export default function ProjectsCard() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window) {
      (async () => {
        setLoading(true);
        const userId = await fetch("/api/user/id", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            username: window.localStorage.getItem(windowUsername),
            password: window.localStorage.getItem(windowUserPassword),
          }),
        })
          .then((res) => res.json())
          .then((res) => (res.userId ? res.userId : ""))
          .catch((err) => console.log(err));
        setUserId(userId);
        setProjects(
          await getProjects({
            link: "/api/user/projects",
            userId,
          })
        );
        setLoading(false);
      })();
    }
  }, []);

  return (
    <Card className="my-auto">
      <CardHeader>
        <CardTitle>
          <Link
            href={`app/profile/${userId}/projects`}
            className="hover:underline"
          >
            Recent Projects
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-80 flex flex-col capitalize">
        {loading
          ? "Loading..."
          : projects.length <= 0
          ? "No Project Found!"
          : projects.map((ele, id) => (
              <Link
                key={id}
                href={"app/project/" + ele.id}
                className="block w-full py-1 px-2 hover:bg-slate-50/10"
              >
                {ele.name}
              </Link>
            ))}
      </CardContent>
    </Card>
  );
}
