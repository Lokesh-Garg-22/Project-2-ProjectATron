import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Project } from "./interface";
import { TypographyH2, TypographyMuted, TypographyP } from "../ui/Typography";

export default function PinnedProjectCard({ project }: { project: Project }) {
  return (
    <Card className="my-auto">
      <CardContent className="w-80 pt-6 flex flex-col">
        <Link href={"app/project/" + project.id} className="hover:underline">
          <TypographyH2>{project.name}</TypographyH2>
        </Link>
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
