import MainContainer from "@/components/global/MainContainer";
import { type ProjectInterface } from "@/lib/interface/project/interface";
import {
  TypographyH1,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "@/components/ui/Typography";
import Link from "next/link";
import { ReactNode } from "react";

export default function Project({ project }: { project: ProjectInterface }) {
  const tags: Array<ReactNode> = [];
  for (let i in project.tags) {
    if (parseInt(i) != 0) {
      tags.push(
        <div
          key={project.tags.length + i}
          className="h-6 border-accent-foreground border"
        />
      );
    }
    tags.push(<span key={i}>{project.tags[i]}</span>);
  }

  return (
    <MainContainer className="my-4">
      <div className="mx-4 flex justify-between">
        <div className="space-y-3">
          <TypographyH1>{project.name}</TypographyH1>
          <div className="flex">
            <TypographyH3>Created By: </TypographyH3>
            <Link href={"/app/profile/" + project.hostID}>
              <TypographyH3 className="ml-2 hover:scale-105">
                {project?.host?.name || "Creater"}
              </TypographyH3>
            </Link>
          </div>
          {project.team && (
            <div className="flex">
              <TypographyH3>Team:</TypographyH3>
              <Link href={"/app/team/" + project.team?.id}>
                <TypographyH3 className="ml-2 hover:scale-105">
                  {project.team?.name || "Team"}
                </TypographyH3>
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center space-y-5">
          <div className="flex gap-2">{tags}</div>
          {project.url && (
            <Link href={project.url} className="mx-2">
              <TypographyH4 className="w-fit hover:scale-105">
                Visit Site
              </TypographyH4>
            </Link>
          )}
        </div>
      </div>
      <TypographyP>{project.description}</TypographyP>
    </MainContainer>
  );
}
