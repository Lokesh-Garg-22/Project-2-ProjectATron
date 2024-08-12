import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProjectInterface } from "@/lib/interface/project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import SearchBar from "@/components/search/SearchBar";
import { urlParse } from "@/lib/utils";
import { hostURL } from "@/lib/data";

export default async function Projects(
  props: unknown & { searchParams: { search?: string } }
) {
  const projects: Array<ProjectInterface> = [
    ...((await fetch(
      `${urlParse(hostURL as string)}/api/projects${
        props.searchParams.search ?? `?search=${props.searchParams.search}`
      }`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        next: { revalidate: 30 },
      }
    ).then((res) => res.json())) as ProjectInterface[]),
    { name: "Project 1", id: "awd234", hostID: "", tags: ["1"] },
    { name: "Project 2", id: "a46tdi", hostID: "", tags: ["2"] },
    { name: "Project 3", id: "aw456d", hostID: "", tags: ["3"] },
    { name: "Project 4", id: "awd5yh", hostID: "", tags: ["4"] },
    { name: "Project 5", id: "awd223", hostID: "", tags: ["5"] },
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
