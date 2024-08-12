import { hostURL } from "@/lib/data";
import { ProjectInterface } from "@/lib/interface/project/interface";
import Project from "@/Views/Projects/Project";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  // TODO
  const defaultProject: ProjectInterface = {
    name: "Project",
    id: params.id,
    description: "",
    url: hostURL,
    tags: [
      "Skill 1",
      "Skill 2",
      "Skill 3",
      "Skill 4",
      "Skill 5",
      "Skill 6",
      "Skill 7",
    ],
    hostID: "",
    host: { name: "Creater", id: "" },
    team: { name: "Team", id: "" },
  };
  const data: { project?: ProjectInterface; error?: string } = await fetch(
    `${hostURL}/api/project?id=${params.id}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
  if (data?.error) notFound();
  return <Project project={data?.project || defaultProject} />;
}
