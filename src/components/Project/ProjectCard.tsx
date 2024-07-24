import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { ProjectInterface } from "./interface";
import { TypographyH2, TypographyP } from "../ui/Typography";

export default function ProjectCard({
  project,
}: {
  project: ProjectInterface;
}) {
  return (
    <Card className="my-auto max-w-[24rem] grow">
      <CardContent className="w-80 pt-6 flex flex-col">
        <Link href={"/app/project/" + project.id} className="hover:underline">
          <TypographyH2>{project.name}</TypographyH2>
        </Link>
        <div className="py-1 flex gap-1">
          {project.tags.map((ele, id) => (
            <p
              key={id}
              className="px-2 rounded-lg border hover:bg-slate-50/5 shadow shadow-accent-foreground"
            >
              ele
            </p>
          ))}
        </div>
        <TypographyP>Discription</TypographyP>
        {project?.url && (
          <a href={project.url} target="_blank" className="hover:underline">
            Vist Project
          </a>
        )}
      </CardContent>
    </Card>
  );
}
