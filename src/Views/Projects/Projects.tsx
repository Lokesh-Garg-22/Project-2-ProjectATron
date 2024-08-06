import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProjectInterface } from "@/components/Project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import SearchBar from "@/components/search/SearchBar";

export default function Projects() {
  const projects: Array<ProjectInterface> = [
    { name: "Project 1", id: "awd234", tags: ["1"] },
    { name: "Project 2", id: "a46tdi", tags: ["2"] },
    { name: "Project 3", id: "aw456d", tags: ["3"] },
    { name: "Project 4", id: "awd5yh", tags: ["4"] },
    { name: "Project 5", id: "awd223", tags: ["5"] },
  ];

  return (
    <MainContainer className="my-4 items-center space-y-4">
      <SearchBar />
      <ListRenderer
        list={projects}
        ItemComponent={(data, id) => <ProjectCard key={id} project={data} />}
      />
    </MainContainer>
  );
}
