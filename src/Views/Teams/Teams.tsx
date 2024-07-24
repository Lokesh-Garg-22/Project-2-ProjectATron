import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/ListRenderer/ListRenderer";
import SearchBar from "@/components/search/SearchBar";
import { TeamInterface } from "@/components/Team/interface";
import TeamCard from "@/components/Team/TeamCard";

export default function Teams() {
  const teams: Array<TeamInterface> = [
    { name: "Team 1", id: "awd234", hostID: "", userIDs: [] },
    { name: "Team 2", id: "a46tdi", hostID: "", userIDs: [] },
    { name: "Team 3", id: "aw456d", hostID: "", userIDs: [] },
    { name: "Team 4", id: "awd5yh", hostID: "", userIDs: [] },
    { name: "Team 5", id: "awd223", hostID: "", userIDs: [] },
  ];

  return (
    <MainContainer className="items-center">
      <SearchBar />
      <ListRenderer
        list={teams}
        ItemComponent={(data, id) => <TeamCard team={data} key={id} />}
      />
    </MainContainer>
  );
}
