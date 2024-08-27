import { hostURL } from "@/lib/data";
import { ProjectInterface } from "@/lib/interface/project/interface";
import { urlParse } from "@/lib/utils";
import Project from "@/Views/Projects/Project";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data: { project?: ProjectInterface; error?: string } = await fetch(
    `${urlParse(hostURL as string)}/api/project?id=${params.id}`,
    {
      method: "GET",
      next: { revalidate: 0 },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.project) res.project.id = res.project._id;
      return res;
    });
  if (data?.error) notFound();
  if (data.project) {
    data.project.user = (await fetch(
      `${urlParse(hostURL as string)}/api/user?id=${data.project.userID}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return { name: res.user.name, id: res.user._id };
      })
      .catch(() => {
        return { name: "", id: data.project?.userID };
      })) as { name: string; id: string };
    if (data.project.teamID)
      data.project.team = (await fetch(
        `${urlParse(hostURL as string)}/api/team?id=${data.project.teamID}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          return { name: res.team.name, id: res.team._id };
        })
        .catch(() => {
          return { name: "", id: data.project?.teamID };
        })) as { name: string; id: string };
  }
  return <Project project={data?.project as ProjectInterface} />;
}
