import { ProjectInterface } from "@/components/Project/interface";
import { type TeamInterface } from "@/components/Team/interface";
import Team from "@/Views/Teams/Team";

export default function Page({ params }: { params: { id: string } }) {
  const team: TeamInterface = {
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
  const projects: Array<ProjectInterface> = [
    { name: "Project 1", id: "awd234", hostID: "awd892", tags: ["1"] },
    { name: "Project 2", id: "a46tdi", hostID: "awd892", tags: ["2"] },
    { name: "Project 3", id: "aw456d", hostID: "awd892", tags: ["3"] },
    { name: "Project 4", id: "awd5yh", hostID: "awd892", tags: ["4"] },
    { name: "Project 5", id: "awd223", hostID: "awd892", tags: ["5"] },
  ];

  return <Team team={team} projects={projects} />;
}
