"use client";

import MainContainer from "@/components/global/MainContainer";
import FollowedProfilesCard from "@/components/Profile/FollowedProfilesCard";
import PersonalProfileCard from "@/components/Profile/PersonalProfileCard";
import ProjectCard from "@/components/Project/ProjectCard";
import ProjectsCard from "@/components/Project/ProjectsCard";
import { getProjects } from "@/components/Project/utils";
import TeamsCard from "@/components/Team/TeamsCard";
import ListRenderer from "@/components/Wrapper/ListRenderer";
import { windowUsername, windowUserPassword } from "@/lib/data";
import { projectSchema } from "@/lib/db/models/Project";
import { ProjectInterface } from "@/lib/interface/project/interface";
import { HydratedDocument } from "mongoose";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [projects, setProjects] = useState<ProjectInterface[]>([
    {
      name: "Project 1",
      id: "90uqb",
      tags: ["Awd", "awd"],
      url: "https://google.co.in",
      userID: "",
      pinned: true,
    },
    {
      name: "Project 2",
      id: "90uq",
      tags: ["goood", ""],
      userID: "",
    },
  ]);

  useEffect(() => {
    if (window && false) {
      (async () => {
        const userId = await fetch("/api/user/id", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            username: window.localStorage.getItem(windowUsername),
            password: window.localStorage.getItem(windowUserPassword),
          }),
        })
          .then((res) => res.json())
          .then((res) => res.userId)
          .catch((err) => console.log(err));
        setProjects(
          await getProjects({
            link: "/api/user/projects",
            userId,
            pinned: true,
          })
        );
      })();
    }
  }, []);

  return (
    <MainContainer>
      <div className="flex flex-wrap justify-center gap-2">
        <PersonalProfileCard />
        <FollowedProfilesCard />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <TeamsCard />
        <ProjectsCard />
      </div>
      {/* [ ] check section */}
      <ListRenderer
        list={projects}
        ItemComponent={(data, id) => <ProjectCard key={id} project={data} />}
        placeholder="No Pined Project!!"
        className="gap-2"
      />
    </MainContainer>
  );
}
