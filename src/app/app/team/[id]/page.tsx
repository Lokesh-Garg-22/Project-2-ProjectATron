import { hostURL } from "@/lib/data";
import { ProjectInterface } from "@/lib/interface/project/interface";
import { TeamInterface } from "@/lib/interface/team/interface";
import Team from "@/Views/Teams/Team";
import { notFound } from "next/navigation";

async function getTeam(id: string) {
  const data: {
    team?: TeamInterface;
    error?: string;
  } = await fetch(`${hostURL}/api/team?id=${id}`, {
    method: "GET",
  }).then((res) => res.json());
  if (data?.error) notFound();
  return data.team;
}
async function getProjects(id: string) {
  const data: {
    projects?: ProjectInterface[];
    error?: string;
  } = await fetch(`${hostURL}/api/team?id=${id}`, {
    method: "GET",
  }).then((res) => res.json());
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
  const defaultTeam: TeamInterface = {
    name: "Team 1",
    id: params.id,
    hostID: "asdk290",
    host: { name: "Creater", id: "asdk290" },
    userIDs: ["aw89", "aw89", "aw89", "aw89", "aw89"],
    users: [
      { name: "User 1", id: "aw89" },
      { name: "User 2", id: "aw89" },
      { name: "User 3", id: "aw89" },
      { name: "User 4", id: "aw89" },
      { name: "User 5", id: "aw89" },
    ],
  };
  const defaultProjects: Array<ProjectInterface> = [
    { name: "Project 1", id: "awd234", hostID: "awd892", tags: ["1"] },
    { name: "Project 2", id: "a46tdi", hostID: "awd892", tags: ["2"] },
    { name: "Project 3", id: "aw456d", hostID: "awd892", tags: ["3"] },
    { name: "Project 4", id: "awd5yh", hostID: "awd892", tags: ["4"] },
    { name: "Project 5", id: "awd223", hostID: "awd892", tags: ["5"] },
  ];

  return (
    <Team
      team={data.team || defaultTeam}
      projects={data.projects || defaultProjects}
    />
  );
}
