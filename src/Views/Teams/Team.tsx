import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
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

export default function Team({
  team,
  projects = [],
}: {
  team: TeamInterface;
  projects?: Array<ProjectInterface>;
}) {
  return (
    <MainContainer className="items-center my-4">
      <div className="w-full my-2 max-w-2xl flex">
        <div className="grow space-y-4">
          <TypographyH1>{team.name}</TypographyH1>
          <div className="flex">
            <TypographyH3>Created By:</TypographyH3>
            <Link href={"/app/profile/" + team.hostID}>
              <TypographyH3 className="ml-2 hover:scale-105">
                {team?.host?.name || "Creater"}
              </TypographyH3>
            </Link>
          </div>
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
