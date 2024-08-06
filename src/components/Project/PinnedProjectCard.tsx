import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { ProjectInterface } from "../../lib/interface/project/interface";
import { TypographyH2 } from "../ui/Typography";

export default function PinnedProjectCard({
  project,
}: {
  project: ProjectInterface;
}) {
  return (
    <Card className="my-auto">
      <CardContent className="w-80 pt-6 flex flex-col">
        <Link href={"app/project/" + project.id} className="hover:underline">
          <TypographyH2>{project.name}</TypographyH2>
        </Link>
        <div className="py-1 flex gap-1">
          {project.tags.map((ele, id) => (
            <p key={id} className="px-2 rounded-lg border hover:bg-slate-50/5">
              ele
            </p>
          ))}
        </div>
        {project?.url && (
          <a href={project.url} target="_blank" className="hover:underline">
            Vist Project
          </a>
        )}
      </CardContent>
    </Card>
  );
}
