import MainContainer from "@/components/global/MainContainer";
import ListRenderer from "@/components/ListRenderer/ListRenderer";
import { ProfileInterface } from "@/components/Profile/interface";
import { type ProjectInterface } from "@/components/Project/interface";
import ProjectCard from "@/components/Project/ProjectCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "@/components/ui/Typography";
import { User2Icon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

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
        <div className="grow space-y-3">
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
