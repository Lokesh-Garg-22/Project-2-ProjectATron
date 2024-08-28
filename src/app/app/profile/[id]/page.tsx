import { hostURL } from "@/lib/data";
import { ProfileInterface } from "@/lib/interface/profile/interface";
import { ProjectInterface } from "@/lib/interface/project/interface";
import { urlParse } from "@/lib/utils";
import Profile from "@/Views/Profiles/Profile";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const profile = (await fetch(
    `${urlParse(hostURL)}/api/user?id=${params.id || ""}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.error) notFound();
      if (res.user) {
        res.user.id = res.user._id;
        return res.user;
      }
    })) as ProfileInterface;
  const projects = (await fetch(
    `${urlParse(hostURL)}/api/user/projects?id=${params.id || ""}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.projects)
        return res.projects.map((ele: any) => {
          return { ...ele, id: ele._id };
        });
    })) as ProjectInterface[];
  return <Profile profile={profile} projects={projects} />;
}
