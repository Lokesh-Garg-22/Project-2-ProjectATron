import { hostURL } from "@/lib/data";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import { ProjectInterface } from "@/lib/interface/project/interface";
import { TeamInterface } from "@/lib/interface/team/interface";
import { urlParse } from "@/lib/utils";
import Team from "@/Views/Teams/Team";
import { notFound } from "next/navigation";

async function getTeam(id: string) {
  const data: {
    team?: TeamInterface;
    error?: string;
  } = await fetch(`${urlParse(hostURL as string)}/api/team?id=${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.team) res.team.id = res.team._id;
      return res;
    });
  if (data?.error) notFound();
  if (data.team) {
    data.team.host = (await fetch(
      `${urlParse(hostURL as string)}/api/user?id=${data.team.hostID}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return { ...res.user, id: res.user._id };
      })
      .catch(() => {
        return { name: "", id: data.team?.hostID, username: "" };
      })) as ProfileInterface;
    data.team.users = [];
    for (let ele of data.team.userIDs) {
      data.team.users?.push(
        (await fetch(`${urlParse(hostURL as string)}/api/user?id=${ele}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            return { ...res.user, id: res.user._id };
          })
          .catch(() => {
            return { name: "", id: ele, username: "" };
          })) as ProfileInterface
      );
    }
  }
  return data.team;
}

async function getProjects(id: string) {
  const data: {
    projects?: ProjectInterface[];
    error?: string;
  } = await fetch(`${urlParse(hostURL as string)}/api/team/projects?id=${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.projects)
        res.projects = res.projects.map(
          (ele: ProjectInterface & { _id: string }) => {
            return { ...ele, id: ele._id };
          }
        );
      return res;
    });
  if (data?.error) notFound();
  return data.projects;
}

export default async function Page({ params }: { params: { id: string } }) {
  const data: {
    team?: TeamInterface;
    projects?: ProjectInterface[];
  } = {
    team: await getTeam(params.id),
    projects: await getProjects(params.id),
  };

  return (
    <Team
      team={data.team as TeamInterface}
      projects={data.projects as ProjectInterface[]}
    />
  );
}
