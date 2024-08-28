import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import { type ProjectInterface } from "@/lib/interface/project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import {
  TypographyH1,
  TypographyH4,
  TypographyP,
} from "@/components/ui/Typography";
import { User2Icon } from "lucide-react";

export default function Profile({
  profile,
  projects = [],
}: {
  profile: ProfileInterface;
  projects?: Array<ProjectInterface>;
}) {
  return (
    <MainContainer>
      <div className="flex my-4 mx-4">
        <div className="w-9/12 space-y-3">
          <TypographyH1>{profile.name}</TypographyH1>
          <TypographyH4 className="max-w-[70%]">{profile.about}</TypographyH4>
          <TypographyP className="font-bold">
            Projects: <span>{profile.projects}</span>
          </TypographyP>
        </div>
        <div className="shrink-0 grow">
          <div className="w-40 h-full flex items-center justify-center">
            <User2Icon className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="w-full my-2 mx-3 border rounded-full" />
      <ListRenderer
        list={projects}
        ItemComponent={(data, id) => <ProjectCard key={id} project={data} />}
      />
    </MainContainer>
  );
}
