import { ProjectInterface } from "@/components/Project/interface";
import Project from "@/Views/Projects/Project";

export default function Page({ params }: { params: { id: string } }) {
  const project: ProjectInterface = {
    name: "Team 1",
    id: params.id,
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
  };
  return <Project project={project} />;
}
