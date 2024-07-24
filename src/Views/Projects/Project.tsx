import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/ListRenderer/ListRenderer";
import { type ProjectInterface } from "@/components/Project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/Typography";
import Link from "next/link";
import { ReactNode } from "react";

export default function Project({ project }: { project: ProjectInterface }) {
  const tags: Array<ReactNode> = [];
  // for(){}
  return (
    <MainContainer>
      <TypographyH1>{project.name}</TypographyH1>
      <div className="flex gap-2">
        {project.tags.map((ele, id) => (
          <div key={id} className="flex gap-1">
            {id != 0 && <span className="text-accent-foreground">|</span>}
            <span>{ele}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">{tags}</div>
      <TypographyH3>
        Created By:{" "}
        <Link href={"/app/profile/" + project.hostID}>
          {project?.host?.name || "Creater"}
        </Link>
      </TypographyH3>
    </MainContainer>
  );
}
