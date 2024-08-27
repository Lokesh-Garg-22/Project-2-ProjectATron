import { hostURL } from "@/lib/data";
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
        return { name: res.user.name, id: res.user._id };
      })
      .catch(() => {
        return { name: "", id: data.team?.hostID };
      })) as { name: string; id: string };
    data.team.users = [];
    for (let ele of data.team.userIDs) {
      data.team.users?.push(
        (await fetch(`${urlParse(hostURL as string)}/api/user?id=${ele}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            return { name: res.user.name, id: res.user._id };
          })
          .catch(() => {
            return { name: "", id: ele };
          })) as { name: string; id: string }
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
  // TODO to check
  const data: {
    team?: TeamInterface;
    projects?: ProjectInterface[];
  } = {
    team: await getTeam(params.id),
    projects: await getProjects(params.id),
  };

  // const defaultTeam: TeamInterface = {
  //   name: "Team 1",
  //   id: params.id,
  //   hostID: "asdk290",
  //   host: { name: "Creater", id: "asdk290" },
  //   userIDs: ["aw89", "aw89", "aw89", "aw89", "aw89"],
  //   users: [
  //     { name: "User 1", id: "aw89" },
  //     { name: "User 2", id: "aw89" },
  //     { name: "User 3", id: "aw89" },
  //     { name: "User 4", id: "aw89" },
  //     { name: "User 5", id: "aw89" },
  //   ],
  // };
  // const defaultProjects: Array<ProjectInterface> = [
  //   { name: "Project 1", id: "awd234", userID: "awd892", tags: ["1"] },
  //   { name: "Project 2", id: "a46tdi", userID: "awd892", tags: ["2"] },
  //   { name: "Project 3", id: "aw456d", userID: "awd892", tags: ["3"] },
  //   { name: "Project 4", id: "awd5yh", userID: "awd892", tags: ["4"] },
  //   { name: "Project 5", id: "awd223", userID: "awd892", tags: ["5"] },
  // ];

  return (
    <Team
      team={data.team as TeamInterface}
      projects={data.projects as ProjectInterface[]}
    />
  );
}
