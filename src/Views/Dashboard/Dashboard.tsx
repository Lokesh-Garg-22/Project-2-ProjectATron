"use client";

import MainContainer from "@/components/global/MainContainer";
import PersonalProfileCard from "@/components/Profile/PersonalProfileCard";
import PinnedProjectCard from "@/components/Project/PinnedProjectCard";
import ProjectsCard from "@/components/Project/ProjectsCard";
import TeamsCard from "@/components/Team/TeamsCard";

export default function Dashboard() {
  return (
    <MainContainer>
      <div className="flex flex-wrap justify-center gap-2">
        <PersonalProfileCard />
        <PersonalProfileCard />
        {/* TODO: <FollowedProfilesCard /> */}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <TeamsCard />
        <ProjectsCard />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <PinnedProjectCard
          project={{
            name: "Project 1",
            id: "90uqb",
            tags: ["Awd", "awd"],
            url: "https://google.co.in",
          }}
        />
        <PinnedProjectCard
          project={{ name: "Project 2", id: "90uqb", tags: [] }}
        />
      </div>
    </MainContainer>
  );
}
