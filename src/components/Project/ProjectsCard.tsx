import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ProjectInterface } from "../../lib/interface/project/interface";

export default function ProjectsCard() {
  const projects: Array<ProjectInterface> = [
    { name: "Project 1", id: "982hbkma" },
    { name: "Project 1", id: "982hbkma" },
    { name: "Project 1", id: "982hbkma" },
    { name: "Project 1", id: "982hbkma" },
  ];

  return (
    <Card className="my-auto">
      <CardHeader>
        <CardTitle>
          <Link href="app/projects" className="hover:underline">
            Recent Projects
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-80 flex flex-col">
        {projects.map((ele, id) => (
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
