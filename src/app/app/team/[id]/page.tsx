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
  return <Team team={team} />;
}
