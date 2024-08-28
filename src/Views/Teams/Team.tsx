import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import ProjectCard from "@/components/Project/ProjectCard";
import { ProjectInterface } from "@/lib/interface/project/interface";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import { TeamInterface } from "@/lib/interface/team/interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/ui/Typography";
import Link from "next/link";
import Users from "@/components/Team/Users";

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
                {team?.host?.name || ""}
              </TypographyH3>
            </Link>
          </div>
        </div>
        <Users
          values={team.users as ProfileInterface[]}
          classname="w-60 h-60"
        />
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
