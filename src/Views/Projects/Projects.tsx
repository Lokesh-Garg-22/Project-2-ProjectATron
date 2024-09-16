import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import ProjectCard from "@/components/Project/ProjectCard";
import SearchBar from "@/components/search/SearchBar";
import { getProjects } from "@/components/Project/utils";

export default async function Projects({
  search,
  userId,
}: {
  search?: string;
  userId?: string;
}) {
  const projects = await getProjects({ search, userId });

  return (
    <MainContainer className="my-4 items-center space-y-4">
      <SearchBar />
      <ListRenderer
        list={projects}
        ItemComponent={(data, id) => <ProjectCard key={id} project={data} />}
        placeholder="No Project Found!!"
      />
    </MainContainer>
  );
}
