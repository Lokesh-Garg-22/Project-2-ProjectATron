import { ProjectInterface } from "@/components/Project/interface";
import Project from "@/Views/Projects/Project";

export default function Page({ params }: { params: { id: string } }) {
  const project: ProjectInterface = {
    name: "Project",
    id: params.id,
    url: "www.google.co.in",
    tags: [
      "Skill 1",
      "Skill 1",
      "Skill 1",
      "Skill 1",
      "Skill 1",
      "Skill 1",
      "Skill 1",
    ],
    hostID: "asdk290",
    host: { name: "Creater", id: "asdk290" },
    team: { name: "Team", id: "awd96" },
  };
  return <Project project={project} />;
}
