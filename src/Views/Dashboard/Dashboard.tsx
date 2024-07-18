import ProfileCard from "@/components/Profile/ProfileCard";
import PinnedProjectCard from "@/components/Project/PinnedProjectCard";
import ProjectsCard from "@/components/Project/ProjectsCard";
import TeamsCard from "@/components/Team/TeamsCard";

export default function Dashboard() {
  return (
    <div className="mt-2 mx-auto h-fit max-w-6xl grow flex flex-wrap justify-center gap-2">
      <ProfileCard />
      <TeamsCard />
      <ProjectsCard />
      <PinnedProjectCard
        project={{
          name: "Project 1",
          id: "90uqb",
          url: "https://google.co.in",
        }}
      />
      <PinnedProjectCard project={{ name: "Project 2", id: "90uqb" }} />
    </div>
  );
}
