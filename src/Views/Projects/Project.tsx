import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { type ProjectInterface } from "@/components/Project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
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
        <div key={i} className="h-6 border-accent-foreground border" />
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
      <TypographyP>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        quaerat, quod, sit culpa dolorem unde dolore laudantium, consequuntur
        quas iure odio optio assumenda natus amet iste voluptates et harum
        placeat? Animi assumenda, ex ducimus esse ad vel in enim, maxime,
        explicabo error iusto accusantium? Id quo iste illo quia beatae!
      </TypographyP>
    </MainContainer>
  );
}
