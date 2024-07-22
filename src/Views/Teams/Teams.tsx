import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/ListRenderer/ListRenderer";
import ProjectCard from "@/components/Project/ProjectCard";
import SearchBar from "@/components/search/SearchBar";
import { Team } from "@/components/Team/interface";

export default function Teams() {
  const teams: Array<Team> = [
    { name: "Team 1", id: "awd234" },
    { name: "Team 2", id: "a46tdi" },
    { name: "Team 3", id: "aw456d" },
    { name: "Team 4", id: "awd5yh" },
    { name: "Team 5", id: "awd223" },
  ];

  return (
    <MainContainer>
      <SearchBar />
      <ListRenderer
        list={teams}
        ItemComponent={(data, id) => <div key={id}>{data.name}</div>}
      />
    </MainContainer>
  );
}
