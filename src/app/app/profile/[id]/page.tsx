import { ProfileInterface } from "@/components/Profile/interface";
import { ProjectInterface } from "@/components/Project/interface";
import Profile from "@/Views/Profiles/Profile";

export default function Page({ params }: { params: { id: string } }) {
  const profile: ProfileInterface = {
    name: "Profile",
    id: params.id,
    about:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum quos architecto consequatur!",
    projects: 2,
  };
  const projects: Array<ProjectInterface> = [
    { name: "Project 1", id: "daui2", hostID: params.id, tags: ["tag"] },
    {
      name: "Project 2",
      id: "daui2",
      hostID: params.id,
      tags: ["tag"],
      url: "www.google.co.in",
    },
    { name: "Project 3", id: "daui2", hostID: params.id, tags: ["tag"] },
    { name: "Project 4", id: "daui2", hostID: params.id, tags: ["tag"] },
    {
      name: "Project 5",
      id: "daui2",
      hostID: params.id,
      tags: ["tag"],
      url: "www.google.co.in",
    },
    { name: "Project 6", id: "daui2", hostID: params.id, tags: ["tag"] },
  ];
  return <Profile profile={profile} projects={projects} />;
}
