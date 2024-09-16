import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ProjectInterface } from "../../lib/interface/project/interface";
import { useEffect, useState } from "react";
import { windowUserid } from "@/lib/data";

export default function ProjectsCard() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (window) {
        setLoading(true);
        setProjects([
          ...((await fetch(
            `/api/user/projects?id=${window.localStorage.getItem(
              windowUserid
            )}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then(async (res) => {
              if (res?.projects) return res.projects;
              return [];
            })) as ProjectInterface[]),
        ]);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card className="my-auto">
      <CardHeader>
        <CardTitle>
          <Link href="app/projects" className="hover:underline">
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
