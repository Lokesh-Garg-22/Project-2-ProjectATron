import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/ListRenderer/ListRenderer";
import { ProjectInterface } from "@/components/Project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import { type TeamInterface } from "@/components/Team/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/Typography";
import Link from "next/link";

export default function Team({ team }: { team: TeamInterface }) {
  const projects: Array<ProjectInterface> = [
    { name: "Project 1", id: "awd234", tags: ["1"] },
    { name: "Project 2", id: "a46tdi", tags: ["2"] },
    { name: "Project 3", id: "aw456d", tags: ["3"] },
    { name: "Project 4", id: "awd5yh", tags: ["4"] },
    { name: "Project 5", id: "awd223", tags: ["5"] },
  ];

  return (
    <MainContainer className="items-center">
      <div className="w-full mb-2 max-w-2xl flex">
        <div className="grow">
          <TypographyH1>{team.name}</TypographyH1>
          <TypographyH3>
            Created By:{" "}
            <Link href={"/app/profile/" + team.hostID}>
              {team?.host?.name || "Creater"}
            </Link>
          </TypographyH3>
        </div>
        <Card>
          <CardHeader className="p-2">
            <TypographyH4>Members</TypographyH4>
          </CardHeader>
          <CardContent className="p-2 w-48 h-40 flex flex-col overflow-y-scroll">
            {team?.users &&
              team.users.map((ele, id) => (
                <Link
                  key={id}
                  href={"/app/profile/" + ele.id}
                  className="px-1 hover:bg-secondary"
                >
                  {ele.name}
                </Link>
              ))}
          </CardContent>
        </Card>
      </div>
      <div className="w-full my-2 mx-3 border rounded-full" />
      <ListRenderer
        className="w-full"
        list={projects}
        ItemComponent={(data, id) => <ProjectCard project={data} key={id} />}
      />
    </MainContainer>
  );
}
