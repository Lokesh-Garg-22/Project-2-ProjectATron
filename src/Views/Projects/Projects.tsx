import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProjectInterface } from "@/lib/interface/project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import SearchBar from "@/components/search/SearchBar";
import { urlParse } from "@/lib/utils";
import { hostURL } from "@/lib/data";
import { HydratedDocument } from "mongoose";
import { projectSchema } from "@/lib/db/models/Project";

export default async function Projects(
  props: unknown & { searchParams: { search?: string } }
) {
  const projects: Array<ProjectInterface> = [
    ...((await fetch(
      `${urlParse(hostURL as string)}/api/projects${
        props.searchParams.search ? `?search=${props.searchParams.search}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res: HydratedDocument<projectSchema>[]) =>
        res.map((ele) => {
          return { ...ele, id: ele._id };
        })
      )) as ProjectInterface[]),
  ];

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
